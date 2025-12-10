"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FaWifi, FaBatteryFull, FaArrowRight, FaCode, FaMicrochip, FaDatabase, FaLayerGroup, FaTimes, FaChartLine, FaExclamationTriangle, FaLightbulb, FaRocket } from "react-icons/fa";

type Project = {
  id: string;
  label: string;
  title: string;
  cat: string;
  desc: string;
  image: string;
  tech: string;
  status: string;
  color: string;
  border: string;
  bg: string;
  businessCase: {
    problem: string;
    solution: string;
    impact: string;
    metrics: Array<{ label: string; value: string; color: string }>;
    challenges: string[];
    techHighlights: string[];
  };
};

const projects: Project[] = [
  {
    id: "01",
    label: "SIGNO",
    title: "SIGNOENERGY",
    cat: "PLATFORM",
    desc: "Plataforma comercial B2B. Optimización de conversión de leads mediante UX agresiva.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
    tech: "NEXT.JS • SUPABASE",
    status: "LIVE",
    color: "text-yellow-500",
    border: "border-yellow-500",
    bg: "bg-yellow-500",
    businessCase: {
      problem: "Proceso de conversión de leads fragmentado y manual. Tiempo de respuesta alto y pérdida de oportunidades.",
      solution: "Plataforma B2B unificada con UX optimizada, automatización de workflows y dashboard analítico en tiempo real.",
      impact: "Reducción del 60% en tiempo de respuesta, aumento del 45% en conversión de leads y mejora del 35% en retención de clientes.",
      metrics: [
        { label: "Conversión", value: "+45%", color: "text-yellow-500" },
        { label: "Tiempo Respuesta", value: "-60%", color: "text-yellow-500" },
        { label: "Retención", value: "+35%", color: "text-yellow-500" }
      ],
      challenges: ["Migración de datos legacy", "Integración con sistemas existentes", "Optimización de performance"],
      techHighlights: ["SSR para SEO", "Real-time updates", "Analytics integrado"]
    }
  },
  {
    id: "02",
    label: "DATA",
    title: "ENERGYA-VM",
    cat: "PIPELINES",
    desc: "Infraestructura de datos crítica. Procesamiento ETL de TBs diarios y ML.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
    tech: "PYTHON • SNOWFLAKE",
    status: "SECURE",
    color: "text-cyan-500",
    border: "border-cyan-500",
    bg: "bg-cyan-500",
    businessCase: {
      problem: "Procesamiento de datos ineficiente. Latencias altas en pipelines ETL y falta de escalabilidad para volúmenes crecientes.",
      solution: "Arquitectura de datos escalable con procesamiento paralelo, optimización de queries y modelos ML para forecasting.",
      impact: "Reducción del 70% en tiempo de procesamiento, capacidad de escalar a 10x el volumen actual y precisión del 92% en predicciones.",
      metrics: [
        { label: "Tiempo Proceso", value: "-70%", color: "text-cyan-500" },
        { label: "Escalabilidad", value: "10x", color: "text-cyan-500" },
        { label: "Precisión ML", value: "92%", color: "text-cyan-500" }
      ],
      challenges: ["Volumen de datos masivo", "Latencias críticas", "Mantenimiento de modelos"],
      techHighlights: ["Paralelización", "Optimización SQL", "Auto-scaling"]
    }
  },
  {
    id: "03",
    label: "IOT",
    title: "BIO-SYSTEM",
    cat: "HARDWARE",
    desc: "Ingeniería biomédica. Firmware C++ de baja latencia para sensores EMG.",
    image: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=2670&auto=format&fit=crop",
    tech: "C++ • BLUETOOTH",
    status: "ACTIVE",
    color: "text-red-500",
    border: "border-red-500",
    bg: "bg-red-500",
    businessCase: {
      problem: "Sensores biomédicos con latencia alta y consumo energético excesivo. Limitaciones en precisión de lectura.",
      solution: "Firmware optimizado en C++ con algoritmos de bajo consumo, comunicación Bluetooth LE y procesamiento en tiempo real.",
      impact: "Reducción del 50% en consumo energético, latencia <5ms y precisión mejorada del 85% en detección de señales EMG.",
      metrics: [
        { label: "Consumo", value: "-50%", color: "text-red-500" },
        { label: "Latencia", value: "<5ms", color: "text-red-500" },
        { label: "Precisión", value: "85%", color: "text-red-500" }
      ],
      challenges: ["Optimización de recursos", "Baja latencia crítica", "Estabilidad del firmware"],
      techHighlights: ["Real-time processing", "BLE optimization", "Low-power algorithms"]
    }
  },
  {
    id: "04",
    label: "R&D",
    title: "LABORATORY",
    cat: "EXPERIMENTS",
    desc: "Exploración visual. Interfaces generativas, WebGL y nuevos paradigmas.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2670&auto=format&fit=crop",
    tech: "WEBGL • AI",
    status: "BETA",
    color: "text-purple-500",
    border: "border-purple-500",
    bg: "bg-purple-500",
    businessCase: {
      problem: "Interfaces tradicionales limitadas. Necesidad de experiencias inmersivas y visualizaciones complejas.",
      solution: "Plataforma experimental con WebGL, shaders personalizados y generación procedural para crear experiencias visuales únicas.",
      impact: "Nuevas posibilidades de visualización, reducción del 40% en tiempo de renderizado y experiencias más inmersivas.",
      metrics: [
        { label: "FPS", value: "60fps", color: "text-purple-500" },
        { label: "Render Time", value: "-40%", color: "text-purple-500" },
        { label: "Interactividad", value: "Real-time", color: "text-purple-500" }
      ],
      challenges: ["Performance en navegador", "Compatibilidad cross-browser", "Optimización de shaders"],
      techHighlights: ["WebGL 2.0", "Procedural generation", "GPU acceleration"]
    }
  }
];

