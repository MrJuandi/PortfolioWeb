const reduce = matchMedia('(prefers-reduced-motion: reduce)');
const $ = id => document.getElementById(id);

// matplotlib inferno, sampled
const stops = [[0, 0, 4], [40, 11, 84], [101, 21, 110], [159, 42, 99], [212, 72, 66], [245, 125, 21], [250, 194, 40], [252, 255, 164]];
const palette = Array.from({ length: 64 }, (_, i) => {
  const x = i / 63 * (stops.length - 1), k = Math.min(Math.floor(x), stops.length - 2), f = x - k;
  return 'rgb(' + stops[k].map((v, c) => Math.round(v + (stops[k + 1][c] - v) * f)).join(' ') + ')';
});
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const episode = fetch('/data/pandion-episode.json').then(response => {
  if (!response.ok) throw new Error(response.status);
  return response.json();
});

// ───────── Intro ─────────
// hero.js reports real loading progress and plays the terrain; any input skips it.
const intro = (() => {
  const root = document.documentElement, active = root.classList.contains('intro');
  const count = document.querySelector('.loader__count'), bar = document.querySelector('.loader__bar');
  const names = [...document.querySelectorAll('h1 span')], title = document.querySelector('h1');
  const full = names.map(n => n.textContent), began = performance.now(), MIN = 900;
  let target = .08, shown = 0, done = !active, onPlay = null, onSkip = null;

  function decode(progress) {
    const glyphs = '.:-=+*%#@';
    names.forEach((node, line) => {
      node.textContent = [...full[line]].map((c, i) => {
        if (c === ' ') return c;
        const at = (i + line * 3) / 18;
        return progress >= at + .25 ? c : progress < at - .1 ? '\u00a0' : glyphs[Math.floor(Math.random() * glyphs.length)];
      }).join('');
    });
  }
  function finish() {
    if (done) return;
    done = true;
    names.forEach((node, i) => { node.textContent = full[i]; node.removeAttribute('aria-hidden'); });
    title.removeAttribute('aria-label');
    root.classList.remove('intro', 'intro-play');
    ['pointerdown', 'keydown', 'wheel', 'touchmove'].forEach(type => removeEventListener(type, skip));
  }
  function skip() { finish(); onSkip?.(); }

  if (active) {
    // Keep the name readable for assistive technology while the letters scramble.
    title.setAttribute('aria-label', full.join(' '));
    names.forEach(node => node.setAttribute('aria-hidden', 'true'));
    decode(-1);
    ['pointerdown', 'keydown', 'wheel', 'touchmove'].forEach(type => addEventListener(type, skip, { passive: true }));
    setTimeout(skip, 6500);
    let playAt = 0, last = began;
    const step = now => {
      if (done) return;
      if (!playAt) {
        const cap = Math.min(target, (now - began) / MIN); // never faster than MIN, never ahead of the real load
        shown += (cap - shown) * Math.min(1, (now - last) / 90);
        last = now;
        if (target >= 1 && cap >= 1 && shown > .985) shown = 1;
        count.textContent = String(Math.round(shown * 100)).padStart(3, '0');
        bar.style.setProperty('--p', (shown * 100).toFixed(1) + '%');
        if (shown === 1) { playAt = now; root.classList.add('intro-play'); onPlay?.(); }
      } else {
        const t = (now - playAt) / 1000;
        decode((t - .15) / 1.1);
        if (t > 2.5) { finish(); return; }
      }
      requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
  return { get active() { return !done; }, load: value => { target = Math.max(target, value); }, play: fn => { onPlay = fn; }, skipped: fn => { onSkip = fn; } };
})();

// Madrid clock
const clockFormat = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Madrid' });
const tick = () => { $('clock').textContent = clockFormat.format(new Date()); };
tick();
setInterval(tick, 15000);

// Copy email
$('copy').addEventListener('click', async event => {
  const button = event.currentTarget;
  try {
    await navigator.clipboard.writeText('juandiegodiazh@hotmail.es');
    button.textContent = 'Copied';
  } catch {
    button.textContent = 'Copy failed';
  }
  setTimeout(() => { button.textContent = 'Copy email'; }, 2000);
});

// Mark the section being read in the nav
const navLinks = [...document.querySelectorAll('.nav__links a')];
const sections = [...document.querySelectorAll('.block')];
const spy = () => {
  const atEnd = scrollY > 0 && scrollY + innerHeight >= document.documentElement.scrollHeight - 4;
  const current = atEnd ? sections.find(s => '#' + s.id === location.hash && s.getBoundingClientRect().top > 0) || sections.at(-1) : scrollY < 40 ? null : sections.filter(s => s.getBoundingClientRect().top < innerHeight * .25).pop();
  navLinks.forEach(link => {
    if (current && link.hash === '#' + current.id) link.setAttribute('aria-current', 'true');
    else link.removeAttribute('aria-current');
  });
};
addEventListener('scroll', spy, { passive: true });
addEventListener('hashchange', spy);
spy();

// Timelines: the rail and its nodes fill as you scroll
const rails = [...document.querySelectorAll('.vt__list')];
const fillRails = () => {
  const mark = innerHeight * .62;
  rails.forEach(rail => {
    const box = rail.getBoundingClientRect();
    rail.style.setProperty('--p', reduce.matches ? 1 : Math.min(1, Math.max(0, (mark - box.top - 49) / (box.height - 98))).toFixed(4));
    rail.querySelectorAll('.vt__item').forEach(item => item.classList.toggle('is-passed', reduce.matches || item.querySelector('.vt__dot').getBoundingClientRect().top < mark));
  });
};
addEventListener('scroll', fillRails, { passive: true });
addEventListener('resize', fillRails);
fillRails();
