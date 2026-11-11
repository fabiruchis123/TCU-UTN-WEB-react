#!/usr/bin/env bash
# =============================================================================
# Script de Despliegue Automatizado Docker - TCU-102A UTN Guanacaste
# Plataformas soportadas: Linux (Ubuntu/Debian/RHEL/CentOS/Alpine) y macOS
# =============================================================================

set -euo pipefail

# Colores de salida de consola
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # Sin color

log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[OK]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

echo "=========================================================="
echo "    TCU-102A UTN Guanacaste - Despliegue con Docker"
echo "=========================================================="

# 1. Comprobar instalación de Docker
if ! command -v docker &> /dev/null; then
    log_error "Docker no está instalado o no se encuentra en el PATH."
    log_error "Por favor instale Docker Engine antes de continuar: https://docs.docker.com/engine/install/"
    exit 1
fi

# 2. Detectar comando de Docker Compose (docker compose v2 vs docker-compose v1)
if docker compose version &> /dev/null; then
    COMPOSE_CMD="docker compose"
elif command -v docker-compose &> /dev/null; then
    COMPOSE_CMD="docker-compose"
else
    log_error "Docker Compose no está disponible en este sistema."
    exit 1
fi

# 3. Determinar archivo de Compose según argumento
COMPOSE_FILE="docker-compose.yml"
if [[ "${1:-}" == "--prod" || "${1:-}" == "-p" ]]; then
    COMPOSE_FILE="docker-compose.prod.yml"
    log_info "Modo seleccionado: PRODUCCIÓN ($COMPOSE_FILE)"
elif [[ "${1:-}" == "--down" ]]; then
    log_info "Deteniendo y eliminando contenedores..."
    $COMPOSE_CMD -f docker-compose.yml down
    $COMPOSE_CMD -f docker-compose.prod.yml down 2>/dev/null || true
    log_success "Contenedores detenidos correctamente."
    exit 0
elif [[ "${1:-}" == "--logs" ]]; then
    log_info "Mostrando logs del contenedor en tiempo real..."
    $COMPOSE_CMD -f docker-compose.yml logs -f --tail=100
    exit 0
elif [[ "${1:-}" == "--status" ]]; then
    log_info "Estado actual del servicio:"
    $COMPOSE_CMD -f docker-compose.yml ps
    exit 0
else
    log_info "Modo seleccionado: ESTÁNDAR ($COMPOSE_FILE)"
fi

# Cargar variables de .env si existe
if [ -f .env ]; then
    log_info "Cargando variables desde archivo .env local..."
    export $(grep -v '^#' .env | xargs)
fi

PORT_MAPPED="${PORT:-${HOST_PORT:-8080}}"

# 4. Construir y levantar el contenedor
log_info "Construyendo la imagen multi-stage (Node 22 -> Vite Build -> Nginx Alpine)..."
$COMPOSE_CMD -f "$COMPOSE_FILE" build --pull

log_info "Iniciando servicio en segundo plano (detached)..."
$COMPOSE_CMD -f "$COMPOSE_FILE" up -d --remove-orphans

# 5. Esperar verificación de salud (Healthcheck)
log_info "Esperando que el contenedor supere el healthcheck interno..."
CONTAINER_NAME=$($COMPOSE_CMD -f "$COMPOSE_FILE" ps -q tcu-utn-web 2>/dev/null || true)

if [ -n "$CONTAINER_NAME" ]; then
    MAX_ATTEMPTS=12
    ATTEMPT=1
    HEALTHY=false

    while [ $ATTEMPT -le $MAX_ATTEMPTS ]; do
        STATUS=$(docker inspect --format='{{json .State.Health.Status}}' "$CONTAINER_NAME" 2>/dev/null || echo '"unknown"')
        if [ "$STATUS" == '"healthy"' ]; then
            HEALTHY=true
            break
        fi
        echo -n "."
        sleep 2
        ((ATTEMPT++))
    done
    echo ""

    if [ "$HEALTHY" = true ]; then
        log_success "¡Contenedor verificado y en estado HEALTHY!"
    else
        log_warn "El contenedor está iniciando o el healthcheck aún no concluye (estado actual: $STATUS)."
    fi
fi

# 6. Resumen de Despliegue
echo ""
echo "=========================================================="
log_success "¡Despliegue completado con éxito!"
echo -e "  - URL Local:     ${GREEN}http://localhost:${PORT_MAPPED}${NC}"
echo -e "  - Endpoint Salud: ${GREEN}http://localhost:${PORT_MAPPED}/healthz${NC}"
echo -e "  - Ver logs:       ${BLUE}${COMPOSE_CMD} -f ${COMPOSE_FILE} logs -f${NC}"
echo -e "  - Detener:        ${BLUE}./deploy.sh --down${NC}"
echo "=========================================================="
