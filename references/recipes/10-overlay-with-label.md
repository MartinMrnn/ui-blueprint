# 10 · Overlay with a giant word (*overlay with label*)

- **Status:** validated (test 01, for booking an appointment).
- **Natures:** action (contact, booking), changing "room".
- **References:** The Romans "EXPLORE" B03 #11; colour wipe: Virugroup B03 #15.

## What it says

"A threshold." A curtain rises, a giant word passes through it, and behind it there is only what you need to act.

## Recipe

- Fixed overlay on a night or brand-colour background. `clip-path` from `inset(100% 0 0 0)` to `inset(0)`, in 1.1 s `IO`.
- A giant word in the display voice (17 vw), in masked letters: `yPercent` from 115 to 0, 1.3 s `OUT`, 0.035 s stagger, at 0.45 s.
- Then the grid of ways to act rises (phone very large, e-mail in italic, address and opening hours, directions). Offset 0.75 s, 0.07 s stagger.
- **Close:** the curtain keeps going up (`inset(0 0 100% 0)`, 0.95 s `IO`).
- The button that opens this overlay sits in the navigation, the mobile action bar, the footer and the detail pages. If a menu is open, it closes first.
- **No fake form.** If the site has no booking tool, the overlay gives the real ways to get in touch.

```js
async function openBooking() {
  if (bookingOpen) return; bookingOpen = true;
  if (menuOpen) await closeMenu(true);
  lenis.stop();
  gsap.timeline()
    .set(bookingEl, { visibility: 'visible' })
    .fromTo(bookingEl, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.1, ease: IO })
    .fromTo(bookingSplit.chars, { yPercent: 115 }, { yPercent: 0, duration: 1.3, ease: OUT, stagger: 0.035 }, 0.45)
    .fromTo(['.booking__bar > *', '.booking__item'], { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: OUT, stagger: 0.07 }, 0.75);
}
function closeBooking() {
  gsap.fromTo(bookingEl, { clipPath: 'inset(0% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.95, ease: IO,
    onComplete: () => { gsap.set(bookingEl, { visibility: 'hidden' }); bookingOpen = false; if (!detailOpen()) lenis.start(); } });
}
```

```css
.booking { position: fixed; inset: 0; z-index: 75; background: var(--night); color: var(--paper); visibility: hidden; display: flex; flex-direction: column; padding: 16px var(--g) var(--g); clip-path: inset(100% 0 0 0); overflow-y: auto; }
.booking__word { font-family: var(--serif); font-size: clamp(76px, 17vw, 330px); line-height: .82; letter-spacing: -.035em; margin-top: auto; white-space: nowrap; }
.booking__grid { display: grid; grid-template-columns: 1.3fr 1fr 1fr; gap: var(--g); padding-top: 22px; border-top: 1px solid var(--line-inv); }
```

## Variants

- **Stepped wipe:** four or five bands rising in cascade (Virugroup).
- **Pixel dissolve:** a grid of cells filling in (Transform9 B06 #29).
- **Page transition:** the same overlay with the name of the next page, for a multi-page site (Barba or Swup, or the framework router).
- **Button that becomes a form:** the "Book" button grows until it becomes the form (morphing, as in card 09).
