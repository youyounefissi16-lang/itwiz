/* ITWIZ Realm hero micro-interactions: progressive enhancement only.
   The 2D portal was removed (the hero is now a full-viewport 3D scene),
   so the only remaining job here is triggering the entrance reveal. */
(function () {
  'use strict';
  var hero = document.querySelector('.realm-hero');
  if (!hero) return;

  requestAnimationFrame(function () { hero.classList.add('is-entering'); });
})();
