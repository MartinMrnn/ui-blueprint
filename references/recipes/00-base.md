# 00 · Technical base

Status: validated (test 01).

The plumbing shared by every site. It imposes **no layout**: only loading, scrolling, navigation, basic reveals and utilities.

## HTML: head and scripts

```html
<link rel="icon" href="data:,">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=<WORKHORSE>&family=<DISPLAY>&family=<MONO>&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/lenis@1.3.4/dist/lenis.css">
<link rel="stylesheet" href="styles.css">
…
<script src="https://cdn.jsdelivr.net/npm/lenis@1.3.4/dist/lenis.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/SplitText.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/Flip.min.js"></script>
<script src="app.js"></script>
```

The `<body>` carries `class="is-loading"` during the intro.

## CSS: tokens and utilities

```css
:root {
  /* Palette: drawn from the light (grammar §5) */
  --paper: #ece8e1; --ink: #161512; --ink-2: #6b665d; --night: #131210;
  --line: rgba(22,21,18,.16); --line-inv: rgba(236,232,225,.22);
  /* Three voices (grammar §4) */
  --sans: "Inter Tight", "Helvetica Neue", Arial, sans-serif;
  --serif: "Instrument Serif", "Times New Roman", serif;
  --mono: "Geist Mono", ui-monospace, Menlo, monospace;
  /* One easing family (grammar §1) */
  --e-out: cubic-bezier(0.19, 1, 0.22, 1);
  --e-io: cubic-bezier(0.87, 0, 0.13, 1);
  --g: clamp(16px, 2.2vw, 32px);
}
*, *::before, *::after { box-sizing: border-box; }
html { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
body { margin: 0; background: var(--paper); color: var(--ink); font: 400 16px/1.5 var(--sans); }
body.is-loading { overflow: hidden; }
img, video { display: block; max-width: 100%; }
a { color: inherit; text-decoration: none; }
button { font: inherit; color: inherit; background: none; border: 0; padding: 0; cursor: pointer; }
:focus-visible { outline: 2px solid currentColor; outline-offset: 3px; }
.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
.mono { font-family: var(--mono); font-size: 11.5px; line-height: 1.4; letter-spacing: .02em; text-transform: uppercase; }
.mask { display: block; overflow: hidden; padding-bottom: .04em; }
.mask > span { display: block; }
```

## JS: bootstrapping

```js
(() => {
  gsap.registerPlugin(ScrollTrigger, SplitText, Flip);
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const small = () => window.innerWidth <= 760;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const OUT = 'expo.out', IO = 'expo.inOut';            // the site's easing family
  const expoInOut = (t) => (t === 0 ? 0 : t === 1 ? 1 : t < 0.5 ? Math.pow(2, 20 * t - 10) / 2 : (2 - Math.pow(2, -20 * t + 10)) / 2);

  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  window.scrollTo(0, 0);

  // Smooth scroll: Lenis driven by the GSAP ticker
  const lenis = new Lenis({ lerp: 0.085, smoothWheel: !reduce });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  lenis.stop();                 // released at the end (or middle) of the intro
  window.__lenis = lenis;       // for scripts/capture.js

  function init() {
    // intro(); moments…; lineReveals(); navTheme(); anchors();
    window.addEventListener('load', () => ScrollTrigger.refresh());
  }

  // Fonts loaded before any text split
  let started = false;
  const start = () => { if (!started) { started = true; init(); } };
  document.fonts.ready.then(start);
  setTimeout(start, 2500);
})();
```

## Masked line reveal (everywhere)

```js
function lineReveals() {
  $$('.js-lines').forEach((el) => SplitText.create(el, {
    type: 'lines', mask: 'lines', autoSplit: true,
    onSplit: (self) => gsap.from(self.lines, {
      yPercent: 110, duration: 1.2, ease: OUT, stagger: 0.08,
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    }),
  }));
}
```

## Navigation whose colour follows the section

Each section carries `data-nav="light|dark"` (the colour of the navigation text: light over an image or night, dark over paper). A section whose background changes during a pin registers a computation in `navGet`.

```js
const navEl = $('.nav');
const setNav = (t) => navEl.classList.toggle('is-dark', t === 'dark');
const navGet = new Map();   // section → () => 'light' | 'dark'

function navTheme() {
  const secs = $$('main [data-nav]');
  const themeOf = (s) => (navGet.has(s) ? navGet.get(s)() : s.dataset.nav);
  secs.forEach((sec, i) => ScrollTrigger.create({
    trigger: sec, start: 'top 36px', refreshPriority: -1,
    onEnter: () => setNav(themeOf(sec)),
    onLeaveBack: () => setNav(i ? themeOf(secs[i - 1]) : secs[0].dataset.nav),
  }));
}
```

```css
.nav { position: fixed; inset: 0 0 auto 0; z-index: 50; display: flex; justify-content: space-between; align-items: center; padding: 16px var(--g); color: var(--paper); transition: color .5s var(--e-out); }
.nav.is-dark { color: var(--ink); }
```

## Anchors and the Escape key

```js
function anchors() {
  $$('[data-scroll]').forEach((a) => a.addEventListener('click', async (e) => {
    e.preventDefault();
    if (menuOpen) await closeMenu(true);
    const id = a.getAttribute('href');
    lenis.scrollTo(id === '#top' ? 0 : id, { duration: 1.8, easing: expoInOut });
  }));
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { /* close the topmost overlay: booking > menu > detail */ }
  });
}
```

## Overlays: scroll lock

On open: `lenis.stop()`. On close: `lenis.start()`, only if no other overlay is open. An overlay that scrolls carries `data-lenis-prevent` and `overscroll-behavior: contain`.
