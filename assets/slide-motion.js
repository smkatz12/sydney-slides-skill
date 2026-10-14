// Generic helpers for narrative-slide animation (Web Animations API).
// Coordinates are in slide pixels (default 1920-wide canvas), so they work under a scaled stage.

export const EASE_IN = 'cubic-bezier(.2,.7,.2,1)';   // enter: fades, rises
export const EASE_MOVE = 'cubic-bezier(.65,0,.25,1)'; // magic moves, zooms
const FILL = { fill: 'both' };

export const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

// Call fn(section, active) whenever a slide's active state flips.
// attr: the attribute your deck shell sets on the current slide.
export function onSlideChange(sections, fn, attr = 'data-deck-active') {
  const mo = new MutationObserver(() => sections.forEach(s => {
    const on = s.hasAttribute(attr);
    if (on === s.__wasActive) return;
    s.__wasActive = on;
    fn(s, on);
  }));
  sections.forEach(s => { s.__wasActive = undefined; mo.observe(s, { attributes: true, attributeFilter: [attr] }); });
  sections.forEach(s => { const on = s.hasAttribute(attr); s.__wasActive = on; fn(s, on); });
  return () => mo.disconnect();
}

// Per-slide animation store: cancels the previous run and returns a fresh list.
export function restart(section) {
  (section.__anims || []).forEach(a => a.cancel());
  return (section.__anims = []);
}

// Rect of el in slide coordinates relative to section.
export function rectIn(section, el, slideWidth = 1920) {
  const sr = section.getBoundingClientRect(), k = sr.width / slideWidth, r = el.getBoundingClientRect();
  return { x: (r.left - sr.left) / k, y: (r.top - sr.top) / k, w: r.width / k, h: r.height / k };
}

export function fadeUp(el, delay = 0, { dy = 24, duration = 700 } = {}) {
  return el.animate([{ opacity: 0, transform: `translateY(${dy}px)` }, { opacity: 1, transform: 'none' }],
    { duration, delay, easing: EASE_IN, ...FILL });
}

export function fadeOut(el, delay = 0, { dy = -24, duration = 500 } = {}) {
  return el.animate([{ opacity: 1, transform: 'none' }, { opacity: 0, transform: `translateY(${dy}px)` }],
    { duration, delay, easing: 'ease-out', ...FILL });
}

// Magic move: animate `target` (on the new slide) from where `fromRect` was (measured on the
// previous slide, via rectIn with the previous section). Both rects in slide coordinates.
export function flip(section, target, fromRect, { delay = 0, duration = 1000, opacityFrom = 1 } = {}) {
  const to = rectIn(section, target);
  const dx = fromRect.x + fromRect.w / 2 - (to.x + to.w / 2);
  const dy = fromRect.y + fromRect.h / 2 - (to.y + to.h / 2);
  const k = fromRect.w / to.w;
  target.style.transformOrigin = '50% 50%';
  return target.animate([
    { transform: `translate(${dx}px, ${dy}px) scale(${k})`, opacity: opacityFrom },
    { transform: 'none', opacity: 1 }], { duration, delay, easing: EASE_MOVE, ...FILL });
}

// Ghost swap: clone the previous slide's content into `ghost` (an absolutely positioned,
// inset:0 container on the new slide) and drift it out. Returns the animation.
export function ghostOut(ghost, prevSection, { skipClass = 'ghost' } = {}) {
  ghost.innerHTML = '';
  const layer = document.createElement('div');
  layer.style.cssText = 'position:absolute; inset:0;';
  [...prevSection.children].forEach(c => { if (!c.classList.contains(skipClass)) layer.appendChild(c.cloneNode(true)); });
  ghost.appendChild(layer);
  return fadeOut(layer, 0, { duration: 520 });
}

// Draw-on stroke for an SVG path/rect that has pathLength="100".
export function drawOn(el, delay = 0, duration = 1100) {
  el.style.strokeDasharray = '100';
  return el.animate([{ strokeDashoffset: 100 }, { strokeDashoffset: 0 }],
    { duration, delay, easing: 'cubic-bezier(.45,0,.3,1)', ...FILL });
}

// Number roll driven by rAF. format(v) returns the display string. Returns a cancel fn.
export function rollNumber(el, from, to, { duration = 1600, delay = 0, log = false, format = v => Math.round(v).toLocaleString() } = {}) {
  let raf, t0;
  const lerp = p => log ? Math.pow(10, Math.log10(from) + (Math.log10(to) - Math.log10(from)) * p) : from + (to - from) * p;
  const ease = p => 1 - Math.pow(1 - p, 3);
  const tick = t => {
    t0 ??= t + delay;
    const p = Math.min(1, Math.max(0, (t - t0) / duration));
    el.textContent = format(lerp(ease(p)));
    if (p < 1) raf = requestAnimationFrame(tick);
  };
  el.textContent = format(from);
  raf = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(raf);
}

// After all animations end, clear ghost layers and optionally cancel animations (when the
// final keyframe equals the natural DOM state). isCurrent() guards against stale runs.
export function settle(anims, ghosts, isCurrent, { cancel = true } = {}) {
  const end = Math.max(0, ...anims.map(a => { try { return a.effect.getComputedTiming().endTime || 0; } catch { return 0; } }));
  setTimeout(() => {
    if (!isCurrent()) return;
    ghosts.forEach(g => g && (g.innerHTML = ''));
    if (cancel) { anims.forEach(a => a.cancel()); anims.length = 0; }
  }, end + 80);
}

// Deterministic PRNG for repeatable demos.
export function mulberry32(seed) {
  return () => {
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* Example: a continuation slide that adds one line, and a magic move from the previous slide.

onSlideChange([...document.querySelectorAll('section')], (sec, active) => {
  if (sec.dataset.label !== 'Answer') return;
  const A = restart(sec);
  const q = sec.querySelector('.question'), ans = sec.querySelector('.answer');
  if (!active || reducedMotion()) return;
  // Inactive slides are often hidden (zero-size rects), so clone the previous slide into this
  // slide's ghost layer and measure the clone instead.
  const prev = document.querySelector('section[data-label="Question"]');
  const ghost = sec.querySelector('.ghost');
  A.push(ghostOut(ghost, prev));
  const from = rectIn(sec, ghost.querySelector('.question'));
  ghost.querySelector('.question').style.visibility = 'hidden';
  A.push(flip(sec, q, from), fadeUp(ans, 700));
  settle(A, [ghost], () => sec.__anims === A);
});
*/
