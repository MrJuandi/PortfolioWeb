"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    // 1. Bloquear el scroll al iniciar
    document.body.style.overflow = "hidden";

    // 2. Simular carga (Contador 0 -> 100)
    const interval = setInterval(() => {
      setCounter((prev) => {
        if (prev < 100) {
          // Incremento aleatorio para que parezca carga real
          return prev + Math.floor(Math.random() * 16) + 5;
        } else {
          clearInterval(interval);
          return 100;
        }
      });
    }, 200); // Velocidad del contador

    // 3. Finalizar carga cuando llegue a 100 (aprox 2 segundos)
    const timeout = setTimeout(() => {
      setIsLoading(false);
      // Restaurar scroll
      document.body.style.overflow = "auto";
    }, 1500);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
      document.body.style.overflow = "auto"; // Limpieza por seguridad
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          // Animación de SALIDA (El telón sube)
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] bg-[#050505] text-white flex flex-col items-center justify-center cursor-wait"
        >

          {/* CONTENIDO DEL PRELOADER */}
          <div className="w-full max-w-md px-6 text-center">

            {/* Porcentaje Grande */}
            <h1 className="text-7xl md:text-8xl font-black text-white leading-none mb-6">
              {counter > 100 ? 100 : counter}%
            </h1>

            {/* Barra de Progreso */}
            <div className="w-full h-[2px] bg-neutral-800 overflow-hidden">
              <motion.div
                className="h-full bg-white"
                initial={{ width: "0%" }}
                animate={{ width: `${counter}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>

          </div>

          {/* Ruido de fondo (Opcional, si te gusta el efecto grano) */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        </motion.div>
      )}
    </AnimatePresence>
  );
}