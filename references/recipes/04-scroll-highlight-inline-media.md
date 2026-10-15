# 04 · Scroll highlight with images inside the sentence (*scroll-highlight + inline media in headline*)

- **Status:** validated (test 01).
- **Natures:** promise, manifesto.
- **References:** Flow B08 #37, Kaleida B08 #36 (highlight); The Romans B01 #2 and B05 #23, Colonia Zacamil B01 #4, Luke Baffait B07 #31 (inline media).

## What it says

"Read me at your own pace." Scrolling becomes reading: each word lights up as you reach it. Small images open between the words like illustrations inside a sentence.

## Recipe

- A single strong sentence, 5 to 5.5 vw on desktop and about 9.6 vw on mobile, in the workhorse voice. Tracking -4%, line height 1.02. Key words are in display italic at 1.08 em.
- Indent of 24 vw, with the mono label in the margin.
- Split words start at an opacity of 0.14, then go to 1 in *scrub* (0.12 stagger) between `top 78%` and `bottom 52%`.
- Inline images: width from 0 to 1.5 em for a height of 0.78 em, image going from a `scale` of 1.6 to 1, in *scrub* between `top 92%` and `top 58%`.

```html
<p class="manifesto__text">
  Word word <span class="inline-media"><img alt="" src="…w=500"></span> word word with <em>word</em> and <em>word</em>.
</p>
```

```css
.manifesto__text { font-size: clamp(34px, 5.1vw, 92px); line-height: 1.02; letter-spacing: -.042em; text-indent: 24vw; }
.manifesto__text em { font-family: var(--serif); font-style: italic; letter-spacing: -.015em; font-size: 1.08em; line-height: .9; }
.manifesto__text .w { text-indent: 0; }            /* otherwise every word inherits the indent */
.inline-media { display: inline-block; width: 1.5em; height: .78em; margin: 0 .04em; vertical-align: -.04em; border-radius: .1em; overflow: hidden; text-indent: 0; }
.inline-media img { width: 100%; height: 100%; object-fit: cover; }
```

```js
const text = $('.manifesto__text');
const split = SplitText.create(text, { type: 'words', wordsClass: 'w' });
gsap.set(split.words, { opacity: 0.14 });
gsap.to(split.words, { opacity: 1, ease: 'none', stagger: 0.12,
  scrollTrigger: { trigger: text, start: 'top 78%', end: 'bottom 52%', scrub: true } });
$$('.inline-media', text).forEach((m) => {
  gsap.fromTo(m, { width: 0, marginLeft: 0, marginRight: 0 }, { width: '1.5em', marginLeft: '0.04em', marginRight: '0.04em', ease: 'none',
    scrollTrigger: { trigger: m, start: 'top 92%', end: 'top 58%', scrub: true } });
  gsap.fromTo($('img', m), { scale: 1.6 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: m, start: 'top 92%', end: 'top 50%', scrub: true } });
});
```

## Variants

- **Style switch:** the words switch from roman to italic on scroll (The Romans B05 #23).
- **Blur-in** (Hazel B07 #33): `filter: blur(12px)` and opacity, word by word, triggered rather than scroll-linked.
- **Video inside the sentence** instead of an image (a short, muted loop).
- **Highlight by colour:** the words go from the paper colour to the brand colour.
