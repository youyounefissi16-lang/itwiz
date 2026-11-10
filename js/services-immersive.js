/* ============================================================
   ITWIZ immersive services — fullscreen service experience.
   Progressive enhancement: without this file the cards still
   render, they just don't open the fullscreen view.
   Content comes from js/i18n.js (window.__i18n) so EN/FR/AR
   stay in one place; the open view re-renders on languagechange.
   ============================================================ */
(function () {
  'use strict';

  var grid = document.getElementById('servicesGrid');
  var experience = document.getElementById('serviceExperience');
  var closeButton = document.getElementById('experienceClose');
  var title = document.getElementById('experienceTitle');
  var kicker = document.getElementById('experienceKicker');
  var description = document.getElementById('experienceDescription');
  var examples = document.getElementById('experienceExamples');
  var technologies = document.getElementById('experienceTechnologies');
  var cta = document.getElementById('experienceCTA');

  if (!grid || !experience || !closeButton || !title || !kicker ||
      !description || !examples || !technologies) {
    if (typeof console !== 'undefined' && console.warn) {
      console.warn('ITWIZ immersive services: required elements are missing.');
    }
    return;
  }

  /* Service order matches the cards in index.html. All wording lives in i18n. */
  var services = {
    web:      { number: '01' },
    ai:       { number: '02' },
    data:     { number: '03' },
    custom:   { number: '04' }
  };

  var activeKey = null;
  var lastFocusedElement = null;

  function t(key) {
    return window.__i18n ? window.__i18n.t(key) : undefined;
  }

  /* i18n lists are stored as "a · b · c" so they also work with data-i18n */
  function splitList(value) {
    return String(value || '')
      .split('·')
      .map(function (part) { return part.trim(); })
      .filter(Boolean);
  }

  function text(key, fallback) {
    var value = t(key);
    return value === undefined || value === null || value === '' ? fallback : value;
  }

  function cardFor(key) {
    return grid.querySelector('[data-service="' + key + '"]');
  }

  function fillList(container, items, className) {
    container.textContent = '';
    items.forEach(function (item) {
      var el = document.createElement('li');
      if (className) el.className = className;
      el.textContent = item;
      container.appendChild(el);
    });
  }

  function render(key) {
    var service = services[key];
    if (!service) return;

    var card = cardFor(key);

    kicker.textContent = text('services.dialog.kicker', 'ITWIZ / SERVICE') + ' ' + service.number;
    title.textContent = text(
      'services.' + key + '.title',
      card && card.querySelector('.service-title') ? card.querySelector('.service-title').textContent : ''
    );
    description.textContent = text(
      'services.' + key + '.extra',
      card && card.querySelector('.service-subtitle') ? card.querySelector('.service-subtitle').textContent : ''
    );

    fillList(examples, splitList(t('services.' + key + '.examples')));
    fillList(technologies, splitList(t('services.' + key + '.tech')), 'technology-pill');
  }

  function openExperience(key, trigger) {
    if (!services[key]) {
      if (typeof console !== 'undefined' && console.warn) {
        console.warn('ITWIZ immersive services: unknown service "' + key + '".');
      }
      return;
    }

    activeKey = key;
    lastFocusedElement = trigger || null;
    render(key);

    experience.classList.add('is-open');
    experience.setAttribute('aria-hidden', 'false');
    document.body.classList.add('service-experience-open');

    if (trigger && trigger.setAttribute) trigger.setAttribute('aria-expanded', 'true');
    closeButton.focus();
  }

  function closeExperience() {
    experience.classList.remove('is-open');
    experience.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('service-experience-open');

    grid.querySelectorAll('[data-service][aria-expanded="true"]').forEach(function (el) {
      el.setAttribute('aria-expanded', 'false');
    });

    activeKey = null;

    if (lastFocusedElement && document.contains(lastFocusedElement)) {
      lastFocusedElement.focus();
    }
    lastFocusedElement = null;
  }

  function isOpen() {
    return experience.classList.contains('is-open');
  }

  grid.addEventListener('click', function (event) {
    var card = event.target.closest('[data-service]');
    if (!card || !grid.contains(card)) return;
    openExperience(card.getAttribute('data-service'), card);
  });

  grid.addEventListener('keydown', function (event) {
    var card = event.target.closest('[data-service]');
    if (!card || card !== event.target) return;
    if (event.key === 'Enter' || event.key === ' ' || event.key === 'Spacebar') {
      event.preventDefault();
      openExperience(card.getAttribute('data-service'), card);
    }
  });

  closeButton.addEventListener('click', closeExperience);

  /* CTA jumps to the contact section, so drop the lock first. */
  if (cta) cta.addEventListener('click', closeExperience);

  document.addEventListener('keydown', function (event) {
    if (!isOpen()) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      closeExperience();
      return;
    }

    if (event.key !== 'Tab') return;

    /* Keep keyboard focus inside the open experience. */
    var focusable = experience.querySelectorAll(
      'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
    );
    if (!focusable.length) return;

    var first = focusable[0];
    var last = focusable[focusable.length - 1];

    if (event.shiftKey && (document.activeElement === first || !experience.contains(document.activeElement))) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && (document.activeElement === last || !experience.contains(document.activeElement))) {
      event.preventDefault();
      first.focus();
    }
  });

  /* Re-translate the open view when the visitor switches language. */
  window.addEventListener('languagechange', function () {
    if (isOpen() && activeKey) render(activeKey);
  });

  /* Subtle pointer glow on desktop pointers only. */
  if (window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    Array.prototype.forEach.call(grid.querySelectorAll('.service-card'), function (card) {
      card.addEventListener('pointermove', function (event) {
        var rect = card.getBoundingClientRect();
        var x = ((event.clientX - rect.left) / rect.width) * 100;
        var y = ((event.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--pointer-x', x.toFixed(1) + '%');
        card.style.setProperty('--pointer-y', y.toFixed(1) + '%');
      });
    });
  }
})();
