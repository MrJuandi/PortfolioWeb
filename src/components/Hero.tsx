"use client";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Hero() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax: El texto de atrás baja más lento, el de alante sube rápido
  const yTextBack = useTransform(scrollYProgress, [0, 1], [0, 100]); 
  const yTextFront = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const yImage = useTransform(scrollYProgress, [0, 1], [0, 50]);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-[#050505]">
      
      {/* HEADER INFO (Fijo) */}
      <div className="absolute top-6 left-0 w-full flex justify-between px-6 md:px-10 z-50 pointer-events-none mix-blend-difference opacity-70">
        <div className="text-[10px] md:text-xs font-mono tracking-widest text-white">
          JUAN DIEGO DÍAZ<br/>
          <span className="text-neutral-400">PORTFOLIO '25</span>
        </div>
        <div className="text-[10px] md:text-xs font-mono tracking-widest text-right text-white">
          BASED IN MADRID<br/>
          <span className="text-neutral-400">AVAILABLE FOR WORK</span>
        </div>
      </div>

      {/* ------------------------------------------------------- */}
      {/* CAPA 1: ENGINEER (Texto Detrás - Arriba Izquierda) */}
      {/* ------------------------------------------------------- */}
      <motion.div 
        style={{ y: yTextBack }}
        className="absolute z-0 pointer-events-none
          top-[36vh] left-[2vw]
          sm:top-[30vh] sm:left-[3vw]
          md:top-[30vh] md:left-[4vw]
          lg:top-[28vh] lg:left-[5vw]"
      >
        <h1 className="font-display font-black leading-none text-[#1a1a1a]
          text-[18vw]
          sm:text-[17vw]
          md:text-[15vw]
          lg:text-[14vw]
          xl:text-[13vw]
          2xl:text-[13rem]"
        >
          ENGINEER
        </h1>
      </motion.div>

      {/* ------------------------------------------------------- */}
      {/* CAPA 2: IMAGEN CENTRAL (Estatua) */}
      {/* ------------------------------------------------------- */}
      <div className="absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
          w-[120vw] h-[100vh]
          sm:w-[80vw] sm:h-[76vh]
          md:w-[65vw] md:h-[80vh]
          lg:w-[58vw] lg:h-[84vh]
          xl:w-[52vw] xl:h-[87vh]
          2xl:w-[950px] 2xl:h-[90vh]"
      >
        <motion.div 
          style={{ y: yImage }}
          className="w-full h-full" 
        >
          <div className="relative w-full h-full grayscale hover:grayscale-0 transition-all duration-700 ease-out">
            <Image
              src="/hero.png" 
              alt="Statue"
              fill
              className="object-contain drop-shadow-[0_0_50px_rgba(255,255,255,0.05)]"
              priority
            />
          </div>
        </motion.div>
      </div>

      {/* ------------------------------------------------------- */}
      {/* CAPA 3: CREATIVE (Texto Delante - Abajo Derecha) */}
      {/* ------------------------------------------------------- */}
      <motion.div 
        style={{ y: yTextFront }}
        className="absolute z-20 pointer-events-none mix-blend-difference
          bottom-[31vh] right-[2vw]
          sm:bottom-[23vh] sm:right-[3vw]
          md:bottom-[18vh] md:right-[4vw]
          lg:bottom-[16vh] lg:right-[5vw]"
      >
        <h1 className="font-display font-black leading-none text-white
          text-[18vw]
          sm:text-[17vw]
          md:text-[15vw]
          lg:text-[14vw]
          xl:text-[13vw]
          2xl:text-[13rem]"
        >
          ANALYTICS
        </h1>
      </motion.div>

    </section>
  );
}