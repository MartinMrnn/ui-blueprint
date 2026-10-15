# Grammar

A site keeps a single grammar from start to finish. Consistency is what makes it feel premium, not the number of effects.

## 1. Easing: one family per site

| Family | Out (reveals) | In-out (transitions) | Character |
|---|---|---|---|
| **expo** (test 01) | `expo.out` = `cubic-bezier(0.19, 1, 0.22, 1)` | `expo.inOut` = `cubic-bezier(0.87, 0, 0.13, 1)` | very fast start, long braking: luxury, calm |
| **quint** | `quint.out` = `cubic-bezier(0.23, 1, 0.32, 1)` | `cubic-bezier(0.83, 0, 0.17, 1)` | softer, editorial |
| **quart** | `quart.out` = `cubic-bezier(0.25, 1, 0.5, 1)` | `cubic-bezier(0.76, 0, 0.24, 1)` | crisp, architectural |
| **heavy** | | `cubic-bezier(0.65, 0, 0, 1)` or `(0.62, 0.05, 0.01, 0.99)` | massive transitions (curtains) |

- Reveals use the out curve; transitions and pins use the in-out curve; CSS hovers use the same curve as the out.
- Scroll-linked animations (*scrub*) use `ease: 'none'`, or `power2.inOut` on a media expand.
- Each new site changes family from the previous one, unless the light calls for the same.

## 2. Durations, in three bands

| Band | Duration | Use |
|---|---|---|
| Micro | 0.2 to 0.55 s | hover, text roll, focus |
| Reveal | 0.8 to 1.5 s | lines, letters, block entrances |
| Transition | 0.9 to 1.5 s, up to 2 s for the intro | curtains, shared element, morphing |

## 3. Basic gestures

- **Mask.** Never use a generic fade-up. Text rises from inside a mask (`yPercent` from 110 to 0), split by SplitText with `mask: 'lines'` or `'chars'`.
- **Frame.** Media open through `clip-path: inset()` (from a line to a frame, then to full screen).
- **The image breathes in its frame.** As it appears, the image goes from a `scale` of 1.2–1.45 to 1, or slides 20% in parallax.
- **Staggers:**
  - letters: 0.03 to 0.045 s;
  - lines: 0.06 to 0.1 s;
  - scrubbed words: 0.1 to 0.12;
  - blocks: 0.05 to 0.08 s.
- **Triggered or scroll-linked?**
  - Trigger (`once: true`) what is read: titles, paragraphs, cards.
  - Link to scroll (*scrub*) what is watched: media, highlights, pins, galleries.

## 4. The three type voices

| Voice | Role | Settings |
|---|---|---|
| **Display** | emotion, the name, big words | 150 to 540 px, fitted to the width for a name; tracking -2% to -6%; line height 0.8 to 1 |
| **Workhorse** | information, list titles, body text | titles 5 to 7 vw, tracking -4% to -5%; body 15 to 17 px |
| **Mono** | metadata: labels, indexes "(01)", hours, credits | 10.5 to 12 px, caps, tracking +2% |

Inside a workhorse sentence, one word in display italic acts as colour (*mixed type*).

Free Google Fonts, by voice (the references use paid fonts):

- **Workhorse, grotesques:** Inter Tight (test 01), Geist, Hanken Grotesk, Instrument Sans, Manrope, Schibsted Grotesk, Host Grotesk.
- **Display, serifs:**
  - Instrument Serif (test 01): elegant and narrow;
  - Fraunces: warm, and variable;
  - Newsreader: editorial;
  - Bodoni Moda: luxury, very high contrast;
  - DM Serif Display: high contrast;
  - Cormorant: classic and fine.
- **Display, condensed grotesques:** Oswald, Anton, Big Shoulders Display, Bebas Neue, Barlow Condensed.
- **Display, wide:** Unbounded, Syne.
- **Mono:** Geist Mono (test 01), JetBrains Mono, IBM Plex Mono, DM Mono, Space Mono.

Change the trio from one site to the next (see the registry). If the client has brand fonts, keep them.

## 5. Palettes: the light decides

Three possible schemes:

1. **Paper, ink, night, and the photo brings the colour** (test 01). Paper `#ece8e1`, ink `#161512`, night `#131210`.
2. **A committed colour field:** one strong colour as the background of whole sections (Haven's blue, Agrumea's orange). Draw it from the light.
3. **Dark monochrome:** night dominates, bright media, paper-coloured text.

No decorative gradients. The only overlays are dark gradients under text set on an image.

## 6. Layout

- **Gutter:** `clamp(16px, 2.2vw, 32px)`, and an implicit 12-column grid.
- **Strong indent:** a manifesto paragraph starts a quarter or a third of the way across, with its mono label in the margin.
- **Mono labels in brackets:** "(The Office)", "(03)", "(Contact)".
- **Hairlines** at 15% opacity between list rows.
- **Generous vertical breathing room:** 14 to 22 vh between sections.
