(() => {
  const mascot = document.getElementById('mascot');
  const nav = document.getElementById('navbar');
  const progressBar = document.getElementById('scrollProgress');
  const bttBtn = document.getElementById('bttBtn');

  if (!mascot || !nav || !progressBar || !bttBtn) return;

  const bubble = document.getElementById('mascotBubble');
  const bubbleText = document.getElementById('mascotText');
  const ctaBtn = document.getElementById('ctaBtn');
  const revealPanel = document.getElementById('revealPanel');
  const particleHost = document.getElementById('mascotParticles');
  const mascotDismiss = document.getElementById('mascotDismiss');
  const navLinks = nav.querySelectorAll('.navbar__link');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const scrollOpt = reduceMotion ? {} : { behavior: 'smooth' };
  let lastScrollY = 0;

  /* ---------- smart dialogue map ---------- */
  const D = {
    hero: [
      "Welcome to IT WIZ! ✨",
      "Ready for magic?",
      "Scroll to explore! 👇",
    ],
    services: [
      "Our digital toolkit! 💡",
      "Pick your superpower!",
      "Hover to explore! ⚡",
    ],
    work: [
      "Real projects, real impact! 🎯",
      "Flip for backstory! 🔄",
      "Built for real people! 💪",
    ],
    contact: [
      "Let's build something great! 🔮",
      "Tell us your project! 💬",
      "Start the conversation!",
    ],
    "card-web": [
      "Flawless web and mobile!",
      "Web or mobile — both! ✨",
    ],
    "card-ai": [
      "Smart AI automation!",
      "AI that works! ✨",
    ],
    "card-security": [
      "Rock-solid security!",
      "Locked down tight!",
    ],
    "card-custom": [
      "Built for your workflow!",
      "Fits like a glove!",
    ],
    "card-maitrisez": [
      "Voice exam evaluation!",
      "Real-time voice assessment!",
    ],
    "card-driving": [
      "Offline-first syncing!",
      "Built for teachers!",
    ],
    "card-dental": [
      "Clean, secure records!",
      "Automated clinic management!",
    ],
    idle: [
      "Need a hand?",
      "Try flipping a card!",
      "We build custom solutions!",
      "Hover over the cards!",
      "Ready to talk?",
      "Every project starts here.",
      "Explore away!",
    ],
    linger_hero: ["Scroll to see more! 👇"],
    linger_services: ["Hover a card! 👆"],
    linger_work: ["Flip a project card! 🔄"],
    linger_contact: ["Contact us anytime! 📬"],
  };

  /* ---------- pick random message, no consecutive repeats ---------- */
  const lastMsg = {};
  function pickMessage(key) {
    const msgs = D[key];
    if (!msgs || msgs.length === 0) return null;
    let idx;
    do { idx = Math.floor(Math.random() * msgs.length); }
    while (msgs.length > 1 && idx === lastMsg[key]);
    lastMsg[key] = idx;
    return msgs[idx];
  }

  /* ---------- idle & linger timers ---------- */
  let idleTimer, lingerTimer, currentSectionId = '';
  function resetIdle() {
    clearTimeout(idleTimer);
    if (presenting) return;
    idleTimer = setTimeout(() => {
      if (!hoverText && !presenting) setBubble(pickMessage('idle'), true);
    }, 6000);
  }
  function setLingerTimer(id) {
    clearTimeout(lingerTimer);
    currentSectionId = id;
    lingerTimer = setTimeout(() => {
      if (!hoverText && !presenting && currentSectionId === id) {
        const m = pickMessage('linger_' + id);
        if (m) setBubble(m, true);
      }
    }, 4000);
  }

  let presenting = false;
  let currentSectionText = '';
  let hoverText = null;
  let ticking = false;
  let typeTimer = null;
  let mascotW = mascot.offsetWidth;
  let docH = document.documentElement.scrollHeight - window.innerHeight;

  /* show initial greeting */
  currentSectionText = pickMessage('hero');
  if (currentSectionText) setBubble(currentSectionText, true);

  /* ---------- helpers ---------- */
  const smoothstep = (t) => t * t * (3 - 2 * t);

  function setBubble(text, visible) {
    if (!text || !bubble || !bubbleText) return;
    if (text === (typeTimer ? setBubble._last : null) && visible === bubble.classList.contains('is-visible')) return;
    clearInterval(typeTimer);
    setBubble._last = text;
    bubbleText.textContent = '';
    bubble.classList.toggle('is-visible', visible);
    if (mascotDismiss) mascotDismiss.classList.remove('is-ready');
    let i = 0;
    typeTimer = setInterval(() => {
      bubbleText.textContent += text[i++];
      if (i >= text.length) {
        clearInterval(typeTimer);
        typeTimer = null;
        if (mascotDismiss && mascot.classList.contains('is-presenting')) {
          mascotDismiss.classList.add('is-ready');
        }
      }
    }, 28);
  }

  function refreshBubble() {
    setBubble(hoverText || currentSectionText, true);
  }

  let resizeTimer;
  function onResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      mascotW = mascot.offsetWidth;
      docH = document.documentElement.scrollHeight - window.innerHeight;
      if (!ticking) { ticking = true; requestAnimationFrame(updateAll); }
    }, 100);
  }

  /* ---------- unified scroll handler ---------- */
  function onScroll() {
    if (!ticking) { ticking = true; requestAnimationFrame(updateAll); }
  }

  function updateAll() {
    ticking = false;
    if (presenting || mascot.classList.contains('is-dismissed')) return;

    const vh = window.innerHeight;
    const vw = window.innerWidth;
    const scrollY = window.scrollY;
    const hero = document.getElementById('hero');
    const heroH = hero ? hero.offsetHeight : vh;
    const progress = Math.min(Math.max(scrollY / heroH, 0), 1);
    const isSmall = vw <= 900;
    const dockX = isSmall ? vw - mascotW - 24 : vw - 450;
    const dockY = isSmall ? vh - Math.max(120, vh * 0.2) : vh - 240;
    const dockScale = isSmall ? 0.58 : 0.62;

    const showNav = scrollY > 100;
    const scrollingUp = scrollY < lastScrollY;
    const showBtt = scrollingUp && scrollY > vh;
    lastScrollY = scrollY;
    const mascotProgress = progress >= 1;
    let mTransform, mOpacity, currentScale;

    if (mascotProgress) {
      mascot.classList.add('is-docked');
      mTransform = `translate3d(${dockX}px, ${dockY}px, 0) scale(${dockScale})`;
      mOpacity = 1;
      currentScale = dockScale;
    } else {
      mascot.classList.remove('is-docked');
      const heroRight = document.querySelector('.hero__right');
      let startX = vw - mascotW - 40;
      let startY = vh * 0.3;
      if (heroRight) {
        const rect = heroRight.getBoundingClientRect();
        startX = rect.left + rect.width / 2 - mascotW / 2;
        startY = rect.top + rect.height / 2 - mascot.offsetHeight / 2;
      }
      const ease = smoothstep(progress);
      currentScale = 1 + (dockScale - 1) * ease;
      mTransform = `translate3d(${startX + (dockX - startX) * ease}px, ${startY + (dockY - startY) * ease}px, 0) scale(${currentScale})`;
      mOpacity = Math.min(progress / 0.1, 1);
    }

    mascot.style.transform = mTransform;
    mascot.style.opacity = mOpacity;
    window.__mascotScale = currentScale;
    nav.classList.toggle('is-hidden', !showNav);
    progressBar.style.transform = 'scaleX(' + Math.min(scrollY / docH, 1) + ')';
    bttBtn.classList.toggle('is-visible', showBtt);
  }

  window.addEventListener('scroll', () => { onScroll(); resetIdle(); }, { passive: true });
  window.addEventListener('resize', onResize);
  updateAll();

  /* ---------- nav click ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinksList = document.querySelector('.navbar__links');
  if (navToggle && navLinksList) {
    navToggle.addEventListener('click', () => {
      const open = navLinksList.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      if (navLinksList) navLinksList.classList.remove('is-open');
      if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
      const id = link.getAttribute('href').slice(1);
      document.getElementById(id)?.scrollIntoView(scrollOpt);
    });
  });

  /* ---------- back to top ---------- */
  bttBtn.addEventListener('click', () => {
    window.scrollTo(Object.assign({ top: 0 }, scrollOpt));
  });

  /* ---------- hero word split ---------- */
  if (!reduceMotion) {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
      let wordIdx = 0;
      const childNodes = Array.from(heroTitle.childNodes);
      heroTitle.innerHTML = '';
      const walkNodes = (nodes, parent) => {
        nodes.forEach((node) => {
          if (node.nodeType === 3) {
            node.textContent.split(/(\s+)/).forEach((part) => {
              if (part.trim()) {
                const span = document.createElement('span');
                span.className = 'hero-title__word';
                span.textContent = part;
                span.style.animationDelay = `${wordIdx++ * 0.1}s`;
                parent.appendChild(span);
              } else if (part) {
                parent.appendChild(document.createTextNode(part));
              }
            });
          } else if (node.nodeName === 'BR') {
            parent.appendChild(document.createElement('br'));
          }
        });
      };
      walkNodes(childNodes, heroTitle);
    }
  }

  /* ---------- section-aware default speech ---------- */
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.45) {
          const id = entry.target.id;
          if (id !== currentSectionId) {
            currentSectionId = id;
            const m = pickMessage(id);
            if (m) currentSectionText = m;
            setLingerTimer(id);
          }
          if (!hoverText && !presenting) refreshBubble();
        }
      });
    },
    { threshold: [0.2, 0.45] }
  );
  document.querySelectorAll('.page[id]').forEach((s) => sectionObserver.observe(s));

  /* ---------- active nav link ---------- */
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          nav.dataset.currentSection = entry.target.id;
          navLinks.forEach((link) => {
            link.classList.toggle('is-active', link.dataset.section === entry.target.id);
          });
        }
      });
    },
    { threshold: 0, rootMargin: '-40% 0% -50% 0%' }
  );
  document.querySelectorAll('.page[id]').forEach((s) => navObserver.observe(s));

  /* ---------- stagger contact reveal links ---------- */
  document.querySelectorAll('.reveal-link').forEach((el, i) => {
    el.style.transitionDelay = `${0.15 + i * 0.08}s`;
  });

  /* ---------- hover overrides ---------- */
  document.querySelectorAll('[data-card]').forEach((el) => {
    el.addEventListener('mouseenter', () => {
      if (presenting) return;
      hoverText = pickMessage('card-' + el.dataset.card) || hoverText;
      refreshBubble();
      resetIdle();
    });
    el.addEventListener('mouseleave', () => {
      if (presenting) return;
      hoverText = null;
      refreshBubble();
    });
  });

  /* ---------- reveal-on-scroll (staggered) ---------- */
  const revealTargets = document.querySelectorAll('.section-head, .card, .project');
  revealTargets.forEach((el, i) => {
    el.classList.add('reveal-item');
    el.style.transitionDelay = `${i * 0.08}s`;
  });
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealTargets.forEach((el) => revealObserver.observe(el));

  /* ---------- particle burst ---------- */
  function burstParticles() {
    if (reduceMotion || !particleHost) return;
    for (let i = 16; i--;) {
      const p = document.createElement('span');
      p.className = 'particle';
      const angle = Math.random() * Math.PI * 2;
      const dist = 40 + Math.random() * 70;
      p.style.setProperty('--pEnd', `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist - 20}px)`);
      p.style.left = '48%';
      p.style.top = '30%';
      p.style.animationDelay = `${Math.random() * 200}ms`;
      particleHost.appendChild(p);
      setTimeout(() => p.remove(), 1300);
    }
  }

  /* ---------- contact finale ---------- */
  if (ctaBtn && revealPanel && bubble && bubbleText) {
    ctaBtn.addEventListener('click', () => {
      if (presenting) return;
      presenting = true;
      hoverText = null;
      clearTimeout(idleTimer);
      clearTimeout(lingerTimer);

      ctaBtn.classList.add('loading');
      ctaBtn.style.position = 'relative';

      setTimeout(() => {
        nav.classList.add('is-hidden');
        bttBtn.classList.remove('is-visible');
        ctaBtn.classList.add('is-hidden');

        const t = getComputedStyle(mascot).transform;
        mascot.classList.remove('is-docked');
        mascot.style.transform = t;
        mascot.classList.add('is-presenting');
        bubble.classList.remove('is-visible');
        requestAnimationFrame(() => { mascot.style.transform = ''; });

        setTimeout(() => {
          revealPanel.classList.add('is-visible');
          revealPanel.setAttribute('aria-hidden', 'false');
          docH = document.documentElement.scrollHeight - window.innerHeight;
          setBubble(pickMessage('contact'), true);
          burstParticles();
          setTimeout(burstParticles, 350);
        }, 900);
      }, 600);
    });
  }



  if (mascotDismiss) {
    mascotDismiss.addEventListener('click', function () {
      clearTimeout(idleTimer);
      clearTimeout(lingerTimer);
      mascotDismiss.classList.remove('is-ready');
      setBubble._last = null;
      var goodbye = (function () {
        var g = {
          en: "Goodbye! It was magical! \u2728",
          fr: "Au revoir ! C'\u00e9tait magique ! \u2728",
          ar: "\u0645\u0639 \u0627\u0644\u0633\u0644\u0627\u0645\u0629! \u0643\u0627\u0646 \u0633\u0627\u062d\u0631\u064b\u0627! \u2728"
        };
        return g[window.__lang] || g.en;
      })();
      setBubble(goodbye, true);
      var goodbyeLen = goodbye.length * 28 + 200;
      setTimeout(function () {
        bubble.classList.remove('is-visible');
        presenting = false;
        mascot.style.transform = '';
        mascot.style.opacity = '';
        mascot.classList.remove('is-presenting');
        mascot.classList.add('is-dismissed');
        setTimeout(function () {
          mascot.style.display = 'none';
        }, 2500);
      }, goodbyeLen);
    });
  }

  /* ---------- binary background overlay ---------- */
  function initBinaryOverlay() {
    const container = document.createElement('div');
    container.id = 'binaryOverlay';
    const density = 30;
    const cols = Math.ceil(window.innerWidth / density) + 2;
    const rows = Math.ceil(window.innerHeight / density) + 2;
    const frag = document.createDocumentFragment();
    const chars = ['1','0'];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const span = document.createElement('span');
        span.textContent = chars[Math.random() < 0.5 ? 0 : 1];
        const left = c * density + (Math.random() - 0.5) * density * 0.5;
        const top = r * density + (Math.random() - 0.5) * density * 0.5;
        span.style.left = left + 'px';
        span.style.top = top + 'px';
        span.style.fontSize = (8 + Math.random() * 4) + 'px';
        const alpha = 0.2 + Math.random() * 0.25;
        span.style.color = Math.random() < 0.5
          ? `hsla(0, 100%, 62%, ${alpha})`
          : `hsla(135, 100%, 62%, ${alpha})`;
        if (Math.random() < 0.06) {
          span.classList.add('is-sparkle');
          span.style.setProperty('--dur', (1.5 + Math.random() * 3) + 's');
        }
        frag.appendChild(span);
      }
    }
    container.appendChild(frag);
    document.body.appendChild(container);
  }
  initBinaryOverlay();

  /* ---------- i18n language change ---------- */
  function rebuildDialogue() {
    var t = window.__i18n && window.__i18n.t;
    if (!t) return;
    var keys = ['hero','services','work','contact','card-web','card-ai','card-security','card-custom','card-maitrisez','card-driving','card-dental','idle','linger_hero','linger_services','linger_work','linger_contact'];
    keys.forEach(function (k) {
      var val = t('dialogue.' + k);
      if (val) D[k] = val;
    });
  }

  function reSplitHeroTitle() {
    if (reduceMotion) return;
    var el = document.querySelector('.hero-title');
    if (!el) return;
    var childNodes = Array.from(el.childNodes);
    el.innerHTML = '';
    var wordIdx = 0;
    childNodes.forEach(function (node) {
      if (node.nodeType === 3) {
        node.textContent.split(/(\s+)/).forEach(function (part) {
          if (part.trim()) {
            var span = document.createElement('span');
            span.className = 'hero-title__word';
            span.textContent = part;
            span.style.animationDelay = wordIdx++ * 0.1 + 's';
            el.appendChild(span);
          } else if (part) {
            el.appendChild(document.createTextNode(part));
          }
        });
      } else if (node.nodeName === 'BR') {
        el.appendChild(document.createElement('br'));
      }
    });
  }

  window.addEventListener('languagechange', function () {
    rebuildDialogue();
    reSplitHeroTitle();
    setBubble._last = null;
    Object.keys(lastMsg).forEach(function (k) { delete lastMsg[k]; });
    currentSectionText = pickMessage(currentSectionId || 'hero');
    setBubble(currentSectionText, true);
    resetIdle();
  });

  if (window.__i18n) window.__i18n.initLang();

  var binaryResizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(binaryResizeTimer);
    binaryResizeTimer = setTimeout(function() {
      const existing = document.getElementById('binaryOverlay');
      if (existing) existing.remove();
      initBinaryOverlay();
    }, 300);
  });

  document.querySelectorAll('.card').forEach(function(card) {
    card.addEventListener('click', function() {
      var wasOpen = card.classList.contains('is-open');
      document.querySelectorAll('.card.is-open').forEach(function(other) {
        other.classList.remove('is-open');
        other.setAttribute('aria-expanded', 'false');
      });
      if (!wasOpen) {
        card.classList.add('is-open');
        card.setAttribute('aria-expanded', 'true');
      }
    });
  });

  document.querySelectorAll('.card__img-full').forEach(function(img) {
    function reveal() {
      setTimeout(function() { img.classList.add('loaded'); }, 3000);
    }
    if (img.complete && img.naturalWidth > 0) {
      reveal();
    } else {
      img.addEventListener('load', reveal);
    }
  });
})();