export default function TacticalSwitcher() {
  const [activeTab, setActiveTab] = useState(0);
  const [openModal, setOpenModal] = useState<number | null>(null);

  return (
    <section className="bg-[#050505] min-h-screen py-20 px-4 md:px-8 border-t border-white/10 flex flex-col items-center justify-center">
      
      {/* HEADER DE LA MÁQUINA */}
      <div className="w-full max-w-6xl mb-8 flex justify-between items-end border-b border-white/10 pb-4">
         <div>
            <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 bg-green-500 animate-pulse rounded-full"/>
                <span className="font-mono text-[10px] text-green-500 tracking-widest uppercase">SYSTEM ONLINE</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter leading-none">
                PROJECT <span className="text-neutral-600">FEED</span>
            </h2>
         </div>
         <div className="hidden md:flex gap-4 text-neutral-600">
            <FaWifi />
            <FaBatteryFull />
         </div>
      </div>

      {/* --- LA INTERFAZ DE CONTROL (EL MONITOR) --- */}
      <div className="w-full max-w-6xl flex flex-col md:flex-row h-[75vh] md:h-[600px] border border-white/10 bg-[#080808] relative overflow-hidden rounded-lg shadow-2xl">
        
        {/* BARRA DE NAVEGACIÓN (TABS) */}
        {/* En móvil: Abajo (horizontal). En PC: Izquierda (vertical). */}
        <div className="order-2 md:order-1 w-full md:w-64 bg-[#0a0a0a] border-t md:border-t-0 md:border-r border-white/10 flex md:flex-col overflow-x-auto hide-scrollbar z-20">
            {projects.map((project, index) => {
                const isActive = activeTab === index;
                return (
                    <button
                        key={project.id}
                        onClick={() => setActiveTab(index)}
                        className={`
                            relative flex-shrink-0 md:flex-shrink p-4 md:p-6 flex flex-col items-start justify-center gap-1 transition-all duration-300
                            ${isActive ? "bg-white/5" : "hover:bg-white/5 opacity-50 hover:opacity-100"}
                            min-w-[100px] md:min-w-0 md:h-1/4 border-r md:border-r-0 md:border-b border-white/5
                        `}
                    >
                        <span className={`font-mono text-[10px] font-bold ${isActive ? project.color : "text-neutral-500"}`}>
                            0{project.id}
                        </span>
                        <span className={`text-xs md:text-sm font-bold uppercase tracking-wider ${isActive ? "text-white" : "text-neutral-400"}`}>
                            {project.label}
                        </span>
                        
                        {/* Indicador Activo */}
                        {isActive && (
                            <motion.div 
                                layoutId="active-indicator"
                                className={`absolute bottom-0 left-0 h-0.5 w-full md:h-full md:w-1 md:top-0 md:left-0 md:bottom-auto ${project.bg}`}
                            />
                        )}
                    </button>
                );
            })}
        </div>

        {/* PANTALLA PRINCIPAL (VISUALIZADOR) */}
        <div className="order-1 md:order-2 flex-grow relative overflow-hidden group">
            
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.4, ease: "circOut" }}
                    className="absolute inset-0 w-full h-full"
                >
                    {/* IMAGEN DE FONDO */}
                    <Image 
                        src={projects[activeTab].image} 
                        alt={projects[activeTab].title} 
                        fill 
                        className="object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500 grayscale group-hover:grayscale-0" 
                    />
                    
                    {/* OVERLAYS TÉCNICOS */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" />
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,18,18,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none" />
                    
                    {/* CONTENIDO FLOTANTE SOBRE LA IMAGEN */}
                    <div className="absolute inset-0 z-20 p-6 md:p-12 flex flex-col justify-end">
                        
                        {/* Etiqueta Flotante */}
                        <motion.div 
                             initial={{ y: 20, opacity: 0 }}
                             animate={{ y: 0, opacity: 1 }}
                             transition={{ delay: 0.2 }}
                             className="mb-auto self-end"
                        >
                             <span className={`px-3 py-1 bg-black/50 backdrop-blur border ${projects[activeTab].border} text-xs font-mono ${projects[activeTab].color} uppercase tracking-widest`}>
                                STATUS: {projects[activeTab].status}
                             </span>
                        </motion.div>

                        {/* Textos Principales */}
                        <motion.div
                             initial={{ y: 20, opacity: 0 }}
                             animate={{ y: 0, opacity: 1 }}
                             transition={{ delay: 0.3 }}
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <span className={`w-8 h-[2px] ${projects[activeTab].bg}`} />
                                <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest">
                                    {projects[activeTab].cat}
                                </span>
                            </div>

                            <h2 className="text-4xl md:text-7xl font-black text-white uppercase italic tracking-tighter leading-none mb-4">
                                {projects[activeTab].title}
                            </h2>

                            <p className="max-w-lg text-neutral-300 text-sm md:text-lg leading-relaxed mb-6 border-l-2 border-white/20 pl-4">
                                {projects[activeTab].desc}
                            </p>

                            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                                <div className="font-mono text-xs text-neutral-500 bg-white/5 px-2 py-1 rounded">
                                    STACK: <span className="text-white">{projects[activeTab].tech}</span>
                                </div>
                                
                                <button 
                                  onClick={() => setOpenModal(activeTab)}
                                  data-interactive
                                  className={`flex items-center gap-2 px-4 py-2 bg-white text-black font-bold uppercase text-xs hover:bg-neutral-200 transition-colors`}
                                >
                                    Business Case <FaChartLine />
                                </button>
                            </div>
                        </motion.div>
                    </div>

                </motion.div>
            </AnimatePresence>

            {/* Borde Decorativo */}
            <div className={`absolute top-0 left-0 w-full h-1 z-30 transition-colors duration-500 ${projects[activeTab].bg}`} />
        </div>

      </div>

      {/* MODAL BUSINESS CASE */}
      <AnimatePresence>
        {openModal !== null && (
          <BusinessCaseModal 
            project={projects[openModal]} 
            onClose={() => setOpenModal(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
}

// COMPONENTE MODAL BUSINESS CASE - VERSIÓN MOBILE-PROOF
function BusinessCaseModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    
    // ✅ BLOQUEO BRUTO DEL BODY (Position Fixed + Guardar posición)
    const scrollY = window.scrollY;
    const originalOverflow = document.body.style.overflow;
    const originalPosition = document.body.style.position;
    const originalTop = document.body.style.top;
    const originalWidth = document.body.style.width;
    
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    
    document.addEventListener("keydown", handleEscape);
    
    return () => {
      document.removeEventListener("keydown", handleEscape);
      // Restaurar TODO y volver a la posición original
      document.body.style.overflow = originalOverflow;
      document.body.style.position = originalPosition;
      document.body.style.top = originalTop;
      document.body.style.width = originalWidth;
      window.scrollTo(0, scrollY);
    };
  }, [onClose]);

  return (
    <>
      {/* Backdrop - touch-none para bloquear gestos */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] touch-none"
      />

      {/* Modal Container - h-[100dvh] para móvil */}
      <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 h-[100dvh] touch-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
          className="relative w-full max-w-4xl max-h-[90dvh] bg-[#0a0a0a] border border-white/10 rounded-lg flex flex-col overflow-hidden touch-auto"
        >
          
          {/* Header - FIJO */}
          <div className="relative bg-[#080808] p-4 md:p-6 flex-shrink-0 border-b border-white/10">
            <div className={`absolute top-0 left-0 w-full h-1 ${project.bg}`} />
            
            <div className="relative flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`w-1.5 h-1.5 ${project.bg} rounded-full flex-shrink-0`} />
                  <span className="font-mono text-[10px] text-white/40 tracking-widest uppercase">
                    BUSINESS_CASE
                  </span>
                </div>
                <h2 className="text-xl md:text-2xl font-black text-white uppercase italic tracking-tighter leading-tight mb-2 truncate">
                  {project.title}
                </h2>
                <div className="flex items-center gap-2 text-[10px] font-mono flex-wrap">
                  <span className="text-white/50">{project.cat}</span>
                  <span className="text-white/20">•</span>
                  <span className={project.color}>{project.status}</span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded transition-colors flex-shrink-0"
                aria-label="Close"
              >
                <FaTimes className="text-white/50 text-lg" />
              </button>
            </div>
          </div>

          {/* Content - touch-pan-y + stopPropagation */}
          <div 
            className="flex-1 overflow-y-auto overscroll-contain p-4 md:p-6 touch-pan-y"
            onTouchMove={(e) => e.stopPropagation()}
            onWheel={(e) => e.stopPropagation()}
          >
            <div className="space-y-6">
              
              {/* Problem & Solution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/3 border-l-2 border-white/10 pl-3 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <FaExclamationTriangle className={`${project.color} text-xs`} />
                    <h3 className="font-mono text-[10px] text-white uppercase tracking-widest font-semibold">
                      PROBLEM
                    </h3>
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    {project.businessCase.problem}
                  </p>
                </div>

                <div className="bg-white/3 border-l-2 border-white/10 pl-3 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <FaLightbulb className={`${project.color} text-xs`} />
                    <h3 className="font-mono text-[10px] text-white uppercase tracking-widest font-semibold">
                      SOLUTION
                    </h3>
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    {project.businessCase.solution}
                  </p>
                </div>
              </div>

              {/* Impact */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <FaRocket className={`${project.color} text-xs`} />
                  <h3 className="font-mono text-[10px] text-white uppercase tracking-widest font-semibold">
                    BUSINESS IMPACT
                  </h3>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed mb-4">
                  {project.businessCase.impact}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {project.businessCase.metrics.map((metric, idx) => (
                    <div key={idx} className={`bg-white/5 border ${project.border} rounded-lg p-4`}>
                      <div className={`text-xl md:text-2xl font-black ${project.color} mb-1`}>
                        {metric.value}
                      </div>
                      <div className="font-mono text-[9px] text-white/60 uppercase tracking-widest">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Challenges & Tech */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/3 rounded-lg p-4">
                  <h3 className="font-mono text-[10px] text-white uppercase tracking-widest mb-3 font-semibold">
                    KEY CHALLENGES
                  </h3>
                  <ul className="space-y-2">
                    {project.businessCase.challenges.map((challenge, idx) => (
                      <li key={idx} className="text-xs text-neutral-300 flex items-start gap-2">
                        <span className={`${project.color} mt-1 text-[8px]`}>▸</span>
                        <span className="flex-1">{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white/3 rounded-lg p-4">
                  <h3 className="font-mono text-[10px] text-white uppercase tracking-widest mb-3 font-semibold">
                    TECH HIGHLIGHTS
                  </h3>
                  <ul className="space-y-2">
                    {project.businessCase.techHighlights.map((highlight, idx) => (
                      <li key={idx} className="text-xs text-neutral-300 flex items-start gap-2">
                        <span className={`${project.color} mt-1 text-[8px]`}>▸</span>
                        <span className="flex-1">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
          </div>

          {/* Footer - FIJO */}
          <div className="border-t border-white/10 p-4 bg-[#080808] flex items-center justify-between flex-shrink-0">
            <div className="font-mono text-[10px] text-white/40 uppercase tracking-widest truncate">
              {project.tech}
            </div>
            <button
              onClick={onClose}
              className={`px-4 py-2 ${project.bg} hover:opacity-90 text-black font-bold uppercase text-[10px] tracking-widest transition-opacity rounded flex-shrink-0`}
            >
              Close
            </button>
          </div>

        </motion.div>
      </div>
    </>
  );
}