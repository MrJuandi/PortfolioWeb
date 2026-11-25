'use client';

import { useEffect, useState } from 'react';

const links = [
  { href: '/#path', label: 'Path' },
  { href: '/#projects', label: 'Projects' },
  { href: '/#contact', label: 'Contact' },
];

export default function Nav() {
  const [time, setTime] = useState('--:--');

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Madrid' });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="nav">
      {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- the homepage is served as an HTML document. */}
      <a className="nav__brand" href="/" aria-label="Juan Diego Díaz Hidalgo, home">
        <svg viewBox="0 0 64 64" aria-hidden="true"><path d="M38 14v22a10 10 0 0 1-20 0" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="square" /></svg>
      </a>
      <nav className="nav__links" aria-label="Primary">
        {links.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}
      </nav>
      <span className="nav__clock">Madrid <time>{time}</time></span>
    </header>
  );
}
