# 09 · The button becomes the menu (*morphing nav*)

- **Status:** validated (test 01).
- **Natures:** action (navigation).
- **References:** Haven B13 #64, Apple B13 #65, Pacôme Pertant B14 #66.

## What it says

The menu does not appear: the "Menu" button stretches until it becomes the panel, and folds back into its shape on close.

## Recipe

- The panel is anchored to the same corner as the button (top right, same `top` and same `right`), with a first row of the same height (40 px).
- **Open:** a `clip-path` that starts from the button's rectangle, `round 20px` (so a pill), out to the whole panel. 0.95 s `IO`. The links rise from their masks (1.1 s `OUT`, 0.05 s stagger, at 0.35 s), and the metadata appears.
- **Close:** the links exit through the top (`expo.in`), then the panel folds back onto the button.
- Anchor links close the menu first, then scroll the page. External links carry "↗".
- On link hover: focus dim (the others at 0.35).

```js
function openMenu() {
  menuOpen = true; menuBtn.setAttribute('aria-expanded', 'true');
  gsap.set(menuEl, { visibility: 'visible' });
  const b = menuBtn.getBoundingClientRect(), m = menuEl.getBoundingClientRect();
  const from = `inset(0px ${m.right - b.right}px ${m.height - b.height}px ${m.width - b.width - (m.right - b.right)}px round 20px)`;
  gsap.timeline()
    .fromTo(menuEl, { clipPath: from }, { clipPath: 'inset(0px 0px 0px 0px round 20px)', duration: 0.95, ease: IO }, 0)
    .fromTo('.menu__links .mask > span', { yPercent: 110 }, { yPercent: 0, duration: 1.1, ease: OUT, stagger: 0.05 }, 0.35)
    .fromTo(['.menu__head .mono', '.menu__ext', '.menu__foot'], { opacity: 0 }, { opacity: 1, duration: 0.6, stagger: 0.05 }, 0.5);
}
function closeMenu(quick) {
  if (!menuOpen) return Promise.resolve();
  menuOpen = false; menuBtn.setAttribute('aria-expanded', 'false');
  const b = menuBtn.getBoundingClientRect(), m = menuEl.getBoundingClientRect();
  const to = `inset(0px ${m.right - b.right}px ${m.height - b.height}px ${m.width - b.width - (m.right - b.right)}px round 20px)`;
  return new Promise((res) => gsap.timeline({ onComplete: () => { gsap.set(menuEl, { visibility: 'hidden' }); res(); } })
    .to('.menu__links .mask > span', { yPercent: -110, duration: quick ? 0.3 : 0.5, ease: 'expo.in', stagger: 0.02 }, 0)
    .fromTo(menuEl, { clipPath: 'inset(0px 0px 0px 0px round 20px)' }, { clipPath: to, duration: quick ? 0.6 : 0.85, ease: IO }, quick ? 0 : 0.15));
}
```

```css
.menu { position: fixed; top: 16px; right: var(--g); z-index: 60; width: min(460px, calc(100vw - 2 * var(--g))); padding: 0 0 22px; background: var(--ink); color: var(--paper); border-radius: 20px; visibility: hidden; }
.menu__head { display: flex; justify-content: space-between; align-items: center; padding-left: 22px; height: 40px; }
.menu__links { padding: 34px 22px 26px; }
.menu__links a { display: block; font-size: clamp(36px, 4vw, 52px); line-height: 1.04; letter-spacing: -.04em; font-weight: 500; transition: opacity .3s var(--e-out); }
.menu__links:hover a { opacity: .35; } .menu__links a:hover { opacity: 1; }
```

## Variants

- **Fullscreen staggered menu** (Agrumea B10 #50, LPAS B10 #49): very large offset links, and an image on hover.
- **Mega dropdown with preview** and a blurred background (Odyssée B11 #51, Butter B11 #53).
- **Downward morph:** the whole navigation bar thickens and becomes the panel.
