import HeroIndex from '@/components/HeroIndex';
import HeroGrid from '@/components/HeroGrid';
import Showcase from '@/components/Showcase';
import Footer from '@/components/Footer';
import { experience, education, tools, type Entry } from '@/content/path';

function Track({ title, items }: { title: string; items: Entry[] }) {
  return (
    <div className="track">
      <h3 className="track__title mono">{title}</h3>
      <ol className="tl">
        {items.map((e) => (
          <li key={e.org + e.title} className={`tl__item reveal${e.now ? ' is-now' : ''}`}>
            <span className="tl__node" aria-hidden="true" />
            <span className="tl__when mono">{e.when}</span>
            <h4 className="tl__org">{e.org}</h4>
            <p className="tl__ctx">{e.context}</p>
            <p className="tl__title">{e.title}</p>
            <p className="tl__desc">{e.desc}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function Home() {
  return (
    <main id="main">
      {/* HERO */}
      <section className="hero" id="top">
        <HeroGrid />
        <div className="hero__inner wrap">
          <p className="eyebrow reveal">Engineer — Madrid</p>
          <h1 className="hero__title">
            <span className="line"><span className="line__in">Juan Diego</span></span>
            <span className="line"><span className="line__in muted">Díaz Hidalgo</span></span>
          </h1>
          <div className="hero__cols">
            <div className="hero__intro">
              <p className="hero__lede reveal">I build ML models, data pipelines and the software around them.</p>
              <p className="hero__sub reveal">
                <span><span className="mono muted">Now</span> MSc Telecommunications, ICAI</span>
                <span><span className="mono muted">Before</span> BCG X, Enérgya-VM</span>
              </p>
              <div className="hero__actions reveal">
                <a className="btn" href="#work">See work</a>
                <a className="btn btn--ghost" href="#contact">Contact</a>
              </div>
            </div>
            <HeroIndex />
          </div>
        </div>
        <dl className="hero__meta wrap reveal">
          <div><dt>Focus</dt><dd>ML &amp; data products</dd></div>
          <div><dt>Education</dt><dd>MSc Telecom · ICAI</dd></div>
          <div><dt>Languages</dt><dd>Spanish · English</dd></div>
          <div><dt>Based in</dt><dd>Madrid</dd></div>
        </dl>
      </section>

      {/* PATH */}
      <section className="path" id="path">
        <div className="wrap">
          <header className="section-head">
            <span className="mono section-head__idx reveal">01</span>
            <h2 className="section-head__title reveal">Path</h2>
            <p className="section-head__note reveal">Short version. Full CV on request.</p>
          </header>
          <div className="tracks">
            <Track title="Experience" items={experience} />
            <Track title="Education" items={education} />
          </div>
          <ul className="caps reveal" aria-label="Tools">{tools.map((t) => <li key={t}>{t}</li>)}</ul>
        </div>
      </section>

      {/* WORK */}
      <section className="work" id="work">
        <div className="wrap">
          <header className="section-head">
            <span className="mono section-head__idx reveal">02</span>
            <h2 className="section-head__title reveal">Selected work</h2>
            <p className="section-head__note reveal">What I built and what it did.</p>
          </header>
          <div className="projects"><Showcase /></div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact" id="contact">
        <div className="wrap">
          <header className="section-head">
            <span className="mono section-head__idx reveal">03</span>
          </header>
          <h2 className="contact__title"><span className="line"><span className="line__in">Get in touch.</span></span></h2>
          <div className="contact__grid">
            <p className="contact__lede reveal">Open to roles and projects in data, ML and product engineering. Based in Madrid.</p>
            <ul className="contact__links reveal">
              <li><a href="mailto:juandiegodiazh@hotmail.es"><span>Email</span><span className="mono">juandiegodiazh@hotmail.es</span><span className="arrow" aria-hidden="true">↗</span></a></li>
              <li><a href="https://www.linkedin.com/in/juan-diego-diaz-hidalgo" target="_blank" rel="noopener"><span>LinkedIn</span><span className="mono">/juan-diego-diaz-hidalgo</span><span className="arrow" aria-hidden="true">↗</span></a></li>
              <li><a href="mailto:juandiegodiazh@hotmail.es?subject=CV%20request"><span>CV</span><span className="mono">On request</span><span className="arrow" aria-hidden="true">↗</span></a></li>
            </ul>
          </div>
        </div>
        <Footer />
      </section>
    </main>
  );
}
