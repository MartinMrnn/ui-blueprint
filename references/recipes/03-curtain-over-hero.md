# 03 · Curtain over the hero (*curtain over hero*)

- **Status:** validated (test 01).
- **Natures:** place, mood; transition from the first screen to reading.
- **References:** Tengile B13 #62.

## What it says

You do not leave the image, you cover it. The next section rises like a page laid over a photo.

## Recipe

- The hero is `position: sticky; top: 0`. The next section (opaque background, `z-index: 2`) scrolls over it.
- **Wrap the hero and the next section** in the same parent, so the hero stops sticking afterwards.
- While it is covered, linked to scroll: the media goes from a `scale` of 1 to 1.1, and the hero content rises (`yPercent: -18`) and fades (`opacity: 0.25`).
- Once covered, the video pauses.

```html
<div class="hero-wrap">
  <section class="hero">…</section>
  <section class="manifesto" data-nav="dark">…</section>
</div>
```

```js
gsap.timeline({ scrollTrigger: { trigger: '.manifesto', start: 'top bottom', end: 'top top', scrub: true } })
  .to('.hero__media', { scale: 1.1, ease: 'none' }, 0)
  .to('.hero__content', { yPercent: -18, opacity: 0.25, ease: 'none' }, 0);
ScrollTrigger.create({ trigger: '.manifesto', start: 'top top',
  onEnter: () => heroVideo.pause(), onLeaveBack: () => heroVideo.play().catch(() => {}) });
```

## Variants

- **Section rising with rounded corners** (24 px) that flatten as it reaches the top.
- **Hero that darkens** (black overlay from 0 to 0.5) instead of fading.
- **Hero that shrinks into a card** (`scale` from 1 to 0.9, growing `border-radius`) while the next section rises.
