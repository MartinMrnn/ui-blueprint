---
name: ui-blueprint
description: Designs and builds motion-led websites at the level of details.so references (Lenis + GSAP, continuity transitions on scroll and click, named motion recipes). Two entry points, a redesign from the URL of an existing site (with an optional recommendation prompt) or a site built from scratch from a prompt that sets the direction and theme. Use when the user invokes UI Blueprint, drops a website URL to redesign, or asks for a website, homepage or landing page with a "wow" effect, premium motion, or scroll and click transitions.
---

# UI Blueprint

A way of thinking a website, not a template.

Never start from a skeleton. Start from the content, choose a light, then edit a sequence of moments, each one picked for the nature of a piece of content. The quality comes from continuity (nothing appears, everything transforms) and from a single motion grammar, checked frame by frame.

The validated recipe cards come from a first test site, described in `registry.example.md`.

Talk to the user in their language. These instructions are in English, but the site copy follows the language of the content or the prompt.

## The six principles

1. **Content picks the motion.** The question is never "what animation goes here?" but "what is the nature of this content?". An identity, a promise, a choice, a proof, a place and an action each call for different motion (`references/natures.md`).
2. **Nothing appears, everything transforms.** The intro becomes the hero, the thumbnail becomes the page, the button becomes the menu, the page lifts to reveal the contact. Every transition starts from something already on screen. The eye follows the object, so the visitor never gets lost.
3. **A page is an edit.** Alternate wide shots and close shots. Also alternate the background (image, paper, night), the mode (watch, read, choose, act) and the axis (vertical, zoom, horizontal). Allow one showpiece moment per third of the page (`references/montage.md`).
4. **A grammar, not effects.** The site keeps one easing family, three duration bands and three type voices. The mask is the basic gesture. Consistency is what makes it feel premium, not the number of effects (`references/grammar.md`).
5. **Show in the transitions, clarity in the information.** Labels stay in the trade's own words, and contact is always one gesture away (`references/guardrails.md`).
6. **Judge in motion.** A still screenshot says nothing about these sites. Check them with contact sheets of frames taken over time (`scripts/capture.js`).

## The two entry points

### A. Redesign: a URL, and an optional prompt

1. **Read the site.** Read the home page and every page in the menu with WebFetch, asking for verbatim quotes. Note:
   - the identity;
   - the offer and its copy;
   - the published proof (reviews, figures, press);
   - the practical information;
   - the calls to action and useful links;
   - the brand elements to keep (logo, colour);
   - the quality of the existing photos.
2. **Capture the current site** on desktop and mobile, to know what is being replaced.
3. **Diagnose and set the direction.** If the prompt asks for a recommendation, or if it is empty, write a diagnosis of five lines at most: what the visitor is looking for, what the current site hides or misses, what to keep. Then propose a direction. If the prompt gives an instruction ("more restrained", "English-speaking audience", "keep their blue"), apply it.
4. **Reuse the published content, word for word.** Only typographic fixes (accents, spacing) are allowed, and they are reported. If the site's own photos are good, prefer them to stock photos.
5. Then follow the shared method.

### B. From scratch: a prompt that sets the direction and theme

1. **Extract from the prompt** the sector, the place, the audience, the mood and the main action expected from the visitor. If the sector or the main action is missing and cannot be inferred, ask one question only. Otherwise decide, and state the assumptions in one line.
2. **Plan the content.** Start from the questions a visitor in this sector has: Who? Why you? What? What proof? Where and how? What now? Turn them into a list of content, each piece tagged with its nature.
3. **Write** short, concrete copy in the trade's own voice.
   - Never invent facts. Names, figures, prices, addresses, awards, reviews and quotes stay in brackets: `[Chef's name]`, `[Client review to provide]`.
   - A nature that requires missing facts (proof, for example) keeps visible placeholders, or is replaced by a nature that needs no facts (process, place).
4. Then follow the shared method.

## The shared method, in eight steps

By default, go all the way to the finished site. If the user asks for a guided mode ("show me first", "step by step"), stop for approval after step 3 (the light) and after step 5 (the storyboard).

