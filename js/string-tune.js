/* =========================================================
   StringTune — the site-wide animation system
   Native scroll is preserved (no wheel hijack); modules
   publish CSS custom properties that css/motion.css and
   css/method.css consume — CSS-first, JS-light.
========================================================= */
import {
  StringTune,
  StringProgress,
  StringParallax,
  StringSplit,
  StringMagnetic,
  StringTilt,
  StringSpotlight,
  StringMarquee,
  StringCircularText,
  StringGlide,
  StringVelocity,
} from '@fiddle-digital/string-tune';

const st = StringTune.getInstance();

/* Keep the browser's native scroll — StringTune only drives CSS vars. */
st.scrollDesktopMode = 'default';
st.scrollMobileMode = 'default';

/* StringTune only stamps -scroll-forward / -scroll-backward on <html>
   when `global-class` is on (it defaults to false). css/motion.css uses
   those for the heading micro-motion (G4). */
st.setupSettings({ 'global-class': true });

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
/* Pointer-reactive effects only where there really is a pointer:
   fine mouse/trackpad on a non-touch device, and never for users who
   asked for reduced motion. css/motion.css mirrors this with the same
   media queries for its visual end-states. */
const pointerFX =
  !reduceMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/* ---------------------------------------------------------
   Scroll-progress sources (both publish `--progress`).
   Default binding: 0 = the element's top reaches the viewport
   top, 1 = its bottom reaches the viewport bottom.
   - .method__track drives the pinned Method timeline.
   - #hero drives the hero exit (0 = at rest, 1 = scrolled out).
   --------------------------------------------------------- */
st.use(StringProgress, {
  'enter-el': 'top',
  'enter-vp': 'top',
  'exit-el': 'bottom',
  'exit-vp': 'bottom',
  /* Round the published values to 3 decimals — stops ten-thousandth-scale
     sub-pixel churn from rewriting the same CSS var every frame (the biggest
     per-frame cost in the CPU profile: styleTxn.commit + setProperty). */
  precision: 3,
});

/* Ambient runes drift at their own depth — the [all] token forces the
   module on in native (default) scroll mode (it defaults to smooth only). */
st.use(StringParallax);

/* Word/char splitting: section headings, project titles, the Method
   eyebrow and the circular footer sigil. Must be registered before
   StringCircularText so the sigil measures real .-s-char nodes. */
st.use(StringSplit);

/* Always-on, pointer-independent motion. */
st.use(StringMarquee);
st.use(StringCircularText, {
  'circular-spin-speed': reduceMotion ? 0 : 8,
});

/* Pointer-reactive motion — see `pointerFX` above. */
if (pointerFX) {
  st.use(StringTilt, { 'tilt-max': 7, 'tilt-tension': 0.2, 'tilt-friction': 0.3 });
  st.use(StringMagnetic, { radius: 150, strength: 0.45 });
  st.use(StringSpotlight, { lerp: 0.18 });
  /* Scroll-velocity response — the mascot stretches/squashes with speed. */
  st.use(StringGlide);
  st.use(StringVelocity, { 'velocity-smoothing': 0.12, 'velocity-max': 1.4 });
}

/* Run on every requestAnimationFrame (frame-aligned, no throttle). */
st.start(0);

/* Re-measure element layouts once the page has settled (lazy images/fonts
   shift document positions after StringTune's first measure) and whenever
   the viewport is resized — in particular across the 900px breakpoint where
   the ambient runes toggle visibility. */
const remeasure = () => {
  try {
    st.objectManager.refreshLayoutForRoot(document.body);
  } catch (e) { /* non-fatal */ }
};
window.addEventListener('load', remeasure);
window.addEventListener('resize', () => setTimeout(remeasure, 150));

/* Repairs any scroll object that ends a gesture in a stale state (a fast
   down-then-up trip can leave an object's cached progress stuck at an edge
   value, so e.g. the hero copy stayed invisible after scrolling back up).
   Runs once per scroll settle, never per frame. */
let settleTimer = null;
window.addEventListener('scroll', () => {
  clearTimeout(settleTimer);
  settleTimer = setTimeout(remeasure, 180);
}, { passive: true });

window.stringTune = st;

export default st;
