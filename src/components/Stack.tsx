"use client";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPython, FaReact, FaDatabase, FaMicrochip, FaTerminal, FaCode, FaLayerGroup, FaBrain, FaDocker, FaAws, FaGitAlt, FaLinux } from "react-icons/fa";

const orbits = [
  {
    id: "inner",
    radius: 160,
    speed: 0.4, // Velocidad base
    items: [
      { name: "C++", icon: <FaMicrochip />, type: "Hardware" },
      { name: "LINUX", icon: <FaLinux />, type: "OS" },
      { name: "GIT", icon: <FaGitAlt />, type: "Ops" }
    ]
  },
  {
    id: "middle",
    radius: 280,
    speed: -0.2, // Dirección opuesta
    items: [
      { name: "PYTHON", icon: <FaPython />, type: "Data" },
      { name: "SQL", icon: <FaDatabase />, type: "DB" },
      { name: "SCIKIT", icon: <FaBrain />, type: "ML" },
      { name: "DOCKER", icon: <FaDocker />, type: "DevOps" }
    ]
  },
  {
    id: "outer",
    radius: 420,
    speed: 0.15,
    items: [
      { name: "NEXT.JS", icon: <FaCode />, type: "Web" },
      { name: "REACT", icon: <FaReact />, type: "Frontend" },
      { name: "TYPESCRIPT", icon: <FaCode />, type: "Lang" },
      { name: "AWS", icon: <FaAws />, type: "Cloud" },
      { name: "FULLSTACK", icon: <FaLayerGroup />, type: "Arch" }
    ]
  }
];

export default function Stack() {
  // Estado global para pausar todo el sistema
  const [isSystemPaused, setSystemPaused] = useState(false);

  return (
    <section 
      className="relative w-full h-[120vh] bg-[#050505] overflow-hidden flex flex-col items-center justify-center border-t border-white/10 perspective-1000"
      // Al entrar en la sección, ralentizamos todo un poco para facilitar la lectura
      onMouseEnter={() => setSystemPaused(true)}
      onMouseLeave={() => setSystemPaused(false)}
    >
      
      {/* FONDO DECORATIVO */}
      <div className="absolute inset-0 opacity-[0.05]" 
           style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} 
      />

      {/* HEADER */}
      <div className="absolute top-10 z-10 text-center mix-blend-difference pointer-events-none">
        <span className="text-[10px] font-mono text-orange-500 tracking-[0.4em] uppercase animate-pulse">
          // ORBITAL_ENGINE_V3
        </span>
      </div>

      {/* --- EL SISTEMA SOLAR --- */}
      <div className="relative flex items-center justify-center scale-[0.6] md:scale-90 lg:scale-100 transition-transform duration-700">
        
        {/* NÚCLEO (SOL) - Z-Index fijo medio */}
        <div className="absolute z-20 flex flex-col items-center justify-center w-32 h-32 bg-[#0a0a0a] border border-orange-500/30 rounded-full shadow-[0_0_80px_rgba(255,69,0,0.2)]">
          <div className="absolute inset-0 border border-white/5 rounded-full animate-ping opacity-20" />
          <span className="text-2xl font-display font-black text-white tracking-tighter">
            CORE
          </span>
          <span className="text-[9px] font-mono text-neutral-500 mt-1">
            SYSTEM
          </span>
        </div>

        {/* Generar Órbitas */}
        {orbits.map((orbit, i) => (
          <OrbitSystem key={i} orbit={orbit} isPaused={isSystemPaused} />
        ))}

      </div>
      
    </section>
  );
}

