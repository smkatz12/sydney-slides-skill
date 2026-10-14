# sydney-slides-skill

A Claude skill for making talk decks that tell a story, not a stack of pages.

It packages three things:

- **Storyline:** the *but / therefore* method. Each slide is one beat, and every beat connects to the previous one with "but" (a problem or surprise) or "therefore" (a consequence), never "and then".
- **Visual system:** dark, sparse slides with one serif typeface, one accent color, and colors that always mean the same thing.
- **Motion:** continuity between slides (magic moves, continuations, zooms, ghost swaps) built with the Web Animations API, plus drop-in helpers.

## Install

Clone the repo, then copy the `sydney-slides-skill` folder into your Claude skills directory, or upload its files to your Claude project.

```
git clone https://github.com/<your-username>/sydney-slides-skill.git
```

## Use

Ask Claude for a talk and let it work the way the skill describes:

> Make a 15-minute talk for product managers about why median load time is misleading. Use the narrative-slides skill.

Claude will ask about your audience and the takeaway, draft a beat sheet for you to approve, then build one slide at a time.

## Contents

```
SKILL.md                      entry point and workflow
references/storyline.md       the but/therefore method, arcs, beat tactics, copy rules
references/visual-system.md   layout, type, color, slide archetypes, charts
references/animation.md       timing, transition menu, effect recipes, reliability checklist
assets/slide-motion.js        Web Animations helpers (FLIP, ghost swap, draw-on, number roll)
```

## License

MIT. See `LICENSE`.
