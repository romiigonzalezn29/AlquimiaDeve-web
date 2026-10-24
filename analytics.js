/* ============================================================
   ALQUIMIADEV — Analytics (Google Analytics 4)
   ------------------------------------------------------------
   Requiere que el snippet de gtag.js (con tu ID G-XXXXXXXXXX)
   esté en el <head>, ANTES de cargar este archivo.

   Los eventos se trackean por JS con reglas de selectores.
   Cada evento se envía con un parámetro "zone" que indica
   la zona del DOM donde se hizo clic.
   ============================================================ */

(function initAnalytics() {
  // ------------------------------------------------------------
  // Helper para enviar eventos a GA4
  // ------------------------------------------------------------
  function send(name, props) {
    if (typeof window.gtag === 'function') {
      window.gtag('event', name, props || {});
    }
  }

  // ------------------------------------------------------------
  // Detectar zona del DOM donde se hizo clic
  // ------------------------------------------------------------
  function zoneOf(el) {
    if (el.closest('#navMobile')) return 'nav-mobile';
    if (el.closest('header')) return 'nav';
    if (el.closest('footer')) return 'footer';
    if (el.closest('#inicio')) return 'hero';
    if (el.closest('.decision')) return 'decision';
    if (el.closest('#tiendas')) return 'tiendas';
    if (el.closest('#paginas-web')) return 'paginas-web';
    if (el.closest('#mejorar-web')) return 'mejorar-web';
    if (el.closest('#sobre-mi')) return 'sobre-mi';
    if (el.closest('#contacto')) return 'contacto';
    return 'otro';
  }

  // ------------------------------------------------------------
  // Reglas de tracking: orden importa (más específicas primero)
  // ------------------------------------------------------------
const RULES = [
  // Planes (por texto del link "Ver plan")
  ['.plan-base a[href*="wa.me"]', 'click_plan_lista'],
  ['.plan-full a[href*="wa.me"]', 'click_plan_optimizada'],
  ['.plan-premium a[href*="wa.me"]', 'click_plan_estrategica'],

  // WhatsApp
  ['a[href*="wa.me"]', 'click_whatsapp'],

  // Redes sociales
  ['a[href*="instagram.com"]', 'click_instagram'],
  ['a[href*="tiktok.com"]', 'click_tiktok'],
  ['a[href*="linkedin.com"]', 'click_linkedin'],

  // CTAs internos: botones, "Conocer más" y tarjetas de decisión
  // (van ANTES que la navegación para ganar la coincidencia)
  ['a.btn[href^="#"], a.link-arrow, a.decision-card', 'click_cta'],

  // Navegación interna (menú de arriba y menú móvil)
  ['a[href="#tiendas"]', 'click_nav_tiendas'],
  ['a[href="#paginas-web"]', 'click_nav_web'],
  ['a[href="#mejorar-web"]', 'click_nav_mejoras'],
  ['a[href="#sobre-mi"]', 'click_nav_sobre_mi'],
  ['a[href="#contacto"]', 'click_nav_cta'],
];


  // ------------------------------------------------------------
  // Listener global de clics
  // ------------------------------------------------------------
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href]');
    if (!link) return;

    const rule = RULES.find(([selector]) => link.matches(selector));
    if (!rule) return;

    const props = { zone: zoneOf(link) };
    if (rule[1] === 'click_cta') props.target = link.getAttribute('href');

    send(rule[1], props);
  }, { passive: true });


  // ------------------------------------------------------------
  // Scroll depth (25%, 50%, 75%, 100%)
  // ------------------------------------------------------------
  const thresholds = [25, 50, 75, 100];
  const fired = new Set();

  function checkScrollDepth() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return;

    const percent = Math.round((scrollTop / docHeight) * 100);

    thresholds.forEach((t) => {
      if (percent >= t && !fired.has(t)) {
        fired.add(t);
        send('scroll_depth', { depth: t + '%' });
      }
    });
  }

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        checkScrollDepth();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });


  // ------------------------------------------------------------
  // Time on page (15s, 30s, 60s, 120s)
  // ------------------------------------------------------------
  const timeThresholds = [15, 30, 60, 120];
  timeThresholds.forEach((seconds) => {
    setTimeout(() => {
      send('time_on_page', { seconds: seconds });
    }, seconds * 1000);
  });

})();