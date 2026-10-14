# Animation

Motion exists to show **continuity** (this is the same thing as before, now changed) and
**causality** (this changed because of that). It never decorates. Slides themselves swap
instantly; all motion happens *inside* the incoming slide, which is why continuations can look
seamless.

## Engine

- Hand-build animations with the Web Animations API (`el.animate(keyframes, options)`) in the
  deck's logic, not CSS keyframes. You get cancel, timing control, and measurable end times.
- Trigger per slide on activation. With a deck shell that marks the current slide with an
  attribute (e.g. `data-deck-active`), observe it with a `MutationObserver`. Otherwise hook the
  deck's slide-change event. See `onSlideChange` in `assets/slide-motion.js`.
- Every slide's sync function follows the same shape:
  1. Read `active`. If it equals the last stored value, return (observers fire often).
  2. Cancel this slide's previous animations and clear its ghost layer.
  3. If inactive or reduced motion: set the final state and return.
  4. Build the animation list `A`, all with `fill: 'both'`.
  5. Schedule a settle: after the last animation ends, remove ghosts and (if the final state is
     the natural DOM state) cancel the animations.
- Store animation lists per slide (on the section element or under a unique key). Never share
  one store between slides; one slide cancelling another's animations is a classic bug.
- Set any starting state **synchronously** on activation so there is never a one-frame flash
  of the final layout before the animation begins.
- Guard against duplicate runners after hot reload (e.g. a global owner token checked at the
  top of each sync).

## Timing vocabulary

- Enter easing: `cubic-bezier(.2,.7,.2,1)` (fast start, soft landing). Fades and rises.
- Move easing: `cubic-bezier(.65,0,.25,1)` (symmetric). Magic moves, zooms, flights.
- Exit: `ease-out` 300-500ms, usually with a small drift (translateY -24px).
- Durations: fades 600-800ms, moves 900-1100ms, line/box draws 900-1600ms.
- Rise distance on enter: 16-40px. Never bounce, never overshoot more than a tiny scale pop.
- Stagger: 150-300ms between siblings. A second line that "turns" a statement waits a full
  beat (~1-1.5s) so the presenter can land the first line.
- An entry sequence should finish within ~2.5s. If it needs longer, split the slide.

## Transition menu (decide one for every slide)

1. **Fresh statement**: new content fades up. Use sparingly, at section turns.
2. **Continuation**: the new slide is a pixel-exact clone of the previous slide's *end state*,
   plus one new element that animates in (a line fades up, a box draws, a scrim dims). Because
   slides swap instantly, the audience perceives "the same slide, one more thing". Rename cloned
   classes with a slide prefix to avoid selector collisions. This is the most-used transition.
3. **Magic move (FLIP)**: an element that exists on both slides animates from its old position
   and size to its new one. Measure the source element's rect on the previous slide, measure
   the target's rect, animate the target `from translate(dx,dy) scale(k)` `to none`. Use it to
   move a sentence to a corner, pull a number to center, or fly a value onto an axis.
   - Animate per-word spans when a title re-flows to a different size.
   - Use HTML elements for things that fly. SVG `<text>` honors transforms unreliably.
   - Lock the alignment point that matters (e.g. chart baseline to baseline) via
     `transform-origin`, so the important part doesn't jump.
4. **Ghost swap**: clone the previous slide's content into a ghost layer on the new slide, fade
   and drift it out while the new content fades in. Use when a section stays but its body changes.
5. **Zoom**: one card on the previous slide grows into the new slide's frame. Clone the previous
   slide into a ghost layer, scale it toward the card's center while fading it out, animate the
   frame from the card's rect to its final rect, fly the card's icon and title words to their
   new homes, then fade in the new sub-cards with a stagger.
6. **Reverse moves**: when you return to a scene, move things back to where the audience last
   saw them (e.g. counters return to their earlier side-by-side spots).

## Effect recipes

- **Draw-on box/line**: SVG rect or path with `pathLength="100"`, animate `strokeDashoffset`
  100 → 0. Measure the target text with a `Range` to size the box.
- **Number roll**: drive `textContent` from a `requestAnimationFrame` loop with eased progress
  (linear or log interpolation as the quantity demands); add a small scale pop at the end.
- **Dim wipe**: a scrim rect inserted *between* chart layers (above the noisy data, below the
  thing you are keeping) that wipes in with `scaleX(0 → 1)` from the left.
- **Rotate-and-lay-flat**: a vertical slice of a chart rotates -90deg onto a horizontal axis
  while the rest of the chart fades away.
- **Trail / accumulation**: as an object moves along a line, leave behind marks whose height
  encodes a measured value (seeded random data so it is identical every run).
- **Counter climb**: a quantity races toward a limit while a comparison quantity stays flat,
  making divergence visible without a chart.
- **Scale-pop for a key symbol**: opacity 0 → 1 with scale 0.85 → 1.05 → 1.

## Interactivity

- Build sliders and toggles from plain elements with pointer events; style them in the deck's
  language (thin track, a glyph from the talk as the thumb).
- `stopPropagation` on pointerdown/click so interaction never advances the deck.
- Use seeded randomness (e.g. a small mulberry32 PRNG) so the demo is identical every time and
  the presenter knows exactly where the dramatic moment happens.
- It is fine to "stick" a slider at the dramatic moment (e.g. clamp at the first threshold
  crossing) and change color when it is reached.

## Reliability checklist

- Step forward and backward through every transition, including fast double-clicks.
- Reduced motion: every slide lands in its final state with no animation.
- No first-frame flash on entry; no stuck opacity-0 element after leaving and returning.
- Prints/exports show the final state of each slide.
- Animations measured from a hidden or backgrounded tab may appear frozen; verify in the
  visible tab.
