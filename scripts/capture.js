// UI Blueprint · frame-by-frame QA contact sheets.
//
// Usage:
// 1. Copy this file into the project (e.g. ui-blueprint/<slug>/qa/capture.js) and set CONFIG.
// 2. Run it with the Playwright MCP server tool that executes Playwright code
//    (browser_run_code_unsafe in the Claude Code plugin): { filename: "<path relative to the working directory>" }.
// 3. Read the PNG files written to CONFIG.out: intro-*, scroll-*, clicks-*.
//
// Page requirements: window.__lenis (the Lenis instance) and a global ScrollTrigger.
async (page) => {
  const CONFIG = {
    url: 'http://127.0.0.1:4310/',
    out: '/ABSOLUTE/PATH/TO/qa',             // output folder, absolute
    settle: 5200,                            // ms: end of the intro
    intro: [0.3, 0.7, 1.1, 1.5, 1.9, 2.3, 2.7, 3.1, 3.6, 4.2, 5, 6],
    // Click sequences. hover is optional; times and closeTimes are in ms after the click;
    // only: 'desktop' | 'mobile' restricts a sequence to one format.
    clicks: [
      // { name: 'detail', hover: '.choice-row__btn >> nth=1', click: '.choice-row__btn >> nth=1', times: [150, 450, 800, 1200, 2000], close: '.js-detail-close', closeTimes: [300, 700, 1400] },
    ],
    viewports: {
      desktop: { width: 1440, height: 900 },
      mobile: { width: 390, height: 844 },
    },
  };

  const report = { files: [], errors: [], overflow: {} };
  const bust = () => CONFIG.url + (CONFIG.url.includes('?') ? '&' : '?') + 'qa=' + Date.now();
  const grab = async (p, label) => ({ label, d: (await p.screenshot({ type: 'jpeg', quality: 68 })).toString('base64') });

  async function sheet(shots, name, cols) {
    const p = await page.context().newPage();
    await p.setViewportSize({ width: 1800, height: 1000 });
    await p.setContent(`<body style="margin:0;background:#1d1d1d;color:#eee;font:14px ui-monospace,Menlo,monospace">
      <div style="display:grid;grid-template-columns:repeat(${cols},1fr);gap:6px;padding:6px;align-items:start">
      ${shots.map((s) => `<div><img style="width:100%;display:block" src="data:image/jpeg;base64,${s.d}"><div style="padding:3px 0 6px">${s.label}</div></div>`).join('')}
      </div></body>`);
    await p.waitForFunction(() => [...document.images].every((i) => i.complete));
    const path = `${CONFIG.out}/${name}.png`;
    await p.screenshot({ path, fullPage: true });
    await p.close();
    report.files.push(path);
  }

  async function open(kind) {
    const vp = CONFIG.viewports[kind];
    const ctx = await page.context().browser().newContext({ viewport: vp, isMobile: kind === 'mobile', hasTouch: kind === 'mobile' });
    const p = await ctx.newPage();
    p.on('pageerror', (e) => report.errors.push(`${kind} · pageerror · ${e.message}`));
    p.on('console', (m) => { if (m.type() === 'error') report.errors.push(`${kind} · console · ${m.text()}`); });
    return { ctx, p };
  }

  // Scroll in small steps, so "once" triggers fire the way they do with a real scroll wheel
  async function scrollTo(p, y, steps = 12) {
    const from = await p.evaluate(() => window.scrollY);
    for (let i = 1; i <= steps; i++) {
      await p.evaluate((v) => window.__lenis.scrollTo(v, { immediate: true, force: true }), Math.round(from + ((y - from) * i) / steps));
      await p.waitForTimeout(40);
    }
  }

  async function intro(kind) {
    const { ctx, p } = await open(kind);
    const t0 = Date.now();
    await p.goto(bust(), { waitUntil: 'commit' });
    const shots = [];
    for (const t of CONFIG.intro) {
      const wait = t * 1000 - (Date.now() - t0);
      if (wait > 0) await p.waitForTimeout(wait);
      shots.push(await grab(p, `t=${((Date.now() - t0) / 1000).toFixed(2)}s`));
    }
    await ctx.close();
    await sheet(shots, `intro-${kind}`, kind === 'mobile' ? 6 : 4);
  }

  async function scrollStates(kind) {
    const { ctx, p } = await open(kind);
    await p.goto(bust());
    await p.waitForTimeout(CONFIG.settle);
    const info = await p.evaluate(() => {
      const stops = [];
      const name = (el) => el.id || (el.className && String(el.className).split(' ')[0]) || el.tagName.toLowerCase();
      document.querySelectorAll('section, footer').forEach((el) => {
        if (getComputedStyle(el).position === 'fixed') return;
        stops.push({ y: Math.round(el.getBoundingClientRect().top + scrollY), label: name(el) });
      });
      (window.ScrollTrigger ? ScrollTrigger.getAll() : []).filter((s) => s.pin).forEach((s) => {
        [0, 0.33, 0.66, 1].forEach((f) => stops.push({ y: Math.round(s.start + (s.end - s.start) * f), label: `${name(s.trigger)} pinned ${Math.round(f * 100)}%` }));
      });
      const limit = Math.round(window.__lenis.limit);
      stops.push({ y: Math.max(0, limit - innerHeight / 2), label: 'end −½ screen' }, { y: limit, label: 'end' });
      stops.sort((a, b) => a.y - b.y);
      const out = [];
      stops.forEach((s) => { if (!out.length || s.y - out[out.length - 1].y > 120) out.push(s); });
      return { stops: out, overflow: document.documentElement.scrollWidth > innerWidth };
    });
    report.overflow[kind] = info.overflow;
    const shots = [await grab(p, 'top')];
    for (const s of info.stops) {
      if (s.y < 40) continue;
      await scrollTo(p, s.y);
      await p.waitForTimeout(1300);
      shots.push(await grab(p, `${s.label} · y=${s.y}`));
    }
    await ctx.close();
    await sheet(shots, `scroll-${kind}`, kind === 'mobile' ? 6 : 3);
  }

  async function clicks(kind) {
    if (!CONFIG.clicks.some((c) => !c.only || c.only === kind)) return;
    const { ctx, p } = await open(kind);
    const shots = [];
    for (const c of CONFIG.clicks.filter((c) => !c.only || c.only === kind)) {
      await p.goto(bust());
      await p.waitForTimeout(CONFIG.settle);
      const y = await p.locator(c.click).first().evaluate((el) => Math.max(0, el.getBoundingClientRect().top + scrollY - innerHeight * 0.3));
      await scrollTo(p, y);
      await p.waitForTimeout(1500);
      if (c.hover && kind === 'desktop') { await p.locator(c.hover).first().hover(); await p.waitForTimeout(1000); shots.push(await grab(p, `${c.name} · hover`)); }
      await p.locator(c.click).first().click();
      let last = 0;
      for (const t of c.times || [150, 450, 800, 1200, 2000]) { await p.waitForTimeout(t - last); last = t; shots.push(await grab(p, `${c.name} · open +${t} ms`)); }
      if (c.close) {
        await p.locator(c.close).first().click();
        last = 0;
        for (const t of c.closeTimes || [300, 700, 1400]) { await p.waitForTimeout(t - last); last = t; shots.push(await grab(p, `${c.name} · close +${t} ms`)); }
      }
    }
    await ctx.close();
    await sheet(shots, `clicks-${kind}`, kind === 'mobile' ? 6 : 3);
  }

  for (const kind of Object.keys(CONFIG.viewports)) {
    await intro(kind);
    await scrollStates(kind);
    await clicks(kind);
  }
  return JSON.stringify(report, null, 1);
}
