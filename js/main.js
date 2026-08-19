/* =====================================================================
   T&A Construction Services — main.js
   Vanilla JS only. No libraries.
   ===================================================================== */
(function () {
  'use strict';

  var nav = document.querySelector('.nav');
  var hamburger = document.getElementById('hamburger');

  /* ---------- 1. Scroll-triggered nav shadow ---------- */
  function onScroll() {
    if (window.scrollY > 10) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- 2. Smooth scroll (CSS handles the behaviour) ---------- */
  // scroll-behavior: smooth is set in CSS. We only need to close the
  // mobile menu when a nav link is tapped so the target is not hidden.

  /* ---------- 3. Mobile hamburger menu ---------- */
  if (hamburger) {
    hamburger.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = nav.classList.toggle('menu-open');
      hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    // Close on link tap
    nav.querySelectorAll('.nav-links a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('menu-open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on outside tap
    document.addEventListener('click', function (e) {
      if (nav.classList.contains('menu-open') && !nav.contains(e.target)) {
        nav.classList.remove('menu-open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------- 4. Scroll-in animations (IntersectionObserver) ---------- */
  var animated = document.querySelectorAll('.animate');
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  animated.forEach(function (el) { observer.observe(el); });

  // Stagger service cards within each row (4 columns desktop)
  var serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach(function (card, index) {
    var delay = (index % 4) * 80;
    card.style.transitionDelay = delay + 'ms';
  });

  // Add stagger to step cards too
  var stepCards = document.querySelectorAll('.step-card');
  stepCards.forEach(function (card, index) {
    card.style.transitionDelay = (index * 120) + 'ms';
  });
})();
