'use client';

import { useEffect, useRef, useState } from 'react';
import { Link } from 'next-view-transitions';
import { projects, isLive } from '@/content/projects';

// Desktop: a pinned section that shows one project at a time while the media cross-fades.
// Mobile: projects stacked, each with its own video.
export default function Showcase() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const n = projects.length;

  useEffect(() => {
    const sc = root.current;
    if (!sc) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const desktop = window.matchMedia('(min-width: 901px)');
    let last = -1, lastVisible = false;

    const update = () => {
      const stageVideos = sc.querySelectorAll<HTMLVideoElement>('.stage__item');
      if (!desktop.matches) { stageVideos.forEach((v) => v.pause()); return; }
      const vh = window.innerHeight;
      const r = sc.getBoundingClientRect();
      const p = Math.min(0.9999, Math.max(0, -r.top / Math.max(1, sc.offsetHeight - vh)));
      const best = Math.min(n - 1, Math.floor(p * n));
      const within = p * n - best;
      sc.querySelectorAll<HTMLElement>('.stage__fill').forEach((f, i) => {
        f.style.transform = `scaleX(${i < best ? 1 : i > best ? 0 : within.toFixed(3)})`;
      });
      const visible = r.bottom > 0 && r.top < vh;
      if (best === last && visible === lastVisible) return;
      last = best; lastVisible = visible;
      setActive(best);
      stageVideos.forEach((v, i) => {
        if (i === best && visible && !reduce) { if (!v.getAttribute('src')) v.src = v.dataset.src!; v.play().catch(() => {}); }
        else v.pause();
      });
    };

    // Mobile: inline videos play while visible
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      const v = e.target as HTMLVideoElement;
      if (e.isIntersecting && !desktop.matches && !reduce) v.play().catch(() => {}); else v.pause();
    }), { threshold: 0.35 });
    sc.querySelectorAll('.project__media video').forEach((v) => io.observe(v));

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => { window.removeEventListener('scroll', update); window.removeEventListener('resize', update); io.disconnect(); };
  }, [n]);

  const current = projects[active];

  return (
    <div className="showcase" ref={root} style={{ ['--n' as string]: n }}>
      <div className="showcase__pin">
        <div className="showcase__list">
          {projects.map((p, i) => (
            <article
              key={p.slug}
              id={`project-${i + 1}`}
              className={`project${i === active ? ' is-current' : i < active ? ' is-before' : ' is-after'}`}
            >
              <span className="project__idx mono">{String(i + 1).padStart(2, '0')}</span>
              <div className="project__body">
                <div className="project__meta mono">
                  <span>{p.year}</span>
                  <span className={`badge${isLive(p.status) ? ' badge--live' : ''}`}><span className="badge__dot" aria-hidden="true" />{p.status}</span>
                </div>
                <h3 className="project__title" style={{ ['--vt-title' as string]: `title-${p.slug}` }}>{p.title}</h3>
                <p className="project__desc">{p.description}</p>
                <p className="project__detail">{p.detail}</p>
                <ul className="project__tags">{p.tags.map((t) => <li key={t}>{t}</li>)}</ul>
                <Link className="project__case" href={`/work/${p.slug}`}>Read the case study <span aria-hidden="true">→</span></Link>
              </div>
              {p.video && (
                <figure className="project__media">
                  <video src={p.video} poster={p.image} muted loop playsInline preload="metadata" aria-label={p.caption ?? p.title}
                    style={{ ['--vt' as string]: `media-${p.slug}` }} />
                  {p.caption && <figcaption className="mono">{p.caption}</figcaption>}
                </figure>
              )}
            </article>
          ))}
        </div>

        <div className="showcase__stage">
          <Link className="stage-link" href={`/work/${current.slug}`} aria-label={`Open the ${current.title} case study`}>
            <div className="stage">
              {projects.map((p, i) => (
                <video
                  key={p.slug}
                  className={`stage__item${i === active ? ' is-active' : ''}`}
                  data-src={p.video}
                  poster={p.image}
                  muted loop playsInline preload="none"
                  aria-hidden="true"
                  style={{ ['--vt' as string]: `media-${p.slug}` }}
                />
              ))}
              <span className="stage__open">Open case study <span aria-hidden="true">↗</span></span>
            </div>
          </Link>
          <div className="stage__meta" aria-hidden="true">
            <span className="stage__count mono">{String(active + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}</span>
            <span className="stage__segs">{projects.map((p) => <span className="stage__seg" key={p.slug}><span className="stage__fill" /></span>)}</span>
            <span className="stage__caption mono">{current.caption}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
