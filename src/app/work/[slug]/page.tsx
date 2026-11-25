import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Link } from 'next-view-transitions';
import { projects, getProject } from '@/content/projects';
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
  const next = projects[(projects.indexOf(p) + 1) % projects.length];

  return (
    <main id="main" className="case">
      <header className="case__head">
        <div className="case__id">
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- the homepage is served as an HTML document. */}
          <a className="case__back" href="/#projects">All projects</a>
          <h1 className="case__title" style={{ viewTransitionName: `title-${p.slug}` }}>{p.title}</h1>
        </div>
        <div className="case__intro">
          <p className="case__lede">{p.description}</p>
          <dl className="sheet">
            <div><dt>when</dt><dd>{p.year}</dd></div>
            <div><dt>status</dt><dd>{p.status}</dd></div>
            <div><dt>stack</dt><dd>{p.tags.join(', ')}</dd></div>
            {p.link && <div><dt>code</dt><dd><a href={p.link.href} target="_blank" rel="noopener">{p.link.label}</a></dd></div>}
          </dl>
        </div>
      </header>

      {p.video && (
        <figure className="case__media">
          <CaseVideo src={p.video} poster={p.image} label={p.caption ?? p.title} name={`media-${p.slug}`} />
          {p.caption && <figcaption>{p.caption}</figcaption>}
        </figure>
      )}

      {p.sections.map((s) => (
        <section className="case__section" key={s.label}>
          <h2 className="case__label">{s.label}</h2>
          <div className="case__text">{s.body.map((t) => <p key={t.slice(0, 32)}>{t}</p>)}</div>
        </section>
      ))}

      <Link className="case__next" href={`/work/${next.slug}`}>
        <span>Next project</span>
        <strong>{next.title}</strong>
      </Link>
      <Footer />
    </main>
  );
}
