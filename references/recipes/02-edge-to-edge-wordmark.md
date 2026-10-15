# 02 · Edge-to-edge wordmark, letter by letter (*edge-to-edge wordmark + char reveal*)

- **Status:** validated (test 01).
- **Natures:** identity, ending (in the footer).
- **References:** Haven, House of Honey (537 px), Better Off (456 px), The Romans "SAY HELLO" B14 #67; letter reveal: Tengile B02 #8, Eduard Bodak B01 #1.

## What it says

The name is the image. It takes the full width, like a shop sign.

## Recipe

- Display voice, fitted exactly to the width minus the gutters. Tracking -2.5%, line height 1 with negative margins to pin the name to the bottom of the screen.
- Split into masked letters, **then** fit the size, because splitting breaks kerning.
- Raise the letters: `yPercent` from 112 to 0, in 1.5 s, `OUT`, with a 0.04 s stagger.

```css
.hero__word { font-family: var(--serif); font-weight: 400; line-height: 1; letter-spacing: -.025em; white-space: nowrap; margin: -.1em 0 -.16em; }
.hero__word-inner { display: inline-block; }
```

```js
const word = $('.hero__word-inner');
let wordSplit;
function fitWord() {
  word.style.fontSize = '100px';
  const w = word.getBoundingClientRect().width;
  const pad = parseFloat(getComputedStyle($('.hero__content')).paddingLeft);
  word.style.fontSize = (100 * (document.documentElement.clientWidth - 2 * pad)) / w + 'px';
}
// in init()
wordSplit = SplitText.create(word, { type: 'chars', mask: 'chars' });
fitWord();
addEventListener('resize', fitWord);
```

## Pitfalls

- Keep a `<span class="sr-only">` with the full name and the trade. The split version carries `aria-hidden`.
- Check that the letter masks clip neither ascenders nor italics (line height 1).

## Variants

- **Condensed grotesque in caps** (The Romans, RocGrotesk) for a punchier brand.
- **Name bleeding off the bottom** of the screen, cut at mid-height.
- **Name in the footer** rather than the hero: the first screen is then an image alone, and the giant name arrives at the end.
- **Letters that stretch** on scroll (scroll-linked `scaleY`, Pensatori B07 #34).
