"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const projects = [
  {
    id: "01",
    title: "SIGNOENERGY",
    role: "FULL STACK ARCHITECTURE",
    description: "Transformación digital completa para comercializadora de energía. Desarrollo de plataforma web optimizada desde cero, superando las limitaciones de soluciones legacy.",
    tech: ["NEXT.JS", "REACT", "TAILWIND", "UX/UI"],
    stats: "PERFORMANCE: 99/100",
    color: "#1a1a1a", // Fondo oscuro
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"
  },
  {
    id: "02",
    title: "ENERGYA-VM",
    role: "DATA INTELLIGENCE & ML",
    description: "Infraestructura de datos crítica. Desarrollo de modelos predictivos en Python para forecasting de valor de cliente y pipelines ETL automatizados.", // [cite: 25, 26]
    tech: ["PYTHON", "SQL", "SCIKIT-LEARN", "WAREHOUSING"],
    stats: "DATASETS: +1M ROWS",
    color: "#222222", // Un gris un poco más claro para diferenciar
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop"
  },
  {
    id: "03",
    title: "EMG BIO-SYSTEM",
    role: "HARDWARE & IOT ENG.",
    description: "Ingeniería de bajo nivel. Sistema portátil diseñado para la adquisición, procesamiento y visualización en tiempo real de señales electromiográficas.", // [cite: 33]
    tech: ["C++", "EMBEDDED", "SIGNAL PROC.", "REAL-TIME"], // 
    stats: "LATENCY: <10MS",
    color: "#2a2a2a", // Gris más claro
    image: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=2670&auto=format&fit=crop"
  }
];

// Componente individual de la Tarjeta
const Card = ({ project, index, progress, range, targetScale }: any) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start']
  });

  // Efecto de escala: Las tarjetas de atrás se hacen un pelín más pequeñas
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div ref={container} className="h-screen flex items-center justify-center sticky top-0">
      <motion.div 
        style={{ scale, top: `calc(-5vh + ${index * 25}px)` }} 
        className="relative flex flex-col w-[90vw] md:w-[1000px] h-[70vh] rounded-3xl overflow-hidden border border-white/10 origin-top bg-[#111]"
      >
        
        {/* --- CONTENIDO DE LA TARJETA --- */}
        <div className="relative h-full flex flex-col md:flex-row">
          
          {/* IZQUIERDA: DATOS TÉCNICOS */}
          <div className="w-full md:w-[45%] p-8 md:p-12 flex flex-col justify-between z-10 bg-[#0a0a0a]/90 backdrop-blur-md border-r border-white/5">
            
            <div>
              <div className="flex justify-between items-center mb-10">
                <span className="font-mono text-xs text-orange-500 border border-orange-500/30 px-2 py-1 rounded">
                  PROJECT_ID: {project.id}
                </span>
                <span className="font-mono text-xs text-neutral-500">{project.stats}</span>
              </div>

              <h3 className="text-4xl md:text-5xl font-display font-bold uppercase leading-none mb-4">
                {project.title}
              </h3>
              
              <p className="font-mono text-xs text-neutral-400 uppercase tracking-widest mb-8">
                {project.role}
              </p>

              <p className="text-sm text-neutral-300 leading-relaxed font-light">
                {project.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 mt-8">
              {project.tech.map((t: string) => (
                <span key={t} className="text-[10px] font-mono bg-white/5 px-3 py-2 rounded border border-white/5">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* DERECHA: IMAGEN VISUAL */}
          <div className="relative w-full md:w-[55%] h-full group overflow-hidden">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
            />
            {/* Overlay para oscurecer un poco */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
            
            {/* Botón Ver Más */}
            <div className="absolute bottom-8 right-8 w-16 h-16 bg-white text-black rounded-full flex items-center justify-center font-bold text-xl opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
              ↗
            </div>
          </div>

        </div>

      </motion.div>
    </div>
  );
};

export default function Projects() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  });

  return (
    <section ref={container} className="relative w-full bg-[#050505] mt-32 mb-32">
      
      {/* Título flotante de la sección */}
      <div className="sticky top-20 text-center mb-20 pointer-events-none z-0 opacity-50">
        <h2 className="font-display text-[10vw] text-neutral-800 leading-none">WORKS</h2>
      </div>

      {projects.map((project, i) => {
        // Cálculo matemático para el efecto de escala (stacking)
        const targetScale = 1 - ((projects.length - i) * 0.05);
        return (
          <Card 
            key={i} 
            index={i} 
            project={project} 
            progress={scrollYProgress} 
            range={[i * 0.25, 1]} 
            targetScale={targetScale} 
          />
        );
      })}
    </section>
  );
}