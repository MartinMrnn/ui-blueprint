# 05 · Row reveal, focus dim, title that changes voice (*row reveal + focus dim + style switch*)

- **Status:** validated (test 01).
- **Natures:** choice; people (with a portrait).
- **References:** Griflan B09 #41, Eduard Bodak B10 #48 (row reveal); Odyssée B09 #45 (focus dim); Agrumea B10 #50 (text roll).

## What it says

"Choose." The list stays a list, readable and restrained. Hover brings the chosen row to life, and the others fade.

## Recipe

- Grid row: mono index, title in the workhorse voice (6.2 vw, tracking -5%), short description, 3:2 thumbnail.
- On hover:
  - the title rolls to its display-italic version (two layers stacked in a mask, 0.8 s `OUT`);
  - the thumbnail opens (`clip-path` from `inset(50% 0 50% 0)` to `inset(0)`, 0.9 s), and the image goes from a `scale` of 1.25 to 1;
  - the other rows go to an opacity of 0.28.
- The scroll entrance animates the **inner button**, not the row, because of the focus-dim opacity transition (pitfalls §2).
- On mobile: thumbnail always visible (4:5), italic layer hidden.

```html
<ul class="choice-list">
  <li class="choice-row"><button class="choice-row__btn" data-choice="key">
    <span class="mono choice-row__idx">01</span>
    <span class="choice-row__title"><span class="t-main">Title</span><span class="t-alt" aria-hidden="true">Title</span></span>
    <span class="choice-row__desc">Short description.</span>
    <span class="choice-row__thumb"><img alt="" src="…w=1400"></span>
  </button></li>
</ul>
```

```css
.choice-row { border-bottom: 1px solid var(--line); transition: opacity .45s var(--e-out); }
.choice-row__btn { width: 100%; display: grid; grid-template-columns: 5vw 1fr minmax(180px, 19vw) 15vw; align-items: center; gap: var(--g); padding: clamp(18px, 2vw, 32px) 0; text-align: left; }
.choice-row__title { position: relative; display: block; overflow: hidden; font-size: clamp(38px, 6.2vw, 116px); line-height: 1.04; letter-spacing: -.05em; font-weight: 500; padding-bottom: .04em; }
.choice-row__title > span { display: block; transition: transform .8s var(--e-out); white-space: nowrap; }
.choice-row__title .t-alt { position: absolute; left: 0; top: 0; font-family: var(--serif); font-style: italic; font-weight: 400; letter-spacing: -.02em; transform: translateY(105%); }
.choice-row__thumb { display: block; aspect-ratio: 3 / 2; overflow: hidden; border-radius: 3px; clip-path: inset(50% 0 50% 0); transition: clip-path .9s var(--e-out); }
.choice-row__thumb img { width: 100%; height: 100%; object-fit: cover; transform: scale(1.25); transition: transform 1.2s var(--e-out); }
@media (hover: hover) {
  .choice-list:hover .choice-row:not(:hover) { opacity: .28; }
  .choice-row:hover .t-main { transform: translateY(-105%); }
  .choice-row:hover .t-alt { transform: translateY(0); }
  .choice-row:hover .choice-row__thumb, .choice-row__btn:focus-visible .choice-row__thumb { clip-path: inset(0 0 0 0); }
  .choice-row:hover .choice-row__thumb img { transform: scale(1); }
}
.choice-row__thumb.is-held { clip-path: inset(0 0 0 0); transition: none; }   /* during the shared element */
@media (max-width: 760px) {
  .choice-row__btn { grid-template-columns: 1fr 34vw; grid-template-areas: "idx thumb" "title thumb" "desc thumb"; }
  .choice-row__title .t-alt { display: none; }
  .choice-row__thumb { clip-path: inset(0); aspect-ratio: 4 / 5; }
}
```

```js
gsap.from('.choice-row__btn', { yPercent: 30, opacity: 0, duration: 1.2, ease: OUT, stagger: 0.08,
  scrollTrigger: { trigger: '.choice-list', start: 'top 85%', once: true } });
```

## Variants

- **Cursor-follow preview** (ESR B08 #38) instead of the thumbnail in the row: a fixed image follows the mouse (`gsap.quickTo`, 0.6 s), and the image changes with the hovered row.
- **The row grows** and unfolds two or three images (Griflan) instead of one.
- **Video on hover** (Partizan B08 #40): the row plays a video as the section background.
- **Colour change** instead of the voice change: the title switches to the brand colour.
