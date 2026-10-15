// UI Blueprint · Pexels contact sheet to choose the light, and video file lookup.
//
// Usage:
// 1. Copy this file into the project (e.g. ui-blueprint/<slug>/qa/contact-sheet.js) and set CONFIG.
// 2. Run it with the Playwright MCP server tool that executes Playwright code
//    (browser_run_code_unsafe in the Claude Code plugin): { filename: "<path relative to the working directory>" }.
// 3. Read CONFIG.out/contact-sheet.png. The result lists every numbered media item (id, type, path, URL).
//    For a second, larger sheet, put the shortlisted numbers in CONFIG.zoom.
//    For a video's files, put its path (the href field of the result) in CONFIG.videoPages.
//    The full path with the title is required: /video/<id>/ alone triggers the anti-bot check.
async (page) => {
  const CONFIG = {
    out: '/ABSOLUTE/PATH/TO/qa',
    queries: [
      // ['video', 'cannes'], ['photo', 'palm shadow wall'], ['photo', 'mediterranean villa'],
    ],
    perQuery: 18,
    zoom: [],       // sheet numbers to review larger (after a first pass)
    videoPages: [], // paths of the chosen videos, e.g. '/video/the-sun-sets-over-the-ocean-and-mountains-18682385/'
  };

  // Video files: keep only those of the requested video (the page also lists neighbouring videos)
  if (CONFIG.videoPages.length) {
    const out = {};
    for (const href of CONFIG.videoPages) {
      const id = (href.match(/-(\d+)\/?$/) || [])[1];
      await page.goto(`https://www.pexels.com${href}`, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(2500);
      // Never bypass an anti-bot check: report it and move on
      if (/just a moment/i.test(await page.title())) { out[id] = 'blocked by the anti-bot check: open the page manually'; continue; }
      out[id] = await page.evaluate((id) => {
        const nd = document.getElementById('__NEXT_DATA__');
        const all = nd ? nd.textContent.match(/https:\/\/videos\.pexels\.com\/video-files\/[^"]+?\.mp4/g) || [] : [];
        return [...new Set(all)].filter((u) => u.includes(`/video-files/${id}/`));
      }, String(id));
    }
    return JSON.stringify(out, null, 1);
  }

  const all = [];
  for (const [kind, q] of CONFIG.queries) {
    const url = `https://www.pexels.com/search/${kind === 'video' ? 'videos/' : ''}${encodeURIComponent(q)}/`;
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2500);
    await page.mouse.wheel(0, 2500);
    await page.waitForTimeout(1200);
    const items = await page.evaluate(([kind, n]) => {
      const sel = kind === 'video' ? 'a[href^="/video/"]' : 'a[href^="/photo/"]';
      const seen = new Set(), out = [];
      document.querySelectorAll(sel).forEach((a) => {
        const href = a.getAttribute('href');
        if (seen.has(href)) return; seen.add(href);
        const v = a.querySelector('video'), img = a.querySelector('img');
        const src = (v && v.poster) || (img && (img.currentSrc || img.src)) || '';
        if (src) out.push({ href, src: src.split('?')[0] });
      });
      return out.slice(0, n);
    }, [kind, CONFIG.perQuery]);
    items.forEach((i) => all.push({ q, kind, ...i }));
  }
  all.forEach((a, i) => { a.n = i + 1; a.id = (a.href.match(/-(\d+)\/?$/) || [])[1]; });

  const pick = CONFIG.zoom.length ? all.filter((a) => CONFIG.zoom.includes(a.n)) : all;
  const big = CONFIG.zoom.length > 0;
  const p = await page.context().newPage();
  await p.setViewportSize({ width: 1800, height: 1000 });
  let html = '<body style="margin:0;background:#111;color:#eee;font:13px ui-monospace,Menlo,monospace">';
  let cur = null;
  pick.forEach((a) => {
    if (!big && a.q !== cur) { html += `${cur ? '</div>' : ''}<h2 style="margin:14px 8px 6px;font-size:15px">${a.kind} · ${a.q}</h2><div style="display:grid;grid-template-columns:repeat(9,1fr);gap:6px;padding:0 8px">`; cur = a.q; }
    if (big && cur === null) { html += '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;padding:8px">'; cur = 'zoom'; }
    html += `<figure style="margin:0"><img style="width:100%;height:${big ? 270 : 120}px;object-fit:cover;display:block" src="${a.src}?auto=compress&cs=tinysrgb&w=${big ? 900 : 360}"><figcaption>${a.n} ${a.kind}</figcaption></figure>`;
  });
  html += '</div></body>';
  await p.setContent(html);
  await p.waitForFunction(() => [...document.images].every((i) => i.complete), null, { timeout: 30000 }).catch(() => {});
  await p.screenshot({ path: `${CONFIG.out}/${big ? 'contact-sheet-zoom' : 'contact-sheet'}.png`, fullPage: true });
  await p.close();

  return JSON.stringify(pick.map((a) => ({ n: a.n, kind: a.kind, id: a.id, href: a.href, src: a.src })));
}