1. **Inventory.** List the content, each piece with its nature (`references/natures.md`).
2. **Candidate recipes.** For each piece of content, keep two to four possible recipes from the natures table.
3. **The light.**
   - Write the photo and video direction in one sentence (example: "Cannes light: sunset over the bay, ochre façades, palm shadows").
   - Build a contact sheet (`scripts/contact-sheet.js`, method in `references/media.md`) and choose 6 to 12 coherent media, with no clichés of the trade.
   - The light then decides the palette.
4. **Voices and palette.** Choose three type voices and a palette (`references/grammar.md`). Check `registry.md` so as not to reuse the font trio or the palette of the previous site.
5. **Storyboard.**
   - Plan 6 to 9 moments, laid out as a table: content, nature, recipe, what the motion says, background, mode, axis.
   - Apply `references/montage.md`.
   - Name the signature move, which must not appear in any of the last three sites in the registry.
6. **Build.** Lay the base first (`references/recipes/00-base.md`), then build one moment at a time from the recipe cards (`references/recipes/`). If a recipe has no card, start from `references/recipes/_drafts.md` or from the lexicon (`references/lexicon.md`), and test it before moving on.
7. **Frame-by-frame check.**
   - Produce the contact sheets with `scripts/capture.js`: intro, scroll, clicks, mobile.
   - Read them, fix, then capture again.
   - Go through `references/guardrails.md` and reread `references/pitfalls.md`.
8. **Delivery.**
   - Open the preview and summarise: the light, the voices, then the table of moments with their recipes and references.
   - Ask for feedback moment by moment, never as a whole.
   - Add the site to `registry.md`.

## Iterating

- For feedback on one moment, change only that moment, then capture again.
- When the user approves a new recipe or a variant, turn it into a card with the status "validated" in `references/recipes/`, then update `registry.md`.

## Stack and deliverables

- **Files:** HTML, CSS and JS with no build step: `index.html`, `styles.css`, `app.js`, plus a `README.md` with the storyboard, the recipes and the credits. If the project already uses a framework (Next, Nuxt, Astro), keep the same libraries inside that framework.
- **Libraries:** Lenis 1.3.4 and GSAP 3.13.0 (ScrollTrigger, SplitText, Flip) from cdn.jsdelivr.net, and fonts from Google Fonts. No other dependency.
- **Folder:** `<project>/ui-blueprint/<slug>/`, unless told otherwise.
- **Preview:** serve the folder locally (`python3 -m http.server <port> --directory <folder>`). In Claude Code, use an entry in `.claude/launch.json`, then the built-in browser preview.
- **Tests:** expose `window.__lenis` for the captures.

## What this skill is not

- **Not a template.** No layout is imposed. Two sites never share the same sequence or the same signature move.
- **Not a rulebook of bans.** Other design skills (Impeccable, antislop, taste, redesign) do not apply during UI Blueprint: their rules contradict the method (a single animated moment, banned labels, forbidden fonts).
- **Not a fact generator.** No fact is ever made up.

## Skill files

| File | Role |
|---|---|
| `references/natures.md` | Content natures and their candidate recipes |
| `references/montage.md` | Order, alternation, signature move, click transitions |
| `references/grammar.md` | Easing, durations, masks, type voices, palettes |
| `references/guardrails.md` | The "never lose the visitor" checklist |
| `references/media.md` | The light, sourcing media, credits |
| `references/pitfalls.md` | Bugs already met and their fixes |
| `references/recipes/` | One card per validated recipe, plus `_drafts.md` |
| `references/lexicon.md`, `references/boards/` | The Details motion vocabulary; the reference boards (80 frame sequences) stay local and are not published |
| `scripts/capture.js` | Frame-by-frame QA contact sheets (Playwright) |
| `scripts/contact-sheet.js` | Pexels contact sheet and video file lookup |
| `registry.md` | Sites already built and their choices, to avoid repetition. It stays local: if it does not exist, create it from `registry.example.md` |
