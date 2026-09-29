
/* ALQUIMIADEV — Eventos de analytics (sin dependencias, no toca el HTML)
   Detecta los clics por el destino del link y envía el evento a Plausible
   (y a GA4 si algún día se carga gtag). */
(function () {
  // Cola: si el script de Plausible aún no cargó (o lo bloquea un adblocker),
  // la llamada no falla ni rompe la página.
  window.plausible = window.plausible || function () {
    (window.plausible.q = window.plausible.q || []).push(arguments);
  };

  function send(name, props) {
    window.plausible(name, { props: props });
    if (typeof window.gtag === 'function') window.gtag('event', name, props);
  }

  // Regla → nombre de evento (gana la primera que coincida)
  const RULES = [
    ['a[href*="alquimia-deve-web.vercel.app/?utm_source=links&utm_medium=bio"]', 'click_portfolio'],
    ['a[href*="wa.me"]', 'click_whatsapp'],
    ['a[href*="instagram.com"]', 'click_instagram'],
    ['a[href*="tiktok.com"]', 'click_tiktok'],
    ['a.btn[href^="#"], a.nav-cta, a.link-arrow, a[href="#contacto"]', 'click_cta'],
  ];

  // Zona de la página donde ocurrió el clic
  function zoneOf(el) {
    if (el.closest('#navMobile')) return 'nav-mobile';
    if (el.closest('header')) return 'nav';
    if (el.closest('footer')) return 'footer';
    if (el.closest('.links')) return 'links';
    if (el.closest('.socials')) return 'socials';
    const section = el.closest('section[id]');
    return section ? section.id : 'otro';
  }

  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href]');
    if (!link) return;

    const rule = RULES.find(([selector]) => link.matches(selector));
    if (!rule) return;

    const props = { location: zoneOf(link) };
    if (rule[1] === 'click_cta') props.target = link.getAttribute('href');

    send(rule[1], props);
  }, { passive: true });
})();
