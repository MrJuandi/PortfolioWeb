"use client";
import { motion } from "framer-motion";

const timeline = [
  {
    year: "NOW",
    title: "MASTER EN ING. TELECOMUNICACIÓN",
    org: "Universidad Pontificia Comillas (ICAI)",
    desc: "Especialización avanzada en Ciberseguridad, Machine Learning y Sistemas de Comunicaciones. Formación técnica de alto nivel.",
    active: true, // Esto lo marcará en naranja
  },
  {
    year: "NOW",
    title: "DATA ANALYST INTERN",
    org: "Energya-VM",
    desc: "Desarrollo de modelos ML (Python) para forecasting de valor de cliente. Automatización de pipelines ETL y optimización de Data Warehouse con SQL.",
    active: true,
  },
  {
    year: "NOW",
    title: "DIGITAL SOLUTIONS",
    org: "Freelance Projects",
    desc: "Desarrollo web y soluciones digitales para clientes reales. Construcción de plataformas comerciales optimizadas.",
    active: true,
  },
  {
    year: "2020 — 2025",
    title: "DOBLE GRADO: ING. TELECO + BUSINESS ANALYTICS",
    org: "Universidad Pontificia Comillas (ICAI-ICADE)",
    desc: "Formación híbrida única: Base técnica combinada con visión estratégica de negocio y análisis de datos.",
    active: false,
  },
];

export default function About() {
  return (
    <section className="relative w-full bg-[#050505] text-white py-32 z-10 border-t border-white/10">
      <div className="container mx-auto px-4 md:px-8 flex flex-col lg:flex-row gap-16">
        
        {/* --- COLUMNA IZQUIERDA: INTRO / BIO --- */}
        <div className="lg:w-1/3 sticky top-32 h-fit">
          <div className="mb-8">
            <span className="text-xs font-mono text-orange-500 tracking-widest uppercase">
              // BIO_DATA
            </span>
            <h2 className="text-5xl font-display font-bold mt-4 leading-[0.9]">
              ENGINEER<br />
              <span className="text-neutral-600">WITH BUSINESS MIND.</span>
            </h2>
          </div>

          <div className="font-mono text-sm text-neutral-300 space-y-6 leading-relaxed border-l-2 border-white/10 pl-6">
            <p>
              Ingeniero de Telecomunicaciones graduado con una doble visión: técnica y analítica de negocio.
            </p>
            <p>
            <strong className="text-white">Ingeniería y analítica</strong> para transformar problemas complejos en soluciones eficientes. Mi estándar trasciende la funcionalidad técnica, buscando siempre la excelencia operativa y el impacto real.
            </p>
            <p>
              Actualmente combinando el Máster habilitante con experiencia real en Data Science y desarrollo web.
            </p>
            
            <button className="px-6 py-3 bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-orange-500 hover:text-white transition-all w-fit mt-4">
              Download CV
            </button>
          </div>
        </div>

        {/* --- COLUMNA DERECHA: TIMELINE --- */}
        <div className="lg:w-2/3">
          <div className="relative border-l border-white/10 ml-3 md:ml-0 space-y-12 pb-12">
            
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
                <div className={`absolute left-[-5px] top-2 w-2.5 h-2.5 rounded-full border-2 ${
                  item.active ? "bg-orange-500 border-orange-500 shadow-[0_0_10px_#ff4500]" : "bg-[#050505] border-neutral-600 group-hover:border-white"
                }`} />

                {/* Contenido */}
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mb-2">
                  <h3 className={`text-2xl md:text-3xl font-display font-bold uppercase tracking-tight ${
                    item.active ? "text-white" : "text-neutral-300 group-hover:text-neutral-300"
                  }`}>
                    {item.title}
                  </h3>
                  {item.active && (
                    <span className="px-2 py-0.5 rounded border border-orange-500/30 bg-orange-500/10 text-[10px] text-orange-500 font-mono tracking-widest uppercase animate-pulse">
                      Active
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3 text-xs font-mono">
                    <span className="text-white">{item.year}</span>
                    <span className="text-neutral-600">/</span>
                    <span className="text-neutral-400 uppercase">{item.org}</span>
                  </div>
                  
                  <p className="text-sm font-mono text-neutral-500 max-w-xl leading-relaxed mt-2 group-hover:text-neutral-400 transition-colors">
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