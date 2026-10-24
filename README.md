# ◈ Alquimiadev — Web

Sitio web oficial de **Alquimiadev**, un proyecto que combina **diseño UX/UI, desarrollo web y estrategia digital** para negocios y marcas que buscan profesionalizar su presencia online.

> **Diseño + código para negocios que quieren crecer online.**

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
- Medición de interacciones con Google Analytics 4.

El proyecto fue desarrollado **sin frameworks ni librerías de interfaz**, utilizando tecnologías web nativas.

---

## 🛠️ Stack

- **HTML5**
- **CSS3**
- **JavaScript Vanilla**
- **SVG**
- **Responsive Design**
- **JSON-LD / Schema.org**
- **Google Analytics 4**
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
- Scripts cargados mediante `defer`, excepto el del tema, que se ejecuta antes del renderizado para evitar parpadeos.
- Script de Google Analytics cargado de forma asíncrona.
- CSS separado por responsabilidades.
- Optimización de recursos para reducir el impacto sobre el renderizado inicial.
- Configuración de caché para recursos estáticos.

### Accesibilidad

- HTML semántico.
- Jerarquía de headings coherente.
- `skip-link` para navegación por teclado.
- Landmarks y atributos ARIA cuando son necesarios.
- Menú responsive con `aria-expanded` y `aria-controls`.
- Selector de tema claro y oscuro.
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

Se utilizan estructuras `WebSite`, `Person` y `ProfessionalService` para aportar contexto semántico adicional a los buscadores.

### Seguridad

- **Content Security Policy (CSP)**, con permisos limitados a los dominios de Google necesarios para Analytics.
- `X-Frame-Options`.
- `X-Content-Type-Options`.
- `Referrer-Policy`.
- `Permissions-Policy`.
- Configuración de cabeceras mediante `vercel.json`.
- Sin scripts inline ejecutables: la lógica se mantiene en archivos JavaScript separados.

### Analítica

Se utiliza **Google Analytics 4**, cargado mediante `gtag-init.js` y con eventos personalizados definidos en `analytics.js`.

Los eventos se detectan con reglas de selectores y se envían con un parámetro `zone` que indica la zona de la interfaz donde ocurrió la interacción (navegación, hero, planes, contacto, footer, etc.).

Eventos medidos:

- **Contacto:** `click_whatsapp`, `click_plan_lista`, `click_plan_optimizada`, `click_plan_estrategica`.
- **Redes:** `click_instagram`, `click_tiktok`, `click_linkedin`.
- **Navegación y CTAs:** `click_nav_*` y `click_cta` (con el parámetro `target`).
- **Engagement:** `scroll_depth` (25 %, 50 %, 75 % y 100 %) y `time_on_page` (15, 30, 60 y 120 segundos).

Los parámetros `zone`, `target`, `depth` y `seconds` se registran como dimensiones personalizadas en GA4. Los eventos de contacto y de planes se marcan como eventos clave.

---

## 🤖 Navegación por agentes

El sitio obtuvo **2/2** en la categoría de navegación por agentes de Lighthouse.

Esta evaluación está relacionada con la capacidad de agentes automatizados para **interpretar y recorrer interfaces web**, incluyendo la identificación y navegación de elementos interactivos.

El resultado se documenta como una métrica específica de Lighthouse y no implica compatibilidad universal con cualquier agente o sistema de IA.

---

## 🔗 Link in bio

El proyecto incluye una página independiente, ubicada en la carpeta `links/`, diseñada como landing para utilizarse como enlace principal desde redes sociales.

La página permite:

- Centralizar accesos importantes.
- Dirigir tráfico hacia el portfolio.
- Facilitar el contacto por WhatsApp.
- Medir interacciones con Google Analytics 4.
- Utilizar parámetros UTM para analizar campañas.

---

## 🎨 Identidad visual

La identidad combina conceptos de **alquimia y tecnología**:

- ✦ Simbolismo y elementos alquímicos.
- ◈ Código y lenguaje visual tecnológico.
- Tipografía editorial.
- Elementos geométricos.
- Tema oscuro y tema claro, con selector.
- Violeta y dorado como colores de acento.
- Microinteracciones inspiradas en interfaces de desarrollo.

El objetivo es construir una identidad **mística, tecnológica y profesional**, evitando la estética genérica de una agencia digital.

---

## 📐 Arquitectura del sitio

El sitio se organiza en las siguientes secciones:

1. **Hero** — propuesta de valor y llamados a la acción.
2. **Elegí por dónde empezar** — acceso a los dos caminos principales: tienda online o página web.
3. **Tiendas online** — servicios sobre Tiendanube y planes con precios (Tienda Lista, Tienda Optimizada y Tienda Estratégica).
4. **Páginas web** — desarrollo de webs completas para presentar un negocio.
5. **Mejorar mi web** — mejoras de performance, SEO, usabilidad y medición para sitios existentes.
6. **Sobre mí** — perfil profesional y enfoque de trabajo.
7. **Contacto** — acceso a WhatsApp y redes sociales.

---

## 📁 Estructura del repositorio

```text
AlquimiaDeve-web/
│
├── index.html
├── styles.css
├── accessibility.css
├── performance.css
├── theme-init.js
├── gtag-init.js
├── analytics.js
├── script.js
├── a11y.js
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
```