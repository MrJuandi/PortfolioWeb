"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaPython, FaDatabase, FaMicrochip, FaCode, FaDocker, FaMobileAlt } from "react-icons/fa";
import Image from "next/image";

interface CardData {
  id: string;
  title: string;
  role: string;
  icon: React.ReactNode;
  image: string;
  color: string;
  specs: string[];
}

const cards: CardData[] = [
  {
    id: "01",
    title: "PYTHON CORE",
    role: "Data Intelligence",
    icon: <FaPython />,
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2565&auto=format&fit=crop",
    color: "#fbbf24", 
    specs: ["SCIKIT", "PANDAS", "NUMPY"]
  },
  {
    id: "02",
    title: "NEXT.JS ARCH",
    role: "Modern Web",
    icon: <FaCode />,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop",
    color: "#38bdf8", 
    specs: ["REACT 18", "SSR", "ZUSTAND"]
  },
  {
    id: "03",
    title: "HARDWARE",
    role: "IoT Systems",
    icon: <FaMicrochip />,
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop",
    color: "#f43f5e", 
    specs: ["C++", "ESP32", "MQTT"]
  },
  {
    id: "04",
    title: "DATA SYS",
    role: "SQL & ETL",
    icon: <FaDatabase />,
    image: "https://images.unsplash.com/photo-1558494949-efc5e6074335?q=80&w=2669&auto=format&fit=crop",
    color: "#a855f7", 
    specs: ["POSTGRES", "REDIS", "PRISMA"]
  },
  {
    id: "05",
    title: "CLOUD OPS",
    role: "DevOps",
    icon: <FaDocker />,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop",
    color: "#22c55e", 
    specs: ["DOCKER", "AWS", "CI/CD"]
  },
  {
    id: "06",
    title: "MOBILE",
    role: "Native",
    icon: <FaMobileAlt />,
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2670&auto=format&fit=crop",
    color: "#ec4899", 
    specs: ["REACT NATIVE", "EXPO"]
  }
];

