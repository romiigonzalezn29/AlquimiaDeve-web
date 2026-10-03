/* ============================================================
   ALQUIMIADEV — Analytics
   ------------------------------------------------------------
   Los clics en botones (WhatsApp, Instagram, LinkedIn, TikTok,
   planes, CTAs, nav) se trackean automáticamente vía clases CSS
   en el HTML, con el formato:

       class="... plausible-event-name=click_whatsapp"

   Este archivo SOLO captura eventos que el CSS no puede:
   - scroll_depth   → hasta dónde scrolleó el usuario
   - time_on_page   → cuánto tiempo permaneció en la página
   - nav_click      → clics en links internos del nav
   ============================================================ */

(function initAnalytics() {
  if (typeof window.plausible !== 'function') return;

  // ------------------------------------------------------------
  // 1. SCROLL DEPTH (25%, 50%, 75%, 100%)
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
        window.plausible('scroll_depth', { props: { depth: t + '%' } });
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
  // 2. TIME ON PAGE (15s, 30s, 60s, 120s)
  // ------------------------------------------------------------
  const timeThresholds = [15, 30, 60, 120];

  timeThresholds.forEach((seconds) => {
    setTimeout(() => {
      window.plausible('time_on_page', { props: { seconds: seconds } });
    }, seconds * 1000);
  });


  // ------------------------------------------------------------
  // 3. NAV CLICK (links internos con #)
  //    Registra a qué sección navegó el usuario.
  // ------------------------------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', () => {
      const target = link.getAttribute('href').replace('#', '');
      if (!target) return;
      window.plausible('nav_click', { props: { target: target } });
    }, { passive: true });
  });

})();

