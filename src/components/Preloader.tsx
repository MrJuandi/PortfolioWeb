"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const interval = setInterval(() => {
      setCounter((prev) => {
        if (prev < 100) {
          return prev + Math.floor(Math.random() * 12) + 3;
        } else {
          clearInterval(interval);
          return 100;
        }
      });
    }, 150);

    const timeout = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = "auto";
    }, 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] bg-[#030303] text-white flex flex-col items-center justify-center cursor-wait overflow-hidden"
        >
          {/* Background Grid */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:60px_60px]" />

          {/* Animated Corner Lines */}
          <motion.div
            className="absolute top-0 left-0 w-32 h-32"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="absolute top-8 left-8 w-16 h-px bg-gradient-to-r from-blue-500/50 to-transparent" />
            <div className="absolute top-8 left-8 w-px h-16 bg-gradient-to-b from-blue-500/50 to-transparent" />
          </motion.div>

          <motion.div
            className="absolute bottom-0 right-0 w-32 h-32"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="absolute bottom-8 right-8 w-16 h-px bg-gradient-to-l from-blue-500/50 to-transparent" />
            <div className="absolute bottom-8 right-8 w-px h-16 bg-gradient-to-t from-blue-500/50 to-transparent" />
          </motion.div>

          {/* Main Content */}
          <div className="relative z-10 text-center">

            {/* Name with stagger animation */}
            <motion.div
              className="overflow-hidden mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <motion.h1
                className="text-xs md:text-sm tracking-[0.5em] text-neutral-500 uppercase font-light"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                Juan Diego Díaz
              </motion.h1>
            </motion.div>

            {/* Large Percentage */}
            <motion.div
              className="relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <h2 className="text-[20vw] md:text-[15vw] font-black text-transparent leading-none [-webkit-text-stroke:1px_rgba(255,255,255,0.15)]">
                {counter > 100 ? 100 : counter}
              </h2>
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl md:text-6xl font-black text-white">
                {counter > 100 ? 100 : counter}%
              </span>
            </motion.div>

            {/* Loading Text */}
            <motion.p
              className="text-[10px] tracking-[0.4em] text-neutral-600 uppercase mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {counter < 100 ? "Loading Portfolio" : "Ready"}
            </motion.p>

            {/* Progress Bar */}
            <motion.div
              className="w-48 h-[1px] bg-neutral-800 mx-auto mt-6 overflow-hidden"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-blue-400"
                initial={{ width: "0%" }}
                animate={{ width: `${counter}%` }}
                transition={{ ease: "easeOut" }}
              />
            </motion.div>

          </div>

          {/* Bottom Text */}
          <motion.div
            className="absolute bottom-8 left-0 right-0 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <p className="text-[9px] tracking-[0.3em] text-neutral-700 uppercase">
              Engineer & Analyst • Madrid
            </p>
          </motion.div>

          {/* Subtle grain texture */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        </motion.div>
      )}
    </AnimatePresence>
  );
}