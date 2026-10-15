# 11 · Footer reveal

- **Status:** validated (test 01).
- **Natures:** ending, final action.
- **References:** ESR B14 #68; The Romans "SAY HELLO" B14 #67.

## What it says

"Underneath, it's always you." The page lifts and uncovers the contact, like a foundation.

## Recipe

- On desktop:
  - the footer is `position: fixed; bottom: 0; z-index: 1`, and `main` (opaque background, `z-index: 2`) gets a `margin-bottom` equal to the footer height (recalculated on resize);
  - its content rises gently (`yPercent` from -28 to 0, opacity from 0.4 to 1) as it is uncovered.
- On mobile: put it back in the normal flow.
- **Content:** the action in giant type (the phone in the workhorse voice at 13.4 vw, tracking -6.5%), the e-mail in display italic, four columns (address and directions, opening hours, links, button), then a mono line with the credits.
- **A calm, living background:** a texture video from the light (palm shadow) in `mix-blend-mode: multiply` at 0.55 over the paper. It loads and plays only on approach.
- **Navigation:** dark as soon as the bottom of `main` passes under the navigation (or the top of the footer on mobile).

```css
main { position: relative; z-index: 2; background: var(--paper); }
.footer { position: fixed; left: 0; right: 0; bottom: 0; z-index: 1; height: 100svh; overflow: hidden; background: var(--paper); }
.footer__video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; mix-blend-mode: multiply; opacity: .55; }
.footer__tel { margin-top: auto; font-size: clamp(56px, 13.4vw, 250px); line-height: .86; letter-spacing: -.065em; font-weight: 500; white-space: nowrap; }
@media (max-width: 760px) { .footer { position: relative; height: auto; } main { margin-bottom: 0 !important; } }
```

```js
const sizeFooter = () => (mainEl.style.marginBottom = small() ? '' : foot.offsetHeight + 'px');
sizeFooter(); addEventListener('resize', sizeFooter);
gsap.fromTo('.footer__inner', { yPercent: -28, opacity: 0.4 }, { yPercent: 0, opacity: 1, ease: 'none',
  scrollTrigger: { trigger: mainEl, start: 'bottom bottom', end: () => '+=' + foot.offsetHeight, scrub: true, invalidateOnRefresh: true,
    onEnter: playFootVideo, onLeaveBack: () => footVideo.pause() } });
```

## Variants

- **Giant wordmark** in the footer, cut off by the bottom of the screen.
- **Marquee** with the call to action, whose speed follows the scroll.
- **Brand-colour footer**, with the word from the card 10 overlay.
