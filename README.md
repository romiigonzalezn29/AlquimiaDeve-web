# ◈ Alquimiadev — Web

Sitio web oficial de **Alquimiadev**, un proyecto que combina **diseño UX/UI, desarrollo web y estrategia digital** para marcas de productos físicos que buscan profesionalizar su presencia online.

> **Diseño + código para marcas que quieren vender online.**

🔗 **Demo:** https://alquimia-deve-web.vercel.app/

---

## ✦ Sobre el proyecto

Alquimiadev nace de la combinación entre **diseño, experiencia de usuario y desarrollo web**.

El sitio fue diseñado y desarrollado como una pieza de portfolio y como plataforma de presentación del proyecto, con foco en:

- Claridad de la propuesta de valor.
- Experiencia de navegación.
- Responsive design.
- Performance.
- Accesibilidad.
- SEO técnico.
- Seguridad.
- Analítica respetuosa con la privacidad.

El proyecto fue desarrollado **sin frameworks ni librerías externas**, utilizando tecnologías web nativas.

---

## 🛠️ Stack

- **HTML5**
- **CSS3**
- **JavaScript Vanilla**
- **SVG**
- **Responsive Design**
- **JSON-LD / Schema.org**
- **Plausible Analytics**
- **Vercel**

No requiere dependencias ni proceso de build.

---

## 📊 Calidad y performance

Resultados obtenidos con **Google Lighthouse** sobre la versión desplegada en producción:

| Categoría | Resultado |
|:---|:---:|
| Performance | **97** |
| Accesibilidad | **100** |
| Buenas prácticas | **100** |
| SEO | **100** |
| Navegación por agentes | **2/2** |

El sitio fue evaluado en aspectos de **rendimiento, accesibilidad, buenas prácticas, SEO y navegación mediante agentes**.

Estos resultados corresponden a una medición de la versión desplegada en producción y pueden variar según las condiciones de ejecución de Lighthouse.

---

## 🧩 Decisiones técnicas

### Performance

- Tipografías **autoalojadas en formato WOFF2**, evitando dependencias innecesarias de servicios externos.
- `preload` aplicado a recursos críticos utilizados en el primer viewport.
- Scripts cargados mediante `defer`.
- CSS separado por responsabilidades.
- Optimización de recursos para reducir el impacto sobre el renderizado inicial.
- Configuración de caché para recursos estáticos.

### Accesibilidad

- HTML semántico.
- Jerarquía de headings coherente.
- `skip-link` para navegación por teclado.
- Landmarks y atributos ARIA cuando son necesarios.
- Menú responsive con `aria-expanded` y `aria-controls`.
- Elementos puramente decorativos ocultos a tecnologías asistivas.
- Indicaciones para enlaces que abren nuevas pestañas.
- Estilos y lógica específicos para mejoras de accesibilidad.

### SEO

- Meta tags optimizados.
- URL canónica.
- Open Graph.
- Twitter Cards.
- `robots.txt`.
- `sitemap.xml`.
- Datos estructurados mediante **Schema.org / JSON-LD**.

Se utilizan estructuras `WebSite` y `ProfessionalService` para aportar contexto semántico adicional a los buscadores.

### Seguridad

- **Content Security Policy (CSP)**.
- `X-Frame-Options`.
- `X-Content-Type-Options`.
- `Referrer-Policy`.
- `Permissions-Policy`.
- Configuración de cabeceras mediante `vercel.json`.
- Sin scripts inline: la lógica se mantiene en archivos JavaScript separados.

### Analítica

Se utiliza **Plausible Analytics** como solución de analítica orientada a la privacidad.

Se implementaron eventos personalizados para medir interacciones relevantes, entre ellos:

- `click_whatsapp`
- `click_portfolio`
- `click_cta`
- `click_instagram`
- `click_tiktok`

Los eventos incluyen propiedades que permiten identificar la zona de la interfaz desde la que se produjo la interacción.

---

## 🤖 Navegación por agentes

El sitio obtuvo **2/2** en la categoría de navegación por agentes de Lighthouse.

Esta evaluación está relacionada con la capacidad de agentes automatizados para **interpretar y recorrer interfaces web**, incluyendo la identificación y navegación de elementos interactivos.

El resultado se documenta como una métrica específica de Lighthouse y no implica compatibilidad universal con cualquier agente o sistema de IA.

---

## 🔗 Link in bio

El proyecto incluye una página independiente en `/links`, diseñada como landing para utilizarse como enlace principal desde redes sociales.

La página permite:

- Centralizar accesos importantes.
- Dirigir tráfico hacia el portfolio.
- Facilitar el contacto por WhatsApp.
- Medir interacciones.
- Utilizar parámetros UTM para analizar campañas.

---

## 🎨 Identidad visual

La identidad combina conceptos de **alquimia y tecnología**:

- ✦ Simbolismo y elementos alquímicos.
- ◈ Código y lenguaje visual tecnológico.
- Tipografía editorial.
- Elementos geométricos.
- Fondos oscuros.
- Violeta y dorado como colores de acento.
- Microinteracciones inspiradas en interfaces de desarrollo.

El objetivo es construir una identidad **mística, tecnológica y profesional**, evitando la estética genérica de una agencia digital.

---

## 📐 Arquitectura del sitio

El sitio se organiza en las siguientes secciones:

1. **Hero** — propuesta de valor y llamados a la acción.
2. **Sobre mí** — perfil profesional y enfoque de trabajo.
3. **Servicios** — Diseño + UX, Configuración + desarrollo y Lanzamiento + autonomía.
4. **Beneficios** — principales beneficios de profesionalizar el canal de venta.
5. **Proceso** — Diagnóstico, Estructura, Diseño + configuración y Lanzamiento.
6. **Contacto** — acceso a WhatsApp y redes sociales.

---

## 📁 Estructura del repositorio

```text
AlquimiaDeve-web/
│
├── index.html
├── styles.css
├── accessibility.css
├── performance.css
├── script.js
├── a11y.js
├── analytics.js
│
├── fonts/
│   └── *.woff2
│
├── links/
│   ├── links.html
│   ├── links.css
│   └── links.js
│
├── logo.svg
├── robots.txt
├── sitemap.xml
├── vercel.json
└── README.md