const OrbitSystem = ({ orbit, isPaused }: any) => {
  const [angle, setAngle] = useState(0);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const requestRef = useRef<number>();

  useEffect(() => {
    const animate = () => {
      // Si el sistema está "pausado" (hover en la sección), se mueve muy lento (efecto matrix bullet time)
      // Si hay un item específico con hover, se para del todo (0)
      const currentSpeed = hoveredItem ? 0 : (isPaused ? orbit.speed * 0.2 : orbit.speed);
      
      setAngle(prev => prev + currentSpeed);
      requestRef.current = requestAnimationFrame(animate);
    };
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current!);
  }, [orbit.speed, isPaused, hoveredItem]);

  return (
    <div className="absolute flex items-center justify-center pointer-events-none">
      
      {/* CARRIL DE LA ÓRBITA (Visual) */}
      <div 
        className="absolute rounded-full border border-white/5"
        style={{ 
          width: orbit.radius * 2, 
          height: orbit.radius * 2,
          transform: "rotateX(60deg)", // Inclinación 3D fija del plano
          boxShadow: "0 4px 20px rgba(0,0,0,0.5)" // Sombra para profundidad
        }}
      />

      {/* PLANETAS (Items) */}
      {orbit.items.map((item: any, i: number) => {
        const totalItems = orbit.items.length;
        const offset = (360 / totalItems) * i;
        const currentDeg = angle + offset;
        const radian = currentDeg * (Math.PI / 180);

        // --- CÁLCULO DE POSICIÓN 3D ---
        // X = cos(a) * R
        // Y = sin(a) * R * inclinación (0.4 simula la perspectiva isométrica)
        const x = Math.cos(radian) * orbit.radius;
        const y = Math.sin(radian) * orbit.radius * 0.4; 

        // --- CÁLCULO DE PROFUNDIDAD (Z-INDEX) ---
        // Usamos el Seno para saber si está "arriba" (atrás) o "abajo" (delante) en la elipse.
        // sin > 0 está en la parte inferior de la pantalla (Frente) -> Z alto
        // sin < 0 está en la parte superior de la pantalla (Fondo) -> Z bajo
        const zValue = Math.sin(radian);
        
        // Z-Index: El núcleo es 20. 
        // Si está atrás (< 0), z-index 10. Si está delante (> 0), z-index 30.
        const zIndex = zValue > 0 ? 30 : 10;

        // Escala y Opacidad basada en profundidad para realismo
        const scale = 0.8 + (zValue * 0.2); // De 0.6 a 1.0
        const opacity = 0.5 + ((zValue + 1) / 2) * 0.5; // De 0.5 a 1.0

        // Si este item está siendo hovereado
        const isHovered = hoveredItem === item.name;

        return (
          <div
            key={i}
            className="absolute flex flex-col items-center justify-center pointer-events-auto cursor-pointer transition-all duration-300"
            style={{
              transform: `translate(${x}px, ${y}px)`, // Movemos X e Y
              zIndex: isHovered ? 100 : zIndex, // Si hover, pasa al frente de todo (Z-100)
            }}
            onMouseEnter={() => setHoveredItem(item.name)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            {/* EL PLANETA (Icono + Texto) */}
            <div 
              className={`
                relative flex items-center gap-3 px-4 py-3 rounded-full border transition-all duration-300
                ${isHovered 
                  ? "bg-white border-white scale-125 shadow-[0_0_30px_rgba(255,255,255,0.4)]" // Estilo Hover
                  : "bg-[#0a0a0a] border-white/20 hover:border-orange-500" // Estilo Normal
                }
              `}
              style={{
                // Aplicamos la escala 3D aquí
                // IMPORTANTE: Si está hover, forzamos escala 1 (tamaño real) para leer bien
                transform: `scale(${isHovered ? 1 : scale})`,
                opacity: isHovered ? 1 : opacity,
                // Blur para los de atrás
                filter: zValue < -0.2 && !isHovered ? "blur(1px)" : "none"
              }}
            >
              <span className={`text-xl transition-colors ${isHovered ? "text-black" : "text-neutral-400 group-hover:text-orange-500"}`}>
                {item.icon}
              </span>
              
              <span className={`font-display font-bold text-sm tracking-wider whitespace-nowrap transition-colors ${isHovered ? "text-black" : "text-white"}`}>
                {item.name}
              </span>

              {/* Etiqueta flotante extra (Solo en hover) */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute -top-8 left-1/2 -translate-x-1/2 bg-orange-500 text-black text-[9px] font-mono font-bold px-2 py-0.5 rounded uppercase"
                  >
                    {item.type}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        );
      })}
    </div>
  );
};