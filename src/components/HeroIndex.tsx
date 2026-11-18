'use client';

import { useEffect, useRef } from 'react';
import { projects, shortStatus, yearOf } from '@/content/projects';

// "Selected work" list in the hero, with a video preview that follows the cursor.
export default function HeroIndex() {
  const box = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const list = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const el = box.current, v = video.current, ol = list.current;
    if (!el || !v || !ol || !window.matchMedia('(hover: hover) and (min-width: 901px)').matches) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    projects.forEach((p) => { if (p.image) { const im = new Image(); im.src = p.image; } });
    const pos = { x: 0, y: 0, tx: 0, ty: 0 };
    let active = false, raf = 0;

    const tick = () => {
      pos.x += (pos.tx - pos.x) * (reduce ? 1 : 0.18);
      pos.y += (pos.ty - pos.y) * (reduce ? 1 : 0.18);
      el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      raf = active || Math.abs(pos.tx - pos.x) > 0.5 ? requestAnimationFrame(tick) : 0;
    };
    const place = (e: PointerEvent) => {
      const w = el.offsetWidth, h = el.offsetHeight;
      let x = e.clientX + 28, y = e.clientY - h - 20;
      if (x + w > window.innerWidth - 12) x = e.clientX - w - 28;
      if (y < 72) y = e.clientY + 28;
      pos.tx = x; pos.ty = y;
    };
    const over = (e: PointerEvent) => {
      const a = (e.target as Element).closest('a[data-video]') as HTMLAnchorElement | null;
      if (!a?.dataset.video) return;
      if (!v.src.endsWith(a.dataset.video)) { v.poster = a.dataset.poster || ''; v.src = a.dataset.video; }
      v.play().catch(() => {});
      place(e);
      if (!active) { pos.x = pos.tx; pos.y = pos.ty; }
      active = true; el.classList.add('is-on');
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const move = (e: PointerEvent) => { if (active) place(e); };
    const leave = () => { active = false; el.classList.remove('is-on'); setTimeout(() => { if (!active) v.pause(); }, 260); };
    ol.addEventListener('pointerover', over);
    ol.addEventListener('pointermove', move);
    ol.addEventListener('pointerleave', leave);
    return () => {
      ol.removeEventListener('pointerover', over); ol.removeEventListener('pointermove', move); ol.removeEventListener('pointerleave', leave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <nav className="index reveal" aria-labelledby="index-title">
        <div className="index__head mono">
          <span id="index-title">Selected work</span>
          <span className="muted">{String(projects.length).padStart(2, '0')}</span>
        </div>
        <ol className="index__list" ref={list}>
          {projects.map((p, i) => (
            <li className="index__row" key={p.slug}>
              <a href={`#project-${i + 1}`} data-video={p.video ?? ''} data-poster={p.image ?? ''}>
                <span className="index__num">{String(i + 1).padStart(2, '0')}</span>
                <span className="index__name">{p.title}</span>
                <span className="index__status"><span className="badge__dot" aria-hidden="true" />{shortStatus(p.status)}</span>
                <span className="index__year">{yearOf(p.year)}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>
      <div className="preview" ref={box} aria-hidden="true"><video ref={video} muted loop playsInline preload="none" /></div>
    </>
  );
}
