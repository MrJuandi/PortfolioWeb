'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useTransitionRouter } from 'next-view-transitions';
import Lenis from 'lenis';
import { projectScrollTop } from '@/lib/showcase';

let lenis: Lenis | null = null;
const reduce = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Page-wide behaviour that works on server-rendered markup:
// smooth scroll, in-page anchors, scroll reveals, timeline rail and magnetic buttons.
export default function Effects() {
  const pathname = usePathname();
  const router = useTransitionRouter();

  // Smooth scroll (once)
  useEffect(() => {
    if (reduce() || lenis) return;
    lenis = new Lenis({ duration: 1.15, easing: (t: number) => 1 - Math.pow(1 - t, 4) });
    let raf = 0;
    const loop = (t: number) => { lenis?.raf(t); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); lenis?.destroy(); lenis = null; };
  }, []);

  // In-page anchors: smooth on the home page, transition to the home page elsewhere
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const a = (e.target as Element).closest?.('a[href^="/#"], a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const hash = a.getAttribute('href')!.replace(/^\//, '');
      if (window.location.pathname !== '/') { e.preventDefault(); router.push('/' + hash); return; }
      const m = /^#project-(\d+)$/.exec(hash);
      const pinned = m ? projectScrollTop(Number(m[1]) - 1) : null;
      const el = hash === '#top' ? null : document.querySelector(hash);
      if (hash !== '#top' && !el && pinned === null) return;
      e.preventDefault();
      const target = pinned ?? (hash === '#top' ? 0 : (el as HTMLElement));
      if (lenis) lenis.scrollTo(target as number | HTMLElement, { offset: typeof target === 'number' ? 0 : -72 });
      else if (typeof target === 'number') window.scrollTo({ top: target, behavior: 'smooth' });
      else target.scrollIntoView({ behavior: 'smooth' });
      history.replaceState(null, '', hash === '#top' ? '/' : hash);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [router]);

  // Per page: reveals, timeline rail, magnetic buttons
  useEffect(() => {
    if (lenis) lenis.resize();
    const cleanups: (() => void)[] = [];

    // Reveal on scroll
    const els = document.querySelectorAll<HTMLElement>('.reveal, .line');
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

    // Timeline rails fill and nodes light up
    const rails = document.querySelectorAll<HTMLElement>('.tl');
    if (rails.length) {
      const update = () => {
        const mark = window.innerHeight * 0.65;
        rails.forEach((tl) => {
          const r = tl.getBoundingClientRect();
          const p = Math.min(1, Math.max(0, (mark - r.top) / r.height));
          tl.style.setProperty('--p', reduce() ? '1' : p.toFixed(4));
          tl.querySelectorAll('.tl__node').forEach((n) => {
            n.parentElement?.classList.toggle('is-passed', n.getBoundingClientRect().top < mark);
          });
        });
      };
      update();
      window.addEventListener('scroll', update, { passive: true });
      window.addEventListener('resize', update);
      cleanups.push(() => { window.removeEventListener('scroll', update); window.removeEventListener('resize', update); });
    }

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
