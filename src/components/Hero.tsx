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


  const yText = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const yImage = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const xLeft = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const xRight = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <section ref={containerRef} className="relative h-screen w-full flex justify-center items-center overflow-hidden bg-[#050505]">
      

      <div className="absolute top-[12%] left-0 w-full text-center z-50 pointer-events-none mix-blend-difference">
        <p className="text-sm md:text-base font-bold uppercase tracking-[0.5em] text-white/90 font-mono">
          Juan Diego Díaz Hidalgo
        </p>
        <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-white/60 font-mono mt-2">
          BASED IN MADRID
        </p>
      </div>


      <motion.h1 
        style={{ y: yText, x: xLeft }}
        // text-[20vw]: Tamaño brutal basado en el ancho de la pantalla
        // font-black: El peso más gordo posible
        className="font-display text-[20vw] md:text-[16rem] leading-none text-white/10 font-black absolute top-[18%] left-[-5%] whitespace-nowrap z-0 select-none pointer-events-none"
      >
        ENGINEER
      </motion.h1>


      <motion.div 
        style={{ y: yImage }}

        className="relative z-10 w-[100%] md:w-[70%] h-[75vh] md:h-[90vh] grayscale hover:grayscale-0 transition-all duration-500 ease-out"
      >
        <Image
          src="/hero.png" 
          alt="Statue"
          fill
          
          className="object-contain drop-shadow-2xl"
          priority
        />
      </motion.div>


      <motion.h1 
        style={{ y: yText, x: xRight }}
        
        className="font-display text-[20vw] md:text-[16rem] leading-none text-white font-black absolute bottom-[18%] right-[-5%] whitespace-nowrap z-20 mix-blend-difference select-none pointer-events-none"
      >
        ANALYTICS
      </motion.h1>

    </section>
  );
}