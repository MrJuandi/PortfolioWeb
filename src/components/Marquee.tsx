"use client";
import { motion } from "framer-motion";

export default function Marquee() {
  const text = "TELECOMMUNICATION ENGINEERING — DATA ANALYTICS — SYSTEM ARCHITECTURE — ";

  return (
    <div className="w-full py-10 bg-[#050505] overflow-hidden border-y border-neutral-800/50 relative z-10">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: [0, -1000] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 25,
        }}
      >
        {[...Array(4)].map((_, i) => (
          <h2 key={i} className="text-5xl md:text-6xl font-display text-neutral-800 font-bold tracking-tight mr-8">
            {text}
          </h2>
        ))}
      </motion.div>
    </div>
  );
}