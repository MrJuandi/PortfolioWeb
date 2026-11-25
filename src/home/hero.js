// Hero: a recorded Pandion episode on the real relief, drawn in characters with WebGL.
// Runs after script.js and uses its `reduce`, `clamp` and `episode`.
(async () => {
  const hero = document.querySelector('.hero'), canvas = $('map'), status = $('map-status');
  const seek = $('seek'), play = $('play'), output = $('t'), buttons = [...document.querySelectorAll('.run')];
  const END = 3600, SPEED = 100, HOLD = 4; // SPEED: simulated seconds per second
  const ORDER = ['learned', 'heuristic', 'none'], NEVER = 1e6;

  let data;
  try {
    data = await episode;
    intro.load(.6);
    await document.fonts.load('500 24px "Martian Mono"').catch(() => {});
    intro.load(.85);
  } catch {
    status.textContent = 'The replay could not be loaded. Final results are listed below.';
    intro.load(1);
    play.disabled = seek.disabled = true;
    return;
  }

  const { n: N, elevation, runs } = data;
  const LOW = Math.min(...elevation), RELIEF = 2 / (N * data.cell_m); // metres to world units, true scale
  const metres = (row, col) => {
    const y = clamp(row, 0, N - 1), x = clamp(col, 0, N - 1), r = Math.min(Math.floor(y), N - 2), c = Math.min(Math.floor(x), N - 2), fy = y - r, fx = x - c;
    const e = (i, j) => elevation[i * N + j];
    return (e(r, c) * (1 - fx) + e(r, c + 1) * fx) * (1 - fy) + (e(r + 1, c) * (1 - fx) + e(r + 1, c + 1) * fx) * fy;
  };
  const ground = (row, col) => (metres(row, col) - LOW) * RELIEF;
  const sorted = {};
  for (const key in runs) sorted[key] = runs[key].arrival.filter(v => v >= 0).sort((a, b) => a - b);
  const burned = (key, t) => { let i = 0; while (i < sorted[key].length && sorted[key][i] <= t) i++; return i; };

  // The first play opens at 20 min, with the fire already visible.
  let current = 'learned', chosen = false, time = reduce.matches ? END : 1200, clock = 0, hold = 0;
  let playing = !reduce.matches, visible = true, frame = 0, last = 0, width = 0, height = 0, aim = [0, 0], look = [0, 0];

  // ───────── WebGL scene ─────────
  const gl = canvas.getContext('webgl', { antialias: true, alpha: true, premultipliedAlpha: false });
  const scene = gl && build();
  let grow = intro.active && scene ? 0 : 1, growing = 0; // 0: characters in the air, 1: terrain in place
  intro.play(() => { growing = performance.now(); start(); });
  intro.skipped(() => { grow = 1; growing = 0; paint(); start(); });
  intro.load(1);
  if (scene) status.hidden = true;
  else status.textContent = 'This browser cannot draw the 3D terrain. Results are listed below.';

  function build() {
    const compile = (vertex, fragment) => {
      const program = gl.createProgram();
      [[gl.VERTEX_SHADER, vertex], [gl.FRAGMENT_SHADER, fragment]].forEach(([type, source]) => {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source); gl.compileShader(shader); gl.attachShader(program, shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) console.error(gl.getShaderInfoLog(shader));
      });
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) { console.error(gl.getProgramInfoLog(program)); return null; }
      const at = {};
      for (let i = 0; i < gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES); i++) { const a = gl.getActiveAttrib(program, i); at[a.name] = gl.getAttribLocation(program, a.name); }
      for (let i = 0; i < gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS); i++) { const u = gl.getActiveUniform(program, i); at[u.name] = gl.getUniformLocation(program, u.name); }
      return { program, at };
    };

    const INFERNO = `vec3 inferno(float t) {
      const vec3 c0 = vec3(0.00021894, 0.00165100, -0.01948090), c1 = vec3(0.10651342, 0.56395644, 3.93271239), c2 = vec3(11.60249308, -3.97285397, -15.94239411),
        c3 = vec3(-41.70399613, 17.43639888, 44.35414520), c4 = vec3(77.16293570, -33.40235894, -81.80730926), c5 = vec3(-71.31942824, 32.62606426, 73.20951986), c6 = vec3(25.13112622, -12.24266895, -23.07032500);
      return c0 + t * (c1 + t * (c2 + t * (c3 + t * (c4 + t * (c5 + t * c6)))));
    }`;

    // uMode 0: opaque ground (hides what is behind the hills), 1: characters, 2: embers
    const land = compile(`
      precision highp float;
      attribute vec3 aPos; attribute vec4 aInfo; attribute vec3 aFire;
      uniform mat4 uView; uniform float uTime, uClock, uPx, uGrow; uniform mediump float uMode;
      varying vec4 vColor; varying float vGlyph;
      ${INFERNO}
      void main() {
        float shade = aInfo.x, rand = aInfo.z;
        // The terrain assembles outwards from its centre
        float g = smoothstep(0.0, 1.0, clamp(uGrow * 2.4 - 0.3 - length(aPos.xz) * 0.5 - rand * 0.35, 0.0, 1.0));
        float lit = step(aFire.x, uTime), heat = lit * exp(-max(uTime - aFire.x, 0.0) / 700.0), wet = step(aFire.y, uTime);
        float flick = fract(sin(rand * 913.7 + floor(uClock * 8.0) * 3.17) * 43758.5453);
        vec3 p = aPos;
        p.y = aPos.y * g + (uMode < 0.5 ? 0.0 : (1.0 - g) * (0.35 + rand * 0.7));
        lit *= step(0.95, g); heat *= step(0.95, g);
        float alpha = smoothstep(0.0, 0.03, aInfo.w) * clamp(uGrow * 6.0 - rand, 0.0, 1.0);
        if (uMode < 0.5) {
          p.y -= 0.012;
          vColor = vec4(mix(vec3(0.043, 0.039, 0.063), clamp(inferno(0.12 + heat * 0.3), 0.0, 1.0), lit * 0.9), 1.0);
        } else if (uMode < 1.5) {
          p.y += heat * (0.01 + 0.045 * flick);
          vec3 c = mix(vec3(0.17, 0.155, 0.21), vec3(0.52, 0.48, 0.58), shade * shade);
          c = mix(c, vec3(0.64, 0.60, 0.72), aInfo.y);
          c = mix(c, vec3(0.655, 0.192, 0.373), aFire.z * 0.5);
          vec3 fire = clamp(inferno(clamp(0.42 + heat * 0.56 + (flick - 0.5) * heat * 0.24, 0.0, 1.0)), 0.0, 1.0);
          c = mix(c, vec3(0.361, 0.784, 0.918), wet * (1.0 - lit));
          c = mix(c, fire, lit);
          float terrain = max(mix(floor(shade * 6.9), 5.0, aInfo.y), floor((1.0 - g) * (1.0 + rand * 6.0)));
          float burning = 2.0 + floor(clamp(heat * 0.65 + rand * 0.35, 0.0, 1.0) * 7.9);
          vGlyph = mix(mix(terrain, 10.0, wet), burning, lit);
          vColor = vec4(c, alpha);
        } else {
          float life = fract(uClock * (0.22 + rand * 0.2) + rand * 37.0);
          float on = step(0.86, fract(rand * 57.0)) * step(0.12, heat);
          p.y += 0.02 + life * 0.34 * (0.4 + heat);
          p.x += sin(life * 5.0 + rand * 40.0) * 0.025;
          p.z -= life * 0.10; // the recorded wind blows north
          vColor = vec4(clamp(inferno(0.95 - life * 0.4), 0.0, 1.0), (1.0 - life) * heat * on);
          vGlyph = 11.0;
          if (on < 0.5) p = vec3(0.0, -50.0, 0.0);
        }
        gl_Position = uView * vec4(p, 1.0);
        if (uMode > 0.5) vColor.a *= mix(1.0, 0.42, smoothstep(2.2, 4.0, gl_Position.w));
        gl_PointSize = uPx / gl_Position.w * (uMode > 1.5 ? 0.34 : 1.0 + heat * 0.25);
      }`, `
      precision mediump float;
      uniform sampler2D uGlyphs; uniform float uMode;
      varying vec4 vColor; varying float vGlyph;
      void main() {
        if (uMode < 0.5) { gl_FragColor = vColor; return; }
        float a = vGlyph > 10.5 ? 1.0 : texture2D(uGlyphs, vec2((floor(vGlyph + 0.5) + gl_PointCoord.x) / 16.0, gl_PointCoord.y)).a;
        if (a * vColor.a < 0.06) discard;
        gl_FragColor = vec4(vColor.rgb, a * vColor.a);
      }`);
    const spark = compile(`
      attribute vec3 aPos; attribute vec4 aColor; attribute float aSize;
      uniform mat4 uView; varying vec4 vColor;
      void main() { gl_Position = uView * vec4(aPos, 1.0); gl_PointSize = aSize / gl_Position.w; vColor = aColor; }`, `
      precision mediump float; varying vec4 vColor;
      void main() { gl_FragColor = vColor; }`);
    if (!land || !spark) return null;

    // Character atlas
    const atlas = document.createElement('canvas');
    atlas.width = 512; atlas.height = 32;
    const ink = atlas.getContext('2d');
    ink.font = '500 27px "Martian Mono", ui-monospace, Menlo, monospace';
    ink.textAlign = 'center'; ink.textBaseline = 'middle'; ink.fillStyle = '#fff';
    [' ', '·', ':', '-', '=', '+', '*', '%', '#', '@', '≈'].forEach((c, i) => ink.fillText(c, i * 32 + 16, 17));
    gl.bindTexture(gl.TEXTURE_2D, gl.createTexture());
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, atlas);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);

    // Vertices: several characters per recorded 100 m cell
    const M = innerWidth < 700 ? 80 : 120, pos = [], info = [], cell = [];
    for (let i = 0; i < M; i++) for (let j = 0; j < M; j++) {
      const v = (i + .5) / M, u = (j + .5) / M, row = v * N - .5, col = u * N - .5, d = N / M;
      const h = metres(row, col), dx = metres(row, col + .5) - metres(row, col - .5), dy = metres(row + .5, col) - metres(row - .5, col);
      const band = Math.floor(h / 100), contour = band !== Math.floor(metres(row, col + d) / 100) || band !== Math.floor(metres(row + d, col) / 100);
      const s = Math.sin(i * 12.9898 + j * 78.233) * 43758.5453;
      pos.push(u * 2 - 1, (h - LOW) * RELIEF, v * 2 - 1);
      info.push(clamp(.4 + (dx + dy) / 95, 0, 1), contour ? 1 : 0, s - Math.floor(s), Math.min(u, v, 1 - u, 1 - v));
      cell.push(Math.floor(v * N) * N + Math.floor(u * N));
    }
    const index = [];
    for (let i = 0; i < M - 1; i++) for (let j = 0; j < M - 1; j++) { const a = i * M + j; index.push(a, a + 1, a + M, a + 1, a + M + 1, a + M); }
    const buffer = (values, target = gl.ARRAY_BUFFER) => { const b = gl.createBuffer(); gl.bindBuffer(target, b); gl.bufferData(target, values, gl.STATIC_DRAW); return b; };
    const buffers = { pos: buffer(new Float32Array(pos)), info: buffer(new Float32Array(info)), index: buffer(new Uint16Array(index), gl.ELEMENT_ARRAY_BUFFER), fire: {}, sparks: gl.createBuffer() };
    for (const key of ORDER) {
      const run = runs[key], wet = new Array(N * N).fill(NEVER);
      run.drops.forEach(([, t, list]) => list.forEach(([r, c]) => { wet[r * N + c] = Math.min(wet[r * N + c], t); }));
      const fire = [];
      cell.forEach(k => fire.push(run.arrival[k] < 0 ? NEVER : run.arrival[k], wet[k], runs.none.arrival[k] >= 0 && run.arrival[k] < 0 ? 1 : 0));
      buffers.fire[key] = buffer(new Float32Array(fire));
    }
    gl.enable(gl.DEPTH_TEST); gl.depthFunc(gl.LEQUAL);
    gl.enable(gl.BLEND); gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(0, 0, 0, 0);
    return { land, spark, buffers, count: M * M, indices: index.length, spacing: 2 / M };
  }

  // Column-major view-projection: orbit camera with a lens shift so the terrain leaves room for the name.
  function camera() {
    const ease = 1 - Math.pow(1 - grow, 3), away = 1 - ease, wide = width > 840, aspect = width / height, fov = wide ? .62 : .72;
    const yaw = -.55 - away * .7 + Math.sin(clock * .12) * .2 + look[0] * .16, pitch = (wide ? .7 : .74) + away * .4 + look[1] * .07;
    const distance = (wide ? Math.max(2.35, 4.4 / aspect) : clamp(2.2 / aspect, 2.7, 4.1)) * (1 + away * .3);
    const target = [-.22, .18, -.12];
    const eye = [target[0] + Math.sin(yaw) * Math.cos(pitch) * distance, target[1] + Math.sin(pitch) * distance, target[2] + Math.cos(yaw) * Math.cos(pitch) * distance];
    const z = norm([eye[0] - target[0], eye[1] - target[1], eye[2] - target[2]]), x = norm(cross([0, 1, 0], z)), y = cross(z, x);
    const view = [x[0], y[0], z[0], 0, x[1], y[1], z[1], 0, x[2], y[2], z[2], 0, -dot(x, eye), -dot(y, eye), -dot(z, eye), 1];
    const f = 1 / Math.tan(fov / 2), near = .1, far = 20;
    const proj = [f / aspect, 0, 0, 0, 0, f, 0, 0, wide ? -.46 : 0, wide ? 0 : .46, (far + near) / (near - far), -1, 0, 0, 2 * far * near / (near - far), 0];
    const out = new Float32Array(16);
    for (let c = 0; c < 4; c++) for (let r = 0; r < 4; r++) for (let k = 0; k < 4; k++) out[c * 4 + r] += proj[k * 4 + r] * view[c * 4 + k];
    return { matrix: out, pixels: f * canvas.height / 2 };
  }
  const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const norm = a => { const l = Math.hypot(...a); return a.map(v => v / l); };

  function position(track, t) {
    let i = 1;
    while (i < track.length - 1 && track[i][0] < t) i++;
    const a = track[i - 1], b = track[i], f = clamp((t - a[0]) / Math.max(1, b[0] - a[0]), 0, 1);
    return [a[1] + (b[1] - a[1]) * f, a[2] + (b[2] - a[2]) * f];
  }

  function sparks() {
    const run = runs[current], out = [], scale = canvas.height * .0042;
    const point = (col, row, y, [r, g, b], a, size) => out.push(col / N * 2 - 1, y, row / N * 2 - 1, r, g, b, a, size * scale * 3);
    const WHITE = [.925, .91, .875], WATER = [.361, .784, .918];
    run.tracks.forEach(track => {
      for (let k = 14; k >= 0; k--) {
        const [x, y] = position(track, Math.max(0, time - k * 5));
        if (x < -1 || x > N + 1 || y < -1 || y > N + 1) continue;
        point(x, y, ground(y - .5, x - .5) + .17, WHITE, k ? .5 * (1 - k / 15) : 1, k ? .9 : 2.2);
      }
    });
    run.drops.forEach(([a, t], d) => {
      const age = (time - t) / 110;
      if (age < 0 || age > 1) return;
      const [x, y] = position(run.tracks[a], t), floor = ground(y - .5, x - .5);
      for (let k = 0; k < 60; k++) {
        const r1 = Math.abs(Math.sin(k * 12.9 + d)) , r2 = Math.abs(Math.sin(k * 78.2 + d * 3)), fall = clamp(age * 2.2 - r1 * .7, 0, 1);
        if (fall <= 0) continue;
        point(x + (r2 - .5) * 2.4 * (.3 + fall), y + (r1 - .5) * 2.4 * (.3 + fall), floor + .17 * (1 - fall * fall), WATER, (1 - age) * .95, 1.1);
      }
    });
    return new Float32Array(out);
  }

  function paint() {
    if (!scene || !width) return;
    const { matrix, pixels } = camera(), { land, spark, buffers } = scene;
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.useProgram(land.program);
    const feed = (name, b, size) => { gl.bindBuffer(gl.ARRAY_BUFFER, b); gl.enableVertexAttribArray(land.at[name]); gl.vertexAttribPointer(land.at[name], size, gl.FLOAT, false, 0, 0); };
    feed('aPos', buffers.pos, 3); feed('aInfo', buffers.info, 4); feed('aFire', buffers.fire[current], 3);
    gl.uniformMatrix4fv(land.at.uView, false, matrix);
    gl.uniform1f(land.at.uTime, time); gl.uniform1f(land.at.uClock, clock); gl.uniform1f(land.at.uGrow, grow); gl.uniform1f(land.at.uPx, scene.spacing * pixels * 1.55);
    gl.uniform1f(land.at.uMode, 0);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.index);
    gl.drawElements(gl.TRIANGLES, scene.indices, gl.UNSIGNED_SHORT, 0);
    gl.depthMask(false);
    gl.uniform1f(land.at.uMode, 1); gl.drawArrays(gl.POINTS, 0, scene.count);
    gl.uniform1f(land.at.uMode, 2); gl.drawArrays(gl.POINTS, 0, scene.count);
    const points = sparks();
    if (points.length && grow === 1) {
      gl.useProgram(spark.program);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffers.sparks); gl.bufferData(gl.ARRAY_BUFFER, points, gl.DYNAMIC_DRAW);
      [['aPos', 3, 0], ['aColor', 4, 12], ['aSize', 1, 28]].forEach(([name, size, offset]) => { gl.enableVertexAttribArray(spark.at[name]); gl.vertexAttribPointer(spark.at[name], size, gl.FLOAT, false, 32, offset); });
      gl.uniformMatrix4fv(spark.at.uView, false, matrix);
      gl.drawArrays(gl.POINTS, 0, points.length / 8);
    }
    gl.depthMask(true);
  }

  // ───────── Player ─────────
  let shown = '';
  function readout() {
    const total = sorted.none.length, minutes = String(Math.floor(time / 60)).padStart(2, '0');
    buttons.forEach(button => {
      const count = burned(button.dataset.run, time);
      button.querySelector('b').textContent = count;
      button.style.setProperty('--w', (count / total * 100).toFixed(1) + '%');
      button.setAttribute('aria-pressed', String(button.dataset.run === current));
    });
    seek.value = time;
    seek.style.setProperty('--p', (time / END * 100).toFixed(2) + '%');
    seek.setAttribute('aria-valuetext', minutes + ' minutes');
    output.textContent = 't + ' + minutes + ' min';
    const label = playing ? 'Pause' : time >= END ? 'Replay' : 'Play';
    if (label !== shown) { play.textContent = label; shown = label; }
  }
  function loop(now) {
    frame = 0;
    if (!playing || !visible || document.querySelector('dialog[open]')) return;
    const step = Math.min(100, now - last) / 1000;
    last = now;
    if (growing) {
      grow = clamp((now - growing) / 2100, 0, 1);
      if (grow === 1) growing = 0;
      paint();
      frame = requestAnimationFrame(loop);
      return;
    }
    if (grow < 1) return; // still behind the loader
    clock += step;
    if (time < END) time = Math.min(END, time + step * SPEED);
    else if ((hold += step) > HOLD) {
      // Until the visitor picks a controller, the replay moves on to the next one.
      hold = 0; time = 0;
      if (!chosen) current = ORDER[(ORDER.indexOf(current) + 1) % ORDER.length];
    }
    look = look.map((v, i) => v + (aim[i] - v) * Math.min(1, step * 3));
    paint(); readout();
    frame = requestAnimationFrame(loop);
  }
  function start() {
    if (playing && visible && !frame) { last = performance.now(); frame = requestAnimationFrame(loop); }
  }

  buttons.forEach(button => button.addEventListener('click', () => {
    current = button.dataset.run; chosen = true;
    paint(); readout();
  }));
  play.addEventListener('click', () => {
    if (!playing && time >= END) time = hold = 0;
    playing = !playing;
    paint(); readout(); start();
  });
  seek.addEventListener('input', () => { playing = false; time = Number(seek.value); hold = 0; paint(); readout(); });
  hero.addEventListener('pointermove', event => {
    if (event.pointerType === 'mouse' && !reduce.matches) aim = [event.clientX / innerWidth * 2 - 1, event.clientY / innerHeight * 2 - 1];
  });
  document.querySelectorAll('dialog').forEach(dialog => dialog.addEventListener('close', start));
  canvas.addEventListener('webglcontextlost', event => { event.preventDefault(); playing = false; readout(); });

  new ResizeObserver(() => {
    width = canvas.clientWidth; height = canvas.clientHeight;
    const ratio = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio);
    paint();
  }).observe(canvas);
  new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; start(); }).observe(canvas);
  readout();
  start();
})();
