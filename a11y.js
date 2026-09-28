/* ALQUIMIADEV — Mejoras de accesibilidad (se carga después de script.js) */
(function () {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  // 1. Menú móvil: mantener aria-expanded y el label sincronizados,
  //    y cerrar con Escape devolviendo el foco al botón.
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('navMobile');

  if (toggle && menu) {
    const sync = () => {
      const open = menu.classList.contains('active');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    };
    new MutationObserver(sync).observe(menu, { attributes: true, attributeFilter: ['class'] });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.classList.contains('active')) {
        menu.classList.remove('active');
        toggle.classList.remove('active');
        toggle.focus();
      }
    });
  }

  // 2. Links internos: mover el foco a la sección destino (teclado y
  //    lectores de pantalla) y saltar sin animación si el usuario lo pidió.
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const id = link.getAttribute('href');
    if (id.length < 2) return;
    const target = document.querySelector(id);
    if (!target) return;

    if (reduceMotion.matches) {
      e.preventDefault();
      e.stopImmediatePropagation(); // evita el scroll suave de script.js
      target.scrollIntoView({ behavior: 'auto' });
    }
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  }, true);

  // 3. Partículas decorativas: no se generan si hay reduced-motion
  if (reduceMotion.matches) {
    const particles = document.getElementById('particles');
    if (particles) particles.replaceChildren();
  }
})();
