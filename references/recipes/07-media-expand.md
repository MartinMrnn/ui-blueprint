# 07 · Media expand that pushes the sentence aside (*media expand, text pushed*)

- **Status:** validated (test 01).
- **Natures:** place, mood; a short promise (a motto).
- **References:** Matic B04 #20, Haven B06 #26, Realevate B06 #27, Tengile "Sable Camp" B15 #71, Agrumea B02 #9.

## What it says

"Here." A sentence wraps around a small window. The window grows to full screen and pushes the sentence out of frame: you step into the place.

## Recipe

- The section is pinned over `+=180%`, and the animation is scroll-linked.
- The media is full screen, clipped to a central window (22 vw × 1.28; 46 vw on mobile) by `clip-path`, then opened to `inset(0)` (`power2.inOut`). The image goes from a `scale` of 1.45 to 1.
- The sentence is cut in two, on either side of the window (above and below on mobile). Each half moves exactly like the window's edge (same duration, same curve), as if pushed.
- At 90%: a mono caption appears on the image, with the place and a directions link.
- **Navigation:** dark over paper, light once the image reaches the top (computed theme, beyond 72% progress).

```html
<section class="expand" data-nav="dark">
  <div class="expand__media"><img alt="…" src="…w=2200"><div class="expand__shade"></div></div>
  <div class="expand__words" aria-hidden="true"><span class="expand__l">First half</span><span class="expand__r"><em>second half.</em></span></div>
  <p class="sr-only">Full sentence.</p>
  <div class="expand__caption"><span class="mono">Place caption</span><a class="mono link" href="…">Directions ↗</a></div>
</section>
```

```css
.expand { position: relative; z-index: 2; height: 100svh; overflow: hidden; background: var(--paper); color: #fff; }
.expand__media { position: absolute; inset: 0; overflow: hidden; }
.expand__media img { width: 100%; height: 100%; object-fit: cover; }
.expand__words { position: absolute; inset: 0; color: var(--ink); font-family: var(--serif); font-size: clamp(30px, 4.6vw, 84px); line-height: 1; letter-spacing: -.02em; pointer-events: none; white-space: nowrap; }
.expand__l, .expand__r { position: absolute; top: calc(50% - .5em); }
.expand__l { right: calc(50% + var(--half-w, 11vw) + 1.4vw); }
.expand__r { left: calc(50% + var(--half-w, 11vw) + 1.4vw); }
.expand__caption { position: absolute; left: var(--g); right: var(--g); bottom: var(--g); display: flex; justify-content: space-between; opacity: 0; }
@media (max-width: 760px) {
  .expand__words { font-size: 8.4vw; }
  .expand__l, .expand__r { left: 0; right: 0; text-align: center; }
  .expand__l { top: auto; bottom: calc(50% + var(--half-h, 30vw) + 14px); }
  .expand__r { top: calc(50% + var(--half-h, 30vw) + 14px); }
}
```

```js
function expand() {
  const sec = $('.expand'), media = $('.expand__media');
  const dims = () => {
    const w = small() ? innerWidth * 0.46 : Math.min(innerWidth * 0.2, 380), h = w * 1.28;
    sec.style.setProperty('--half-w', w / 2 + 'px'); sec.style.setProperty('--half-h', h / 2 + 'px');
    return { x: (innerWidth - w) / 2, y: (innerHeight - h) / 2 };
  };
  const theme = () => (tl.scrollTrigger.progress > 0.72 ? 'light' : 'dark');
  const tl = gsap.timeline({ scrollTrigger: { trigger: sec, start: 'top top', end: '+=180%', pin: true, scrub: true,
    invalidateOnRefresh: true, onUpdate: () => setNav(theme()) } });
  navGet.set(sec, theme);
  tl.fromTo(media, { clipPath: () => { const d = dims(); return `inset(${d.y}px ${d.x}px ${d.y}px ${d.x}px round 4px)`; } },
      { clipPath: 'inset(0px 0px 0px 0px round 0px)', duration: 1, ease: 'power2.inOut' }, 0)
    .fromTo('.expand__media img', { scale: 1.45 }, { scale: 1, duration: 1, ease: 'power2.inOut' }, 0)
    .to('.expand__l', { x: () => (small() ? 0 : -dims().x), y: () => (small() ? -dims().y : 0), duration: 1, ease: 'power2.inOut' }, 0)
    .to('.expand__r', { x: () => (small() ? 0 : dims().x), y: () => (small() ? dims().y : 0), duration: 1, ease: 'power2.inOut' }, 0)
    .to('.expand__caption', { opacity: 1, duration: 0.15 }, 0.9)
    .to({}, { duration: 0.3 });   // hold on the full image
}
```

## Variants

- **Video** instead of a photo.
- **Round or arched window** that opens to full screen.
- **Reverse expand:** a full-screen image shrinks into a card, then the card joins a grid (Matic).
- **Scale-through** (Horeca B06 #30): zoom into a letter of the word until it fills the screen.
