# Details lexicon: naming what makes the "top level"

Analysis of October 15, 2026.

**Sources:**
- 80 public video previews from details.so (3 to 16 s each), cut into frame sequences on 16 reference boards (`boards/board-01.png` to `board-16.png`). The notation **B03 #12** refers to board 3, row 12. The boards stay local: they are not published, because the images belong to the studios.
- 44 original sites analysed technically in an automated browser: libraries, fonts, easing curves and durations, size of the largest text.

**Limits:**
- Free sample only, about 140 previews available out of thousands.
- The technical analysis only sees what can be detected from outside, on load and after a few scrolls. The figures are therefore minimums.

---

## 1. The seven constants of the "Details level"

What comes back almost everywhere, and what a prompt never produces by default:

1. **Smooth, inertial scroll:** 35 sites out of 44 use **Lenis**. The page glides instead of jumping, which makes every scroll-linked effect possible.
2. **GSAP + ScrollTrigger** on at least 32 sites out of 44. Animations are driven by scroll (*scrub*), sections are pinned (*pin*), text is split (SplitText).
3. **"Expo out" easing:** a very fast start, then a long braking. The signature curve is `cubic-bezier(0.19, 1, 0.22, 1)`. Never the default `ease`. Reveals are long (0.8 to 1.6 s), hovers short (0.2 to 0.4 s).
4. **Giant display type:** the largest text is often 150 to 540 px, with negative tracking (-2% to -10%) and tight line height (0.8 to 1.0).
5. **A restrained main font, a character font, often a mono:** the first is almost always paid (Aeonik, Suisse, Helvetica Now, ABC Diatype, Neue Haas, GT America, Founders Grotesk). The character font is a condensed grotesque, a high-contrast serif or an extended face. The mono is used for small labels and metadata.
6. **Production-grade photo, video and 3D:** cinematic shots, careful grading, 3D renders. It is half of the result, and it cannot be coded.
7. **A choreographed entrance** of 2 to 4 s: loading, logo reveal, then the hero settles. The sequence ends exactly on the final layout, with no cut.

---

## 2. Lexicon by family

### A. Entrance (*intro, preloader*)

