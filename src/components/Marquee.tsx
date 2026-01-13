"use client";

export default function Marquee() {
  const text = "TELECOMMUNICATION ENGINEERING — DATA ANALYTICS — SYSTEM ARCHITECTURE — ";

  return (
    <div className="w-full py-10 bg-[#050505] overflow-hidden border-y border-neutral-800/50 relative z-10">
      {/* CSS Animation instead of Framer Motion for better performance */}
      <div className="flex whitespace-nowrap animate-marquee">
        {[...Array(6)].map((_, i) => (
          <h2 key={i} className="text-5xl md:text-6xl font-display text-neutral-800 font-bold tracking-tight mr-8 flex-shrink-0">
            {text}
          </h2>
        ))}
      </div>

      {/* Add custom CSS animation */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
          will-change: transform;
        }
      `}</style>
    </div>
  );
}