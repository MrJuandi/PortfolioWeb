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
