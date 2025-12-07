"use client";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { FaTimes, FaExternalLinkAlt } from "react-icons/fa"; // Necesitas react-icons si no lo tienes: npm install react-icons

const projects = [
  {
    id: "01",
    title: "SIGNOENERGY",
    category: "WEB DEV",
    description: "Plataforma comercial completa para el sector energético. Diseñada para convertir leads en clientes mediante una UX optimizada. Integra panel de gestión y analítica en tiempo real.",
    tech: "NEXT.JS • REACT • TAILWIND",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
    link: "https://signoenergy.com" // Pon aquí links reales si tienes
  },
  {
    id: "02",
    title: "ENERGYA-VM",
    category: "DATA ENG",
    description: "Arquitectura de datos crítica. Pipelines ETL automatizados procesando millones de registros diarios. Modelos de Machine Learning para predicción de churn y valor de cliente.",
    tech: "PYTHON • SQL • SCIKIT-LEARN",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
    link: "#"
  },
  {
    id: "03",
    title: "EMG BIO-SYSTEM",
    category: "HARDWARE",
    description: "Sistema IoT de ingeniería biomédica. Captura señales electromiográficas (musculares) con latencia <10ms y las transmite vía Bluetooth a una app de visualización.",
    tech: "C++ • EMBEDDED • IOT",
    image: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=2670&auto=format&fit=crop",
    link: "#"
  },
  {
    id: "04",
    title: "COMING SOON",
    category: "R&D",
    description: "Laboratorio de ideas. Próximos experimentos en Inteligencia Artificial Generativa y WebGL.",
    tech: "UNKNOWN",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2670&auto=format&fit=crop",
    link: "#"
  }
];

export default function Projects() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-85%"]);

  // Estado para controlar qué proyecto está abierto
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  // Bloquear el scroll del body cuando el modal está abierto
  useEffect(() => {
    if (selectedProject) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [selectedProject]);

  return (
    <>
      {/* SECCIÓN PRINCIPAL */}
      <section ref={targetRef} className="relative h-[300vh] bg-[#050505]">
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
          
          <div className="absolute top-6 left-6 md:top-10 md:left-10 z-20 mix-blend-difference">
            <h2 className="text-3xl md:text-6xl font-display font-bold text-white uppercase tracking-tighter">
              Selected <br/> <span className="text-neutral-500">Works (03)</span>
            </h2>
          </div>

          {/* CINTA UNIFICADA */}
          <motion.div 
            style={{ x }} 
            className="flex gap-6 md:gap-10 pl-6 md:pl-[20vw]"
          >
            {projects.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                onClick={() => setSelectedProject(project)} // AL HACER CLICK, ABRIMOS MODAL
              />
            ))}
          </motion.div>

          <div className="absolute bottom-10 left-6 md:left-10 text-white/50 text-[10px] font-mono animate-pulse">
            SCROLL DOWN / CLICK TO EXPAND →
          </div>
        </div>
      </section>

      {/* --- MODAL (OVERLAY) --- */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-10 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedProject(null)} // Click fuera cierra
          >
            <motion.div
              initial={{ y: 50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 50, opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()} // Click dentro NO cierra
              className="bg-[#111] border border-white/10 w-full max-w-5xl h-auto max-h-[90vh] overflow-y-auto rounded-xl flex flex-col md:flex-row relative"
            >
              
              {/* Botón Cerrar */}
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-50 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
              >
                <FaTimes />
              </button>

              {/* Lado Izquierdo: Imagen */}
              <div className="w-full md:w-1/2 h-[300px] md:h-auto relative">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent md:bg-gradient-to-r" />
              </div>

              {/* Lado Derecho: Info Técnica */}
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-between">
                <div>
                  <span className="text-orange-500 font-mono text-xs border border-orange-500/30 px-2 py-1 rounded">
                    PROJECT_ID: {selectedProject.id}
                  </span>
                  
                  <h3 className="text-4xl md:text-6xl font-display font-bold text-white mt-6 mb-2 leading-none uppercase">
                    {selectedProject.title}
                  </h3>
                  <span className="text-neutral-400 font-mono text-xs uppercase tracking-widest block mb-8">
                    {selectedProject.category} // {selectedProject.tech}
                  </span>

                  <p className="text-neutral-300 font-light leading-relaxed text-sm md:text-base border-l-2 border-white/10 pl-4">
                    {selectedProject.description}
                  </p>
                </div>

                <div className="mt-12">
                  <a 
                    href={selectedProject.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-white text-black px-6 py-3 font-bold uppercase tracking-widest text-xs hover:bg-orange-500 hover:text-white transition-all"
                  >
                    View Project <FaExternalLinkAlt />
                  </a>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// --- TARJETA UNIFICADA ---
const ProjectCard = ({ project, onClick }: any) => {
  return (
    <div 
      onClick={onClick}
      className="group relative w-[85vw] h-[50vh] md:w-[600px] md:h-[400px] bg-neutral-900 border border-white/10 overflow-hidden shrink-0 cursor-pointer"
    >
      <div className="absolute inset-0">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500" />
      </div>

      <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 bg-gradient-to-t from-black via-black/80 to-transparent translate-y-2 md:translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
        <div className="flex justify-between items-end">
          <div>
            <span className="text-[10px] md:text-xs font-mono text-orange-500 mb-2 block">{project.tech}</span>
            <h3 className="text-3xl md:text-4xl font-display font-bold text-white uppercase leading-none">{project.title}</h3>
          </div>
          <div className="w-10 h-10 border border-white rounded-full flex items-center justify-center text-white opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 backdrop-blur-sm">
            +
          </div>
        </div>
      </div>
      
      <span className="absolute top-4 right-4 text-4xl md:text-6xl font-display font-bold text-white/5 group-hover:text-white/20 transition-colors">
        {project.id}
      </span>
    </div>
  );
};