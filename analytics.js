/* ALQUIMIADEV — Analytics (Plausible) */

// 1) Stub + init de Plausible (siempre primero)
window.plausible = window.plausible || function () {
  (window.plausible.q = window.plausible.q || []).push(arguments);
};
window.plausible.init = window.plausible.init || function (i) {
  window.plausible.o = i || {};
};
window.plausible.init();

// 2) Eventos de clic
(function () {
  function send(name, props) {
    if (typeof window.plausible === 'function') {
      window.plausible(name, { props: props });
    }
    if (typeof window.gtag === 'function') window.gtag('event', name, props);
  }

const RULES = [
  // Portfolio: links.html -> home (cubre el dominio actual y el futuro)
  ['a[href*="alquimia-deve-web.vercel.app"], a[href*="alquimiadev.com"]', 'click_portfolio'],
  ['a[href*="wa.me"]', 'click_whatsapp'],
  ['a[href*="instagram.com"]', 'click_instagram'],
  ['a[href*="tiktok.com"]', 'click_tiktok'],
  ['a.btn[href^="#"], a.nav-cta, a.link-arrow, a[href="#contacto"]', 'click_cta'],
];

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