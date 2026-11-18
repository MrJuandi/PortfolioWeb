'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Link } from 'next-view-transitions';

const links = [
  { href: '/#path', id: 'path', label: 'Path' },
  { href: '/#work', id: 'work', label: 'Work' },
  { href: '/#contact', id: 'contact', label: 'Contact' },
];

export default function Nav() {
  const pathname = usePathname();
  const [time, setTime] = useState('--:--');
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const lastY = useRef(0);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Madrid' });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > lastY.current && y > window.innerHeight * 0.9);
      lastY.current = y;
      const probe = window.innerHeight * 0.5;
      let current: string | null = null;
      for (const l of links) {
        const r = document.getElementById(l.id)?.getBoundingClientRect();
        if (r && r.top <= probe && r.bottom > probe) current = l.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  return (
    <header className={`nav${scrolled ? ' is-scrolled' : ''}${hidden ? ' is-hidden' : ''}`}>
      <Link className="nav__brand" href="/" aria-label="Juan Diego Díaz Hidalgo — home">
        <span className="nav__mark" aria-hidden="true">
          <svg viewBox="0 0 64 64"><path d="M38 14v22a10 10 0 0 1-20 0" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="square" /></svg>
        </span>
        <span className="nav__name">Juan Diego Díaz Hidalgo</span>
      </Link>
      <nav className="nav__links" aria-label="Primary">
        {links.map((l, i) => (
          <a key={l.id} href={l.href} className={pathname === '/' && active === l.id ? 'is-active' : undefined}>
            <span className="mono">{String(i + 1).padStart(2, '0')}</span> {l.label}
          </a>
        ))}
      </nav>
      <div className="nav__end">
        <span className="nav__clock mono" aria-label="Local time in Madrid">MAD <span>{time}</span></span>
        <a className="btn btn--small" href="/#contact">Get in touch</a>
      </div>
    </header>
  );
}
