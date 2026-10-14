---
name: narrative-slides
description: Build talk decks that read as one continuous story. Use when someone asks for a presentation, talk, keynote, pitch, or "slides like X". Covers the but/therefore storyline method, a minimal dark visual system, and cross-slide animation (magic move, continuations, zooms) built with the Web Animations API.
---

# Narrative Slides

A deck built this way is a short film, not a stack of pages. Every slide is one **beat**. Each beat
is joined to the one before it by **"but"** or **"therefore"**, never by "and then". Visually, slides
are sparse and dark, and continuity carries the audience from beat to beat: something on screen
almost always moves, dims, or grows out of the previous slide instead of being replaced.

Read these before building:
- `references/storyline.md`: how to find and structure the story (do this first, always)
- `references/visual-system.md`: layout, type, color, and slide archetypes
- `references/animation.md`: entry choreography, magic move, continuations, zooms
- `assets/slide-motion.js`: drop-in helpers for the animation patterns

## Workflow

1. **Find the story before touching pixels.** Ask the user for: the audience, the one sentence
   they should leave with, the talk length, and the "naive belief" the audience walks in with.
   Then draft a **beat sheet** (one line per slide) using the but/therefore method in
   `storyline.md`. Show it to the user and get approval. Do not build slides yet.
2. **Agree on the visual system once.** Background, one font, one accent color, one secondary
   "warning" color, and what each color *means*. Write it down in a project notes file and never
   drift from it.
3. **Build one slide at a time.** Build the beat that was asked for, then stop and let the user
   react. Do not jump ahead, add slides, or "improve" earlier slides unprompted. Users who care
   about this style are particular; small controlled steps win.
4. **For every new slide, decide its relationship to the previous slide** (see the transition
   menu in `animation.md`): fresh statement, continuation, magic move, zoom, or ghost swap. Most
   slides should be continuations or magic moves.
5. **Keep a running notes file** (e.g. `NOTES.md` or the project instructions file) that records
   each slide: its label, its copy, what it inherits from the previous slide, and the names of its
   animation functions and classes. Long decks become impossible to maintain without it.
6. **Check the seams, not just the slides.** Step forward *and* backward across every transition.
   A continuation that is off by a few pixels, or flashes an empty frame, breaks the illusion.

## Non-negotiables

- One idea per slide. If a slide needs two sentences of explanation, it is two slides.
- Every slide answers "why is this here?" with "because the last slide raised a problem" (but)
  or "because the last slide established something we can now use" (therefore).
- Show before you name. Let the audience experience a phenomenon, then give it its name.
- No bullet-point slides in the main storyline. Bullets are allowed in comparison panels and backup.
- No em-dashes in slide copy. Use commas, colons, or periods.
- Every number on screen is real and computed, never decorative. If you show a curve, compute it.
- Respect `prefers-reduced-motion`: jump straight to each slide's final state.
- Anything that is not on the main path goes after a **Backup** divider at the end.
