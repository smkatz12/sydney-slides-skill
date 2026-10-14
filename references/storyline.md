# Storyline: the but/therefore method

## The core rule

Write the beat sheet as a list of one-line beats. Between every pair of beats, write the word
that connects them. Only two words are allowed:

- **BUT**: the previous beat created a tension, a limit, a surprise, or a failure.
- **THEREFORE**: the previous beat gave us something, so now we can do or ask the next thing.

If the only honest connector is **AND THEN**, the beat is either in the wrong place, needs a
bridging beat, or should be cut (or moved to Backup).

A healthy deck alternates. A long run of THEREFORE is a lecture. A long run of BUT is anxiety
with no payoff.

### Example beat sheet (generic topic: "Is our new checkout faster?")

```
1. We shipped a new checkout. Median time dropped 4 seconds.
   BUT
2. Median hides the people who gave up. What about them?
   THEREFORE
3. Let's look at everyone, including those who abandoned.
   BUT
4. Abandoners have no "finish time". We can't average them.
   THEREFORE
5. Treat them as "took at least this long" (censored data).
   THEREFORE
6. Now the picture flips: the slow tail got slower.
   BUT
7. Why would a faster form produce a slower tail?
   ...
```

Notice each beat is one sentence and could be the only text on its slide.

## Arc templates that work

**Naive approach → failure → fix** (the workhorse for technical talks)
1. Here is the obvious way to measure / decide / build X.
2. It seems fine. (Show it working on a simple case.)
3. BUT here is a case where it quietly fails. (Make the audience feel the failure.)
4. Name the failure. ("This is called ___.")
5. How do we avoid it? (Pose the question as its own slide.)
6. One option: the honest-but-rigid fix. It works. BUT it costs us something we care about.
7. THEREFORE the real solution, which keeps the guarantee and removes the cost.

**Guess → reveal → limit**
1. Pose a concrete scenario with one number.
2. Ask the audience to guess (show 3 candidate answers).
3. Reveal what the data can actually say: often "all three guesses are consistent".
4. BUT that means the data can't tell them apart. THEREFORE we need more information.

**Zoom hierarchy** (for "here is what we do" sections)
1. Overview: 3 cards.
2. Zoom into one card; it becomes the frame of the next slide, with its own sub-cards.
3. Zoom again into one sub-card; that is where the deep dive starts.
4. A breadcrumb or persistent title keeps the audience oriented on the way down.

## Beat-level tactics

- **Ask, then answer, on separate slides.** A question alone on a slide makes the room think.
  The next slide moves the question up (dimmed) and the answer fades in beneath.
- **Concrete before abstract.** "A fleet drives 50,000 miles with zero incidents" before
  "a one-sided Poisson upper bound". Give the formula only after the intuition lands.
- **Change one thing at a time.** Keep the same scene and alter one variable (10x the data, rewind
  to zero, switch the highlight). The audience sees cause and effect because nothing else moved.
- **Dim, don't delete.** Prior context stays on screen at 0.2-0.5 opacity or moves to a corner as
  a recap, so the audience never loses the thread.
- **Name it after showing it.** Show the trap happening, then a statement slide: "This is a
  well-known trap called *X*."
- **Ironic setup.** "So we have a 5% chance of being wrong... *right?*" Then disprove it.
- **Interactive payoff.** At the climax, give the presenter a slider or toggle that lets the
  audience watch the effect happen live (e.g. drag time forward, watch the false alarm occur).
- **Contrast slide.** When the audience will confuse your idea with a familiar one, put them side
  by side: muted gray panel (the familiar thing) vs accent panel (your thing), 3 short lines each.
- **Pivot lines.** A single sentence slide that turns the story: "Being X is necessary, but *not*
  sufficient." These are the hinges of the talk; give them room.
- **Make numbers meaningful.** Use real, exact computations. Round consistently. Same quantity,
  same value, on every slide where it appears.

## Copy rules

- One sentence per slide, two at most (a statement and its turn).
- Write it the way the presenter would *say* it, not as a heading. "We could wait for more
  miles..." beats "Option 1: Collect More Data".
- Italicize the single word that carries the beat (*close*, *not*, *right?*).
- Color a word only if that color means something in the deck's legend.
- No em-dashes. Ellipses are fine for suspense ("We could wait for more miles...").
- Cut every word that is not spoken emphasis. Then cut again.

## Review checklist for a beat sheet

- Can you read only the connectors (but/therefore/therefore/but...) and feel a rhythm?
- Does every BUT get resolved by a later THEREFORE?
- Is the audience's naive belief stated early and explicitly overturned?
- Does the climax happen on screen (shown), not in a sentence (told)?
- Could any slide be deleted without the next slide becoming confusing? If yes, delete it.
