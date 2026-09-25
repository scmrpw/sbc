/**
 * reveal.js
 * Intersection Observer — adds .visible to .reveal elements
 * as they scroll into the viewport, with stagger for siblings.
 */

(function () {
  'use strict';

  const THRESHOLD = 0.12;   // how much of element must be visible
  const STAGGER   = 80;     // ms between sibling animations

  /**
   * Returns the stagger delay for an element based on its
   * position among .reveal siblings in the same parent.
   * @param {Element} el
   * @returns {number} delay in ms
   */
  function getSiblingDelay(el) {
    const siblings = Array.from(
      el.parentElement.querySelectorAll('.reveal')
    );
    return siblings.indexOf(el) * STAGGER;
  }

  /**
   * Callback fired when observed entries change.
   * @param {IntersectionObserverEntry[]} entries
   * @param {IntersectionObserver} observer
   */
  function onIntersect(entries, observer) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;

      const delay = getSiblingDelay(entry.target);

      setTimeout(function () {
        entry.target.classList.add('visible');
      }, delay);

      observer.unobserve(entry.target);
    });
  }

  // Boot
  const io = new IntersectionObserver(onIntersect, {
    threshold: THRESHOLD,
  });

  document.querySelectorAll('.reveal').forEach(function (el) {
    io.observe(el);
  });
})();
