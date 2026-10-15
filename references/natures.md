# Content natures → candidate recipes

The question is never "what animation goes here?" but "what is the nature of this content, and what does the visitor do with it?". Each nature has several possible recipes. The choice depends on the site, the light and the registry, so as not to rebuild the previous site.

Legend:
- ✓: validated card in `recipes/`;
- ○: recipe described in `recipes/_drafts.md`, to test before use.

| Nature | Examples | The visitor… | Candidate recipes |
|---|---|---|---|
| **Identity** | name, brand, logo | recognises | ✓ 01 intro that becomes the hero · ✓ 02 edge-to-edge wordmark · ○ logo reveal · ○ acronym expansion · ○ scale-through |
| **Promise** | introduction sentence, manifesto, motto | reads | ✓ 04 scroll highlight with inline media · ✓ 07 sentence pushed aside by a media · ○ style switch on scroll · ○ blur-in · ○ text assembly · plain line reveal (base) |
| **Choice** | services, practice areas, categories, menu | chooses | ✓ 05 row reveal · ✓ 06 shared element to the detail · ○ cursor-follow preview · ○ expanding panels · ○ scroll-spy list |
| **Catalogue** | projects, products, rooms, dishes | browses | ✓ 08 horizontal scroll · ✓ 06 shared element to the item page · ○ stacked cards · ○ floating collage · ○ spotlight grid |
| **Proof** | reviews, press, clients, published figures | believes | ✓ 08 horizontal scroll of quotes · ○ logo marquee · ○ pinned stat (real figures only) |
| **Place, mood** | address, territory, material, season | feels | ✓ 07 media expand · ✓ 03 curtain over the hero · ○ parallax in the frame · ○ background colour shift |
| **Process** | steps, method, how a case unfolds | understands | ○ pinned steps · ○ stacked cards · ○ horizontal scroll with a progress bar |
| **People** | team, founder, maker | trusts | ✓ 05 row reveal, with portrait · ○ focus dim · ○ expanding panels |
| **Time, history** | dates, heritage, seasons | situates | ○ horizontal timeline · ○ scrubbed year counter |
| **Action** | contact, book, buy | acts | ✓ 10 overlay with label · ✓ 09 morphing nav · ✓ 13 buttons and mobile action bar · ○ button that becomes a form |
| **Practical info** | opening hours, access, prices, FAQ | checks | ✓ 12 live opening status · mono labels, no showpiece · ○ animated accordion |
| **Ending** | footer | finishes | ✓ 11 footer reveal · ○ giant wordmark in the footer · ○ marquee |

## Rules of choice

- **One recipe per nature per page**, except the base (line reveal, buttons), which is used everywhere.
- **The same nature can change recipe from one site to the next.** The registry records what has already been done.
- **Practical info never gets a showpiece.** Make it legible, and alive when possible (a live status), but it never moves for nothing.
- **A recipe missing from the table** can be found in `lexicon.md` (§2), which lists about sixty terms with their references on the boards.
- **Decide what the motion should say before choosing the recipe.** For example:
  - "Choose, we take you there without losing you" gives a shared element.
  - "A gallery of voices" gives a horizontal scroll.
  - "Here, in this place" gives a media expand.
  - "A threshold" gives an overlay with a label.
