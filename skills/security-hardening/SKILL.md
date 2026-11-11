---
name: security-hardening
description: Directrices, políticas de blindaje contra vulnerabilidades OWASP Top 10, sanitización estricta de entradas, Content Security Policy (CSP), cabeceras HTTP y gestión de secretos en aplicaciones cliente.
---

# Web Security Hardening & OWASP Compliance Guide

Esta habilidad compila los protocolos de defensa en profundidad y blindaje de seguridad aplicados en la plataforma web TCU UTN.

---

## 1. Mitigación contra OWASP Top 10

### 1.1 Inyección y Cross-Site Scripting (XSS)
- **Defensa Primaria**: Sanitización estricta antes de procesar o persistir cualquier entrada de usuario con `src/utils/security.ts`.
- **Eliminación de Payloads**:
  - Remoción de secuencias `<script>`, `<iframe>`, manejadores inline (`onload=`, `onerror=`) y protocolos no seguros (`javascript:`, `vbscript:`, `data:` en contextos de ejecución).
  - Truncamiento de longitud máxima para prevenir desbordamientos o ataques DoS por inyección masiva de texto.
- **Escape Automático**: React escapa variables dinámicas por defecto en JSX (`{variable}`); nunca utilizar `dangerouslySetInnerHTML` salvo que provenga de un sanitizador verificado (ej. DOMPurify) con política estricta.

### 1.2 Broken Access Control & Redirecciones Maliciosas
- **Enlaces Externos**: Todo enlace saliente (`target="_blank"`) debe acompañarse mandatoriamente de `rel="noopener noreferrer"` para mitigar la vulnerabilidad de `window.opener` reverse tabnabbing.
- **Rutas y Enrutador**: Validar rutas y parámetros en `react-router-dom` para evitar open redirects mediante barras invertidas o secuencias codificadas.

### 1.3 Vulnerabilidades en Dependencias de Terceros
- Ejecución periódica de `npm audit` en entornos locales y en CI mediante `.github/workflows/security-audit.yml`.
- Bloqueo de versiones directas con parcheo continuo de CVEs identificadas en `package-lock.json`.

---

## 2. Content Security Policy (CSP) y Cabeceras HTTP

### 2.1 Directivas CSP Implementadas
```http
Content-Security-Policy: default-src 'self';
  script-src 'self' 'unsafe-inline';
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com;
  font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com data:;
  img-src 'self' data: blob: https:;
  frame-src 'self' https://www.google.com https://www.youtube.com https://www.youtube-nocookie.com https://lookerstudio.google.com;
  connect-src 'self' https:;
  base-uri 'self';
  form-action 'self';
```

### 2.2 Cabeceras de Protección Adicionales
| Cabecera | Valor | Propósito |
| :--- | :--- | :--- |
| `X-Content-Type-Options` | `nosniff` | Evita que el navegador adivine el MIME-type del recurso (MIME-sniffing). |
| `X-Frame-Options` | `SAMEORIGIN` | Previene ataques de Clickjacking impidiendo el embebido en sitios no autorizados. |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Protege información sensible en la URL al navegar hacia orígenes externos. |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` | Deshabilita hardware no utilizado en la aplicación cliente. |
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains; preload` | Fuerza conexiones cifradas HTTPS durante 1 año. |

---

## 3. Gestión Segura de Secretos y Entornos

- Ninguna clave privada, token o secreto de base de datos debe ser versionado en el repositorio Git.
- Variables públicas del cliente deben prefijarse con `VITE_` y contener únicamente identificadores públicos o URLs de servicios de consulta pública.
- El archivo `.gitignore` debe contener explícitamente:
  ```gitignore
  .env
  .env.local
  .env.*.local
  npm-debug.log*
  dist/
  ```
