"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPython, FaDatabase, FaMicrochip, FaCode, FaChartBar, FaBolt } from "react-icons/fa";
import Image from "next/image";

// HYBRID ENGINEER PROFILE - Telecommunications + Data Analytics
const blades = [
  {
    id: "01",
    title: "DATA & AI",
    subtitle: "PREDICTIVE MODELING & ALGORITHMS",
    desc: "MACHINE LEARNING / STATISTICAL INFERENCE",
    icon: <FaPython />,
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2565&auto=format&fit=crop",
    color: "#60a5fa",
    bg: "bg-blue-500",
    text: "text-blue-400",
    specs: ["PYTHON", "PANDAS", "SCIKIT-LEARN", "PYTORCH", "JUPYTER"]
  },
  {
    id: "02",
    title: "WEB ENGINEERING",
    subtitle: "MODERN FULL STACK ARCHITECTURE",
    desc: "SSR / HIGH PERFORMANCE / SCALABLE UI",
    icon: <FaCode />,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop",
    color: "#93c5fd",
    bg: "bg-blue-400",
    text: "text-blue-300",
    specs: ["NEXT.JS", "REACT", "TYPESCRIPT", "TAILWIND", "VERCEL"]
  },
  {
    id: "03",
    title: "SIGNALS & HARDWARE",
    subtitle: "LOW-LEVEL PROCESSING & CIRCUITRY",
    desc: "DSP / EMBEDDED SYSTEMS / TELEMETRY",
    icon: <FaMicrochip />,
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop",
    color: "#38bdf8",
    bg: "bg-sky-500",
    text: "text-sky-400",
    specs: ["MATLAB", "C++", "DSP", "LT SPICE", "IOT"]
  },
  {
    id: "04",
    title: "DATA INFRA",
    subtitle: "PIPELINES & WAREHOUSING",
    desc: "ETL / ORCHESTRATION / CLOUD STORAGE",
    icon: <FaDatabase />,
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=2670&auto=format&fit=crop",
    color: "#818cf8",
    bg: "bg-indigo-500",
    text: "text-indigo-400",
    specs: ["SQL", "DOCKER", "GIT", "AWS", "ETL"]
  },
  {
    id: "05",
    title: "BUSINESS INTEL",
    subtitle: "STRATEGIC VISUALIZATION & KPI",
    desc: "DASHBOARDS / FINANCIAL MODELING",
    icon: <FaChartBar />,
    image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=2670&auto=format&fit=crop",
    color: "#22d3ee",
    bg: "bg-cyan-500",
    text: "text-cyan-400",
    specs: ["TABLEAU", "POWER BI", "EXCEL", "FINANCIAL MODELING"]
  }
];

export default function TechStackSection() {
  const [activeId, setActiveId] = useState<string>("01");

  return (
    // SECCIÓN CONTENEDORA (Se adapta a tu layout general)
    <section className="relative w-full bg-[#050505] py-24 px-4 md:px-8 overflow-hidden border-t border-white/10">

      {/* Fondo de rejilla sutil para integrarse con el sitio */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col h-full">

        {/* HEADER: Integrado en el flujo normal */}
        <div className="mb-10 pl-2 border-l-2 border-blue-500/50">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-sm" />
            <span className="text-xs text-blue-400/80 tracking-widest uppercase">
              Tech Stack
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter leading-none">
            Skills <span className="text-neutral-700">&</span> Tools
          </h2>
        </div>

        {/* CONTENEDOR DE LA BARAJA (ACORDEÓN) */}
        {/* Altura fija en PC (600px) y automática en móvil para scroll */}
        <div className="w-full flex flex-col md:flex-row gap-2 h-auto md:h-[600px] min-h-[500px]">
          {blades.map((blade) => (
            <Blade
              key={blade.id}
              item={blade}
              isActive={activeId === blade.id}
              onClick={() => setActiveId(blade.id)}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

// SUBCOMPONENTE INDIVIDUAL
function Blade({ item, isActive, onClick }: { item: any, isActive: boolean, onClick: () => void }) {
  return (
    <motion.div
      layout
      onClick={onClick}
      role="button"
      tabIndex={0}
      data-interactive
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      className={`
        relative overflow-hidden cursor-pointer rounded-xl border border-white/10
        transition-[flex] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
        ${isActive ? "flex-[4] grayscale-0" : "flex-[1] grayscale hover:flex-[1.5] hover:grayscale-0"}
      `}
      style={{
        // En móvil usamos altura fija para que sea una pila scrolleable
        height: typeof window !== 'undefined' && window.innerWidth < 768
          ? (isActive ? '450px' : '80px')
          : '100%'
      }}
    >

      {/* IMAGEN DE FONDO */}
      <div className="absolute inset-0 z-0">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className={`object-cover transition-transform duration-[1.5s] ease-out ${isActive ? "scale-110 opacity-60" : "scale-100 opacity-30"}`}
        />
        {/* Gradientes para legibilidad */}
        <div className={`absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black via-black/50 to-transparent`} />
        <div className={`absolute inset-0 mix-blend-overlay opacity-40 ${item.bg}`} />
      </div>

      {/* CONTENIDO */}
      <div className="absolute inset-0 z-10 p-5 md:p-8 flex flex-col justify-end">

        {/* TEXTO CERRADO (Solo visible cuando NO está activo) */}
        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${isActive ? "opacity-0 pointer-events-none scale-150" : "opacity-100 scale-100"}`}>
          {/* En móvil título horizontal, en PC vertical */}
          <h3 className="md:-rotate-90 text-xl md:text-3xl font-black text-white/50 uppercase tracking-widest whitespace-nowrap">
            {item.title}
          </h3>
        </div>

        {/* TEXTO ABIERTO (Visible cuando activo) */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="relative w-full"
            >
              {/* Icono de fondo decorativo */}
              <div className="absolute -top-10 -right-10 text-[120px] md:text-[180px] text-white opacity-5 pointer-events-none transform rotate-12">
                {item.icon}
              </div>

              {/* Cabecera Tarjeta */}
              <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 text-xl text-black rounded ${item.bg}`}>
                  {item.icon}
                </div>
                <span className="font-mono text-[10px] md:text-xs text-white/60 tracking-[0.2em] uppercase border border-white/10 px-2 py-0.5 rounded">
                            //{item.id}
                </span>
              </div>

              <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter leading-[0.9] mb-3">
                {item.title}
              </h2>

              <div className="w-full h-[1px] bg-white/20 mb-3" />

              <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-4">
                <div>
                  <p className="font-mono text-[10px] text-white/50 mb-1 uppercase tracking-widest">{item.subtitle}</p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {item.specs.map((spec: string, idx: number) => (
                    <span key={idx} className="px-2 py-1 bg-white/5 border border-white/10 text-[9px] md:text-[10px] font-mono text-white/80 uppercase">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>



            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Borde de color activo */}
      {isActive && (
        <motion.div
          layoutId="activeGlow"
          className={`absolute top-0 left-0 w-1 md:w-full h-full md:h-1 z-20 ${item.bg}`}
        />
      )}

    </motion.div>
  );
}