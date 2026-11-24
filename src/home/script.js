const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;

// Smooth scroll
let lenis = null;
if (!reduce && window.Lenis) {
  lenis = new Lenis({ duration: 1.2, easing: t => 1 - Math.pow(1 - t, 4) });
  document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
    const t = a.getAttribute('href') === '#top' ? 0 : document.querySelector(a.getAttribute('href'));
    if (t === null) return; e.preventDefault(); lenis.scrollTo(t);
  }));
}

// Scroll-linked pieces
const curve = document.getElementById('curve');
const burger = document.getElementById('burger');
const frame = t => {
  lenis?.raf(t);
  const y = scrollY, vh = innerHeight;
  if (!reduce) {
    const c = curve.parentElement.getBoundingClientRect();
    const cp = Math.min(1, Math.max(0, (vh - c.top) / (vh * 0.8)));
    curve.style.transform = `scaleY(${1 - cp})`;
  }
  burger.classList.toggle('is-on', y > vh * 0.25);
  requestAnimationFrame(frame);
};
requestAnimationFrame(frame);


// The hexagon relief animates only while the hero is visible.
(() => {
  const hero = document.querySelector('.hero');
  const canvas = hero.querySelector('canvas');
  const context = canvas.getContext('2d');
  if (!context) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let field = [], width = 0, height = 0, visible = true, frame = 0, pointer = null, lastPaint = 0;

  function face(points, fill, stroke) {
    context.beginPath();
    points.forEach(([x, y], index) => index ? context.lineTo(x, y) : context.moveTo(x, y));
    context.closePath();
    context.fillStyle = fill;
    context.fill();
    if (stroke) { context.strokeStyle = stroke; context.stroke(); }
  }

  function paint(seconds) {
    context.clearRect(0, 0, width, height);
    context.lineWidth = .65;
    for (const { x, y, radius } of field) {
      const distance = Math.hypot(x - width * .79, (y - height * .38) * 1.45);
      const falloff = Math.exp(-distance / (width * .68));
      const ridge = Math.sin(distance * .022 - seconds * .9);
      const detail = Math.sin(x * .012 + y * .019 + seconds * .35) * .34 + Math.sin(x * .04 - y * .044) * .12;
      const nearby = pointer ? Math.exp(-Math.hypot(x - pointer.x, y - pointer.y) / 95) * 24 : 0;
      const lift = 3 + (1 + ridge * .52 + detail) * falloff * radius * .78 + nearby;
      const base = [
        [x - radius, y], [x - radius / 2, y - radius * .54], [x + radius / 2, y - radius * .54],
        [x + radius, y], [x + radius / 2, y + radius * .54], [x - radius / 2, y + radius * .54]
      ];
      const top = base.map(([px, py]) => [px, py - lift]);
      const side = (a, b, color) => face([top[a], top[b], base[b], base[a]], color);
      side(0, 5, '#dcdee1');
      side(5, 4, '#e5e6e8');
      side(4, 3, '#eff0f1');
      const light = Math.min(255, Math.round(248 + lift * .15));
      face(top, 'rgb(' + light + ' ' + light + ' ' + light + ')', '#e3e5e7');
    }
  }

  function animate(time) {
    frame = 0;
    if (time - lastPaint >= 32) {
      paint(time / 1000);
      lastPaint = time;
    }
    start();
  }

  function start() {
    if (visible && !reduced.matches && !frame) frame = requestAnimationFrame(animate);
  }

  function resize() {
    width = hero.clientWidth;
    height = hero.clientHeight;
    const ratio = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    const radius = Math.max(16, Math.min(33, width / 41));
    field = [];
    for (let col = -1; col < width / (radius * 1.5) + 2; col++) {
      for (let row = -2; row < height / (radius * 1.08) + 4; row++) {
        field.push({ x: col * radius * 1.5, y: (row + (col % 2) / 2) * radius * 1.08, radius: radius - 1.2 });
      }
    }
    field.sort((a, b) => a.y - b.y);
    paint(0);
    start();
  }

  new ResizeObserver(resize).observe(hero);
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    start();
  }).observe(hero);
  reduced.addEventListener('change', () => {
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    pointer = null;
    paint(0);
    start();
  });
  hero.addEventListener('pointermove', event => {
    if (event.pointerType !== 'mouse' || reduced.matches) return;
    const bounds = hero.getBoundingClientRect();
    pointer = { x: event.clientX - bounds.left, y: event.clientY - bounds.top };
  });
  hero.addEventListener('pointerleave', () => { pointer = null; });
})();

// Intro words rise in
const big = document.getElementById('big');
big.innerHTML = big.textContent.split(' ').map(w => `<span class="w"><span>${w}</span></span>`).join(' ');
big.querySelectorAll('.w > span').forEach((s, i) => { s.style.transitionDelay = `${i * 18}ms`; });
new IntersectionObserver(([e], o) => { if (e.isIntersecting) { e.target.classList.add('is-in'); o.disconnect(); } }, { threshold: .3 })
  .observe(document.querySelector('.intro'));


// Vertical timelines: rail fills and nodes fill as you scroll
const rails = [...document.querySelectorAll('.vt__list')];
const vtUpdate = () => {
  const mark = innerHeight * 0.62;
  rails.forEach(l => {
    const r = l.getBoundingClientRect();
    l.style.setProperty('--p', reduce ? 1 : Math.min(1, Math.max(0, (mark - r.top) / r.height)).toFixed(4));
    l.querySelectorAll('.vt__item').forEach(it => it.classList.toggle('is-passed', it.querySelector('.vt__dot').getBoundingClientRect().top < mark));
  });
};
addEventListener('scroll', vtUpdate, { passive: true }); addEventListener('resize', vtUpdate); vtUpdate();

// Load and play a demo when its project is expanded.
const projects = [...document.querySelectorAll('.project')];
projects.forEach(project => {
  const video = project.querySelector('video');
  project.addEventListener('toggle', () => {
    if (!project.open) {
      video.pause();
      return;
    }
    projects.forEach(other => {
      if (other === project) return;
      other.open = false;
      other.querySelector('video').pause();
    });
    if (!video.hasAttribute('src')) video.src = video.dataset.src;
    video.muted = true;
    video.play().catch(() => {});
  });
});

// Magnetic buttons
if (fine && !reduce) document.querySelectorAll('.magnet').forEach(el => {
  const inner = el.querySelector('span');
  el.addEventListener('pointermove', e => {
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2, y = e.clientY - r.top - r.height / 2;
    el.classList.add('is-near');
    el.style.transform = `translate(${x * .35}px, ${y * .35}px)`;
    if (inner) inner.style.transform = `translate(${x * .18}px, ${y * .18}px)`;
  });
  el.addEventListener('pointerleave', () => {
    el.classList.remove('is-near');
    el.style.transform = ''; if (inner) inner.style.transform = '';
  });
});