export default function DeckStack() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleDeckClick = () => {
    if (selectedCardId) {
      setSelectedCardId(null);
    } else {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="h-screen w-full bg-[#050505] flex flex-col items-center justify-center overflow-hidden relative border-t border-white/10">
      
      {/* --- FONDO MARCA DE AGUA (Sutil) --- */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-0 pointer-events-none opacity-20">
        <h2 className="text-neutral-800 text-[15vw] font-bold uppercase tracking-tighter leading-none blur-sm">
          STACK
        </h2>
      </div>

      {/* --- NUEVO TÍTULO / HEADER (z-5 para que esté detrás de las cartas z-10) --- */}
      <div className="absolute top-12 md:top-16 z-[5] text-center flex flex-col items-center gap-2 px-4">
        {/* Etiqueta superior */}
        <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            <span className="text-orange-500 font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase">
                // ENGINEERING_KIT
            </span>
        </div>
        
        {/* Título Principal */}
        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight uppercase">
            Tech <span className="text-neutral-600">Stack</span>
        </h1>
        
        {/* Instrucciones Dinámicas */}
        <p className="text-neutral-400 font-mono text-[10px] md:text-xs tracking-widest mt-2 border border-white/10 px-3 py-1 rounded-full bg-white/5 backdrop-blur-md">
            {isOpen 
              ? (isMobile ? "[TAP CARD TO INSPECT]" : "[HOVER TO INSPECT]") 
              : "[CLICK DECK TO DEPLOY]"}
        </p>
      </div>

      {/* --- CONTENEDOR MAZO (z-10 para que esté por encima del título) --- */}
      <div className="relative w-full flex items-center justify-center z-10 perspective-1000 h-full pt-20">
        
        <div 
          className="relative w-48 h-[300px] md:w-72 md:h-[420px] cursor-pointer" 
          onClick={handleDeckClick}
        >
          {cards.map((card, index) => {
            return (
              <Card 
                key={card.id} 
                card={card} 
                index={index} 
                total={cards.length} 
                isOpen={isOpen}
                isMobile={isMobile}
                isSelected={selectedCardId === card.id}
                onSelect={(id) => setSelectedCardId(selectedCardId === id ? null : id)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

// --- SUBCOMPONENTE DE CARTA ---
interface CardProps {
  card: CardData;
  index: number;
  total: number;
  isOpen: boolean;
  isMobile: boolean;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

function Card({ card, index, total, isOpen, isMobile, isSelected, onSelect }: CardProps) {
  const centerIndex = (total - 1) / 2;
  const offset = index - centerIndex;
  
  // --- MATEMÁTICAS ---
  let rotation = 0;
  if (!isOpen) rotation = isMobile ? offset * 4 : offset * 3;
  else if (isSelected && isMobile) rotation = 0;
  else rotation = isMobile ? offset * 8 : offset * 12;

  let xPosition = 0;
  if (!isOpen) xPosition = 0;
  else if (isSelected && isMobile) xPosition = 0;
  else xPosition = isMobile ? offset * 25 : offset * 110;

  let yPosition = 0;
  if (!isOpen) yPosition = -index * 2;
  else if (isSelected && isMobile) yPosition = -50; 
  else yPosition = Math.abs(offset) * (isMobile ? 12 : 20);

  let scale = 1;
  if (isSelected && isMobile) scale = 1.25;

  const zIndex = isSelected ? 100 : index;

  return (
    <motion.div
      layout
      onClick={(e) => {
        if (isOpen && isMobile) {
          e.stopPropagation();
          onSelect(card.id);
        }
      }}
      initial={false}
      animate={{
        x: xPosition,
        y: yPosition,
        rotate: rotation,
        scale: scale,
        zIndex: zIndex,
      }}
      whileHover={isOpen && !isMobile ? { 
        scale: 1.15, 
        zIndex: 100,
        y: -40,
        rotate: 0, 
        transition: { duration: 0.2 }
      } : {}}
      transition={{ 
        type: "spring", 
        stiffness: 260, 
        damping: 20, 
        delay: isOpen ? index * 0.05 : 0 
      }}
      className="absolute top-0 left-0 w-48 h-[280px] md:w-72 md:h-[420px] rounded-xl md:rounded-2xl bg-neutral-900 border border-white/10 shadow-2xl flex flex-col items-center overflow-hidden origin-bottom group"
      style={{
        transformOrigin: "50% 100%", 
      }}
    >
      
      {/* IMAGEN DE FONDO */}
      <div className="absolute inset-0 z-0">
        <Image 
          src={card.image} 
          alt={card.title} 
          fill 
          className="object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 ease-in-out"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/80 to-black" />
      </div>

      {/* CONTENIDO */}
      <div className={`relative z-10 w-full h-full p-4 md:p-6 flex flex-col justify-between border-2 border-transparent transition-colors duration-300 ${isSelected ? '!border-white/20' : ''}`}
           style={{ borderColor: isOpen ? 'transparent' : 'rgba(255,255,255,0.05)' }}
      >
        
        <div className="flex justify-between items-start">
            <span className="font-mono text-[8px] md:text-[10px] text-white/70 bg-black/50 border border-white/10 px-1.5 py-0.5 rounded backdrop-blur-md">
                //{card.id}
            </span>
            <div className="text-lg md:text-2xl drop-shadow-lg" style={{ color: card.color }}>
                {card.icon}
            </div>
        </div>

        <div className="absolute inset-0 hidden md:flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-10 transition-opacity duration-500">
             <div className="text-[100px] text-white transform rotate-[-15deg]">{card.icon}</div>
        </div>

        <div className="space-y-1 md:space-y-3">
            <div>
                <p className="text-[8px] md:text-[10px] font-mono mb-0.5 uppercase tracking-widest opacity-80" style={{ color: card.color }}>
                    {card.role}
                </p>
                <h3 className="text-lg md:text-2xl font-bold text-white uppercase font-sans leading-[0.9]">
                    {card.title}
                </h3>
            </div>
            
            <div className={`flex flex-wrap gap-1 pt-2 border-t border-white/10 transition-opacity duration-300 
                ${isMobile && !isSelected ? 'opacity-0' : 'opacity-100'}
            `}>
                {card.specs.map((spec, i) => (
                    <span key={i} className="text-[7px] md:text-[9px] font-mono border border-white/20 px-1 py-0.5 rounded text-neutral-300 bg-white/5 whitespace-nowrap">
                        {spec}
                    </span>
                ))}
            </div>
        </div>
      </div>

      <motion.div 
        className="absolute inset-0 border-2 rounded-xl md:rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ borderColor: card.color }}
      />
    </motion.div>
  );
}