# 01 · Intro that becomes the hero (*progress preloader + image burst + intro-to-layout*)

- **Status:** validated (test 01).
- **Natures:** identity.
- **References:** ESR B01 #3 (counter), Eduard Bodak B01 #1, Colonia Zacamil B01 #4 (the intro becomes the layout), Segerman B02 #6.

## What it says

"Here is who." The intro is not a waiting screen: it is the first shot of the film. It ends exactly on the hero, with no cut.

## Timeline (about 3.5 s, scroll released around 2.9 s)

| t (s) | What happens |
|---|---|
| 0 | Paper background. Two mono labels at the top (name, trade) and a giant mono counter at the bottom left, from 000 to 100 in 1.75 s (`power3.inOut`). |
| 0.1 | The hero media (full screen, video behind) is clipped by `clip-path` into a **horizontal line**, then opens into a portrait **window** (20 vw × 1.3; 50 vw on mobile). 1 s, `IO` curve. |
| 0.35 | **Burst** of 5 photos of the light inside the window, 0.24 s each, each photo going from a `scale` of 1.18 to 1. |
| ≈1.6 | The last photo clears: the video appears in the window. The counter and the labels exit through the top (`expo.in`). |
| ≈1.65 | The window opens to full screen (1.45 s, `IO`) while the video zooms out from 1.4 to 1 (2.1 s, `OUT`). |
| +0.55 | The name rises letter by letter (card 02). |
| +0.8 | The navigation slides down and the hero metadata rises from its masks. |

## HTML

```html
<div class="intro" aria-hidden="true">
  <div class="intro__top"><span class="mono">Name</span><span class="mono">Trade, city</span></div>
  <div class="intro__count mono"><span class="js-count">000</span></div>
</div>
<section class="hero" data-nav="light">
  <div class="hero__media">
    <video class="hero__video" muted playsinline loop preload="auto" poster="…"></video>
    <div class="hero__flicker" aria-hidden="true"><img src="…"><img src="…"><!-- 5 images --></div>
    <div class="hero__shade"></div>
  </div>
  <div class="hero__content">
    <div class="hero__meta"><div class="meta"><div class="meta__in">…</div></div>…</div>
    <h1 class="hero__word"><span class="sr-only">Full name, trade</span><span class="hero__word-inner" aria-hidden="true">Name</span></h1>
  </div>
</section>
```

## Key CSS

```css
.intro { position: fixed; inset: 0; z-index: 80; pointer-events: none; }
.intro__count { position: absolute; left: var(--g); bottom: 18px; font-size: clamp(40px, 6vw, 96px); letter-spacing: -.04em; line-height: 1; overflow: hidden; }
.intro__count span, .intro__top .mono { display: block; overflow: hidden; }
.hero { position: sticky; top: 0; height: 100svh; overflow: hidden; background: var(--paper); color: #fff; }
.hero__media { position: absolute; inset: 0; overflow: hidden; }
.hero__video, .hero__flicker img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.hero__flicker img { opacity: 0; }
.hero__meta { display: grid; grid-template-columns: repeat(4, 1fr); align-items: start; gap: var(--g); }
.meta { overflow: hidden; }   /* one mask per block */
```

## JS

```js
function intro() {
  const media = $('.hero__media'), flick = $$('.hero__flicker img'), count = $('.js-count');
  const metaParts = $$('.hero__meta .meta__in');
  const done = () => { document.body.classList.remove('is-loading'); $('.intro')?.remove(); lenis.start(); ScrollTrigger.refresh(); };
  if (reduce) { gsap.set(media, { clipPath: 'none' }); done(); return; }

  const vw = innerWidth, vh = innerHeight;
  const fw = small() ? vw * 0.5 : Math.min(vw * 0.2, 340), fh = fw * 1.3;
  const ix = (vw - fw) / 2, iy = (vh - fh) / 2;
  const frame = `inset(${iy}px ${ix}px ${iy}px ${ix}px round 4px)`;
  const closed = `inset(${vh / 2}px ${ix}px ${vh / 2}px ${ix}px round 4px)`;

  gsap.set(media, { clipPath: closed });
  gsap.set(wordSplit.chars, { yPercent: 112 });
  gsap.set('.nav', { autoAlpha: 0, y: -14 });
  gsap.set(metaParts, { yPercent: 110 });
  gsap.set(heroVideo, { scale: 1.4 });

  const c = { v: 0 }, step = 0.24;
  const tl = gsap.timeline({ onComplete: done });
  tl.to(c, { v: 100, duration: 1.75, ease: 'power3.inOut', onUpdate: () => (count.textContent = String(Math.round(c.v)).padStart(3, '0')) }, 0)
    .from('.intro__top .mono', { yPercent: 110, duration: 1, ease: OUT, stagger: 0.08 }, 0.05)
    .fromTo(media, { clipPath: closed }, { clipPath: frame, duration: 1, ease: IO, immediateRender: false }, 0.1);
  flick.forEach((img, i) => {
    tl.fromTo(img, { opacity: 1, scale: 1.18 }, { scale: 1, duration: step, ease: 'none', immediateRender: false }, 0.35 + i * step)
      .set(img, { opacity: 0 }, 0.35 + (i + 1) * step);
  });
  const t2 = 0.35 + flick.length * step + 0.05;
  tl.to(['.intro__count span', '.intro__top .mono'], { yPercent: -110, duration: 0.7, ease: 'expo.in' }, t2 - 0.3)
    .fromTo(media, { clipPath: frame }, { clipPath: 'inset(0px 0px 0px 0px round 0px)', duration: 1.45, ease: IO, immediateRender: false }, t2)
    .to(heroVideo, { scale: 1, duration: 2.1, ease: OUT }, t2)
    .to(wordSplit.chars, { yPercent: 0, duration: 1.5, ease: OUT, stagger: 0.04 }, t2 + 0.55)
    .to('.nav', { autoAlpha: 1, y: 0, duration: 1.2, ease: OUT }, t2 + 0.8)
    .to(metaParts, { yPercent: 0, duration: 1.2, ease: OUT, stagger: 0.05 }, t2 + 0.8);
  // Release scrolling as soon as the layout is in place
  tl.eventCallback('onUpdate', () => {
    if (tl.time() > t2 + 1.1 && document.body.classList.contains('is-loading')) { document.body.classList.remove('is-loading'); lenis.start(); }
  });
}
```

Video: SD source on mobile, HD on desktop, `heroVideo.play()` on load.

## Pitfalls

- Always write `fromTo` with four-value `clip-path` strings (pitfalls §1).
- The last image of the burst must give way to a video that is already playing. Otherwise the poster shows, which is still acceptable.

## Variants, so as not to repeat the same intro

- **Logo reveal** (SVG stroke, Tengile B02 #8), then the logo shrinks into the navigation (Flip).
- **Acronym expansion** (LPAS B02 #7) when the name lends itself to it.
- **Curtain without a counter** (Segerman B02 #6): a solid layer in the brand colour rises and uncovers the video.
- **Counter only, then a stepped wipe** (Virugroup B01 #5).
- **A window of a different shape:** arch, circle, or a horizontal 16:9 window.
