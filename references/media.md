# Media: choosing a light

Half of the result comes from the media. Do not pick images one by one: first choose a **light**, then images that all obey it.

## 1. Write the light in one sentence

It holds four elements: a place, a moment, a material and a colour. Examples:
- "Cannes light: sunset over the bay, ochre façades, shutters, palm shadows" (test 01).
- "Workshop light: pale wood, dust in a sunbeam, hands, kraft paper."
- "Hotel night: brass, smoked glass, low lamps, reflections."

## 2. What to look for

- **A first-screen video.** Calm, cinematic, still or slow camera, no burnt-in text. It is also the last image of the intro.
- **Four to six photos for choices and the catalogue.** Same grade, and a framing that still works cropped to 3:2 as well as 4:5.
- **One or two moving textures** (shadows, water, fabric) for calm backgrounds: footer, overlays.
- **Small images for inline media**: very readable at 1.5 em, with a simple motif.

## 3. What to refuse

- Clichés of the trade: handshake, pen signing, scales of justice, padlock, smile at the camera.
- Generic tourist drone shots, unless the place is the subject.
- Images from another light than the chosen one: a blue midday sky in a sunset series, for example.
- AI-generated images, unless the user asks for them.
- Paid images (Unsplash+, `plus.unsplash.com`).

## 4. Where to look: Pexels, through the browser

- **Search:** `https://www.pexels.com/search/<query>/` for photos, `https://www.pexels.com/search/videos/<query>/` for videos.
- **Contact sheet:** `scripts/contact-sheet.js` runs several queries, numbers the results and produces a sheet. Mix place queries ("cannes"), material queries ("palm shadow wall") and mood queries ("provence table outdoor"). Then make a second, larger sheet with the shortlist.
- **Photos:** the URL comes from the search (`https://images.pexels.com/photos/<id>/…jpeg`); append `?auto=compress&cs=tinysrgb&w=<width>`. Widths: 2200 for full screen, 1400 for thumbnails that grow, 500 for inline media.
- **Video files:** `scripts/contact-sheet.js`, with `CONFIG.videoPages`, reads the files from `__NEXT_DATA__`.
  - It needs the full path with the title (the `href` field of the sheet's result): `/video/<id>/` alone triggers the anti-bot check, which is never bypassed. As a fallback, test the usual file names with `curl -sI`.
  - **Careful:** keep only the URLs that contain `/video-files/<id>/`, because the page also lists neighbouring videos.
  - Usual file names: `…/<id>-hd_1920_1080_25fps.mp4` (desktop) and `…/<id>-sd_960_540_25fps.mp4` (mobile).
- **Weight:** check with `curl -sI <url>`. Pexels answers with `access-control-allow-origin: *`, so files can be linked directly without downloading them. Above 30 MB, warn the user and suggest a shortened version for production.
- **Unsplash:** its public API now requires a key. Use the browser, or stick to Pexels.

## 5. The client's own photos (redesign mode)

If the existing site has real photos of good quality (the place, the team, the products), they come before stock. Complete with stock in the same light.

## 6. Credits

The site's `README.md` lists every media item: source, ID and use. The Pexels licence requires no attribution, but keep the record.
