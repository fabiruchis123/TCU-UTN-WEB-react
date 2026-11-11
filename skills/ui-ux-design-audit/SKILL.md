---
name: ui-ux-design-audit
description: Guía de auditoría, buenas prácticas y checklist exhaustivo para diseño responsivo, contraste WCAG 2.1 AA, accesibilidad web y consistencia visual en aplicaciones React.
---

# UI/UX & Design Audit Guide - TCU UTN Web

Esta habilidad proporciona una metodología estructurada para auditar y perfeccionar la experiencia de usuario (UX), diseño visual (UI) y accesibilidad (a11y) en el ecosistema web del TCU.

---

## 1. Principios de Accesibilidad (WCAG 2.1 Nivel AA)

### 1.1 Contraste de Color
- **Texto Normal (< 18pt o < 14pt negrita)**: Ratio mínimo de contraste de **4.5:1** contra el fondo.
- **Texto Grande (≥ 18pt o ≥ 14pt negrita)**: Ratio mínimo de **3:1**.
- **Elementos de Interfaz y Gráficos Activos**: Bordes de inputs, botones y estados de foco con ratio mínimo de **3:1**.
- **Paleta Oficial TCU-102A**:
  - Azul Institucional Primario: `#012969` (Contraste sobre blanco: ~12.5:1 -> Pasa AAA).
  - Verde Acento Fitosanitario: `#1e7e34` / `#47c73b`.
  - Amarillo Precaución / Alerta: `#d39e00` con texto oscuro `#1a1a1a` para evitar fallos de contraste.
  - Texto Principal de Lectura: `#212529` sobre fondos claros.

### 1.2 Jerarquía Semántica y Lector de Pantalla
- Estructura de títulos `<h1>` única por vista/página, seguida de `<h2>`, `<h3>` sin saltos de nivel.
- Todo elemento interactivo (`<button>`, `<a>`, `<input>`) debe contar con un nombre accesible (texto legible o atributo `aria-label`).
- Atributos `alt` descriptivos y contextualizados en todas las etiquetas `<img>` (evitar `alt="imagen"` genérico).

---

## 2. Diseño Responsivo y Ergonomía Móvil

### 2.1 Breakpoints Estandarizados
| Dispositivo | Rango (px) | Comportamiento Clave |
| :--- | :--- | :--- |
| **Móvil (Smartphones)** | `< 576px` | Disposición en una columna, tarjetas apiladas, fuentes base 15-16px, padding lateral 16px. |
| **Tablet Vertical** | `576px - 768px` | Grillas de 2 columnas, menús de navegación colapsables tipo hamburguesa. |
| **Tablet Horizontal / Laptop** | `769px - 1024px` | Grillas de 2 a 3 columnas, barras laterales desplegables o sticky. |
| **Escritorio / Pantallas Grandes** | `> 1024px` | Ancho máximo contenedor (`max-width: 1200px` - `1400px`), márgenes auto-centrados. |

### 2.2 Objetivos Táctiles (Touch Targets)
- Botones, enlaces interactivos e inputs táctiles deben tener un área mínima de **44 x 44 px** para interacción cómoda en smartphones.
- Espaciado mínimo de **8px** entre elementos interactivos contiguos para evitar pulsaciones accidentales.

---

## 3. Checklist de Auditoría de Vistas

- [ ] **Navegación Móvil**: El menú de hamburguesa abre y cierra fluidamente sin generar desbordamiento horizontal (`overflow-x`).
- [ ] **Formularios**:
  - Cada campo tiene su respectivo `<label htmlFor="...">`.
  - Los estados de foco (`:focus-visible`) son claramente reconocibles con un anillo de contraste (`outline: 2px solid #0056b3`).
  - Los mensajes de error o éxito son informativos y no dependen únicamente del color (incluyen íconos explicativos).
- [ ] **Componentes Interactivos**: Modales y drawers atrapan el foco del teclado y permiten cerrarse mediante tecla `Escape` o clic fuera del contenedor.
- [ ] **Imágenes y Multimedia**: Las imágenes tienen `loading="lazy"` para optimizar el rendimiento de renderizado inicial (LCP).
