'use client';

import { useEffect, useRef } from 'react';

// A small dot that replaces the pointer on desktop. Over links and buttons it grows
// into a circle that inverts what is underneath. Off on touch devices and with reduced motion.
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = dot.current;
    if (!el) return;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduce) return;

    document.documentElement.classList.add('has-cursor');
    const pos = { x: -100, y: -100, tx: -100, ty: -100 };
    let raf = 0;

    const tick = () => {
      pos.x += (pos.tx - pos.x) * 0.35;
      pos.y += (pos.ty - pos.y) * 0.35;
      el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    const move = (e: PointerEvent) => {
      pos.tx = e.clientX; pos.ty = e.clientY;
      if (pos.x < 0) { pos.x = pos.tx; pos.y = pos.ty; }
      el.classList.add('is-visible');
      const hit = (e.target as Element).closest?.('a, button, [role="button"], .stage');
      el.classList.toggle('is-hover', !!hit);
    };
    const down = () => el.classList.add('is-down');
    const up = () => el.classList.remove('is-down');
    const out = (e: MouseEvent) => { if (!e.relatedTarget) el.classList.remove('is-visible'); };

    raf = requestAnimationFrame(tick);
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerdown', down);
    window.addEventListener('pointerup', up);
    document.addEventListener('mouseout', out);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerdown', down);
      window.removeEventListener('pointerup', up);
      document.removeEventListener('mouseout', out);
      document.documentElement.classList.remove('has-cursor');
    };
  }, []);

  return <div className="cursor" ref={dot} aria-hidden="true"><span /></div>;
}
