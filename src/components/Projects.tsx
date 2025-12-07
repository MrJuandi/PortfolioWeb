"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FaWifi, FaBatteryFull, FaArrowRight, FaCode, FaMicrochip, FaDatabase, FaLayerGroup } from "react-icons/fa";

const projects = [
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
    bg: "bg-yellow-500"
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
    bg: "bg-cyan-500"
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
    bg: "bg-red-500"
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
    bg: "bg-purple-500"
  }
];

export default function TacticalSwitcher() {
  const [activeTab, setActiveTab] = useState(0);

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
                                
                                <button className={`flex items-center gap-2 px-4 py-2 bg-white text-black font-bold uppercase text-xs hover:bg-neutral-200 transition-colors`}>
                                    View Deployment <FaArrowRight />
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
    </section>
  );
}