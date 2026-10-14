# Visual system

The look is quiet so the motion and the words can carry the story. Agree on these once per deck,
record them in the notes file, and repeat the literal values on every slide.

## Canvas

- 1920 x 1080, fixed. Absolute positioning in slide pixels is fine and makes magic moves exact.
- Near-black background (e.g. `#040404`). Not pure black, not a gradient.
- Generous empty space. Most slides use well under a third of the canvas.
- Default composition: content centered horizontally, optically centered vertically
  (slightly above true center).

## Type

- **One typeface for everything**, ideally a humane serif (e.g. Palatino / Book Antiqua /
  a Google serif with a good italic). The italic does real work as the emphasis voice.
- Math: a math renderer (e.g. KaTeX) or a matched italic for variables. Never mix two
  styles for the same symbol across slides.
- Sizes at 1920 x 1080:
  - Statement slide line: 60-80px
  - Named term / punchline word: 96-110px
  - Header sentence on a working slide: 48-56px
  - Panel titles: 36-44px; body in panels: 28-32px
  - Axis labels / captions: 24-28px
  - Source citation: 22px, white at ~38% opacity, bottom center
- Never below 22px.
- `text-wrap: balance` for statements, `pretty` for paragraphs.

## Color: few colors, fixed meanings

- **White**: the main subject and default text.
- **One accent** (e.g. a soft blue like `#80b9ff`): the hero concept, the good answer, key
  terms, the thing you want remembered. Also the color of "our" solution.
- **One secondary** (e.g. a muted rose like `#d18f99`): danger, error, false alarms, the
  surprising failure.
- **Gray** (`#9aa0a8`, or white at 20-50%): context, the familiar alternative, dimmed prior beats.

Write a legend in the notes file ("blue = baseline/solution, rose = error") and obey it on every
slide. If a word is colored, the audience should be able to guess why.

## Dimming and layering

- Prior context: opacity 0.22 (far background), 0.4-0.5 (recap still readable).
- Scrim over a busy chart to foreground a message: a full-slide rect of the background color at
  0.78-0.9 opacity. Keep corner recaps above the scrim (higher z-index) so they stay readable.
- Boxes: 1px borders at white 15-25%, radius 10-14px, fill white at ~3%. No shadows, no glows,
  no left-border accent bars, no gradients.
- Callout boxes around a value are drawn on (stroke animation), 2px, in the meaning color.

## Slide archetypes

1. **Title**: full-bleed photo bleeding in from one side and fading into the background, title
   left-aligned, a short accent rule, one line of byline.
2. **Statement**: one centered sentence, maybe a turn line fading in beneath it.
3. **Question**: one centered question. The next slide moves it up and answers beneath.
4. **Named term**: small lead line, then one big italic accent word.
5. **Working slide**: a header sentence at top (48-56px) and one visual (chart, number line,
   diagram) beneath. The header says what to notice.
6. **Recap corner**: established facts shrink to the top-left (or top-right) as a compact recap
   while the new beat fills the center.
7. **Comparison**: two boxed columns, gray (familiar) vs accent (new), icon + title + 3 short lines.
8. **Cards → zoom**: 3 cards in a row (icon, title, one italic question or outcome), one of which
   will grow into the next slide's frame.
9. **Interactive**: a chart plus a custom slider or segmented toggle that the presenter drives.
   Build controls from plain elements; stop pointer/click propagation so dragging doesn't
   advance the deck.
10. **Backup divider**: a single word, then supporting slides that are not in the main path.

## Charts

- Draw them yourself (SVG) with real computed data; restyle to the deck: no gridlines or only
  very faint ones, thin axes at white 30-40%, labels in the deck font.
- One highlighted series in the accent or secondary color, everything else gray.
- Prefer number lines and simple bars over complex plots. If a plot is dense, use a following
  slide to dim it and pull out the one thing that matters.
- Keep chart geometry constants (margins, plot width/height, axis ranges) in one place in the
  logic so cloned continuation slides draw identically.

## Imagery and icons

- Photos only where they set a scene (title, a section opener). Ask the user for real images;
  use labeled placeholders until then.
- Icons: simple line icons, consistent stroke width, white or accent. A small recurring glyph
  (e.g. the subject of the talk) can become a motif and even a slider thumb.
