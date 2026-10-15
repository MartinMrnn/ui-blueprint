# 12 · Live opening status

- **Status:** validated (test 01).
- **Natures:** practical info (published opening hours).
- **References:** invented for test 01. It is not a Details recipe, but it follows the same logic: living information rather than a static block.

## What it says

"We're here, right now." The published hours are read in the place's own time zone, with no showpiece at all: a green dot that pulses, or orange when closed.

## Recipe

Based on the **real hours** only. The calculation runs in the place's time zone, and the status updates every minute. It shows in the hero ("Today"), in the menu and in the footer.

```js
function status() {
  const p = Object.fromEntries(new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Paris', weekday: 'short', hour: 'numeric', minute: 'numeric', hourCycle: 'h23' })
    .formatToParts(new Date()).map((x) => [x.type, x.value]));
  const d = { Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6, Sun: 0 }[p.weekday];
  const m = +p.hour * 60 + +p.minute;
  // Example: Monday to Friday, 9am–12pm and 2pm–6pm. Adapt to the published hours and the site's language.
  const wk = d >= 1 && d <= 5;
  let open = false, text;
  if (wk && m >= 540 && m < 720) { open = true; text = 'Open · until 12pm'; }
  else if (wk && m >= 840 && m < 1080) { open = true; text = 'Open · until 6pm'; }
  else if (wk && m < 540) text = 'Closed · opens at 9am';
  else if (wk && m < 840) text = 'Lunch break · back at 2pm';
  else if (d >= 1 && d <= 4) text = 'Closed · back tomorrow 9am';
  else text = 'Closed · back Monday 9am';
  $$('.js-status').forEach((e) => (e.textContent = text));
  $$('.js-dot').forEach((e) => e.classList.toggle('is-closed', !open));
}
status(); setInterval(status, 60000);
```

```css
.dot { display: inline-block; width: 7px; height: 7px; border-radius: 50%; background: #62c072; margin-right: 8px; animation: pulse 2.4s var(--e-out) infinite; }
.dot.is-closed { background: #e08a55; animation: none; }
@keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(98,192,114,.55); } 100% { box-shadow: 0 0 0 9px rgba(98,192,114,0); } }
```

## Limits

It does not know public holidays or exceptional closures. Tell the client.

## Other kinds of living information

- The local time of the place (for a foreign clientele).
- The current season, for a seasonal place.
- The next availability, only if a real source exists.
