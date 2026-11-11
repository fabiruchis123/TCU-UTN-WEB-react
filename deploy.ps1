# =============================================================================
# Script de Despliegue Automatizado Docker para Windows (PowerShell)
# TCU-102A UTN Guanacaste
# =============================================================================

[CmdletBinding()]
param(
    [switch]$Prod,
    [switch]$Down,
    [switch]$Logs,
    [switch]$Status
)

$ErrorActionPreference = "Stop"

function Write-Info { Write-Host "[INFO] $($args[0])" -ForegroundColor Cyan }
function Write-Success { Write-Host "[OK]   $($args[0])" -ForegroundColor Green }
function Write-Warn { Write-Host "[WARN] $($args[0])" -ForegroundColor Yellow }
function Write-Err { Write-Host "[ERR]  $($args[0])" -ForegroundColor Red }

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "    TCU-102A UTN Guanacaste - Despliegue con Docker" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

# 1. Comprobar instalación de Docker
if (-not (Get-Command "docker" -ErrorAction SilentlyContinue)) {
    Write-Err "Docker no está instalado o no se encuentra en el PATH del sistema."
    Write-Err "Instale Docker Desktop antes de continuar: https://www.docker.com/products/docker-desktop/"
    Exit 1
}

# 2. Detectar comando de Compose
$composeCmd = "docker compose"
try {
    & docker compose version *>$null
} catch {
    if (Get-Command "docker-compose" -ErrorAction SilentlyContinue) {
        $composeCmd = "docker-compose"
    } else {
        Write-Err "Docker Compose no está disponible."
        Exit 1
    }
}

# 3. Acciones según parámetros
$composeFile = "docker-compose.yml"
if ($Prod) {
    $composeFile = "docker-compose.prod.yml"
    Write-Info "Modo seleccionado: PRODUCCIÓN ($composeFile)"
} elseif ($Down) {
    Write-Info "Deteniendo y eliminando contenedores..."
    & docker compose -f docker-compose.yml down
    & docker compose -f docker-compose.prod.yml down 2>$null
    Write-Success "Contenedores detenidos correctamente."
    Exit 0
} elseif ($Logs) {
    Write-Info "Mostrando logs del contenedor en tiempo real..."
    & docker compose -f docker-compose.yml logs -f --tail=100
    Exit 0
} elseif ($Status) {
    Write-Info "Estado de los contenedores:"
    & docker compose -f docker-compose.yml ps
    Exit 0
} else {
    Write-Info "Modo seleccionado: ESTÁNDAR ($composeFile)"
}

# Leer puerto desde .env si existe
$port = "8080"
if (Test-Path ".env") {
    Get-Content ".env" | ForEach-Object {
        if ($_ -match '^\s*PORT\s*=\s*(.+)$') { $port = $matches[1].Trim() }
        elseif ($_ -match '^\s*HOST_PORT\s*=\s*(.+)$') { $port = $matches[1].Trim() }
    }
}

# 4. Construir y levantar
Write-Info "Construyendo la imagen multi-stage (Node 22 -> Vite Build -> Nginx Alpine)..."
& docker compose -f $composeFile build --pull

Write-Info "Iniciando servicio en segundo plano..."
& docker compose -f $composeFile up -d --remove-orphans

# 5. Esperar Healthcheck
Write-Info "Comprobando estado de salud del contenedor..."
Start-Sleep -Seconds 3

Write-Host ""
Write-Host "==========================================================" -ForegroundColor Green
Write-Success "¡Despliegue completado con éxito!"
Write-Host "  - URL Local:      http://localhost:$port" -ForegroundColor Green
Write-Host "  - Endpoint Salud: http://localhost:$port/healthz" -ForegroundColor Green
Write-Host "  - Ver logs:        $composeCmd -f $composeFile logs -f" -ForegroundColor Cyan
Write-Host "  - Detener:         .\deploy.ps1 -Down" -ForegroundColor Yellow
Write-Host "==========================================================" -ForegroundColor Green
