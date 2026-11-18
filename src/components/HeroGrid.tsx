'use client';

import { useEffect, useRef } from 'react';

// Hero background grid that reacts to the pointer: the column under the cursor darkens,
// a faint horizontal line follows its height and small coordinates sit at its end.
// Desktop with a fine pointer only; static grid otherwise.
export default function HeroGrid() {
  const root = useRef<HTMLDivElement>(null);
  const col = useRef<HTMLDivElement>(null);
  const row = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = root.current, c = col.current, r = row.current, l = label.current;
    const hero = el?.parentElement;
    if (!el || !c || !r || !l || !hero) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 901px)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const inner = hero.querySelector<HTMLElement>('.hero__inner');
    let bounds: number[] = [];
    let current = -1, raf = 0, active = false;
    const y = { v: 0, t: 0 };

    const measure = () => {
      if (!inner) return;
      const box = inner.getBoundingClientRect();
      const cs = getComputedStyle(inner);
      const left = box.left + parseFloat(cs.paddingLeft);
      const width = box.width - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      const inset = Math.min(24, Math.max(0, window.innerWidth * 0.016));
      bounds = [left - inset, left + width * 0.25, left + width * 0.5, left + width * 0.75, left + width + inset];
      r.style.left = `${bounds[0]}px`;
      r.style.width = `${bounds[4] - bounds[0]}px`;
    };

    const tick = () => {
      y.v += (y.t - y.v) * 0.2;
      r.style.transform = `translate3d(0, ${y.v}px, 0)`;
      raf = active || Math.abs(y.t - y.v) > 0.5 ? requestAnimationFrame(tick) : 0;
    };

    const move = (e: PointerEvent) => {
      const top = hero.getBoundingClientRect().top;
      const x = e.clientX, py = e.clientY - top;
      const i = bounds.findIndex((b, k) => k < 4 && x >= b && x < bounds[k + 1]);
      if (i !== current) {
        current = i;
        el.classList.toggle('has-col', i >= 0);
        if (i >= 0) { c.style.left = `${bounds[i]}px`; c.style.width = `${bounds[i + 1] - bounds[i]}px`; }
      }
      y.t = py;
      const h = hero.offsetHeight;
      l.textContent = `${i >= 0 ? `C${i + 1}` : '—'} · ${Math.round(x)} / ${Math.round(py)} · ${(py / h).toFixed(2)}`;
      if (!active) { active = true; el.classList.add('is-live'); y.v = py; }
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const leave = () => { active = false; current = -1; el.classList.remove('is-live', 'has-col'); };

    measure();
    window.addEventListener('resize', measure);
    hero.addEventListener('pointermove', move);
    hero.addEventListener('pointerleave', leave);
    return () => {
      window.removeEventListener('resize', measure);
      hero.removeEventListener('pointermove', move);
      hero.removeEventListener('pointerleave', leave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="hero__grid" ref={root} aria-hidden="true">
      <div className="hero__col" ref={col} />
      <div className="hero__row" ref={row}><span className="hero__coords" ref={label} /></div>
    </div>
  );
}
