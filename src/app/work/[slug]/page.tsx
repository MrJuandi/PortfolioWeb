import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Link } from 'next-view-transitions';
import { projects, getProject, isLive } from '@/content/projects';
import CaseVideo from '@/components/CaseVideo';
import Footer from '@/components/Footer';

export const dynamicParams = false;
export const generateStaticParams = () => projects.map((p) => ({ slug: p.slug }));

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = getProject(params.slug);
  if (!p) return {};
  return { title: p.title, description: p.description };
}

export default function CaseStudy({ params }: { params: { slug: string } }) {
  const p = getProject(params.slug);
  if (!p) notFound();
  const i = projects.indexOf(p);
  const next = projects[(i + 1) % projects.length];

  return (
    <main id="main" className="case">
      <div className="wrap" id="top">
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- the homepage is served as an HTML document. */}
        <a className="case__back" href="/#work">← All work</a>

        <header className="case__head">
          <div>
            <div className="project__meta mono reveal">
              <span>{p.year}</span>
              <span className={`badge${isLive(p.status) ? ' badge--live' : ''}`}><span className="badge__dot" aria-hidden="true" />{p.status}</span>
            </div>
            <h1 className="case__title" style={{ viewTransitionName: `title-${p.slug}` }}>{p.title}</h1>
          </div>
          <p className="case__lede reveal">{p.description}</p>
        </header>

        {p.video && (
          <figure className="case__media">
            <CaseVideo src={p.video} poster={p.image} label={p.caption ?? p.title} name={`media-${p.slug}`} />
            {p.caption && <figcaption className="mono">{p.caption}</figcaption>}
          </figure>
        )}

        <dl className="case__facts reveal">
          <div><dt>When</dt><dd>{p.year}</dd></div>
          <div><dt>Status</dt><dd>{p.status}</dd></div>
          <div><dt>Stack</dt><dd>{p.tags.join(' · ')}</dd></div>
        </dl>

        <div className="case__body">
          {p.sections.map((s) => (
            <section className="case__section reveal" key={s.label}>
              <h2 className="case__label">{s.label}</h2>
              <div className="case__text">{s.body.map((t) => <p key={t.slice(0, 32)}>{t}</p>)}</div>
            </section>
          ))}
        </div>

        {p.link && <a className="project__link" href={p.link.href} target="_blank" rel="noopener">{p.link.label} ↗</a>}

        <Link className="case__next" href={`/work/${next.slug}`}>
          <span>Next project</span>
          <strong>{next.title} →</strong>
        </Link>
      </div>
      <Footer />
    </main>
  );
}
