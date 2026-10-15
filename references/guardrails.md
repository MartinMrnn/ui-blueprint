# Guardrails: never lose the visitor

Go through this list before every delivery. The showpiece goes into the transitions, never at the expense of the information.

## Understand
- [ ] The name and the trade are readable as soon as the intro ends.
- [ ] The navigation uses the trade's own labels, not metaphors.
- [ ] Every moment has a title or a label that says what it contains.

## Act
- [ ] The main call to action and the contact (phone or booking) stay visible in the navigation at all times.
- [ ] On mobile, an action bar appears after the first screen, without hiding the name.
- [ ] Every overlay has a visible "Close" or "Back" button. The Escape key closes it, scrolling is locked underneath (`lenis.stop()`), then released on close.
- [ ] Anchors scroll smoothly to their target, and the menu closes first.

## Wait
- [ ] The intro lasts 4 s at most, and scrolling is released before it ends.
- [ ] With `prefers-reduced-motion`, the intro is skipped, scrolling is not smoothed and the page shows in its final state.

## Read
- [ ] Text set on an image has a dark overlay. The navigation contrast follows the section underneath, including during a pin.
- [ ] Body text is at least 15 px, and lines do not exceed 60 characters.

## Mobile
- [ ] No feature depends on hover: thumbnails are visible and hover layers are hidden.
- [ ] No horizontal page scroll: `scrollWidth` equals the screen width.
- [ ] Pins are tested at 390 px wide.
- [ ] The "revealed" footer goes back into the normal flow on mobile.

## Weight
- [ ] Video is SD on mobile and HD on desktop, paused when it leaves the screen, and loaded only on approach for videos lower on the page.
- [ ] Images are sized through a URL parameter (`w=`).

## Honesty
- [ ] No fact is invented: names, figures, prices, reviews, awards, team.
- [ ] Reused copy is quoted word for word, and typographic fixes are reported.
- [ ] Media credits are listed in the README.
