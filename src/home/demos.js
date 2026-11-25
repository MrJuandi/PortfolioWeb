// Project previews: short scenes drawn in blocks and characters, plus the dialogs with the real videos.
// Runs after script.js and uses its `reduce`, `clamp`, `palette` and `episode`.
(() => {
  const C = { bg: '#13111a', track: '#262230', line: '#48434f', ink: '#ece8df', soft: '#bdb8c0', muted: '#938e9c', hot: '#fbb91f', warm: '#f57d15', plum: '#a7315f', deep: '#7a1d6d', water: '#5cc8ea' };
  const FONT = '"Martian Mono", ui-monospace, Menlo, monospace';
  const seg = (t, a, b) => clamp((t - a) / (b - a), 0, 1);
  const ease = x => 1 - Math.pow(1 - x, 3);
  const mix = (a, b, x) => a + (b - a) * x;
  const inOut = (t, a, b, c, d) => Math.min(seg(t, a, b), 1 - seg(t, c, d)); // fade in over a–b, out over c–d

  function text(g, value, x, y, { size = 12, color = C.soft, align = 'left', weight = 400 } = {}) {
    g.font = weight + ' ' + size + 'px ' + FONT;
    if ('fontStretch' in g) g.fontStretch = 'condensed';
    if ('letterSpacing' in g) g.letterSpacing = size > 18 ? '-1px' : '0px';
    g.textAlign = align; g.textBaseline = 'middle'; g.fillStyle = color;
    g.fillText(value, x, y);
  }
  // A bar made of 4px cells on a 6px pitch; `from` and `to` are offsets in pixels.
  function cells(g, x, y, from, to, h, color) {
    g.fillStyle = color;
    for (let i = Math.ceil(from / 6); i * 6 + 4 <= to + .01; i++) g.fillRect(x + i * 6, y, 4, h);
  }

  // ───────── Pandion: the recorded episode under three controllers ─────────
  let data = null;
  const RUNS = [['learned', 'Learned policy', C.hot, 'Learned'], ['heuristic', 'Downwind rule', C.warm, 'Downwind'], ['none', 'No aircraft', C.plum, 'No aircraft']];
  const pandion = {
    length: 14, still: 8.8,
    captions: [[0, 'Same fire, same water, three decisions.', 'Recorded episode, Plasencia'], [9.6, 'Over 288 unseen scenarios, the average is smaller.', '95% bootstrap intervals']],
    draw(g, W, H, t) {
      if (!data) { text(g, 'Loading the recorded episode', W / 2, H / 2, { align: 'center' }); return; }
      const pad = W < 520 ? 16 : 28, gap = W < 520 ? 10 : 24, cols = 26, rows = 32, N = data.n;
      const time = seg(t, .4, 8.4) * 3600;
      g.globalAlpha = 1 - seg(t, 9.2, 9.8);
      if (g.globalAlpha > 0) {
        const size = Math.min((W - pad * 2 - gap * 2) / 3 / cols, (H - 86) / rows);
        const mapW = size * cols, left = (W - mapW * 3 - gap * 2) / 2, top = (H - (rows * size + 54)) / 2;
        RUNS.forEach(([key, name, color, short], k) => {
          const x0 = left + k * (mapW + gap), run = data.runs[key];
          let burned = 0;
          for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
            const i = r * N + c, at = run.arrival[i], x = x0 + c * size, y = top + r * size;
            if (at >= 0 && at <= time) {
              burned++;
              g.fillStyle = palette[Math.round((.2 + Math.exp(-(time - at) / 600) * .72) * 63)];
              g.fillRect(x, y, size - 1, size - 1);
            } else {
              const shade = data.elevation[i] - data.elevation[Math.min(N * N - 1, i + N + 1)];
              g.fillStyle = shade > 20 ? '#2f2a39' : shade > -5 ? '#24202d' : '#1b1822';
              g.fillRect(x + size * .28, y + size * .28, Math.max(1, size * .4), Math.max(1, size * .4));
            }
          }
          run.drops.forEach(([, at, list]) => { if (at <= time) list.forEach(([r, c]) => { g.fillStyle = C.water; g.fillRect(x0 + c * size, top + r * size, size - 1, size - 1); }); });
          const base = top + rows * size + 18;
          text(g, W < 520 ? short : name, x0, base, { size: W < 520 ? 11 : 12 });
          text(g, burned + ' ha', x0 + mapW, base + (W < 520 ? 20 : 0), { size: W < 520 ? 14 : 18, color: C.ink, weight: 500, align: 'right' });
          const full = Math.floor(mapW / 6) * 6, by = base + (W < 520 ? 34 : 18);
          cells(g, x0, by, 0, full, 8, C.track);
          cells(g, x0, by, 0, full * burned / 336, 8, color);
        });
      }
      g.globalAlpha = seg(t, 9.8, 10.4);
      if (g.globalAlpha > 0) {
        const x0 = pad + 8, x1 = W - pad - (W < 520 ? 24 : 60), px = v => mix(x0, x1, (v + 5) / 5);
        const grow = ease(seg(t, 10.2, 11.6));
        [['vs downwind rule', -3.09, -4.52, -1.88], ['vs hold-aware rule', -.03, -.44, .35]].forEach(([name, value, lo, hi], k) => {
          const y = H * (.34 + k * .34);
          text(g, name, x0, y - 34); text(g, (value * grow).toFixed(2).replace('-', '−') + ' ha', x1, y - 34, { size: 18, color: C.ink, weight: 500, align: 'right' });
          g.fillStyle = C.track; for (let v = -5; v < 0; v++) g.fillRect(px(v), y - 14, 1, 28);
          g.fillStyle = C.soft; g.fillRect(px(0), y - 14, 1, 28);
          const a = px(mix(value, lo, grow)), b = px(mix(value, hi, grow));
          cells(g, a, y - 2, 0, b - a, 4, C.warm);
          g.fillStyle = C.hot; g.fillRect(px(value) - 7, y - 7, 14, 14);
        });
        [-5, -3, -1, 0].forEach(v => text(g, String(v).replace('-', '−'), px(v), H * .68 + 32, { size: 11, color: C.muted, align: 'center' }));
      }
      g.globalAlpha = 1;
    },
  };

  // ───────── Pulse: menu bar, popover, limits ─────────
  const DAYS = [19, 77, 57, 51, 42, 70, 18, 28, 72, 65, 43, 90, 90, 31, 15, 70, 98, 84, 87, 67, 25, 27, 70, 70, 46, 62, 77, 21, 21, 63];
  const LIMITS = [['Codex', 22, 47], ['Claude Code', 38, 61], ['Gemini', 12, null]];
  const pulse = {
    length: 14, still: 12,
    captions: [[0, 'How much is left?', 'Demo data'], [4, 'Every token, every day.', 'Demo data'], [8.4, 'See the limit before it cuts you off.', 'Demo data']],
    draw(g, W, H, t) {
      const small = W < 520, barH = 34, tick = seg(t, .6, 2.4);
      g.fillStyle = '#1b1822';
      for (let y = barH + 14; y < H; y += 16) for (let x = 10; x < W; x += 16) {
        const s = 1 + (Math.sin(x * .02 + y * .03 + t * 1.2) + 1) * 1.3;
        g.fillRect(x, y, s, s);
      }
      g.fillStyle = '#1d1a26'; g.fillRect(0, 0, W, barH);
      if (!small) ['Terminal', 'Shell', 'Edit', 'View'].forEach((name, i) => text(g, name, 20 + i * 72, barH / 2, { color: i ? C.muted : C.ink }));
      const quota = [['</>', mix(58, 53, tick)], ['*', mix(64, 39, tick)], ['+', mix(91, 88, tick)]];
      const right = W - 16, open = ease(seg(t, 3.6, 4.2)), pressed = t > 3.5;
      if (pressed) { g.fillStyle = C.line; g.fillRect(right - 218, 5, 218, barH - 10); }
      quota.forEach(([icon, value], i) => {
        const x = right - 206 + i * 70;
        text(g, icon, x, barH / 2, { color: C.muted });
        text(g, Math.round(value) + '%', x + 26, barH / 2, { size: 13, weight: 500, color: i === 1 ? C.hot : C.ink });
      });
      if (open > 0) {
        const pw = Math.min(W - 24, 560), ph = H - barH - 22, x = W - 12 - pw, y = barH + 8;
        g.save();
        g.beginPath(); g.rect(x, y, pw, ph * open); g.clip();
        g.fillStyle = '#1d1a26'; g.fillRect(x, y, pw, ph);
        g.strokeStyle = C.line; g.strokeRect(x + .5, y + .5, pw - 1, ph - 1);
        const inner = pw - 40, x0 = x + 20, rise = seg(t, 4.3, 7), focus = seg(t, 8.2, 8.8);
        const rowH = small ? 28 : 34, chartTop = y + 52, chartH = ph - 52 - rowH * 3 - 34;
        g.globalAlpha = 1 - focus * .65;
        text(g, 'Last 30 days', x0, y + 24, { color: C.muted });
        text(g, Math.round(1648.9 * ease(rise)).toLocaleString('en-US') + ' M tokens', x0 + inner, y + 24, { size: small ? 13 : 16, weight: 500, color: C.ink, align: 'right' });
        const step = inner / DAYS.length, bw = Math.max(3, step - 3);
        DAYS.forEach((value, i) => {
          const full = value / 100 * chartH * ease(clamp(rise * 2.2 - i / 25, 0, 1));
          for (let h = 0; h < chartH; h += 5) {
            const on = h < full, part = h / Math.max(1, value / 100 * chartH);
            g.fillStyle = !on ? '#221f2b' : part < .34 ? C.deep : part < .9 ? C.warm : C.hot;
            g.fillRect(x0 + i * step, chartTop + chartH - h - 4, bw, 3.5);
          }
        });
        g.globalAlpha = 1;
        const names = small ? 88 : 110, col = (inner - names) / 2;
        LIMITS.forEach(([name, five, week], i) => {
          const ry = y + ph - rowH * (3 - i) - 4 + rowH / 2, fill = ease(seg(t, 4.6 + i * .25, 6.2 + i * .25));
          text(g, name, x0, ry, { color: C.ink, size: small ? 11 : 12 });
          [['5 h', five], ['week', week]].forEach(([label, used], k) => {
            if (used == null) return;
            const bx = x0 + names + k * col, max = Math.floor((col - (small ? 40 : 100)) / 6) * 6, warn = used > 55;
            if (small) {
              text(g, k ? 'wk' : '5h', bx, ry, { size: 10, color: C.muted });
              cells(g, bx + 20, ry - 4, 0, max, 8, C.track); cells(g, bx + 20, ry - 4, 0, max * used / 100 * fill, 8, warn && focus ? C.hot : C.plum);
            } else {
              text(g, label, bx, ry, { size: 11, color: C.muted });
              cells(g, bx + 40, ry - 5, 0, max, 10, C.track); cells(g, bx + 40, ry - 5, 0, max * used / 100 * fill, 10, warn && focus ? C.hot : C.plum);
              text(g, Math.round(used * fill) + '%', bx + 40 + max + 8, ry, { size: 12, weight: 500, color: warn && focus ? C.hot : C.ink });
            }
          });
        });
        if (focus) { g.globalAlpha = focus; g.strokeStyle = C.hot; g.strokeRect(x0 - 9.5, y + ph - rowH * 3 - 8.5, inner + 19, rowH * 3 + 5); g.globalAlpha = 1; }
        g.restore();
      }
      const go = ease(seg(t, 2.2, 3.4)), cx = mix(W * .3, right - 100, go), cy = mix(H * .7, 20, go);
      if (t > 1.6 && t < 5) {
        g.beginPath(); g.moveTo(cx, cy); g.lineTo(cx, cy + 17); g.lineTo(cx + 4.5, cy + 13); g.lineTo(cx + 12, cy + 12); g.closePath();
        g.fillStyle = C.ink; g.strokeStyle = '#0b0a10'; g.lineWidth = 2; g.stroke(); g.fill(); g.lineWidth = 1;
      }
    },
  };

  // ───────── LOSSIA: 91 stations, one that stops its neighbours, one ranking ─────────
  const STATIONS = ['ST-0250', 'ST0261', 'ST0259', 'ST-0260', 'ST_0265'];
  const RANK = [['ST-0260', 46], ['ST_0100', 24], ['ST-2390', 23], ['ST-1000', 23], ['ST0261', 17]];
  const lossia = {
    length: 14, still: 12,
    captions: [[0, '91 stations. Which one is the bottleneck?', 'Illustration'], [3.4, 'It barely stops, but it stops everyone else.', 'Illustration'], [9, 'The whole line, in one ranking.', 'Line 5, estimates']],
    draw(g, W, H, t) {
      const small = W < 520, pad = small ? 16 : 36;
      let a = 1 - seg(t, 3, 3.4);
      if (a > 0) {
        g.globalAlpha = a;
        const size = Math.min((W - pad * 2) / 13, (H - 40) / 7), x0 = (W - size * 13) / 2, y0 = (H - size * 7) / 2, unit = seg(t, 2, 2.5);
        for (let i = 0; i < 91; i++) {
          const row = Math.floor(i / 13), col = row % 2 ? 12 - i % 13 : i % 13, seen = t * 60 > i;
          const inUnit = i >= 15 && i < 30; // positions 16–30, the work unit shown next
          g.fillStyle = !seen ? C.track : inUnit && unit ? C.hot : Math.sin(i * 7.3 + Math.floor(t * 5) * 2.1) > .86 ? C.warm : '#4b4456';
          g.fillRect(x0 + col * size + 2, y0 + row * size + 2, size - 4, size - 4);
        }
      }
      a = inOut(t, 3.4, 3.8, 8.6, 9);
      if (a > 0) {
        g.globalAlpha = a;
        const y = H * .5, step = (W - pad * 2) / 5, box = Math.min(step * .58, 84), stopAt = 5.2, stopped = t > stopAt, spread = seg(t, stopAt, stopAt + 1.4);
        cells(g, pad, y - 1, 0, W - pad * 2, 3, C.line);
        const X = i => pad + step * (i + .5), gate = X(3);
        // Engines travel left to right. Once ST-0260 stops they queue behind it and the line ahead empties.
        for (let k = -1; k < 14; k++) {
          const free = pad + ((k * .42 * step + Math.min(t, stopAt) * step * .55) % (step * 5.04));
          let x = free;
          if (stopped) {
            const after = (t - stopAt) * step * .55;
            x = free >= gate ? free + after : Math.min(free + after, gate - box / 2 - 10 - Math.max(0, (gate - free) / (step * .42) - .5) * 13);
            if (x > W - pad) continue;
          }
          if (x < pad) continue;
          g.fillStyle = C.ink; g.fillRect(x - 4, y - 4, 8, 8);
        }
        STATIONS.forEach((name, i) => {
          const hit = i === 3 && stopped, blocked = i < 3 && spread > (3 - i) / 4, starved = i === 4 && spread > .5;
          const color = hit ? C.hot : blocked ? C.plum : starved ? C.deep : '#4b4456';
          g.fillStyle = C.bg; g.fillRect(X(i) - box / 2, y - box / 2, box, box);
          g.strokeStyle = color; g.lineWidth = hit ? 3 : 2; g.strokeRect(X(i) - box / 2, y - box / 2, box, box); g.lineWidth = 1;
          const n = 5, s = box / (n + 2);
          for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) {
            const on = hit ? Math.floor(t * 3) % 2 : blocked || starved ? (r + c) % 2 : Math.sin(r * 3.1 + c * 5.7 + t * 6) > -.2;
            g.fillStyle = on ? color : C.track;
            g.fillRect(X(i) - box / 2 + s * (c + 1) + 1, y - box / 2 + s * (r + 1) + 1, s - 2, s - 2);
          }
          text(g, name, X(i), y + box / 2 + 20, { size: small ? 10 : 12, color: hit ? C.hot : C.ink, align: 'center', weight: 500 });
          const state = hit ? 'stopped' : blocked ? 'blocked' : starved ? 'no parts' : 'running';
          text(g, state, X(i), y + box / 2 + 38, { size: small ? 10 : 12, color: hit ? C.hot : C.muted, align: 'center' });
        });
      }
      a = seg(t, 9, 9.4);
      if (a > 0) {
        g.globalAlpha = a;
        const name = small ? 72 : 110, value = small ? 46 : 150, max = Math.floor((W - pad * 2 - name - value) / 6) * 6, rowH = Math.min(52, (H - 40) / 5), y0 = (H - rowH * 5) / 2;
        RANK.forEach(([label, lost], i) => {
          const grow = ease(seg(t, 9.4 + i * .22, 10.8 + i * .22)), y = y0 + rowH * (i + .5);
          text(g, label, pad, y, { color: C.ink });
          cells(g, pad + name, y - 8, 0, max, 16, C.track);
          cells(g, pad + name, y - 8, 0, max * lost / 46 * grow, 16, i ? C.plum : C.hot);
          text(g, '≈' + Math.round(lost * grow) + (small ? '' : ' engines/day'), W - pad, y, { size: 13, weight: 500, color: i ? C.ink : C.hot, align: 'right' });
        });
      }
      g.globalAlpha = 1;
    },
  };

  // ───────── Halfline: odds, margin, model, honesty ─────────
  const TEAMS = ['Fiorentina', 'Draw', 'Juventus'], ODDS = [3.36, 3.53, 2.06], SHADES = [C.plum, '#5d566b', C.warm];
  const halfline = {
    length: 15, still: 8.6,
    captions: [[0, 'Fiorentina v Juventus. The odds add up to 106.6%.', 'Serie A, 8 Nov 2026'], [4.6, 'Halfline removes the margin, then asks its own model.', 'Serie A, 8 Nov 2026'], [9.6, 'On 2,049 unseen matches, the market is still ahead.', 'Out of sample']],
    draw(g, W, H, t) {
      const small = W < 520, pad = small ? 16 : 36, full = W - pad * 2, unit = full / 110; // 110% across
      const at100 = pad + 100 * unit;
      const bar = (values, y, h, grow, label) => {
        text(g, label, pad, y - 16, { color: C.muted, size: small ? 11 : 12 });
        let from = 0;
        values.forEach((v, i) => {
          const to = Math.min(from + v, grow * 110);
          if (to > from) cells(g, pad, y, from * unit, to * unit, h, SHADES[i]);
          if (grow * 110 >= from + v * .5) text(g, v.toFixed(1) + '%', pad + from * unit + 8, y + h + 15, { size: small ? 11 : 13, weight: 500, color: C.ink });
          from += v;
        });
      };
      let a = 1 - seg(t, 4.2, 4.6);
      if (a > 0) {
        g.globalAlpha = a;
        const w = full / 3;
        TEAMS.forEach((name, i) => {
          const show = seg(t, .2 + i * .35, .6 + i * .35);
          g.globalAlpha = a * show;
          text(g, name, pad + w * i, H * .18, { color: C.muted });
          text(g, ODDS[i].toFixed(2), pad + w * i, H * .18 + 30, { size: small ? 24 : 34, weight: 500, color: C.ink });
        });
        g.globalAlpha = a;
        const grow = ease(seg(t, 1.4, 3)), y = H * .56, h = 34;
        bar([29.8, 28.3, 48.5], y, h, grow, 'Implied by the odds');
        if (grow * 110 > 100) {
          const pulseOn = t > 3 && Math.floor(t * 4) % 2;
          cells(g, pad, y, 100 * unit, Math.min(106.6, grow * 110) * unit, h, pulseOn ? C.ink : C.hot);
          if (t > 3) text(g, '+6.6% margin', pad + 106.6 * unit, y + h + (small ? 36 : 38), { color: C.hot, weight: 500, align: 'right', size: 13 });
        }
        g.fillStyle = C.ink; g.fillRect(at100, y - 8, 1, h + 16); text(g, '100%', at100, y - 18, { size: 11, color: C.ink, align: 'center' });
      }
      a = inOut(t, 4.6, 5, 9.2, 9.6);
      if (a > 0) {
        g.globalAlpha = a;
        const h = 30, y1 = H * .25, y2 = H * .64;
        bar([27.5, 26.1, 46.3], y1, h, ease(seg(t, 4.8, 6)), 'Market, margin removed');
        if (t > 6.2) bar([25, 27.4, 47.6], y2, h, ease(seg(t, 6.2, 7.6)), 'Halfline model');
        g.fillStyle = C.ink; g.fillRect(at100, y1 - 12, 1, y2 - y1 + h + 24); text(g, '100%', at100, y1 - 22, { size: 11, color: C.ink, align: 'center' });
      }
      a = seg(t, 9.6, 10);
      if (a > 0) {
        g.globalAlpha = a;
        const x0 = pad + (small ? 0 : 190), x1 = W - pad - 46, px = v => mix(x0, x1, (v - .965) / .12);
        g.fillStyle = C.track; for (let v = 0; v <= 12; v++) g.fillRect(mix(x0, x1, v / 12), H * .12, 1, H * .7);
        g.fillStyle = C.ink; g.fillRect(px(.975), H * .12, 1, H * .7);
        [['Closing market', .975, C.ink], ['xG-adjusted Elo', .993, C.hot], ['Historical frequencies', 1.071, C.plum]].forEach(([name, value, color], i) => {
          const y = H * (.25 + i * .23), x = mix(x1, px(value), ease(seg(t, 10 + i * .3, 11.4 + i * .3)));
          text(g, name, pad, small ? y - 22 : y, { color: C.soft });
          if (i) cells(g, px(.975), y - 2, 0, x - px(.975), 4, color);
          g.fillStyle = color; g.fillRect(x - 7, y - 7, 14, 14);
          if (t > 11 + i * .3) text(g, value.toFixed(3), x + 14, y, { size: 13, weight: 500, color: C.ink });
        });
        text(g, 'log-loss per match, lower is better', small ? pad : x0, H * .91, { size: 11, color: C.muted });
      }
      g.globalAlpha = 1;
    },
  };

  // ───────── Player shared by the four scenes ─────────
  const scenes = { pandion, pulse, lossia, halfline };
  const players = [];
  document.querySelectorAll('.mini').forEach(figure => {
    const scene = scenes[figure.dataset.scene], canvas = figure.querySelector('canvas'), g = canvas.getContext('2d');
    const button = figure.querySelector('.btn--play'), range = figure.querySelector('input'), output = figure.querySelector('output'), caption = figure.querySelector('.mini__caption'), source = figure.querySelector('.mini__source');
    let t = reduce.matches ? scene.still : 0, playing = !reduce.matches, visible = false, frame = 0, last = 0, width = 0, height = 0, shown = '';
    range.max = scene.length;

    function paint() {
      if (!width) return;
      const ratio = canvas.width / width;
      g.setTransform(ratio, 0, 0, ratio, 0, 0);
      g.globalAlpha = 1;
      g.clearRect(0, 0, width, height);
      scene.draw(g, width, height, t);
      const [, now, from] = scene.captions.filter(([at]) => at <= t).pop();
      if (now !== shown) { caption.textContent = now; source.textContent = from; shown = now; }
      range.value = t;
      range.style.setProperty('--p', (t / scene.length * 100).toFixed(2) + '%');
      range.setAttribute('aria-valuetext', Math.floor(t) + ' seconds. ' + now);
      output.textContent = Math.floor(t) + ' / ' + scene.length + ' s';
      const label = playing ? 'Pause' : 'Play';
      if (button.textContent !== label) button.textContent = label;
      button.setAttribute('aria-label', label + ' the ' + button.dataset.name + ' preview');
    }
    function loop(now) {
      frame = 0;
      if (!playing || !visible || document.querySelector('dialog[open]')) return;
      if (now - last >= 32) {
        t = (t + Math.min(100, now - last) / 1000) % scene.length;
        last = now;
        paint();
      }
      frame = requestAnimationFrame(loop);
    }
    function start() {
      if (playing && visible && !frame) { last = performance.now(); frame = requestAnimationFrame(loop); }
    }
    button.addEventListener('click', () => { playing = !playing; paint(); start(); });
    range.addEventListener('input', () => { playing = false; t = Math.min(Number(range.value), scene.length - .01); paint(); });
    new ResizeObserver(() => {
      width = canvas.clientWidth; height = canvas.clientHeight;
      const ratio = Math.min(devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio);
      paint();
    }).observe(canvas);
    new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; start(); }, { threshold: .3 }).observe(canvas);
    players.push({ paint, start });
  });
  episode.then(value => { data = value; players.forEach(p => p.paint()); }).catch(() => {});
  document.fonts.ready.then(() => players.forEach(p => p.paint()));

  // ───────── Real videos ─────────
  document.querySelectorAll('[data-demo]').forEach(opener => {
    const dialog = document.getElementById('demo-' + opener.dataset.demo), video = dialog.querySelector('video');
    const chapters = [...dialog.querySelectorAll('[data-at]')];
    const play = () => { if (!reduce.matches) video.play().catch(() => {}); };
    opener.addEventListener('click', () => {
      if (!video.hasAttribute('src')) video.src = video.dataset.src;
      dialog.showModal();
      play();
    });
    dialog.querySelector('[data-close]').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
    dialog.addEventListener('close', () => { video.pause(); players.forEach(p => p.start()); });
    chapters.forEach(chapter => chapter.addEventListener('click', () => { video.currentTime = Number(chapter.dataset.at); video.play().catch(() => {}); }));
    video.addEventListener('timeupdate', () => {
      const current = chapters.filter(c => Number(c.dataset.at) <= video.currentTime + .05).pop();
      chapters.forEach(c => { if (c === current) c.setAttribute('aria-current', 'step'); else c.removeAttribute('aria-current'); });
    });
  });
})();
