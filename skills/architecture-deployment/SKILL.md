---
name: architecture-deployment
description: Parámetros de arquitectura frontend, división inteligente de código (code-splitting), optimización de bundles en Vite/Rollup, configuración de servidores (Netlify, Vercel, Nginx), auditoría Lighthouse y preparación PWA.
---

# Architecture & Production Deployment Guide

Esta habilidad define la arquitectura técnica de compilación, empaquetado y despliegue para la aplicación TCU UTN Web.

---

## 1. Arquitectura de Bundling y Code-Splitting

### 1.1 Configuración de Vite y Rollup
Para evitar advertencias de chunks voluminosos (> 500 kB) y permitir un aprovechamiento eficiente de la memoria caché del navegador:
```ts
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom', 'lucide-react']
        }
      }
    }
  }
});
```

### 1.2 Estrategia de Caché de Navegador
- **Archivos con hash en `/assets/`** (`index-[hash].js`, `vendor-[hash].js`, `index-[hash].css`):
  - Cabecera: `Cache-Control: public, max-age=31536000, immutable`.
  - Debido al hashing del contenido, el navegador puede almacenar estos recursos de forma indefinida sin riesgo de obsolescencia.
- **Archivo `index.html`**:
  - Cabecera: `Cache-Control: no-cache, no-store, must-revalidate`.
  - Asegura que cualquier nuevo despliegue sea detectado inmediatamente por el cliente.

---

## 2. Compatibilidad Multi-Plataforma de Despliegue

La solución está preparada para despliegue sin fricción en los tres entornos más comunes:

### 2.1 Netlify & Cloudflare Pages (`public/_headers`)
- Reglas automáticas que inyectan Content Security Policy, HSTS, X-Frame-Options y permisos de hardware.
- Enrutamiento SPA automático o mediante archivo `_redirects` (`/* /index.html 200`).

### 2.2 Vercel (`vercel.json`)
- Inclusión de cabeceras de seguridad globales en la clave `"headers"`.
- Clave `"rewrites"` para redirigir peticiones que no coincidan con activos estáticos hacia `/index.html`.

### 2.3 Servidores On-Premise / Contenedores Docker (`nginx.conf`)
- Servidor web Nginx con compresión gzip nivel 6.
- Directiva `try_files $uri $uri/ /index.html;` para soportar navegación del lado del cliente.
- Bloqueo de archivos ocultos (`.git`, `.env`) con código 403 `deny all`.

---

## 3. Parámetros de Auditoría de Rendimiento (Lighthouse)

### 3.1 Métricas Core Web Vitals Objetivo
| Métrica | Descripción | Umbral Óptimo |
| :--- | :--- | :--- |
| **LCP** (Largest Contentful Paint) | Tiempo en renderizar el bloque de contenido principal. | `< 2.5 s` |
| **INP** (Interaction to Next Paint) | Capacidad de respuesta ante interacciones del usuario. | `< 200 ms` |
| **CLS** (Cumulative Layout Shift) | Estabilidad visual durante la carga (evitar saltos repentinos). | `< 0.1` |
| **FCP** (First Contentful Paint) | Primer indicio visual perceptible para el usuario. | `< 1.8 s` |

### 3.2 Buenas Prácticas de Rendimiento
1. **Preconexión de Fuentes**: `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>` en el `<head>`.
2. **Dimensiones Explícitas**: Definir atributos `width` y `height` en imágenes y logotipos para reservar espacio y prevenir CLS.
3. **Optimización de Formatos**: Preferir formatos vectoriales (`SVG`) para iconografía e ilustraciones, y `WebP` o compresión JPEG progresiva para fotografías.
