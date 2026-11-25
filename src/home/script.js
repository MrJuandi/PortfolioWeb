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

// ───────── Fire replay: recorded Pandion episode drawn in characters ─────────
(async () => {
  const canvas = $('map'), context = canvas.getContext('2d');
  const status = $('map-status'), seek = $('seek'), play = $('play'), output = $('t');
  const buttons = [...document.querySelectorAll('.run')];
  const VIEW_COLS = 30, END = 3600, SPEED = 100; // simulated seconds per second
  const MONO = '"Martian Mono", ui-monospace, Menlo, monospace';

  let data;
  try {
    data = await episode;
    await document.fonts.load('500 12px "Martian Mono"').catch(() => {});
  } catch {
    status.textContent = 'The replay could not be loaded. Final results are listed here.';
    play.disabled = seek.disabled = true;
    return;
  }
  const { n: N, elevation, runs } = data;

  const height = (row, col) => {
    const y = clamp(row, 0, N - 1), x = clamp(col, 0, N - 1), r = Math.min(Math.floor(y), N - 2), c = Math.min(Math.floor(x), N - 2), fy = y - r, fx = x - c;
    const e = (i, j) => elevation[i * N + j];
    return (e(r, c) * (1 - fx) + e(r, c + 1) * fx) * (1 - fy) + (e(r + 1, c) * (1 - fx) + e(r + 1, c + 1) * fx) * fy;
  };
  const sorted = {};
  for (const key in runs) sorted[key] = runs[key].arrival.filter(v => v >= 0).sort((a, b) => a - b);
  const burned = (key, t) => { let i = 0; while (i < sorted[key].length && sorted[key][i] <= t) i++; return i; };
  const noise = (i, k) => { const s = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453; return s - Math.floor(s); };

  let viewRows = 32, width = 0, heightPx = 0, size = 0, sub = 2, terrain = null;
  let current = 'learned', time = reduce.matches ? END : 0, playing = !reduce.matches, visible = true, frame = 0, last = 0, painted = 0;

  // Hillshade picks the character; 100 m contours are drawn brighter.
  function buildTerrain() {
    const ratio = canvas.width / width, cell = size / sub;
    terrain = document.createElement('canvas');
    terrain.width = canvas.width; terrain.height = canvas.height;
    const g = terrain.getContext('2d');
    g.scale(ratio, ratio);
    g.font = '400 ' + (cell * 1.02).toFixed(2) + 'px ' + MONO;
    g.textAlign = 'center'; g.textBaseline = 'middle';
    const glyphs = [' ', '·', '·', ':', '-', '=', '+', '*'];
    for (let r = 0; r < viewRows * sub; r++) for (let c = 0; c < VIEW_COLS * sub; c++) {
      const row = (r + .5) / sub - .5, col = (c + .5) / sub - .5, d = 1 / sub;
      const h = height(row, col), dx = height(row, col + d) - height(row, col - d), dy = height(row + d, col) - height(row - d, col);
      const shade = clamp(.36 + (dx + dy) / (190 / sub), 0, 1);
      const band = Math.floor(h / 100);
      const contour = band !== Math.floor(height(row, col + d) / 100) || band !== Math.floor(height(row + d, col) / 100);
      const x = (c + .5) * cell, y = (r + .5) * cell;
      if (contour) { g.fillStyle = '#877f97'; g.fillText('+', x, y); continue; }
      g.fillStyle = shade > .68 ? '#5d566b' : shade > .42 ? '#423d4e' : '#2f2b39';
      g.fillText(glyphs[Math.min(glyphs.length - 1, Math.floor(shade * glyphs.length))], x, y);
    }
  }

  function position(track, t) {
    let i = 1;
    while (i < track.length - 1 && track[i][0] < t) i++;
    const a = track[i - 1], b = track[i], f = clamp((t - a[0]) / Math.max(1, b[0] - a[0]), 0, 1);
    return { x: a[1] + (b[1] - a[1]) * f, y: a[2] + (b[2] - a[2]) * f, angle: Math.atan2(b[2] - a[2], b[1] - a[1]), moving: a[1] !== b[1] || a[2] !== b[2] };
  }

  function paint() {
    if (!terrain) return;
    const ratio = canvas.width / width, cell = size / sub, run = runs[current], flicker = Math.floor(time / 12);
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(terrain, 0, 0);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);

    const blocked = new Set();
    for (const [, t, cells] of run.drops) if (t <= time) for (const [r, c] of cells) blocked.add(r * N + c);

    // Final outline of the fire without aircraft
    const none = runs.none.arrival, lit = (r, c) => r >= 0 && c >= 0 && r < N && c < N && none[r * N + c] >= 0;
    if (current !== 'none') {
      context.beginPath();
      for (let r = 0; r < viewRows; r++) for (let c = 0; c < VIEW_COLS; c++) if (lit(r, c)) {
        const x = c * size, y = r * size;
        if (!lit(r - 1, c)) { context.moveTo(x, y + .5); context.lineTo(x + size, y + .5); }
        if (!lit(r + 1, c)) { context.moveTo(x, y + size); context.lineTo(x + size, y + size); }
        if (!lit(r, c - 1)) { context.moveTo(x, y); context.lineTo(x, y + size); }
        if (!lit(r, c + 1)) { context.moveTo(x + size, y); context.lineTo(x + size, y + size); }
      }
      context.strokeStyle = '#a7315f'; context.lineWidth = 1; context.stroke();
    }

    context.font = '500 ' + (cell * 1.12).toFixed(2) + 'px ' + MONO;
    context.textAlign = 'center'; context.textBaseline = 'middle';
    for (let r = 0; r < viewRows; r++) for (let c = 0; c < VIEW_COLS; c++) {
      const i = r * N + c, arrival = run.arrival[i], burning = arrival >= 0 && arrival <= time, wet = blocked.has(i);
      if (!burning && !wet) continue;
      const x = c * size, y = r * size;
      const heat = burning ? Math.exp(-(time - arrival) / 700) : 0;
      context.fillStyle = burning ? palette[Math.round((.13 + heat * .3) * 63)] : '#0b0a10';
      context.fillRect(x, y, size, size);
      for (let k = 0; k < sub * sub; k++) {
        const px = x + (k % sub + .5) * cell, py = y + (Math.floor(k / sub) + .5) * cell, jitter = noise(i * 4 + k, flicker);
        if (wet && !burning) { context.fillStyle = '#5cc8ea'; context.fillText('≈', px, py); continue; }
        const value = clamp(.4 + heat * .58 + (jitter - .5) * heat * .24, 0, 1);
        context.fillStyle = palette[Math.round(value * 63)];
        context.fillText('.:-=+*%#@'[Math.round(clamp(heat * .6 + .12 + noise(i, k) * .3, 0, 1) * 8)], px, py);
      }
      if (wet && burning) { context.strokeStyle = '#5cc8ea'; context.lineWidth = 1; context.strokeRect(x + .5, y + .5, size - 1, size - 1); }
    }

    run.drops.forEach(([a, t]) => {
      const age = (time - t) / 90;
      if (age < 0 || age > 1) return;
      const p = position(run.tracks[a], t);
      context.strokeStyle = '#5cc8ea'; context.globalAlpha = 1 - age; context.lineWidth = 2;
      context.beginPath(); context.arc(p.x * size, p.y * size, size * (.4 + age * 1.8), 0, Math.PI * 2); context.stroke();
      context.globalAlpha = 1;
    });
    run.tracks.forEach(track => {
      const p = position(track, time);
      if (p.x < -1 || p.x > VIEW_COLS + 1 || p.y < -1 || p.y > viewRows + 1) return;
      const s = Math.max(7, size * .55);
      context.save();
      context.translate(p.x * size, p.y * size); context.rotate(p.angle);
      context.beginPath(); context.moveTo(s, 0); context.lineTo(-s * .7, s * .6); context.lineTo(-s * .35, 0); context.lineTo(-s * .7, -s * .6); context.closePath();
      context.fillStyle = '#ece8df'; context.strokeStyle = '#0b0a10'; context.lineWidth = 3; context.stroke(); context.fill();
      context.restore();
    });
  }

  function readout() {
    const total = sorted.none.length;
    buttons.forEach(button => {
      const count = burned(button.dataset.run, time);
      button.querySelector('b').textContent = count;
      button.style.setProperty('--w', (count / total * 100).toFixed(1) + '%');
    });
    const minutes = String(Math.floor(time / 60)).padStart(2, '0');
    seek.value = time;
    seek.style.setProperty('--p', (time / END * 100).toFixed(2) + '%');
    seek.setAttribute('aria-valuetext', minutes + ' minutes');
    output.textContent = 't + ' + minutes + ' min';
    play.textContent = playing ? 'Pause' : time >= END ? 'Replay' : 'Play';
  }

  function loop(now) {
    frame = 0;
    if (!playing || !visible || document.querySelector('dialog[open]')) return;
    const elapsed = Math.min(100, now - last);
    last = now;
    time = Math.min(END, time + elapsed / 1000 * SPEED);
    if (time >= END) playing = false;
    if (now - painted > 40 || !playing) { paint(); readout(); painted = now; }
    if (playing) frame = requestAnimationFrame(loop);
  }
  function start() {
    if (playing && visible && !frame) { last = performance.now(); frame = requestAnimationFrame(loop); }
  }

  function resize() {
    const box = canvas.getBoundingClientRect();
    if (!box.width) return;
    width = box.width; heightPx = box.height; size = width / VIEW_COLS; viewRows = Math.min(N, Math.ceil(heightPx / size)); sub = size >= 14 ? 2 : 1;
    const ratio = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * ratio); canvas.height = Math.round(heightPx * ratio);
    buildTerrain();
    paint();
  }

  buttons.forEach(button => button.addEventListener('click', () => {
    current = button.dataset.run;
    buttons.forEach(other => other.setAttribute('aria-pressed', String(other === button)));
    paint();
  }));
  play.addEventListener('click', () => {
    if (!playing && time >= END) time = 0;
    playing = !playing;
    paint(); readout(); start();
  });
  seek.addEventListener('input', () => {
    playing = false;
    time = Number(seek.value);
    paint(); readout();
  });

  status.hidden = true;
  new ResizeObserver(resize).observe(canvas);
  new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; start(); }).observe(canvas);
  readout();
  start();
})();
