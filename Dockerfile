# =============================================================================
# Dockerfile Multi-Stage de Producción - TCU-102A UTN Guanacaste
# Optimizado para alto rendimiento, seguridad y huella de imagen mínima (~25MB)
# =============================================================================

# -----------------------------------------------------------------------------
# Stage 1: Build de la Aplicación React con Vite y Node 22 Alpine
# -----------------------------------------------------------------------------
FROM node:22-alpine AS builder

WORKDIR /app

# Optimización de caché de Docker: Copiar manifiestos primero
COPY package.json package-lock.json ./

# Instalación determinista de dependencias
RUN npm ci

# Copiar el código fuente completo del proyecto
COPY . .

# Compilar la aplicación para producción (TypeScript + Vite)
RUN npm run build

# -----------------------------------------------------------------------------
# Stage 2: Servidor Web Nginx Alpine Slim para Producción
# -----------------------------------------------------------------------------
FROM nginx:alpine-slim AS production

LABEL maintainer="TCU-102A UTN Sede Guanacaste <tcu@utn.ac.cr>"
LABEL description="Contenedor de producción Nginx para el portal web TCU-102A UTN"
LABEL version="1.0.0"

# Instalar curl para el HEALTHCHECK (ligero y confiable)
RUN apk add --no-cache curl

# Copiar configuración personalizada optimizada para SPA y blindaje de seguridad
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Eliminar archivos por defecto de Nginx y copiar los artefactos compilados desde el builder
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist /usr/share/nginx/html

# Aplicar permisos de seguridad de mínimos privilegios (usuario nginx)
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

# Exponer puerto HTTP estándar
EXPOSE 80

# Verificación de salud interna del contenedor
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD curl -fs http://localhost/healthz || exit 1

# Iniciar Nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]
