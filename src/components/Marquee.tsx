"use client";
import { motion } from "framer-motion";

export default function Marquee() {
  // Duplicamos el texto para que el loop sea infinito sin cortes
  const text = "FULL STACK ENGINEERING — CREATIVE DEVELOPMENT — SYSTEM ARCHITECTURE — ";

  return (
    <div className="w-full py-12 bg-[#050505] overflow-hidden border-y border-neutral-800 relative z-10">
      {/* Contenedor que se mueve */}
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: [0, -1000] }} // Mueve hacia la izquierda
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 20, // Velocidad (más bajo = más rápido)
        }}
      >
        {/* Repetimos el texto varias veces para cubrir pantallas grandes */}
        {[...Array(4)].map((_, i) => (
          <h2 key={i} className="text-6xl font-display text-transparent stroke-text font-bold tracking-tighter mr-8">
            {text}
          </h2>
        ))}
      </motion.div>
      
      {/* Estilo para hacer el texto hueco (outline) */}
      <style jsx>{`
        .stroke-text {
          -webkit-text-stroke: 1px rgba(70, 34, 0, 1);
        }
      `}</style>
    </div>
  );
}