| Term | What it is | Seen on | Usual recipe |
|---|---|---|---|
| **Progress preloader** | Waiting screen with a percentage or a bar, then an exit | ESR (B01 #3) | Counter tied to real media loading, then an animated exit |
| **Logo reveal** | The logo draws or transforms, then makes way for the site | Tengile (B02 #8), Better Off (B15 #74), ESR | Animated SVG stroke or masked letters |
| **Acronym expansion** | L-P-A-S becomes "Listen Plan Analyze Shape" | LPAS (B02 #7) | Letters staggered in cascade, then the words complete |
| **Intro-to-layout (hero settle)** | The intro element shrinks or moves to its final place | Eduard Bodak (B01 #1), Colonia Zacamil (B01 #4) | GSAP Flip (FLIP technique: measure, move, interpolate) |
| **Curtain, wipe** | A solid layer rises or falls and uncovers the page | Segerman (B02 #6), Tengile (B02 #8) | `clip-path` or `scaleY` on a solid layer |
| **Stepped wipe, pixel dissolve** | The transition runs in blocks or a pixel grid | Virugroup (B01 #5), Transform9 (B06 #29) | A grid of cells animated in cascade, or a *shader* |

### B. Kinetic typography

| Term | What it is | Seen on | Usual recipe |
|---|---|---|---|
| **Line reveal (masked text)** | Each line rises from inside an invisible mask | The Romans (B01 #2), Tengile (B02 #8) | SplitText into lines, `overflow:hidden`, `yPercent` from 100 to 0, expo.out, stagger |
| **Word or char stagger** | Words appear one after another | Eduard Bodak (B01 #1, B07 #32) | SplitText into words, a few hundredths of a second apart |
| **Blur-in** | Words go from blurred and coloured to sharp | Hazel (B07 #33) | `filter: blur` and opacity, per word |
| **Scroll highlight (text fill)** | Text "fills in" word by word while scrolling | Flow (B08 #37), Kaleida (B08 #36) | ScrollTrigger *scrub* on each word's opacity |
| **Inline media in headline** | An image or a video slots in between two words and widens | The Romans (B01 #2, B05 #23), Colonia Zacamil (B01 #4), Realevate (B04 #17), Luke Baffait (B07 #31) | *Inline* element whose width goes from 0 to its final size |
| **Style switch** | Words switch from roman to italic on scroll | The Romans (B01 #2, B05 #23) | Class toggle or variable-font axis |
| **Scramble, typewriter** | Text types or decodes letter by letter | ESR (B01 #3) | ScrambleText plugin or an equivalent script |
| **Stretch type** | Letters stretch or leave a trail | Pensatori (B07 #34), Normal is Boring (B14 #69) | Scroll-linked `scaleY`, or a variable font |
| **Scale-through** | Zoom into a letter until it fills the screen, which leads to the next section | Horeca Social (B06 #30) | Pinned section and `scale` from 1 to 30 in *scrub* |
| **Marquee** | A giant line of text scrolling continuously, often sped up by scrolling | The Romans (B04 #19), Better Off (B15 #74) | CSS or GSAP loop whose speed follows the scroll |
| **Mixed type** | One sentence mixes sans and italic serif | Virugroup (B01 #5), Vero (B15 #75), House of Honey (B16 #77) | Two families, the italic acts as colour |
| **Text assembly** | Scattered words gather into a sentence | EverWonder (B07 #35) | Flip or scroll-driven position animation |

### C. Scroll storytelling

| Term | What it is | Seen on | Usual recipe |
|---|---|---|---|
| **Pinned section** | The title stays fixed while the content scrolls past | The Romans "GLOBAL CAMPAIGNS" (B05 #21) | ScrollTrigger `pin: true` |
| **Scroll-spy list** | The active item lights up and the matching preview changes | ESR, brands (B05 #22); Kaleida, cities (B08 #36); Santalarch (B11 #55); Izanami (B16 #78) | Pinned list, opacity per item, image swap |
| **Stacked cards** | Each card lands on top of the previous one | Agrumea (B05 #24), Rectangles (B12 #60), LxL (B13 #61), Virugroup (B05 #25) | `position: sticky` and `scale` or a slight rotation |
| **Horizontal scroll** | Vertical scrolling slides the content sideways | Santalarch (B11 #55), Butter (B12 #56), Sunday (B12 #59), White Desert (B12 #58) | Pinned section and `x` in *scrub* |
| **Media expand (zoom to full-bleed)** | A small image becomes full screen on scroll | Matic (B04 #20), Haven (B06 #26), Realevate (B06 #27), Tengile "Sable Camp" (B15 #71), Agrumea (B02 #9) | `clip-path: inset()` or `scale` in *scrub* |
| **Curtain over hero** | The content rises over a fixed hero | Tengile (B13 #62) | Hero in `sticky`, next section on top |
| **Parallax** | Layers scroll at different speeds; the image slides within its frame | Art of Documentary (B13 #63), Tengile (B14 #70) | `yPercent` in *scrub* on the image inside a fixed frame |
| **Floating collage** | Scattered images drift around a central title | The Romans (B05 #21), Tengile (B14 #70), EverWonder (B07 #35) | Different parallax speeds per image |
| **Curved or bent gallery** | Images bend in perspective, as if on a cylinder | Segerman (B02 #10), Sobha (B12 #57) | WebGL (OGL, three.js) with a deformation *shader* |
| **Background colour shift** | The background colour changes from one section to the next | Milledollars (B03 #14), Virugroup (B05 #25) | CSS variable interpolated by ScrollTrigger |
| **Footer reveal** | The content lifts and uncovers a fixed footer underneath | ESR (B14 #68) | Footer in `position: fixed` under the content |

### D. Page transitions

| Term | What it is | Seen on | Usual recipe |
|---|---|---|---|
| **Overlay with label** | A black screen with a giant word bridges two pages | The Romans "EXPLORE" (B03 #11) | Barba, Swup or the framework router, with an exit and an entry animation |
| **Shared element (FLIP)** | The clicked image becomes the hero of the next page | Realevate (B04 #17), Segerman (B03 #13) | GSAP Flip, or the View Transitions API |
| **Color wipe** | A solid colour, sometimes stepped, sweeps the screen | Virugroup (B03 #15) | Animated layer during the route change |
| **Crossfade with text change** | The hero crossfades and the text is replaced | Cominvi (B04 #16) | Fade and reveal of the new text |
| **Scatter** | The page bursts into a collage, then recomposes | Maria Vasilyeva (B03 #12) | Random positions, then back |

### E. Navigation

| Term | What it is | Seen on |
|---|---|---|
| **Fullscreen menu** | Links in very large type, often staggered | Agrumea (B10 #50), LPAS (B10 #49), Virugroup (B11 #54), Maria Vasilyeva (B11 #52) |
| **Morphing nav** | The "Menu" button stretches until it becomes the panel | Haven (B13 #64), Apple (B13 #65), Pacôme Pertant (B14 #66) |
| **Mega dropdown** | Panel with an image and a blurred background behind | Odyssée (B11 #51), Butter (B11 #53) |
| **Hover-to-preview** | Hovering a link plays a video in the background | Partizan (B08 #40) |
| **Text roll** | On hover, the word exits at the top and comes back from the bottom | Agrumea (B10 #50) |

### F. Cursor and hover

| Term | What it is | Seen on |
|---|---|---|
| **Cursor-follow preview** | A thumbnail follows the mouse, then opens full screen | ESR (B08 #38) |
| **Physics object** | A 3D object reacts to the mouse | Butter, key ring (B08 #39) |
| **Fluid or shader glow** | A living light gradient follows the mouse | Luke Baffait (B09 #42) |
| **Spotlight grid** | The hovered cell lights up in a grid | Visuvate (B09 #43) |
| **Focus dim** | The hovered item is sharp and in colour, the others fade | Odyssée (B09 #45) |
| **Expanding panels** | The hovered card widens, the others shrink | AUAR (B10 #46) |
| **Row reveal** | A project row unfolds its images on hover | Griflan (B09 #41), Eduard Bodak (B10 #48) |

### G. Art direction (the fixed vocabulary)

- **XXL display type, edge-to-edge wordmark:** Haven, Telha Clarke, House of Honey (537 px), The Romans "SAY HELLO" (B14 #67), Better Off (456 px).
- **Condensed grotesk:** The Romans (RocGrotesk), Horeca (Monologue), EverWonder (Lateral Condensed), White Desert (Oswald).
- **High-contrast serif, didone:** Tengile (PP Fragment, weight 220), Vero (Louize), House of Honey (Canora), Normal is Boring (Juana).
- **Extended or wide:** Realevate and Flow (Monument Extended), LxL (Owners Wide).
- **Neo-grotesk workhorse:** Aeonik (LPAS, Daylight), Suisse (Haven), Helvetica Now (Cominvi, Pensatori), ABC Diatype (Milledollars, Butter), Neue Haas (House of Honey), GT America (Partizan), Founders Grotesk (Art of Documentary), Europa (Telha Clarke).
- **Mono labels, metadata:** Cominvi (PP Supply Mono), Partizan (GT America Mono), Matic (Trim Mono), Daylight (socialMono), Art of Documentary (Founders Grotesk Mono). Used for small captions, indexes and brackets such as "[Scroll down]" or "Works (01)".
- **Tight tracking:**
  - Eduard Bodak: -8% at 160 px;
  - Santalarch: -10% at 234 px;
  - Rectangles: -5%;
  - Visuvate: -5%.
- **Monochrome and one committed colour field:** Haven's blue, Horeca's pink, Agrumea's orange, Virugroup's green and yellow.
- **Cinematic, image-led:** Tengile, Airfield (B16 #76), ESR, Cominvi.
- **Occasional 3D and WebGL:** Pensatori's ribbons (B04 #18), Luke Baffait's sculpture (B07 #31), Butter's key ring.

---

## 3. The motion grammar, in figures

### Measured curves (the sites' `transition-timing-function`)

| Common name (GSAP) | CSS value | Sites |
|---|---|---|
| **expo.out** | `cubic-bezier(0.19, 1, 0.22, 1)` | Virugroup, ESR, Tengile, Griflan, Vero, Better Off, EverWonder, Haven |
| expo.out (variant) | `cubic-bezier(0.16, 1, 0.3, 1)` | Matic, Horeca, Odyssée, Maria Vasilyeva |
| quint.out | `cubic-bezier(0.23, 1, 0.32, 1)`, `(0.22, 1, 0.36, 1)` | Griflan, Partizan, Telha Clarke, Better Off, Matic |
| quart.out | `cubic-bezier(0.25, 1, 0.5, 1)` | Santalarch, Art of Documentary, Vero |
| expo.inOut | `cubic-bezier(0.87, 0, 0.13, 1)` | Luke Baffait (294 elements), Vero, LxL |
| "Heavy" in-out | `(0.62, 0.05, 0.01, 0.99)`, `(0.65, 0, 0, 1)`, `(0.625, 0.05, 0, 1)`, `(0.5, 0, 0, 1)` | Flow, AUAR, Haven, LxL, Hazel, Cominvi |
| back.out (slight bounce) | `cubic-bezier(0.34, 1.56, 0.64, 1)`, `(0.35, 1.75, 0.6, 1)` | Normal is Boring, LxL |

### Measured durations

- **Hovers and micro-interactions:** 0.2 to 0.4 s.
- **Reveals:** 0.6 to 1.2 s. Examples: Kaleida 1.2 s, Flow 0.735 s, Cominvi 0.8 s.
- **Big transitions:** 1.2 to 2 s. Examples: Tengile 1.6 s, Virugroup 1 to 2 s, Vero 1.2 to 1.4 s.

**Takeaway:** one curve family per site, almost always "expo" or "quint" out. That is what gives the "premium" feel: motion that starts fast and settles for a long time.

---

## 4. The actual tech stack (44 sites)

| Building block | How many | Detail |
|---|---|---|
| Lenis (smooth scroll) | 35 / 44 | Locomotive on 1 site (Sobha) |
| GSAP (incl. ScrollTrigger, SplitText, Flip) | at least 32 / 44 | often bundled in the code, so invisible as a global variable; pins detected on 11 sites |
| Split text (lines, words, letters) | at least 16 / 44 | SplitText or equivalent |
| Page transitions | Barba 3, Swup 3, the others through the Next or Nuxt router | |
| Framework | Next.js 15, Nuxt 9, Webflow 6, Framer 1 | Webflow + GSAP is very common among studios |
| Large canvases (over 200 px) | 21 / 44 | WebGL likely but not checked site by site; OGL, three.js, Unicorn Studio (EverWonder) |
| Fonts | almost all paid or exclusive | a workhorse grotesque + a character font + sometimes a mono |

Since 2025, GSAP and all its plugins (SplitText, Flip, ScrollTrigger…) are free. Lenis is open source. The whole stack is available without a licence; what costs money is fonts and media.

---

## 5. Why prompts always produce the same thing

**What a model produces by default:**
- CSS animations (a 0.6 s fade-up with `ease`), triggered once on appearance;
- no smooth scroll;
- no pinned section;
- no masked text;
- no page transition;
- common Google fonts;
- no real media.

That is the exact opposite of the seven constants above.

**What changes the result:**

1. **Name the technique and its parameters** instead of asking for "an elegant animation". Example: "masked line reveal: SplitText into lines, `yPercent` from 110 to 0, 1.2 s, expo.out, 0.08 s stagger".
2. **Impose the stack:** Lenis, GSAP (ScrollTrigger, SplitText, Flip) and a framework; one touch of WebGL at most.
3. **Show a precise reference** (a board or a video) for each moment, and compare the mock-up video side by side with the reference.
4. **Build one moment at a time** (the intro, then the hero, then a section), never a whole page at once.
5. **Treat media and fonts as mandatory ingredients**, not as finishing touches.
6. **Capture every validated recipe in a skill:** term, video reference, parameters, code.
