/* ============================================================
   ALQUIMIADEV — Interacciones del portfolio
   ============================================================ */

// Detectar preferencia de movimiento reducido
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;


// ============================================================
// 1. MENÚ HAMBURGUESA (mobile)
// ============================================================
(function initNav() {
  const navToggle = document.getElementById('navToggle');
  const navMobile = document.getElementById('navMobile');

  if (!navToggle || !navMobile) return;

  // Abrir/cerrar al hacer clic en el botón
  navToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = navMobile.classList.toggle('active');
    navToggle.classList.toggle('active');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Cerrar al hacer clic en un link
  navMobile.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navMobile.classList.remove('active');
      navToggle.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Cerrar al hacer clic fuera
  document.addEventListener('click', (e) => {
    if (
      navMobile.classList.contains('active') &&
      !navMobile.contains(e.target) &&
      !navToggle.contains(e.target)
    ) {
      navMobile.classList.remove('active');
      navToggle.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Cerrar al hacer scroll
  window.addEventListener('scroll', () => {
    if (navMobile.classList.contains('active') && window.scrollY > 100) {
      navMobile.classList.remove('active');
      navToggle.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  }, { passive: true });
})();


// ============================================================
// 2. PARTÍCULAS DORADAS (solo si no hay reduced-motion)
// ============================================================
(function initParticles() {
  if (prefersReducedMotion) return;

  const container = document.getElementById('particles');
  if (!container) return;

  const count = 35;
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    const size = Math.random() * 4 + 2;

    p.style.width = size + 'px';
    p.style.height = size + 'px';
    p.style.left = Math.random() * 100 + '%';
    p.style.top = Math.random() * 100 + '%';
    p.style.animationDelay = Math.random() * 6 + 's';
    p.style.animationDuration = 4 + Math.random() * 4 + 's';
    p.style.opacity = 0.2 + Math.random() * 0.5;

    fragment.appendChild(p);
  }

  container.appendChild(fragment);
})();


// ============================================================
// 3. SCROLL REVEAL (con fallback si no hay IntersectionObserver
//    o si el usuario prefiere reduced-motion)
// ============================================================
(function initScrollReveal() {
  const SELECTORS = [
    '.section-header',
    '.service-card',
    '.plan',
    '.web-feature',
    '.decision-card',
    '.sobre-mi-text',
    '.sobre-mi-stats'
  ].join(', ');

  const elements = document.querySelectorAll(SELECTORS);
  if (!elements.length) return;

  // Si no hay IO o el usuario prefiere reduced-motion, mostrar todo sin animación
  if (!('IntersectionObserver' in window) || prefersReducedMotion) {
    elements.forEach((el) => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -60px 0px',
    }
  );

  elements.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    observer.observe(el);
  });

  // Stagger (retraso escalonado)
  const staggerGroups = ['.service-card', '.plan', '.web-feature', '.decision-card'];
  staggerGroups.forEach((selector) => {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.style.transitionDelay = i * 0.1 + 's';
    });
  });
})();


// ============================================================
// 4. NAV — Cambio de clase al hacer scroll (no inline styles)
// ============================================================
(function initNavScroll() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  let ticking = false;

  function updateNav() {
    nav.classList.toggle('nav--scrolled', window.scrollY > 50);
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateNav);
      ticking = true;
    }
  }, { passive: true });

  // Estado inicial
  updateNav();
})();


// ============================================================
// 5. SMOOTH SCROLL — eliminado
//    El CSS ya maneja scroll-behavior: smooth y respeta
//    prefers-reduced-motion automáticamente.
// ============================================================


// ============================================================
// 6. TEMA CLARO / OSCURO
// ============================================================
(function initThemeToggle() {
  const toggle = document.getElementById('themeToggle');
  const html = document.documentElement;

  if (!toggle) return;

  const currentTheme = html.getAttribute('data-theme') || 'dark';
  toggle.setAttribute('aria-pressed', currentTheme === 'light' ? 'true' : 'false');

  toggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme') || 'dark';
    const next = current === 'light' ? 'dark' : 'light';

    html.setAttribute('data-theme', next);
    toggle.setAttribute('aria-pressed', next === 'light' ? 'true' : 'false');

    try {
      localStorage.setItem('theme', next);
    } catch (e) {
      // localStorage bloqueado — no hacemos nada
    }
  });

  // Preferencia del sistema (solo si el usuario no eligió manualmente)
  if (window.matchMedia) {
    const mq = window.matchMedia('(prefers-color-scheme: light)');
    const handler = (e) => {
      let stored = null;
      try { stored = localStorage.getItem('theme'); } catch (_) {}
      if (!stored) {
        const next = e.matches ? 'light' : 'dark';
        html.setAttribute('data-theme', next);
        toggle.setAttribute('aria-pressed', next === 'light' ? 'true' : 'false');
      }
    };

    // Fallback para Safari viejo
    if (typeof mq.addEventListener === 'function') {
      mq.addEventListener('change', handler);
    } else if (typeof mq.addListener === 'function') {
      mq.addListener(handler);
    }
  }
})();