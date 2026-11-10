(() => {
  const mascot = document.getElementById('mascot');
  const nav = document.getElementById('navbar');
  const progressBar = document.getElementById('scrollProgress');
  const bttBtn = document.getElementById('bttBtn');

  if (!mascot || !nav || !progressBar || !bttBtn) return;

  const bubble = document.getElementById('mascotBubble');
  const bubbleText = document.getElementById('mascotText');
  const briefForm = document.getElementById('briefForm');
  const briefSuccess = document.getElementById('briefSuccess');
  const briefSubmit = document.getElementById('briefSubmit');
  const particleHost = document.getElementById('mascotParticles');
  const mascotDismiss = document.getElementById('mascotDismiss');
  const navLinks = nav.querySelectorAll('.navbar__link');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const scrollOpt = reduceMotion ? {} : { behavior: 'smooth' };
  let lastScrollY = 0;

  /* ---------- smart dialogue map ---------- */
  const D = {
    hero: [
      "Welcome to ITWIZ ✨",
      "Code magic, delivered.",
      "Scroll to see what's been conjured.",
    ],
    services: [
      "Four ways we turn code into magic.",
      "Pick your superpower!",
      "Hover to peek inside.",
    ],
    work: [
      "Three builds, from brief to launch.",
      "Keep scrolling — the pages turn themselves.",
      "Every one of these started as a brief.",
    ],
    method: [
      "From brief to launch, in four moves.",
      "Discover. Design. Build. Launch.",
    ],
    contact: [
      "Tell us what you're building.",
      "Every build starts as a brief. Yours next?",
      "Start the conversation!",
    ],
    about: [
      "Independent. Direct. Close to the code.",
      "No account managers. No handoffs.",
    ],
    "card-web": [
      "Sites that turn visitors into customers.",
      "Fast on every device.",
    ],
    "card-ai": [
      "Busywork, finished in seconds.",
      "Systems that learn from your data.",
    ],
    "card-data": [
      "Numbers that answer questions.",
      "Dashboards built on your data.",
    ],
    "card-custom": [
      "Built around your workflow.",
      "Fitted to clinics, schools, and teams.",
    ],
    "card-maitrisez": [
      "Oral exams, scored to criteria.",
      "QCM, mock exams, and a PDF library.",
    ],
    "card-driving": [
      "Offline-first. Local-network sync.",
      "Built for instructors, not dashboards.",
    ],
    "card-dental": [
      "Records that stay tidy.",
      "Scheduling and billing, handled.",
    ],
    idle: [
      "Need a hand?",
      "Hover a card. It flips.",
      "Scroll — the notebook does the rest.",
      "Three projects. All shipped.",
      "Every build starts like this: a brief.",
      "Say the word, and we start.",
    ],
    linger_hero: ["Scroll to see more! 👇"],
    linger_services: ["Hover to peek inside"],
    linger_work: ["Keep scrolling — pages turn themselves"],
    linger_method: ["Discover → design → build → launch"],
    linger_about: ["The engineer who scopes it builds it"],
    linger_contact: ["Ready when you are ✉"],
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
  let idleCount = 0;
  function resetIdle() {
    clearTimeout(idleTimer);
    if (presenting) return;
    idleTimer = setTimeout(() => {
      if (!hoverText && !presenting && idleCount < 3) {
        idleCount++;
        setBubble(pickMessage('idle'), true);
      }
    }, 12000);
  }
  function setLingerTimer(id) {
    clearTimeout(lingerTimer);
    idleCount = 0;
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
  /* linear: scale tracks scroll position immediately (no ease-in lag) */

  function setBubble(text, visible) {
    if (!text || !bubble || !bubbleText) return;
    if (text === setBubble._last && visible === bubble.classList.contains('is-visible')) return;
    clearInterval(typeTimer);
    typeTimer = null;
    setBubble._last = text;
    bubbleText.textContent = text;
    bubble.classList.toggle('is-visible', visible);
    if (mascotDismiss && mascot.classList.contains('is-presenting')) {
      mascotDismiss.classList.add('is-ready');
    }
  }

  function refreshBubble() {
    setBubble(hoverText || currentSectionText, true);
  }

  let resizeTimer;
  /* Layout values are measured once and re-measured on resize/load,
     never inside the per-frame scroll handler. */
  let heroEl = document.getElementById('hero');
  /* The mascot's home is the hero's visual stage — the portal is gone, so
     it now lives at the center of #hero where the 3D centerpiece sits. */
  let realmStageEl = document.getElementById('hero');
  let heroH = 0;
  let mascotH = 0;
  let realmStageDoc = null;

  /* ---------- screenshot hotspot ----------
     The turned page backs carry their own rotateX(180deg) and Chrome
     paints them while dropping them from hit-testing, so no link
     inside a page back can ever be clicked. A single flat button in
     the sticky container therefore overlays the landed page's photo:
     it is repositioned only when the active page changes. Progress
     comes straight from StringTune's own published --progress
     (reconstructing it from scroll geometry drifted off by one
     page); thresholds mirror the CSS turn windows (each page's
     window start + 0.11). */
  const shotHotspot = document.getElementById('shotHotspot');
  const stickyEl = document.querySelector('.work__sticky');
  const workTrack = document.querySelector('.work__track');
  const shotFrom = [0.16, 0.29, 0.42, 0.55, 0.68, 0.81];
  /* Page N's back shows project N+1's screenshot (it pairs with the
     facing title), so each entry is that screenshot's title key. */
  const shotTitleKeys = [
    'work.maitrisez.title', 'work.driving.title', 'work.dental.title',
    'work.checklist.title', 'work.hub.title', 'work.inventory.title',
  ];
  const shotPages = Array.from(document.querySelectorAll(
    '.book__page--welcome, .book__page--1, .book__page--2, .book__page--3, .book__page--4, .book__page--5'
  ));
  let activeShot = -1;
  function shotTitleText() {
    const tr = window.__i18n && window.__i18n.t;
    const key = shotTitleKeys[activeShot];
    return key && tr ? tr(key) : '';
  }
  function shotLabel() {
    const tr = window.__i18n && window.__i18n.t;
    const enlarge = tr ? tr('work.shot_enlarge') : 'View screenshot full size';
    const title = shotTitleText();
    return title ? enlarge + ': ' + title : enlarge;
  }
  /* force=true re-measures even when the active page is unchanged
     (resize / layout shift) */
  function syncShotHotspot(force) {
    if (!workTrack || !shotHotspot) return;
    /* progress comes straight from StringTune's own --progress —
       reconstructing it from scroll geometry drifted off by one page */
    const p = parseFloat(workTrack.style.getPropertyValue('--progress')) || 0;
    let next = -1;
    for (let i = shotFrom.length - 1; i >= 0; i--) {
      if (p >= shotFrom[i]) { next = i; break; }
    }
    if (next === activeShot && !force) return;
    activeShot = next;
    if (next < 0 || !shotPages[next] || !stickyEl) {
      shotHotspot.hidden = true;
      shotHotspot.tabIndex = -1;
      return;
    }
    const img = shotPages[next].querySelector('.book__page-back img');
    if (!img || !img.getBoundingClientRect().width) {
      /* reduced-motion stacked layout: page backs are display:none */
      shotHotspot.hidden = true;
      shotHotspot.tabIndex = -1;
      return;
    }
    const r = img.getBoundingClientRect();
    const s = stickyEl.getBoundingClientRect();
    shotHotspot.style.left = Math.round(r.left - s.left) + 'px';
    shotHotspot.style.top = Math.round(r.top - s.top) + 'px';
    shotHotspot.style.width = Math.round(r.width) + 'px';
    shotHotspot.style.height = Math.round(r.height) + 'px';
    shotHotspot.dataset.src = img.getAttribute('src');
    shotHotspot.dataset.title = shotTitleText();
    shotHotspot.setAttribute('aria-label', shotLabel());
    shotHotspot.hidden = false;
    shotHotspot.tabIndex = 0;
  }

  function measureLayout() {
    heroEl = heroEl || document.getElementById('hero');
    realmStageEl = realmStageEl || document.getElementById('hero');
    mascotW = mascot.offsetWidth;
    mascotH = mascot.offsetHeight;
    heroH = heroEl ? heroEl.offsetHeight : window.innerHeight;
    docH = document.documentElement.scrollHeight - window.innerHeight;
    syncShotHotspot(true);
    if (realmStageEl) {
      const rect = realmStageEl.getBoundingClientRect();
      /* Store document-space coords; viewport coords are derived per frame
         from scrollY without touching the layout again. */
      realmStageDoc = rect.width > 0 ? {
        left: rect.left,
        width: rect.width,
        top: rect.top + window.scrollY,
        height: rect.height,
      } : null;
    } else {
      realmStageDoc = null;
    }
  }

  function onResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      measureLayout();
      if (!ticking) { ticking = true; requestAnimationFrame(updateAll); }
    }, 100);
  }

  /* ---------- unified scroll handler ---------- */
  function onScroll() {
    if (!ticking) { ticking = true; requestAnimationFrame(updateAll); }
  }

  function updateAll() {
    ticking = false;
    /* Runs before the mascot early-return so dismissing the mascot
       never freezes photo-link tab order. */
    syncShotHotspot();
    if (presenting || mascot.classList.contains('is-dismissed')) return;

    const vh = window.innerHeight;
    const vw = window.innerWidth;
    const scrollY = window.scrollY;
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

    /* Only mutate the DOM when a class/transform actually flips: writing
       classList / style every frame forces a style recalc on the mascot,
       which is the single biggest scroll-frame cost (see CPU profile). */
    if (mascotProgress) {
      if (!mascot.classList.contains('is-docked')) mascot.classList.add('is-docked');
      mTransform = `translate3d(${dockX}px, ${dockY}px, 0) scale(${dockScale})`;
      mOpacity = 1;
      currentScale = dockScale;
    } else {
      if (mascot.classList.contains('is-docked')) mascot.classList.remove('is-docked');
      let startX = vw - mascotW - 40;
      let startY = vh * 0.3;
      if (realmStageDoc) {
        startX = realmStageDoc.left + realmStageDoc.width / 2 - mascotW / 2;
        startY = (realmStageDoc.top - scrollY) + realmStageDoc.height / 2 - mascotH / 2;
      }
      const ease = progress;
      currentScale = 1 + (dockScale - 1) * ease;
      mTransform = `translate3d(${startX + (dockX - startX) * ease}px, ${startY + (dockY - startY) * ease}px, 0) scale(${currentScale})`;
      mOpacity = Math.min(progress / 0.1, 1);
    }

    /* Round to whole pixels: identical to the eye, but the style value stops
       churning on sub-pixel scroll deltas (fewer recalcs per gesture). */
    if (mTransform !== mascot._lastTransform) {
      mascot.style.transform = mTransform;
      mascot._lastTransform = mTransform;
    }
    const mOpacityR = Math.round(mOpacity * 100) / 100;
    if (mOpacityR !== mascot._lastOpacity) {
      mascot.style.opacity = mOpacityR;
      mascot._lastOpacity = mOpacityR;
    }
    if (currentScale !== window.__mascotScale) window.__mascotScale = currentScale;
    if (showNav !== nav._lastHidden) {
      nav._lastHidden = showNav;
      nav.classList.toggle('is-hidden', !showNav);
    }
    const pbScale = Math.round(Math.min(scrollY / docH, 1) * 1000) / 1000;
    if (pbScale !== progressBar._lastScale) {
      progressBar._lastScale = pbScale;
      progressBar.style.transform = 'scaleX(' + pbScale + ')';
    }
    if (showBtt !== bttBtn._lastShown) {
      bttBtn._lastShown = showBtt;
      bttBtn.classList.toggle('is-visible', showBtt);
    }
  }

  window.addEventListener('scroll', () => { onScroll(); resetIdle(); }, { passive: true });
  window.addEventListener('resize', onResize);
  measureLayout();
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(measureLayout).catch(function () {});
  }
  window.addEventListener('load', measureLayout);
  updateAll();

  /* ---------- screenshot viewer ---------- */
  const shotDialog = document.getElementById('shotDialog');
  const shotImg = document.getElementById('shotDialogImg');
  const shotTitle = document.getElementById('shotDialogTitle');
  if (shotHotspot && shotDialog && shotImg && shotTitle) {
    shotHotspot.addEventListener('click', () => {
      if (typeof shotDialog.showModal !== 'function' || !shotHotspot.dataset.src) return;
      shotImg.src = shotHotspot.dataset.src;
      shotImg.alt = shotHotspot.dataset.title || '';
      shotTitle.textContent = shotHotspot.dataset.title || '';
      if (!shotDialog.open) shotDialog.showModal();
    });
    /* Click the dimmed backdrop to close; Esc is native to <dialog>. */
    shotDialog.addEventListener('click', (e) => {
      if (e.target === shotDialog) shotDialog.close();
    });
    /* Refresh the spoken name when the language changes. */
    window.addEventListener('languagechange', () => syncShotHotspot(true));
  }

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

  /* ---------- reveal-on-scroll (staggered) ----------
     Elements flagged `cssAnimated` take their entrance entirely from
     css/motion.css (keyframes), so they must not also get the generic
     .reveal-item transform — that would fight the tilt / clip-path
     transforms those elements own. Everyone else keeps .reveal-item,
     and its inline transition-delay is cleared once the reveal is over
     so later transitions (card hover, the 3D flip) are not delayed. */
  const revealTargets = document.querySelectorAll(
    '.section-head, .service-card, .project, .contact-title, .contact-divider'
  );
  const cssAnimated = (el) =>
    el.classList.contains('service-card') || el.classList.contains('contact-divider');

  revealTargets.forEach((el, i) => {
    const delay = `${i * 0.08}s`;
    el.style.setProperty('--reveal-delay', delay);
    if (cssAnimated(el)) return;
    el.classList.add('reveal-item');
    el.style.transitionDelay = delay;
  });

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        el.classList.add('is-in');
        revealObserver.unobserve(el);
        if (cssAnimated(el)) return;
        window.setTimeout(() => { el.style.transitionDelay = ''; }, 1400);
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

  /* ---------- contact form: Netlify AJAX + mailto fallback ---------- */
  if (briefForm && briefSuccess) {
    const tr = (window.__i18n && window.__i18n.t) || function () { return undefined; };
    const emailInput = briefForm.querySelector('[name="email"]');
    const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const DOMAIN_FIXES = {
      'gmial.com': 'gmail.com', 'gmail.co': 'gmail.com', 'gmai.com': 'gmail.com',
      'hotmial.com': 'hotmail.com', 'hotmail.co': 'hotmail.com',
      'yaho.com': 'yahoo.com', 'yahoo.co': 'yahoo.com',
      'outlok.com': 'outlook.com', 'outlook.co': 'outlook.com',
      'icloud.co': 'icloud.com', 'protonmaail.com': 'protonmail.com',
      'aol.co': 'aol.com',
    };

    const clearFormErrors = () => {
      briefForm.querySelectorAll('.brief-form__error, .brief-form__hint').forEach((n) => n.remove());
      briefForm.querySelectorAll('[aria-invalid]').forEach((n) => n.removeAttribute('aria-invalid'));
    };

    const complete = () => {
      const email = emailInput.value.trim();
      const text = (tr('contact.form.success_text') ||
        "We'll reply to {email} within 24 hours. The wizard has it covered.")
        .replace('{email}', email);
      briefSuccess.querySelector('[data-i18n="contact.form.success_text"]').textContent = text;
      briefForm.hidden = true;
      briefSuccess.hidden = false;
      briefSubmit.disabled = false;
      measureLayout();
      setBubble(pickMessage('contact'), true);
      burstParticles();
      setTimeout(burstParticles, 350);
    };

    const mailFallback = () => {
      const fName = briefForm.querySelector('[name="name"]').value;
      const fType = briefForm.querySelector('[name="project-type"]');
      const fMsg = briefForm.querySelector('[name="message"]').value;
      const typeText = fType && fType.selectedOptions && fType.selectedOptions[0]
        ? fType.selectedOptions[0].textContent : '';
      const subject = (tr('contact.form.mail_subject') || 'Project brief') + ' — ' + fName;
      const body = [
        (tr('contact.form.name_label') || 'Name') + ': ' + fName,
        (tr('contact.form.email_label') || 'Email') + ': ' + emailInput.value,
        (tr('contact.form.type_label') || 'Project') + ': ' + typeText,
        '',
        fMsg,
      ].join('\n');
      window.location.href = 'mailto:youyounfissi16@gmail.com' +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(body);
      complete();
    };

    emailInput.addEventListener('blur', () => {
      const old = briefForm.querySelector('.brief-form__hint');
      if (old) old.remove();
      emailInput.removeAttribute('aria-describedby');
      const v = emailInput.value.trim();
      if (!v || !EMAIL_RE.test(v)) return;
      const at = v.lastIndexOf('@');
      const local = v.slice(0, at);
      const domain = v.slice(at + 1).toLowerCase();
      const fixDomain = DOMAIN_FIXES[domain];
      if (!fixDomain) return;
      const fix = local + '@' + fixDomain;
      if (fix.toLowerCase() === v.toLowerCase()) return;
      const hint = document.createElement('p');
      hint.className = 'brief-form__hint';
      hint.id = 'briefTypo';
      hint.textContent = (tr('contact.form.email_typo') || 'Did you mean {email}?')
        .replace('{email}', fix);
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'brief-form__hint-fix';
      btn.textContent = fix;
      btn.addEventListener('click', () => {
        emailInput.value = fix;
        hint.remove();
        emailInput.removeAttribute('aria-describedby');
        emailInput.focus();
      });
      hint.appendChild(btn);
      const holder = emailInput.closest('.brief-form__field');
      if (holder) holder.appendChild(hint);
      emailInput.setAttribute('aria-describedby', 'briefTypo');
    });

    briefForm.addEventListener('submit', (e) => {
      e.preventDefault();
      clearTimeout(idleTimer);
      clearTimeout(lingerTimer);
      clearFormErrors();
      const honeypot = briefForm.querySelector('[name="bot-field"]');
      if (honeypot && honeypot.value) { complete(); return; }
      const email = emailInput.value.trim();
      if (!EMAIL_RE.test(email)) {
        const err = document.createElement('p');
        err.className = 'brief-form__error';
        err.setAttribute('role', 'alert');
        err.textContent = tr('contact.form.email_error') || "That email doesn't look right.";
        const holder = emailInput.closest('.brief-form__field');
        if (holder) holder.appendChild(err);
        emailInput.setAttribute('aria-invalid', 'true');
        emailInput.focus();
        return;
      }
      if (!briefForm.checkValidity()) { briefForm.reportValidity(); return; }
      briefSubmit.disabled = true;
      const span = briefSubmit.querySelector('span');
      const sending = tr('contact.form.sending');
      if (span && sending) span.textContent = sending;
      const body = new URLSearchParams(new FormData(briefForm)).toString();
      fetch(window.location.pathname, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      })
        .then((res) => { if (res.ok) { complete(); } else { mailFallback(); } })
        .catch(() => mailFallback());
    });

    const editBtn = briefSuccess.querySelector('.brief-success__edit');
    if (editBtn) {
      editBtn.addEventListener('click', () => {
        briefSuccess.hidden = true;
        briefForm.hidden = false;
        const span = briefSubmit.querySelector('span');
        const label = tr('contact.form.submit');
        if (span && label) span.textContent = label;
        emailInput.focus();
      });
    }
  }

  /* ---------- walkthrough deep-links (project cards → prefilled brief) ---------- */
  document.querySelectorAll('[data-walkthrough]').forEach((el) => {
    el.addEventListener('click', () => {
      if (!briefForm) return;
      const tr = (window.__i18n && window.__i18n.t) || function () { return undefined; };
      const article = el.closest('.project');
      const titleEl = article ? article.querySelector('h3') : null;
      const project = titleEl ? titleEl.textContent.trim() : '';
      const msg = briefForm.querySelector('[name="message"]');
      const type = briefForm.querySelector('[name="project-type"]');
      if (type) type.value = 'custom';
      if (msg) {
        const tmpl = tr('work.walkthrough_msg') ||
          "Hi ITWIZ — I'd like a walkthrough of the {project} platform. Please include access details.";
        msg.value = tmpl.replace('{project}', project);
      }
      if (briefForm.hidden && briefSuccess) {
        briefSuccess.hidden = true;
        briefForm.hidden = false;
        const span = briefSubmit.querySelector('span');
        const label = tr('contact.form.submit');
        if (span && label) span.textContent = label;
      }
      setTimeout(() => {
        const nameInput = briefForm.querySelector('[name="name"]');
        if (nameInput) nameInput.focus();
      }, 650);
    });
  });

  /* ---------- tap / keyboard card flip (hover never fires on touch) ---------- */
  const coarsePointer =
    !window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  document.querySelectorAll('.book .project').forEach((el) => {
    const detailsBtn = el.querySelector('[data-card-details]');
    const visitLink = el.querySelector('.card__visit');
    const flip = () => {
      if (presenting) return;
      const flipped = el.classList.toggle('is-flipped');
      if (detailsBtn) {
        detailsBtn.setAttribute('aria-expanded', flipped ? 'true' : 'false');
        detailsBtn.tabIndex = flipped ? -1 : 0;
      }
      if (visitLink) visitLink.tabIndex = flipped ? 0 : -1;
    };
    if (coarsePointer) {
      el.addEventListener('click', (e) => {
        if (e.target.closest('a, button')) return;
        flip();
      });
    }
    if (detailsBtn) {
      detailsBtn.addEventListener('click', () => flip());
    }
  });



  /* ---------- mascot dismissal (persisted across visits) ---------- */
  let mascotDismissed = false;
  try { mascotDismissed = localStorage.getItem('itwiz-mascot-dismissed') === '1'; } catch (_) {}
  if (mascotDismissed) {
    mascot.classList.add('is-dismissed');
    mascot.style.display = 'none';
  }
  if (mascotDismiss) {
    mascotDismiss.addEventListener('click', function () {
      clearTimeout(idleTimer);
      clearTimeout(lingerTimer);
      mascotDismiss.classList.remove('is-ready');
      setBubble._last = null;
      try { localStorage.setItem('itwiz-mascot-dismissed', '1'); } catch (_) {}
      mascotDismissed = true;
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

  /* ---------- binary background overlay (removed) ---------- */

  /* ---------- i18n language change ---------- */
  function rebuildDialogue() {
    var t = window.__i18n && window.__i18n.t;
    if (!t) return;
    var keys = ['hero','services','work','method','about','contact','card-web','card-ai','card-data','card-custom','card-maitrisez','card-driving','card-dental','idle','linger_hero','linger_services','linger_work','linger_method','linger_about','linger_contact'];
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