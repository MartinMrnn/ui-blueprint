# Draft recipes

These recipes come from the lexicon (`../lexicon.md`) and the boards, but **have not been built or checked yet**. The code is a sketch.

Before using one:
1. build it in isolation;
2. capture it frame by frame;
3. compare it with its reference on the board;
4. once the user approves it, turn it into a numbered card, then remove its section from here.

---

## Identity

### Logo reveal
- **References:** Tengile B02 #8, Better Off B15 #74.
- **Sketch:**
  - SVG logo with paths. For each path, `strokeDasharray` and `strokeDashoffset` equal its length, then the offset goes down to 0 (1.4 s `IO`, 0.1 s stagger).
  - Then the fill appears (0.4 s), and the logo shrinks into the navigation (Flip).
- **Pitfall:** it needs a clean SVG of the logo with strokes, not shapes outlined as filled contours.

### Acronym expansion
- **Reference:** LPAS B02 #7.
- **Sketch:** each initial is a block. The rest of the word is masked (width 0), then opens in cascade (`width: auto` through Flip, or `clip-path`).

### Scale-through
- **Reference:** Horeca Social B06 #30.
- **Sketch:**
  - Section pinned over `+=150%`, with the word in the centre.
  - `scale` from 1 to 30 linked to scroll, with `transform-origin` set on the counter of a letter (the "o", for example, measured in JS).
  - The background of the next section shows through the letter.
- **Pitfall:** scaled-up text gets blurry. Use SVG, or `will-change: transform` with an already large base size.

## Promise

### Style switch on scroll
- **Reference:** The Romans B05 #23.
- **Sketch:** key words have two layers, roman and display italic, as in card 05. The switch happens through ScrollTrigger when the word crosses the middle of the screen, both ways.

### Blur-in
- **Reference:** Hazel B07 #33.
- **Sketch:** split words, `filter: blur(14px)`, `opacity: 0` and `y: 10`, to sharp, in 1.1 s `OUT`, 0.03 s stagger, triggered once.
- **Pitfall:** `blur` is expensive on a long sentence. No more than 25 words.

### Text assembly
- **Reference:** EverWonder B07 #35.
- **Sketch:** words placed randomly (`x`, `y` up to ±30 vw, `rotate` up to ±12°), joining their place in *scrub* over a pinned section.

## Choice and catalogue

### Cursor-follow preview
- **Reference:** ESR B08 #38.
- **Sketch:**
  - A fixed 22 vw image with `pointer-events: none`.
  - `xTo = gsap.quickTo(el, 'x', { duration: .6, ease: 'power3' })`, same for `y`.
  - On entering a row: change image (stacked, revealed through `clip-path`) and `scale` from 0.6 to 1.
  - On click: shared element (card 06) from that preview.
- **Mobile:** thumbnails in the row (card 05).

### Expanding panels
- **Reference:** AUAR B10 #46.
- **Sketch:** a row of N panels with `flex: 1`. On hover, the hovered panel goes to `flex: 4` (0.9 s `OUT`) and its text appears. On mobile, the panels stack vertically.

### Scroll-spy list
- **References:** ESR B05 #22, Kaleida B08 #36, Izanami B16 #78.
- **Sketch:**
  - Two columns: the list scrolls, the preview sticks (`sticky`).
  - Each item has a ScrollTrigger (`start: 'top center'`, `end: 'bottom center'`) that lights it up (opacity 1, the others at 0.25) and changes the preview image through `clip-path` (bottom to top).

### Stacked cards
- **References:** Agrumea B05 #24, Rectangles B12 #60, LxL B13 #61.
- **Sketch:**
  - Each card is `position: sticky; top: 10vh + i * 2vh`.
  - When the next one arrives, the previous one goes from a `scale` of 1 to 0.92 and fades (*scrub*).
- **Pitfall:** only works well with 3 to 6 cards of fixed height.

### Floating collage
- **References:** The Romans B05 #21, Tengile B14 #70.
- **Sketch:** 5 to 7 images around a central title, each with its own parallax speed (`yPercent` from -10 to -60, in *scrub*).

### Spotlight grid
- **Reference:** Visuvate B09 #43.
- **Sketch:** on hovering a cell, a radial gradient (CSS variable updated on `mousemove`) lights the cell, and the others stay dark.

## Proof

### Logo or press marquee
- **References:** The Romans B04 #19, Better Off B15 #74.
- **Sketch:**
  - The track is duplicated, and `xPercent` goes from 0 to -50 in a loop (`repeat: -1`, `ease: 'none'`).
  - The speed follows the scroll velocity (`lenis.velocity`, with a smoothed `timeScale`). The direction flips with the scroll.
- **Honesty:** real clients or media only.

### Pinned stat
- **Sketch:** a pinned section, with a giant figure counted in *scrub* from 0 to the value.
- **Honesty:** **only a figure published by the client.**

## Place and mood

### Parallax in the frame
- **References:** Art of Documentary B13 #63, Tengile B14 #70.
- **Sketch:** the image is 120% tall inside an `overflow: hidden` frame, with `yPercent` from -10 to 10 in *scrub*.

### Background colour shift
- **References:** Milledollars B03 #14, Virugroup B05 #25.
- **Sketch:**
  - `--bg` on `body`, interpolated by ScrollTrigger (`onEnter`, `onEnterBack`, with `gsap.to(document.body, { '--bg': colour, duration: .8 })`).
  - Each section declares `data-bg`. The navigation colour follows (`navGet`).

## Process

### Pinned steps
- **Reference:** The Romans "GLOBAL CAMPAIGNS" B05 #21.
- **Sketch:**
  - Section pinned over `+=N*80%`, fixed title on the left.
  - On the right, the steps replace each other: the outgoing one rises into its mask, the incoming one comes out of its own.
  - A mono counter "01 / 04" and a progress bar.

## Action

### Button that becomes a form
- **Sketch:** as in card 09. The "Book" button grows through `clip-path` to the form panel, then the fields rise in cascade.
- **Honesty:** no fake submission. Use a real `mailto:` or an existing client tool, otherwise visible placeholders.

### Magnetic button
- **Sketch:** `quickTo` on x and y, ±8 px, towards the cursor when it is less than 80 px away. Return to 0 with `elastic.out(1, .4)`.
- **Avoid** on a restrained site: it can feel gimmicky.

## One touch of WebGL, at most

### Curved gallery, scroll deformation
- **References:** Segerman B02 #10, Sobha B12 #57.
- **Sketch:** OGL or three.js, one texture per image, a curvature *shader* linked to scroll velocity.
- **Limit:** one WebGL touch per site, with a CSS fallback on mobile or without WebGL.
