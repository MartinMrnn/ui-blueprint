# 13 · Pill buttons, text roll, mobile action bar

- **Status:** validated (test 01).
- **Natures:** action (micro-interactions).
- **References:** text roll: Agrumea B10 #50.

## Pill buttons and text roll

On hover, the label exits through the top and comes back from the bottom (0.55 s `OUT`). Backgrounds and colours follow the navigation theme.

```html
<button class="pill js-booking"><span class="roll"><span>Book an appointment</span><span aria-hidden="true">Book an appointment</span></span></button>
```

```css
.pill { height: 40px; padding: 0 18px; border-radius: 999px; display: inline-flex; align-items: center; font-size: 14px; font-weight: 500; background: var(--paper); color: var(--ink); transition: background-color .5s var(--e-out), color .5s var(--e-out); white-space: nowrap; }
.pill--ghost { background: transparent; color: inherit; box-shadow: inset 0 0 0 1px currentColor; }
.pill--dark { background: var(--ink); color: var(--paper); }
.roll { display: inline-grid; overflow: hidden; height: 1.25em; line-height: 1.25em; }
.roll > span { grid-area: 1 / 1; transition: transform .55s var(--e-out); }
.roll > span + span { transform: translateY(100%); }
@media (hover: hover) {
  .pill:hover .roll > span:first-child { transform: translateY(-100%); }
  .pill:hover .roll > span + span { transform: translateY(0); }
}
.nav .pill:not(.pill--ghost) { background: var(--paper); color: var(--ink); }
.nav.is-dark .pill:not(.pill--ghost) { background: var(--ink); color: var(--paper); }
```

## Mobile action bar (*dock*)

It carries two actions ("Call", plus the main action) in a translucent blurred pill, centred at the bottom. **It only appears once the first screen is left**, so as not to hide the name.

```css
@media (max-width: 760px) {
  .dock { position: fixed; z-index: 45; left: 0; right: 0; margin: 0 auto; width: max-content; bottom: 14px; display: flex; gap: 6px; padding: 6px; border-radius: 999px;
    background: rgba(236,232,225,.72); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); box-shadow: 0 8px 30px rgba(0,0,0,.12); visibility: hidden; opacity: 0; }
  .dock .pill { height: 44px; padding: 0 22px; }
}
```

```js
ScrollTrigger.create({ trigger: '.section-after-hero', start: 'top 55%',
  onEnter: () => gsap.to('.dock', { autoAlpha: 1, y: 0, duration: 0.8, ease: OUT }),
  onLeaveBack: () => gsap.to('.dock', { autoAlpha: 0, y: 20, duration: 0.5, ease: OUT }) });
```

## Variants

- **Magnetic button:** the button follows the cursor slightly (`gsap.quickTo` on x and y, ±8 px). To test, see `_drafts.md`.
- **Label rolling letter by letter** (0.015 s stagger) instead of the whole word.
