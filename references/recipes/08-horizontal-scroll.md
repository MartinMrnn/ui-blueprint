# 08 · Pinned horizontal scroll (*horizontal scroll + parallax in frames*)

- **Status:** validated (test 01, for reviews).
- **Natures:** proof (quotes), catalogue (projects, rooms), time (timeline).
- **References:** Butter B12 #56, Sunday B12 #59, White Desert B12 #58, Santalarch B11 #55; parallax in the frame: Art of Documentary B13 #63.

## What it says

"A gallery." The axis changes: you no longer go down, you walk along a wall. Ideal for a series of items of the same rank.

## Recipe

- The section is pinned and vertical scrolling slides the track: `x` goes from 0 to `-(track width - screen width)`, over an equal scroll distance.
- Alternate the items: intro (label, display title, link), quotes, photos in two formats (3:4 and 4:3).
- **Parallax inside the photos:** the image is 125% wide and slides from `xPercent: -20` to 0 with `containerAnimation`.
- **Quotes:** masked lines triggered with `containerAnimation`. **But** the ones already visible on arrival trigger on section entry (pitfalls §6).
- On a night background, the change of background marks the change of axis.

```css
.reviews { position: relative; z-index: 2; height: 100svh; overflow: hidden; background: var(--night); color: var(--paper); }
.reviews__track { display: flex; align-items: center; gap: clamp(28px, 4vw, 72px); height: 100%; padding: 0 var(--g); width: max-content; will-change: transform; }
.quote { margin: 0; width: clamp(280px, 30vw, 520px); flex: none; display: grid; gap: 26px; padding-top: 26px; border-top: 1px solid var(--line-inv); }
.quote blockquote { margin: 0; font-family: var(--serif); font-size: clamp(26px, 2.5vw, 44px); line-height: 1.08; }
.reviews__photo { flex: none; height: 64vh; aspect-ratio: 3 / 4; overflow: hidden; border-radius: 3px; }
.reviews__photo img { width: 125%; max-width: none; height: 100%; object-fit: cover; }
@media (max-width: 760px) { .quote, .reviews__intro { width: 78vw; } .reviews__photo { height: 52vh; } }
```

```js
function reviews() {
  const track = $('.reviews__track');
  const dist = () => track.scrollWidth - innerWidth;
  const hs = gsap.to(track, { x: () => -dist(), ease: 'none',
    scrollTrigger: { trigger: '.reviews', start: 'top top', end: () => '+=' + dist(), pin: true, scrub: true, invalidateOnRefresh: true } });
  $$('.reviews__photo img').forEach((img) => gsap.fromTo(img, { xPercent: -20 }, { xPercent: 0, ease: 'none',
    scrollTrigger: { trigger: img.parentNode, containerAnimation: hs, start: 'left right', end: 'right left', scrub: true } }));
  $$('.quote blockquote').forEach((q) => {
    const inView = q.getBoundingClientRect().left < innerWidth * 0.88;
    const trig = inView ? { trigger: '.reviews', start: 'top 55%', once: true }
                        : { trigger: q, containerAnimation: hs, start: 'left 88%', once: true };
    SplitText.create(q, { type: 'lines', mask: 'lines', autoSplit: true,
      onSplit: (self) => gsap.from(self.lines, { yPercent: 110, duration: 1.2, ease: OUT, stagger: 0.06, scrollTrigger: trig }) });
  });
}
```

## Honesty

Reviews are quoted word for word, with their source ("Google reviews") and a link to the reviews page. In from-scratch mode, with no real reviews: visible `[Review to provide]` placeholders, or another nature.

## Variants

- **Progress bar** in mono at the bottom ("03 / 08") for a catalogue.
- **Curved gallery** (Segerman B02 #10, Sobha B12 #57): WebGL, one touch per site at most.
- **Cards that tilt** slightly (`rotate` linked to scroll velocity).
- **Timeline:** giant years in the display voice scrolling faster than the images (two tracks at two speeds).
