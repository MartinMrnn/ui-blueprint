# 06 · Shared element: the thumbnail becomes the page (*shared element transition, FLIP*)

- **Status:** validated (test 01). One of the two signature moves of test 01.
- **Natures:** choice and catalogue, towards a detail.
- **References:** Realevate B04 #17, Segerman B03 #13.

## What it says

"We take you there without losing you." The clicked image flies to its place in the detail page. The eye follows it, and the context never breaks. On close, it returns exactly to where it came from.

## Recipe

- The detail overlay is fixed and full screen: media on the left (50%) and text panel on the right. On mobile, the media takes the top (42 svh) and the panel the bottom.
- **Open:**
  1. Record the thumbnail (`Flip.getState`, with a shared `data-flip-id`).
  2. Open the overlay and hide the thumbnail.
  3. `Flip.from(state, { targets: media, duration: 1.3, ease: IO, absolute: true, scale: false })`. The image goes from a `scale` of 1.3 to 1 in 1.8 s.
  4. The panel opens through `clip-path`, from the right (or from the bottom on mobile), in 1.15 s `IO`, 0.12 s later.
  5. The title reveals line by line at 0.7 s, then the text arrives block by block.
- **Close:** the panel closes (0.9 s), then `Flip.fit(media, thumbnail, { duration: 1.1, ease: IO, scale: false })`. Restore the thumbnail and clean up (`clearProps`).
- While open: `lenis.stop()`. The panel scrolls on its own (`data-lenis-prevent`). Escape and the "Back" button close it.

```html
<div class="detail" role="dialog" aria-modal="true" aria-labelledby="detail-title">
  <div class="detail__media" data-flip-id="choice"><img alt="" src=""></div>
  <div class="detail__panel" data-lenis-prevent>
    <div class="detail__bar"><button class="pill pill--ghost js-detail-close">← Back</button><span class="mono js-detail-idx"></span></div>
    <h2 class="detail__title" id="detail-title"></h2>
    <div class="detail__body"></div>
  </div>
</div>
```

```css
.detail { position: fixed; inset: 0; z-index: 70; visibility: hidden; pointer-events: none; }
.detail.is-open { visibility: visible; pointer-events: auto; }
.detail__media { position: absolute; top: 0; left: 0; bottom: 0; width: 50%; overflow: hidden; }
.detail__media img { width: 100%; height: 100%; object-fit: cover; }
.detail__panel { position: absolute; top: 0; right: 0; bottom: 0; width: 50%; background: var(--paper); overflow-y: auto; overscroll-behavior: contain; padding: 16px clamp(24px, 4vw, 72px) 64px; display: flex; flex-direction: column; }
@media (max-width: 760px) {
  .detail__media { width: 100%; bottom: auto; height: 42svh; }
  .detail__panel { width: 100%; top: 42svh; }
}
```

```js
function openDetail(btn) {
  if (busy) return; busy = true;
  dThumb = $('.choice-row__thumb', btn);
  dThumb.classList.add('is-held');
  dImg.src = $('img', dThumb).src;                 // same URL: shows instantly
  dSplit?.revert(); dTitle.innerHTML = data.title; dBody.innerHTML = data.body; dPanel.scrollTop = 0;

  dThumb.dataset.flipId = 'choice';
  const state = Flip.getState(dThumb);
  delete dThumb.dataset.flipId;
  detail.classList.add('is-open');
  gsap.set(dThumb, { opacity: 0 });
  lenis.stop();

  dSplit = SplitText.create(dTitle, { type: 'lines', mask: 'lines' });
  const panelFrom = small() ? 'inset(100% 0% 0% 0%)' : 'inset(0% 0% 0% 100%)';
  gsap.timeline({ onComplete: () => (busy = false) })
    .add(Flip.from(state, { targets: dMedia, duration: 1.3, ease: IO, absolute: true, scale: false }), 0)
    .fromTo(dImg, { scale: 1.3 }, { scale: 1, duration: 1.8, ease: OUT }, 0)
    .fromTo(dPanel, { clipPath: panelFrom }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.15, ease: IO }, 0.12)
    .from(dSplit.lines, { yPercent: 110, duration: 1.2, ease: OUT, stagger: 0.08 }, 0.7)
    .from([...dBody.children], { y: 28, opacity: 0, duration: 1, ease: OUT, stagger: 0.05 }, 0.8);
}

function closeDetail() {
  if (busy || !detail.classList.contains('is-open')) return; busy = true;
  const panelTo = small() ? 'inset(100% 0% 0% 0%)' : 'inset(0% 0% 0% 100%)';
  gsap.timeline({ onComplete: () => {
      detail.classList.remove('is-open');
      gsap.set([dMedia, dImg, dPanel], { clearProps: 'all' });
      gsap.set(dThumb, { opacity: 1 }); dThumb.classList.remove('is-held');
      lenis.start(); busy = false;
    } })
    .fromTo(dPanel, { clipPath: 'inset(0% 0% 0% 0%)' }, { clipPath: panelTo, duration: 0.9, ease: IO }, 0)
    .add(Flip.fit(dMedia, dThumb, { duration: 1.1, ease: IO, scale: false }), 0.1);
}
```

## Pitfalls

- Fly an `overflow: hidden` container holding an image in `object-fit: cover`, with `scale: false`. The image re-crops instead of distorting.
- Use a `busy` flag against double clicks.
- The detail content is real content only (quoted word for word in redesign mode).

## Variants

- **Full-screen image**, with the text rising over it (instead of the left half).
- **A real page** (multi-page site) with the View Transitions API (shared `view-transition-name`), or Barba plus Flip.
- **A card from a horizontal catalogue** that becomes the hero of the product page.
- **The detail slides sideways** to the next item (01 → 02 → 03) without going back to the list.
