"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Hero() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yTextBack = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const yTextFront = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-[#030303]">

      {/* GRADIENTE DE FONDO PREMIUM */}
      <div className="absolute inset-0 transform-gpu">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#050505] to-[#0f0f12]" />
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-900/8 rounded-full blur-[150px] transform-gpu will-change-transform" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-800/5 rounded-full blur-[120px] transform-gpu will-change-transform" />
      </div>

      {/* GRID DE FONDO ELEGANTE */}
      <div className="absolute inset-0 opacity-[0.04]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }} />
      </div>

      {/* LÍNEAS DECORATIVAS ANIMADAS */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1.5 }}
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
        <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/10 to-transparent" />
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent" />
      </motion.div>

      {/* HEADER INFO */}
      <motion.div
        style={{ opacity }}
        className="absolute top-8 left-0 w-full flex justify-between px-8 md:px-12 z-50"
      >
        <div className="text-[10px] md:text-xs tracking-[0.25em] text-neutral-400 uppercase font-light">
          Juan Diego Díaz Hidalgo<br />
          <span className="text-blue-400/70">Engineer & Data Analyst</span>
        </div>
        <div className="text-[10px] md:text-xs tracking-[0.25em] text-right text-neutral-400 uppercase font-light">
          Based in Madrid<br />
          <span className="text-neutral-500">Available</span>
        </div>
      </motion.div>

      {/* TEXTO GRANDE DE FONDO - ENGINEER */}
      <motion.div
        style={{ y: yTextBack, opacity, scale }}
        className="absolute z-0 pointer-events-none transform-gpu
          top-[30vh] left-[3vw]
          md:top-[28vh] md:left-[5vw]"
      >
        <h1 className="font-display font-black leading-none text-transparent antialiased transform-gpu
          text-[20vw] md:text-[16vw] lg:text-[14vw] 2xl:text-[15rem]
          [-webkit-text-stroke:1px_rgba(255,255,255,0.08)]"
        >
          ENGINEER
        </h1>
      </motion.div>

      {/* CONTENIDO CENTRAL */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 z-10">

        <motion.div
          style={{ y: yTextFront, opacity }}
          className="text-center"
        >
          {/* ETIQUETA SUPERIOR */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8 flex items-center gap-5"
          >
            <span className="w-16 h-px bg-gradient-to-r from-transparent to-neutral-500" />
            <span className="text-xs md:text-sm tracking-[0.3em] text-neutral-400 uppercase font-light">
              Msc. Telecom Engineer & Data Analyst
            </span>
            <span className="w-16 h-px bg-gradient-to-l from-transparent to-neutral-500" />
          </motion.div>

          {/* NOMBRE PRINCIPAL */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="font-display font-black leading-none text-white tracking-[-0.02em] antialiased transform-gpu
              text-[13vw] md:text-[10vw] lg:text-[9vw] xl:text-[8vw] 2xl:text-[150px]"
          >
            JUAN DIEGO
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="font-display font-black leading-none tracking-[-0.02em] mt-4 antialiased transform-gpu
              text-[13vw] md:text-[10vw] lg:text-[9vw] xl:text-[8vw] 2xl:text-[150px]
              text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,0.5)]"
          >
            DÍAZ HIDALGO
          </motion.h2>

          {/* DESCRIPCIÓN */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-10 text-neutral-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed font-light"
          >
            Bridging the gap between <span className="text-white">Engineering</span> and <span className="text-white">Business Strategy</span>.
            <br className="hidden md:block" />
            Turning raw signals into <span className="text-blue-400/90">actionable insights</span>.
          </motion.p>



        </motion.div>
      </div>

      {/* TEXTO GRANDE DE FONDO - ANALYTICS */}
      <motion.div
        style={{ y: yTextFront, opacity }}
        className="absolute z-0 pointer-events-none transform-gpu
          bottom-[18vh] right-[3vw]
          md:bottom-[15vh] md:right-[5vw]"
      >
        <h1 className="font-display font-black leading-none text-transparent antialiased transform-gpu
          text-[18vw] md:text-[14vw] lg:text-[12vw] 2xl:text-[13rem]
          [-webkit-text-stroke:1px_rgba(255,255,255,0.06)]"
        >
          ANALYTICS
        </h1>
      </motion.div>

      {/* INDICADOR DE SCROLL */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-5 h-8 border border-neutral-700 rounded-full flex justify-center pt-1.5"
        >
          <motion.div
            animate={{ y: [0, 8, 0], opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1 h-1 bg-blue-500 rounded-full"
          />
        </motion.div>
      </motion.div>

      {/* ELEMENTOS DECORATIVOS ESQUINAS */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l border-t border-neutral-800/50" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r border-t border-neutral-800/50" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l border-b border-neutral-800/50" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r border-b border-neutral-800/50" />

      {/* INFO LATERAL */}
      <div className="absolute bottom-8 right-8 md:right-12 text-[10px] tracking-[0.2em] text-neutral-600 font-mono hidden md:block">
        <span className="text-blue-500/60">01</span><span className="text-neutral-700">/</span>04
      </div>

    </section>
  );
}