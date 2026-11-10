/* ============================================================
   ITWIZ — "swarm rebuild" hero time-lapse.

   A tribute to Joel Califa's Swarm (the site that builds
   itself) and the Swarm Rebuild extension — the choreography is
   reimplemented from scratch for this page; no code is taken
   from either.

   On every visit the page opens black — covered before its
   first paint — and a small flock of cursors paints the hero
   back on a dark stage: real text and real controls, measured
   from the live DOM, ending in the real hero.

   Purely visual: the hero markup stays in the DOM the whole
   time (inert while covered), no audio, and the effect is
   never wired up at all for reduced-motion visitors.
   ============================================================ */
(function () {
  'use strict';

  var INTRO = 500;   /* cursors fly in            */
  var GAP = 340;     /* pause between a cursor's tasks */
  var OUTRO = 800;   /* flock + fade back to the real page */
  var VEIL = 450;    /* fade-to-black at the start */
  var CELEBRATE = 1800; /* full-screen spark finale after the flock */
  var FIRE_LIFE = 1600;  /* particle lifetime       */
  var RING_LIFE = 1400;  /* expanding ring lifetime */

  var body = document.body;
  var hero = document.getElementById('hero');
  var heroInner = document.querySelector('.realm-hero__inner');
  var liveRegion = document.getElementById('swarmLive');
  if (!hero || !heroInner || !liveRegion) return;

  var reducedMQ = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reducedMQ.matches) {
    return; /* never wire the effect up at all */
  }

  function tr(key, fallback) {
    var t = window.__i18n && window.__i18n.t;
    var v = t ? t(key) : undefined;
    return v === undefined || v === null || v === '' ? fallback : v;
  }

  /* ---------- live state ---------- */
  var live = false;
  var canvas = null;
  var ctx = null;
  var skipBtn = null;
  var cueEl = null;
  var rafId = 0;
  var t0 = 0;
  var lastFrame = 0;
  var W = 0;
  var H = 0;
  var total = 0;
  var tasks = [];
  var cursors = [];
  var backdrop = null;
  var logoImg = null;
  var listeners = [];
  var mouse = { x: 0, y: 0 };
  var sparks = [];
  var rings = [];
  var burstAt = 0;
  var buildEnd = 0;
  var celebrated = false;

  function $(sel) { return hero.querySelector(sel); }

  /* ================= blueprint =================
     All geometry and text are read from the live hero before
     the veil starts — language- and breakpoint-aware, nothing
     hard-coded. Viewport coordinates, matching the fixed
     canvas one-to-one. ================= */

  function rectOf(el) {
    var r = el.getBoundingClientRect();
    return { x: r.left, y: r.top, w: r.width, h: r.height };
  }

  function styleOf(el) {
    var cs = getComputedStyle(el);
    return {
      weight: cs.fontWeight || '400',
      size: parseFloat(cs.fontSize) || 16,
      family: cs.fontFamily || 'sans-serif',
      color: cs.color,
      ls: cs.letterSpacing === 'normal' ? '0px' : cs.letterSpacing,
      tt: cs.textTransform || 'none',
    };
  }

  /* split a block into its rendered lines, keeping the real
     words in order and each line's exact position */
  function textLines(el) {
    var st = styleOf(el);
    var nodes = [];
    var walker = document.createTreeWalker(el, 4 /* SHOW_TEXT */);
    while (walker.nextNode()) nodes.push(walker.currentNode);
    var lines = [];
    nodes.forEach(function (node) {
      var raw = node.nodeValue || '';
      if (!raw.trim()) return;
      var range = document.createRange();
      var m, re = /\S+/g, line = null;
      while ((m = re.exec(raw))) {
        range.setStart(node, m.index);
        range.setEnd(node, m.index + m[0].length);
        var r = range.getBoundingClientRect();
        if (!r.width) continue;
        if (!line || Math.abs(r.top - line.top) > r.height * 0.6) {
          line = { top: r.top, left: r.left, right: r.right, height: r.height, parts: [] };
          lines.push(line);
        }
        line.left = Math.min(line.left, r.left);
        line.right = Math.max(line.right, r.right);
        line.parts.push(raw.slice(m.index, m.index + m[0].length));
      }
    });
    lines.forEach(function (line) { line.st = st; });
    return lines;
  }

  function addTextLines(sel, stOverride) {
    var el = $(sel);
    if (!el) return;
    textLines(el).forEach(function (line) {
      tasks.push({
        kind: 'text',
        x: line.left,
        y: line.top,
        w: line.right - line.left,
        h: line.height,
        text: line.parts.join(' '),
        st: stOverride || line.st,
      });
    });
  }

  function addBrand() {
    var a = $('.realm-hero__brand');
    var img = a && a.querySelector('img');
    if (!a || !img) return;
    var r = rectOf(a);
    tasks.push({ kind: 'media', x: r.x, y: r.y, w: r.w, h: r.h, src: img.getAttribute('src') });
  }

  function addButtons() {
    var row = $('.realm-hero__actions');
    if (!row) return;
    row.querySelectorAll('.realm-button').forEach(function (btn) {
      var r = rectOf(btn);
      var label = btn.querySelector('span');
      var glyph = btn.querySelector('span:last-child');
      var st = styleOf(btn);
      st.color = btn.classList.contains('realm-button--primary') ? '#04101a' : '#dce4f7';
      tasks.push({
        kind: 'control',
        x: r.x, y: r.y, w: r.w, h: r.h,
        primary: btn.classList.contains('realm-button--primary'),
        label: label ? label.textContent.trim() : '',
        glyph: glyph ? glyph.textContent.trim() : '',
        st: st,
      });
    });
  }

  function addFootnote() {
    var el = $('.realm-hero__footnote');
    if (!el) return;
    var st = styleOf(el);
    var span = el.querySelector('span:last-child');
    if (span) st.dot = '#6ee7f9';
    textLines(el).forEach(function (line) {
      tasks.push({
        kind: 'text', dot: true,
        x: line.left, y: line.top, w: line.right - line.left, h: line.height,
        text: line.parts.join(' '), st: st,
      });
    });
  }

  function addCue() {
    var el = $('.realm-scroll-cue');
    if (!el) return;
    cueEl = el;
    var r = rectOf(el);
    var circ = el.querySelector('i');
    var cr = circ ? rectOf(circ) : null;
    tasks.push({
      kind: 'ring',
      x: r.x, y: r.y, w: r.w, h: r.h,
      cx: cr ? cr.x + cr.w / 2 : r.x + r.w / 2,
      cy: cr ? cr.y + cr.h / 2 : r.y + r.h / 2,
      cw: cr ? cr.w : 28,
      ch: cr ? cr.h : 28,
      text: (el.querySelector('span') || el).textContent.trim(),
      st: styleOf(el),
    });
  }

  /* the floating laptops are real WebGL models — abstracted
     here as stylized screen+base frames; the 3D scene itself
     returns untouched when the live hero fades back in */
  function addLaptops() {
    if (window.innerWidth < 900) return;
    var r = rectOf(hero);
    var bw = Math.min(r.w * 0.3, 410), bh = 195;
    [[0.57, 0.13, -5], [0.65, 0.4, 4], [0.51, 0.62, -3]].forEach(function (f, i) {
      tasks.push({
        kind: 'laptop',
        x: r.x + r.w * f[0],
        y: H * f[1],
        w: bw * (1 - i * 0.05),
        h: bh * (1 - i * 0.04),
        rot: f[2] * Math.PI / 180,
      });
    });
  }

  function buildBlueprint() {
    tasks = [];
    addTextLines('.realm-kicker');
    addBrand();
    /* the live title is a CSS gradient text-clip; canvas can't
       reuse it, so rebuild with the leading gradient tone */
    var title = $('.realm-hero__title');
    if (title) {
      var st = styleOf(title);
      st.color = '#d8f4ff';
      addTextLines('.realm-hero__title', st);
    }
    addTextLines('.realm-hero__sub');
    addButtons();
    addFootnote();
    addCue();
    addLaptops();
    tasks.sort(function (a, b) { return (a.y - b.y) || (a.x - b.x); });
  }

  /* ================= schedule ================= */

  var AGENT_COLORS = ['#53dcff', '#a78bfa', '#8ff3ff', '#c9b0ff', '#6ee7f9', '#9b7cff', '#e7e3ff'];
  var AGENT_NAMES = ['DESIGN', 'CODE', 'TYPE', 'MOTION', 'FLOW', 'BUILD', 'MAGIC'];

  function taskDur(t) {
    if (t.kind === 'text') return 420 + Math.min(t.text.length * 24, 950) + 90;
    if (t.kind === 'control') return 500 + 280 + Math.min((t.label.length + t.glyph.length) * 26, 720) + 90;
    if (t.kind === 'media') return 480 + 680 + 90;
    if (t.kind === 'laptop') return 480 + 300 + 90;
    if (t.kind === 'ring') return 460 + 300 + 90;
    return 700;
  }

  function assign() {
    cursors = AGENT_COLORS.map(function (c, i) {
      return {
        name: AGENT_NAMES[i],
        color: c,
        x: W / 2 + (i - 3) * 70,
        y: -60 - (i % 2) * 90,
        wig: Math.random() * 6.28,
        freeAt: INTRO + i * 140,
      };
    });
    tasks.forEach(function (t) {
      var c = cursors.reduce(function (a, b) { return (a.freeAt <= b.freeAt ? a : b); });
      t.cursor = c;
      t.start = Math.max(c.freeAt, INTRO);
      t.dur = taskDur(t);
      c.freeAt = t.start + t.dur + GAP;
    });
    /* the moment the final task completes; the cursor flock plays
       for OUTRO, then — only once it's gathered — the centered
       spark burst fires and the stage fades out over it */
    var lastFreeAt = INTRO;
    cursors.forEach(function (c) { if (c.freeAt > lastFreeAt) lastFreeAt = c.freeAt; });
    buildEnd = lastFreeAt - GAP;
    burstAt = buildEnd + OUTRO;
    total = buildEnd + OUTRO + CELEBRATE;
  }

  /* ================= drawing helpers ================= */

  function clamp01(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
  function seg(t, a, b) { return clamp01((t - a) / (b - a)); }
  function ease(p) { return p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2; }

  function rr(x, y, w, h, r) {
    ctx.beginPath();
    if (ctx.roundRect) ctx.roundRect(x, y, w, h, r);
    else ctx.rect(x, y, w, h);
  }

  function chip(label, x, y) {
    ctx.font = '500 10px ui-monospace, monospace';
    var w = ctx.measureText(label).width + 12;
    ctx.fillStyle = 'rgba(8,12,22,.88)';
    rr(x + 10, y + 14, w, 17, 3);
    ctx.fill();
    ctx.fillStyle = '#dfe7fb';
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    ctx.fillText(label, x + 16, y + 23);
  }

  /* a Figma-style cursor arrow + name chip */
  function drawCursor(c) {
    ctx.save();
    ctx.translate(c.x, c.y);
    var s = 1.05;
    ctx.scale(s, s);
    ctx.beginPath();
    ctx.moveTo(1, 1);
    ctx.lineTo(1, 15.8);
    ctx.lineTo(5, 12.2);
    ctx.lineTo(7.9, 18);
    ctx.lineTo(10.5, 16.6);
    ctx.lineTo(7.7, 10.9);
    ctx.lineTo(12.4, 10.9);
    ctx.closePath();
    ctx.fillStyle = c.color;
    ctx.strokeStyle = 'rgba(4,16,26,.9)';
    ctx.lineWidth = 1.1;
    ctx.fill();
    ctx.stroke();
    ctx.restore();
    chip(c.name, c.x, c.y);
  }

  /* ================= task renderers ================= */

  function applyFont(st) {
    ctx.font = st.weight + ' ' + st.size + 'px ' + st.family;
    try { ctx.letterSpacing = st.ls; } catch (e) { /* older engines: ignore */ }
    ctx.textBaseline = 'middle';
  }

  function dragRect(t, vt, drawBody) {
    var dp = ease(seg(vt, 0, 420));
    var gw = t.w * dp, gh = t.h * dp;
    if (dp <= 0.02) return dp;
    ctx.strokeStyle = 'rgba(140,160,210,.42)';
    ctx.lineWidth = 1;
    rr(t.x, t.y, gw, gh, 2);
    ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,.045)';
    rr(t.x, t.y, gw, gh, 2);
    ctx.fill();
    if (dp < 1) chip(Math.round(gw) + ' × ' + Math.round(gh), t.x + gw, t.y + gh);
    if (drawBody) drawBody(dp);
    return dp;
  }

  function typeInto(vt, from, to, box, text, color, rtl) {
    var p = seg(vt, from, to);
    if (p <= 0) return null;
    applyFont(box.st);
    var str = text.slice(0, Math.max(1, Math.ceil(p * text.length)));
    if (box.st.tt === 'uppercase' || box.st.tt === 'all-small-caps') str = str.toUpperCase();
    ctx.fillStyle = color;
    var ty = box.y + box.h / 2;
    if (rtl) {
      ctx.direction = 'rtl';
      ctx.textAlign = 'right';
      ctx.fillText(str, box.x + box.w, ty);
      ctx.direction = 'ltr';
    } else {
      ctx.textAlign = 'left';
      ctx.fillText(str, box.x, ty);
    }
    var x = rtl ? box.x + box.w - ctx.measureText(str).width : box.x + ctx.measureText(str).width;
    /* caret while typing */
    if (p < 1) {
      ctx.fillStyle = 'rgba(214,236,255,' + (0.35 + 0.65 * Math.abs(Math.sin(vt * 0.02))) + ')';
      ctx.fillRect(x + (rtl ? -1 : 2), ty - box.h * 0.34, 1.6, box.h * 0.68);
    }
    return p;
  }

  function renderText(t, vt) {
    if (vt < 0) return;
    var color = t.st.color;
    if (t.st.dot && vt > t.dur * 0.88) { /* footnote live-dot */
      ctx.fillStyle = t.st.dot;
      ctx.beginPath();
      ctx.arc(t.x - 18, t.y + t.h / 2, 3.4, 0, 6.29);
      ctx.fill();
    }
    dragRect(t, vt, null);
    typeInto(vt, 420, t.dur - 90, t, t.text, color, document.documentElement.dir === 'rtl');
  }

  function renderControl(t, vt) {
    if (vt < 0) return;
    dragRect(t, Math.min(vt, 500), function (dp) {
      /* fill fades in once the box is drawn */
      var fp = seg(vt, 500, 780);
      if (fp > 0) {
        ctx.globalAlpha = fp;
        if (t.primary) {
          var g = ctx.createLinearGradient(t.x, t.y, t.x + t.w, t.y + t.h);
          g.addColorStop(0, '#75eaff');
          g.addColorStop(1, '#a6a0ff');
          ctx.fillStyle = g;
        } else {
          ctx.fillStyle = 'rgba(13,18,32,.85)';
        }
        rr(t.x, t.y, t.w, t.h, 6);
        ctx.fill();
        ctx.strokeStyle = t.primary ? 'rgba(255,255,255,.65)' : 'rgba(153,171,216,.25)';
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    });
    if (vt > 780) {
      typeInto(vt, 780, t.dur - 90, t, t.label, t.st.color, document.documentElement.dir === 'rtl');
      /* arrow glyph pops once the label is in */
      var gp = seg(vt, t.dur - 90, t.dur);
      if (gp > 0) {
        applyFont(t.st);
        ctx.fillStyle = t.st.color;
        ctx.globalAlpha = clamp01(gp);
        ctx.fillText(t.glyph, t.x + t.w - 26, t.y + t.h / 2);
        ctx.globalAlpha = 1;
      }
    }
  }

  function renderMedia(t, vt) {
    if (vt < 0) return;
    dragRect(t, vt, null);
    var p = seg(vt, 480, t.dur - 90);
    if (p > 0.02 && logoImg && logoImg.complete && logoImg.naturalWidth) {
      var img = logoImg;
      var scale = Math.min(t.w / (img.naturalWidth || t.w), t.h / (img.naturalHeight || t.h));
      var dw = (img.naturalWidth || t.w) * scale, dh = (img.naturalHeight || t.h) * scale;
      var dx = t.x + (t.w - dw) / 2, dy = t.y + (t.h - dh) / 2;
      ctx.save();
      ctx.beginPath();
      ctx.rect(t.x, t.y, t.w, t.h * clamp01(p));
      ctx.clip();
      ctx.globalAlpha = clamp01(p * 1.4);
      try { ctx.drawImage(img, dx, dy, dw, dh); } catch (e) { /* veil only */ }
      ctx.restore();
    }
  }

  function renderLaptop(t, vt) {
    if (vt < 0) return;
    ctx.save();
    ctx.translate(t.x + t.w / 2, t.y + t.h / 2);
    ctx.rotate(t.rot);
    ctx.translate(-t.w / 2, -t.h / 2);
    var tt = { x: 0, y: 0, w: t.w, h: t.h, st: {} };
    dragRect(tt, vt, function (dp) {
      var fp = seg(vt, 480, 780);
      if (fp > 0) {
        var g = ctx.createLinearGradient(0, 0, t.w, t.h);
        g.addColorStop(0, 'rgba(83,220,255,' + (0.16 * fp) + ')');
        g.addColorStop(1, 'rgba(167,139,250,' + (0.13 * fp) + ')');
        ctx.fillStyle = g;
        rr(0, 0, t.w, t.h, 7);
        ctx.fill();
        ctx.strokeStyle = 'rgba(134,161,213,.3)';
        ctx.stroke();
        /* a soft screen-glow instead of a shadow filter */
        var glow = ctx.createRadialGradient(t.w / 2, t.h / 2, t.h * 0.1, t.w / 2, t.h / 2, t.h * 0.55);
        glow.addColorStop(0, 'rgba(105,52,202,' + (0.05 * fp) + ')');
        glow.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = glow;
        rr(0, 0, t.w, t.h, 7);
        ctx.fill();
      }
    });
    /* base bar appears with the frame */
    var bp = seg(vt, 640, 780);
    if (bp > 0) {
      ctx.globalAlpha = clamp01(bp);
      ctx.fillStyle = 'rgba(200,215,240,.1)';
      ctx.strokeStyle = 'rgba(134,161,213,.32)';
      rr(t.w * 0.04, t.h + 6, t.w * 0.92, 9, 4);
      ctx.fill(); ctx.stroke();
      ctx.globalAlpha = 1;
    }
    ctx.restore();
  }

  function renderRing(t, vt) {
    if (vt < 0) return;
    var p = ease(seg(vt, 0, 760));
    if (p > 0.02) {
      ctx.strokeStyle = 'rgba(134,161,213,.45)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(t.cx, t.cy, t.cw / 2, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * clamp01(p));
      ctx.stroke();
      if (p > 0.75) {
        ctx.strokeStyle = '#8ceaff';
        var cx = t.cx, cy = t.cy + 5;
        ctx.beginPath();
        ctx.moveTo(cx - 3, cy - 3);
        ctx.lineTo(cx, cy + 1);
        ctx.lineTo(cx + 3, cy - 3);
        ctx.stroke();
      }
    }
    typeInto(vt, 560, t.dur - 90,
      { y: t.y, x: t.x + t.cw + 14, w: t.w - t.cw - 14, h: t.h, st: t.st },
      t.text, t.st.color, document.documentElement.dir === 'rtl');
  }

  /* ================= cursor life ================= */

  function workPoint(t, vt, plan) {
    if (vt === null) return [t.x, t.y];
    var drag = Math.min(seg(vt, 0, 460), 1);
    if (drag < 1 && t.kind !== 'text') return [t.x + t.w * ease(drag), t.y + t.h * ease(drag)];
    return [t.x + t.w * ease(Math.min(1, drag)), t.y + t.h * 0.5];
  }

  function updateCursors(dt, tm) { /* tm: run-relative ms */
    var outroP = seg(tm, buildEnd, buildEnd + OUTRO);
    cursors.forEach(function (c, i) {
      var gx, gy;
      var task = null, vt = 0;
      for (var k = 0; k < tasks.length; k++) {
        var t = tasks[k];
        if (t.cursor !== c) continue;
        if (tm >= t.start - 260 && tm <= t.start + t.dur) { task = t; vt = tm - t.start; break; }
      }
      if (outroP > 0.35) {
        gx = mouse.x + Math.sin(c.wig + tm * 0.0012) * 26 * (1 - outroP);
        gy = mouse.y + Math.cos(c.wig * 1.7 + tm * 0.0016) * 26 * (1 - outroP);
      } else if (task) {
        var pt = workPoint(task, vt);
        gx = pt[0] + 10; gy = pt[1] + 6;
      } else {
        /* wander mid-air, gently tending to the assignment ahead */
        gx = W * 0.5 + Math.sin(c.wig + tm * 0.0006) * W * 0.3;
        gy = H * 0.45 + Math.cos(c.wig * 1.3 + tm * 0.0007) * H * 0.3;
      }
      /* avoid the pointer while working */
      if (task === null) {
        var dx = gx - mouse.x, dy = gy - mouse.y, d2 = dx * dx + dy * dy;
        if (d2 < 90 * 90) {
          var d = Math.sqrt(d2) || 1;
          gx += (dx / d) * (90 - d) * 0.8;
          gy += (dy / d) * (90 - d) * 0.8;
        }
      }
      var k8 = 1 - Math.exp(-dt * (task ? 7 : 3.4));
      c.x += (gx - c.x) * k8;
      c.y += (gy - c.y) * k8;
      /* hover jitter while working */
      if (task) {
        c.x += Math.sin(tm * 0.02 + c.wig) * 0.6;
        c.y += Math.cos(tm * 0.023 + c.wig) * 0.5;
      }
    });
  }

  /* ================= backdrop ================= */

  function makeBackdrop() {
    backdrop = document.createElement('canvas');
    backdrop.width = W * 1; backdrop.height = H * 1;
    var b = backdrop.getContext('2d');
    b.fillStyle = '#000';
    b.fillRect(0, 0, W, H);
    /* the hero's own mist, drawn soft */
    var g1 = b.createRadialGradient(W * 0.65, H * 0.48, 0, W * 0.65, H * 0.48, W * 0.55);
    g1.addColorStop(0, 'rgba(105,52,202,.10)');
    g1.addColorStop(1, 'rgba(0,0,0,0)');
    b.fillStyle = g1;
    b.fillRect(0, 0, W, H);
    var g2 = b.createRadialGradient(W * 0.3, H * 0.6, 0, W * 0.3, H * 0.6, W * 0.5);
    g2.addColorStop(0, 'rgba(0,204,255,.07)');
    g2.addColorStop(1, 'rgba(0,0,0,0)');
    b.fillStyle = g2;
    b.fillRect(0, 0, W, H);
    /* a star hint */
    b.fillStyle = '#a9eaff';
    for (var i = 0; i < 70; i++) {
      b.globalAlpha = 0.2 + Math.random() * 0.5;
      b.fillRect(Math.random() * W, Math.random() * H, 1, 1);
    }
    b.globalAlpha = 1;
  }

  /* ================= celebration ================= */

  /* full-screen finale as the build lands: a big center burst
     plus satellites spread across the viewport (staggered), all
     in the brand cyan/violet palette, no sound. The canvas fade
     then carries everything into the real hero. */

  var spawnQueue = [];  /* sub-bursts waiting for their moment */

  function spawnOne(x, y, count, spMin, spMax, colorSeed) {
    var colors = ['#53dcff', '#a78bfa', '#f2f6ff', '#8ff3ff', '#c9b0ff'];
    for (var i = 0; i < count; i++) {
      var a = Math.random() * 6.29;
      var sp = spMin + Math.random() * (spMax - spMin);
      sparks.push({
        x: x, y: y,
        vx: Math.cos(a) * sp,
        vy: Math.sin(a) * sp - 70,
        color: colors[(i + colorSeed) % colors.length],
        size: Math.random() < 0.24 ? 3.0 : 1.9,
        life: FIRE_LIFE * (0.7 + Math.random() * 0.3),
        age: 0,
        tw: Math.random() * 6.28,
      });
    }
  }

  function scheduleCelebration() {
    var scale = Math.min(1.4, Math.hypot(W, H) / 1450);
    var cx = W / 2 + (Math.random() * 30 - 15);
    var cy = H * 0.42 + (Math.random() * 26 - 13);
    /* the mega ring expands to the full diagonal of the screen */
    rings.push({ x: cx, y: cy, max: Math.hypot(W, H) / 2, born: burstAt, hot: true });
    spawnQueue.push({ x: cx, y: cy, n: 130, lo: 200, hi: 900 * scale, at: burstAt, seed: 0 });
    var spots = [
      [0.14, 0.2], [0.86, 0.18], [0.1, 0.7], [0.9, 0.75],
      [0.5, 0.1], [0.28, 0.3], [0.72, 0.62], [0.24, 0.52],
    ];
    var satN = W < 700 ? 4 : spots.length;
    for (var i = 0; i < satN; i++) {
      var s = spots[i];
      spawnQueue.push({
        x: s[0] * W + (Math.random() * 40 - 20),
        y: s[1] * H + (Math.random() * 40 - 20),
        n: Math.round(55 * (W < 700 ? 0.8 : 1)),
        lo: 130, hi: 480 * scale,
        at: burstAt + 90 * (i + 1),
        seed: i + 1,
        ring: true,
      });
    }
    spawnQueue.sort(function (a, b) { return a.at - b.at; });
  }

  function renderSparks(tm, dt) {
    if (!celebrated && tm >= burstAt) { celebrated = true; scheduleCelebration(); }
    while (spawnQueue.length && tm >= spawnQueue[0].at) {
      var q = spawnQueue.shift();
      spawnOne(q.x, q.y, q.n, q.lo, q.hi, q.seed);
      if (q.ring) rings.push({ x: q.x, y: q.y, max: 90, born: q.at, hot: false });
    }
    if (!sparks.length && !rings.length && !spawnQueue.length) return;
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    var i;
    for (i = rings.length - 1; i >= 0; i--) {
      var r = rings[i], rp = seg(tm - r.born, 0, RING_LIFE);
      if (rp >= 1) { rings.splice(i, 1); continue; }
      ctx.globalAlpha = (1 - rp) * (r.hot ? 0.5 : 0.35);
      ctx.strokeStyle = '#8ceaff';
      ctx.lineWidth = r.hot ? 1.8 : 1.2;
      ctx.beginPath();
      ctx.arc(r.x, r.y, 12 + (r.max - 12) * ease(rp), 0, 6.29);
      ctx.stroke();
    }
    for (i = sparks.length - 1; i >= 0; i--) {
      var s = sparks[i];
      s.age += dt * 1000;
      if (s.age >= s.life) { sparks.splice(i, 1); continue; }
      var p = s.age / s.life;
      s.x += s.vx * dt; s.y += s.vy * dt;
      s.vy += 230 * dt;
      s.vx *= 1 - Math.min(0.9, 1.6 * dt);
      s.vy *= 1 - Math.min(0.9, 0.5 * dt);
      var al = (1 - p) * (0.55 + 0.45 * Math.abs(Math.sin(s.tw + tm * 0.03)));
      ctx.globalAlpha = al;
      ctx.fillStyle = s.color;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, 6.29);
      ctx.fill();
      /* faint streak behind each spark */
      ctx.globalAlpha = al * 0.5;
      ctx.strokeStyle = s.color;
      ctx.beginPath();
      ctx.moveTo(s.x - s.vx * 0.035, s.y - s.vy * 0.035);
      ctx.lineTo(s.x, s.y);
      ctx.stroke();
    }
    ctx.restore();
  }

  /* ================= run loop ================= */

  function frame(now) {
    if (!live) return;
    var t = now - t0;
    var fade = Math.min(1, t / VEIL);
    if (t > total - 700) fade *= 1 - clamp01((t - (total - 700)) / 640);
    /* the canvas element carries the whole fade, so it covers the
       built page, the cursors and the sparks uniformly — per-frame
       writes, no CSS transition */
    if (canvas.style.opacity !== String(fade)) canvas.style.opacity = fade;
    ctx.clearRect(0, 0, W, H);
    ctx.globalAlpha = 1;
    ctx.drawImage(backdrop, 0, 0, W, H);
    var dt = Math.min(0.05, (now - lastFrame) / 1000 || 0.016);
    lastFrame = now;

    tasks.forEach(function (task) {
      var vt = t - task.start;
      if (vt < 0) return;
      /* completed tasks keep rendering at their final state so
         the page accumulates as it is built */
      if (vt > task.dur) vt = task.dur;
      if (task.kind === 'text') renderText(task, vt);
      else if (task.kind === 'control') renderControl(task, vt);
      else if (task.kind === 'media') renderMedia(task, vt);
      else if (task.kind === 'laptop') renderLaptop(task, vt);
      else if (task.kind === 'ring') renderRing(task, vt);
    });

    renderSparks(t, dt);

    updateCursors(dt, t);
    cursors.forEach(drawCursor);

    ctx.globalAlpha = 1;
    var dbg = window.__swarmDebug;
    if (dbg) {
      dbg.frames = (dbg.frames || 0) + 1;
      dbg.li = { t: Math.round(t), total: Math.round(total), outroP: +seg(t, buildEnd, buildEnd + OUTRO).toFixed(2), sparks: sparks.length, tasksActive: tasks.filter(function (x) { var v = t - x.start; return v >= 0 && v <= x.dur; }).length };
    }
    if (t > total) { finish(false); return; }
    rafId = requestAnimationFrame(frame);
  }

  /* ================= lifecycle ================= */

  function on(el, ev, fn, opt) {
    el.addEventListener(ev, fn, opt);
    listeners.push(function () { el.removeEventListener(ev, fn, opt); });
  }

  function finish(aborted) {
    listeners.forEach(function (off) { off(); });
    listeners = [];
    if (rafId) { cancelAnimationFrame(rafId); rafId = 0; }
    if (canvas) { canvas.remove(); canvas = null; ctx = null; }
    if (skipBtn) { skipBtn.remove(); skipBtn = null; }
    body.classList.remove('swarm-live');
    heroInner.inert = false;
    if (cueEl) cueEl.inert = false;
    if (!aborted && liveRegion) {
      liveRegion.textContent = tr('hero.swarm_done', 'The page has been rebuilt.');
    }
    live = false;
  }

  var scheduled = false;

  function unboot() {
    document.documentElement.classList.remove('swarm-boot');
  }

  /* open the stage right away: canvas + black backdrop + exits,
     but no tasks yet (the blueprint needs real fonts to measure) */
  function openStage() {
    if (live) { unboot(); return; }
    live = true;

    W = window.innerWidth;
    H = window.innerHeight;

    sparks = [];
    rings = [];
    spawnQueue = [];
    celebrated = false;
    burstAt = 0;
    buildEnd = 0;

    makeBackdrop();

    canvas = document.createElement('canvas');
    canvas.className = 'swarm-canvas';
    canvas.style.transition = 'none';   /* JS drives opacity per frame */
    var dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    body.appendChild(canvas);
    ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    /* the real hero is only visually covered — keep it out of
       the tab order and out of AT while the canvas is up */
    body.classList.add('swarm-live');
    unboot();   /* same task: the boot veil hands over, no flash */
    heroInner.inert = true;
    cueEl = $('.realm-scroll-cue');
    if (cueEl) cueEl.inert = true;

    skipBtn = document.createElement('button');
    skipBtn.type = 'button';
    skipBtn.className = 'swarm-skip';
    skipBtn.textContent = tr('hero.swarm_skip', 'Skip');
    body.appendChild(skipBtn);

    logoImg = new Image();
    var brandImg = $('.realm-hero__brand img');
    if (brandImg) logoImg.src = brandImg.getAttribute('src');

    /* exit paths: skip, Esc, scroll, resize, language switch, hidden tab */
    skipBtn.addEventListener('click', function () { finish(true); });
    on(document, 'keydown', function (e) {
      if (e.key === 'Escape') finish(true);
    });
    on(window, 'scroll', function () {
      if (window.scrollY > 80) finish(true);
    }, { passive: true });
    on(window, 'resize', function () { finish(true); });
    on(window, 'languagechange', function () { finish(true); });
    on(document, 'visibilitychange', function () {
      if (document.hidden) finish(true);
    });
    on(window, 'pointermove', function (e) { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });

    liveRegion.textContent = tr('hero.swarm_start', 'Rebuilding the page…');

    mouse.x = W / 2;
    mouse.y = H * 0.6;
  }

  /* start the build: blueprint from the settled DOM, schedule, play */
  function startTasks() {
    if (!live || scheduled) return;
    scheduled = true;

    buildBlueprint();
    assign();

    t0 = performance.now();
    lastFrame = t0;
    /* live diagnostics for the verification harness */
    window.__swarmDebug = {
      tasks: function () {
        return tasks.map(function (t) {
          return { kind: t.kind, x: t.x, y: t.y, w: t.w, h: t.h, start: Math.round(t.start), dur: Math.round(t.dur) };
        });
      },
      cursors: function () {
        return cursors.map(function (c) { return { name: c.name, x: Math.round(c.x), y: Math.round(c.y) }; });
      },
    };
    rafId = requestAnimationFrame(frame);
  }

  /* every page load: black cover -> stage immediately -> build as
     soon as fonts are ready (so measured line breaks match the
     real hero), capped so a hanging font can never stall it */
  function boot() {
    var blocked = false;
    if (document.hidden) blocked = true;
    if (window.scrollY > 80) blocked = true;   /* reloaded mid-page */
    var conn = navigator.connection;
    if (conn && conn.saveData) blocked = true;
    if (blocked) { unboot(); return; }

    try {
      openStage();
    } catch (e) {
      /* any failure at all: show the real page */
      body.classList.remove('swarm-live');
      unboot();
      return;
    }

    var go = startTasks;
    if (document.fonts && document.fonts.status === 'loaded') go();
    else if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(go, go);
      setTimeout(go, 1200);
    } else go();
  }

  boot();
})();
