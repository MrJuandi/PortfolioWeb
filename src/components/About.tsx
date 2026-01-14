"use client";
import { motion } from "framer-motion";
import { useLenis } from "@studio-freight/react-lenis";

const timeline = [
  {
    year: "NOW",
    title: "MSc TELECOMMUNICATIONS ENGINEERING",
    org: "Comillas Pontifical University (ICAI)",
    desc: "Specialization in Advanced Signal Processing, Cybersecurity, and Machine Learning.",
    active: true,
  },
  {
    year: "NOW",
    title: "DATA ANALYST INTERN",
    org: "Energya-VM",
    desc: "Customer Segmentation & Risk Engine: Developed a custom recursive partitioning algorithm based on Information Theory (Entropy) to classify customer risk profiles. Designed a Risk-Adjusted Profitability Model using Python and SQL, enabling data-driven retention strategies and optimizing resource allocation.",
    active: true,
  },
  {
    year: "NOW",
    title: "FREELANCE FULL STACK ENGINEER",
    org: "Freelance",
    desc: "End-to-end development of commercial digital products. Deployment of high-performance web applications using Next.js and React. Focus on clean architecture, SEO optimization, and scalable UI/UX design.",
    active: true,
  },
  {
    year: "2020 — 2025",
    title: "DUAL DEGREE: TELECOM ENGINEERING + BUSINESS ANALYTICS",
    org: "Comillas Pontifical University (ICAI-ICADE)",
    desc: "Comprehensive 5-year hybrid formation combining Telecommunications Engineering fundamentals with Business Strategy and Data Science. Strong foundation in Stochastic Processes, Financial Modeling, and Statistical Analysis.",
    active: false,
  },
];

export default function About() {
  const lenis = useLenis();

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection && lenis) {
      lenis.scrollTo(contactSection, { duration: 1.5 });
    }
  };

  return (
    <section className="relative w-full bg-[#050505] text-white py-20 md:py-32 z-10 border-t border-white/10">
      {/* CAMBIO: flex-col para móvil por defecto, lg:flex-row para escritorio */}
      <div className="container mx-auto px-6 md:px-8 flex flex-col lg:flex-row gap-12 lg:gap-16">

        {/* --- COLUMNA IZQUIERDA: INTRO / BIO --- */}
        {/* CAMBIO: Quitamos sticky en móvil, lo dejamos solo en lg:sticky */}
        <div className="w-full lg:w-1/3 lg:sticky lg:top-32 h-fit">
          <div className="mb-6 md:mb-8">
            <span className="text-[10px] md:text-xs text-blue-400/80 tracking-widest uppercase">
              About
            </span>
            {/* CAMBIO: Tamaño de texto reducido en móvil (3xl) */}
            <h2 className="text-3xl md:text-5xl font-display font-bold mt-4 leading-[0.9]">
              TECHNICAL DEPTH, <br />
              <span className="text-neutral-400">BUSINESS EDGE.</span>
            </h2>
          </div>

          <div className="font-mono text-xs md:text-sm text-neutral-300 space-y-6 leading-relaxed border-l-2 border-white/10 pl-6">
            <p>
              MSc Telecommunications Engineer with a dual background in Business Analytics (ICAI-ICADE).
            </p>
            <p>
              I combine <strong className="text-white">technical rigor</strong> with <strong className="text-white">strategic business management</strong> to solve complex problems. My expertise lies in bridging the gap between engineering systems and data-driven decision making.
            </p>
            <p>
              Experienced in designing scalable algorithms, optimizing data pipelines, and developing full-stack solutions that align technical precision with business objectives.
            </p>

            <button
              onClick={scrollToContact}
              className="px-6 py-3 bg-white text-black font-bold text-[10px] md:text-xs uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all w-fit mt-4 cursor-pointer"
            >
              Contact Me
            </button>
          </div>
        </div>

        {/* --- COLUMNA DERECHA: TIMELINE --- */}
        <div className="w-full lg:w-2/3">
          <div className="relative border-l border-white/10 ml-2 md:ml-0 space-y-10 md:space-y-12 pb-12">

            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative pl-8 md:pl-12 group"
              >
                {/* Punto del Timeline */}
                <div className={`absolute left-[-5px] top-2 w-2.5 h-2.5 rounded-full border-2 ${item.active ? "bg-blue-500 border-blue-500 shadow-[0_0_10px_#3b82f6]" : "bg-[#050505] border-neutral-500 group-hover:border-white"
                  }`} />

                {/* Contenido */}
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mb-2">
                  {/* CAMBIO: Tamaño de título reducido en móvil */}
                  <h3 className={`text-xl md:text-3xl font-display font-bold uppercase tracking-[0.01em] ${item.active ? "text-white" : "text-neutral-400 group-hover:text-white transition-colors"
                    }`}>
                    {item.title}
                  </h3>
                  {item.active && (
                    <span className="w-fit px-2 py-0.5 rounded border border-blue-500/30 bg-blue-500/10 text-[9px] md:text-[10px] text-blue-400 tracking-wider uppercase">
                      Active
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3 text-[10px] md:text-xs font-mono">
                    <span className="text-white">{item.year}</span>
                    <span className="text-neutral-500">/</span>
                    <span className="text-neutral-300 uppercase">{item.org}</span>
                  </div>

                  <p className="text-xs md:text-sm font-mono text-neutral-300 max-w-xl leading-relaxed mt-2 group-hover:text-white transition-colors">
                    {item.desc}
                  </p>
                </div>

              </motion.div>
            ))}

          </div>
        </div>

      </div>
    </section>
  );
}