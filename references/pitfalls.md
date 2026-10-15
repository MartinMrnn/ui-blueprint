# Technical pitfalls already met

Each pitfall cost one iteration on test 01. This is the difference between "it works" and "it's finished".

## Animation

1. **`clip-path` read from the computed style.**
   - Problem: the browser shortens `inset(321px 547px 321px 547px)` to `inset(321px 547px)`. GSAP then pairs the values wrongly, and the frame opens askew.
   - Fix: always use `fromTo` with an explicit four-value start string, including for closing (menu, overlays, detail panel).
2. **A CSS transition on a property GSAP animates.**
   - Problem: the list rows stayed invisible. On `ScrollTrigger.refresh()`, a `from()` rereads the value mid-transition and records a wrong end value (0).
   - Fix: animate an inner element (the button rather than the row), or remove the CSS transition from that property.
3. **Letters split, then fitted to the width.**
   - Problem: SplitText splits the letters and breaks kerning, so the width changes.
   - Fix: split first (`type: 'chars'`), then fit the size (`fitWord`), and refit on resize.
4. **`text-indent` and split words.**
   - Problem: the words become `inline-block` and inherit the indent.
   - Fix: `.manifesto__text .w { text-indent: 0 }` (with `wordsClass: 'w'`).
5. **Masked reveal inside a grid.**
   - Problem: a shorter cell is stretched to the height of the tallest, so a `yPercent: 110` stays visible inside the cell.
   - Fix: `align-items: start` on the grid, and one mask per block (`.meta > .meta__in`).
6. **First item of a horizontal scroll.**
   - Problem: with `containerAnimation`, items already visible on arrival never trigger until the track starts moving.
   - Fix: trigger those on section entry (`trigger: section, start: 'top 55%'`).
7. **Flip between two different elements.**
   - Put the same `data-flip-id` on the source when calling `Flip.getState`, then `Flip.from(state, { targets: target, absolute: true, scale: false })`. `scale: false` avoids distorting the image.
   - On close: `Flip.fit(target, source, { duration, ease, scale: false })`, then `clearProps: 'all'`.
   - Hide the source during the flight (`opacity: 0`) and keep it open (`.is-held`) so it is at full size for the return.

## Scroll

8. **Wiring Lenis and ScrollTrigger.**
   - `lenis.on('scroll', ScrollTrigger.update)`, `gsap.ticker.add(t => lenis.raf(t * 1000))`, `gsap.ticker.lagSmoothing(0)`.
   - `history.scrollRestoration = 'manual'` and `scrollTo(0, 0)` on load.
   - `lenis.stop()` during the intro and overlays. Put `data-lenis-prevent` on an overlay that scrolls.
9. **Sticky hero.**
   - Problem: a hero in `position: sticky` stays stuck until the end of its parent.
   - Fix: wrap it with the section that covers it (`.hero-wrap`), and pause the video once covered.
10. **Navigation colour over a pinned section whose background changes** (the light frame becomes a full-screen photo).
    - Problem: `data-nav` is not enough.
    - Fix: compute the theme from progress (`navGet.set(section, () => progress > 0.72 ? 'light' : 'dark')`). The navigation triggers use this computation in `onLeaveBack`.
11. **ScrollTrigger order.** Create them in page order. Navigation triggers take `refreshPriority: -1`, so they are recalculated after the pins.
12. **Footer reveal.**
    - The footer is `position: fixed` under `main` (z-index 1 against 2), and `main` gets a `margin-bottom` equal to the footer height.
    - On mobile, put it back in the flow, otherwise a footer taller than the screen gets cut off.
    - Anchors to the contact go to `lenis.limit` on desktop.

## Mobile

13. **Hover layer that wraps differently.**
    - Problem: the italic version of a title, being narrower, fits on one line and shows under the regular version, which takes two.
    - Fix: hide `.t-alt` on mobile.
14. **Fixed action bar hiding the giant wordmark.** Show it only once the hero is left (`trigger: next section, start: 'top 55%'`).
15. **Text pushed by a media expand overflows at 390 px.** On mobile, place the sentence above and below the frame and push it vertically.

## Misc

16. **Missing favicon**: a 404 in the console. Add `<link rel="icon" href="data:,">`.
17. **Fonts**: wait for `document.fonts.ready` before any split (with a 2.5 s `setTimeout` fallback).
18. **Automated captures**: jumping the scroll in one go (`immediate`) does not fire the intermediate `once` triggers the way a real scroll does. `scripts/capture.js` therefore moves in small steps.
