'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';

let lenis: Lenis | null = null;
const reduce = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Page-wide behaviour that works on server-rendered markup:
// smooth scroll, in-page anchors, scroll reveals and magnetic buttons.
export default function Effects() {
  const pathname = usePathname();

  // Smooth scroll (once)
  useEffect(() => {
    if (reduce() || lenis) return;
    lenis = new Lenis({ duration: 1.15, easing: (t: number) => 1 - Math.pow(1 - t, 4) });
    let raf = 0;
    const loop = (t: number) => { lenis?.raf(t); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); lenis?.destroy(); lenis = null; };
  }, []);

  // Keep scrolling within this page. Links to the homepage load its HTML normally.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const anchor = (e.target as Element).closest?.('a[href^="#"]');
      const hash = anchor?.getAttribute('href');
      if (!hash || hash === '#') return;
      const target = document.getElementById(hash.slice(1));
      if (!target || !lenis) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -72 });
      history.replaceState(null, '', hash);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  // Per page: reveals, magnetic buttons
  useEffect(() => {
    if (lenis) lenis.resize();
    const cleanups: (() => void)[] = [];

    // Reveal on scroll
    const els = document.querySelectorAll<HTMLElement>('.reveal');
    const io = new IntersectionObserver((entries) => entries.forEach((en) => {
      if (!en.isIntersecting) return;
      en.target.classList.add('is-in');
      io.unobserve(en.target);
    }), { rootMargin: '0px 0px -5% 0px', threshold: 0 });
    els.forEach((el) => {
      const sibs = el.parentElement ? Array.from(el.parentElement.children).filter((c) => c.classList.contains('reveal')) : [];
      const idx = sibs.indexOf(el);
      if (idx > 0) el.style.transitionDelay = `${Math.min(idx, 6) * 70}ms`;
      io.observe(el);
    });
    cleanups.push(() => io.disconnect());

    // Magnetic buttons
    if (!reduce() && window.matchMedia('(hover: hover)').matches) {
      document.querySelectorAll<HTMLElement>('.btn').forEach((btn) => {
        const move = (e: PointerEvent) => {
          const r = btn.getBoundingClientRect();
          btn.classList.add('is-magnet'); btn.classList.remove('is-released');
          btn.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.22}px, ${(e.clientY - r.top - r.height / 2) * 0.32}px)`;
        };
        const leave = () => { btn.classList.remove('is-magnet'); btn.classList.add('is-released'); btn.style.transform = ''; };
        btn.addEventListener('pointermove', move);
        btn.addEventListener('pointerleave', leave);
        cleanups.push(() => { btn.removeEventListener('pointermove', move); btn.removeEventListener('pointerleave', leave); });
      });
    }

    return () => cleanups.forEach((c) => c());
  }, [pathname]);

  return null;
}
