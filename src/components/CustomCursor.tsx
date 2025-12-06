"use client";
import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cursorRef.current || !followerRef.current) return;
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    let mouseX = -100; let mouseY = -100;
    let followerX = -100; let followerY = -100;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // Mover punto central
      cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    };

    const animate = () => {
      // Física de seguimiento suave
      followerX += (mouseX - followerX) * 0.15;
      followerY += (mouseY - followerY) * 0.15;
      // Mover anillo
      follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;
      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove);
    const animationFrame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[99999]">
      
      {/* 1. PUNTO CENTRAL (TAMAÑO FORZADO EN PIXELES) */}
      <div 
        ref={cursorRef}
        className="fixed top-0 left-0 rounded-full"
        style={{
          width: "20px",            // <--- TAMAÑO GRANDE
          height: "20px",
          backgroundColor: "#ffffffff", // <--- NARANJA NEÓN (OrangeRed)
          marginLeft: "-10px",      // Centrado (mitad de 20)
          marginTop: "-10px",
          boxShadow: "0 0 10px rgba(255, 255, 255, 0.5)" // Resplandor
        }}
      />

      {/* 2. ANILLO SEGUIDOR (GIGANTE) */}
      <div 
        ref={followerRef}
        className="fixed top-0 left-0 rounded-full"
        style={{
          width: "60px",            // <--- TAMAÑO GIGANTE
          height: "60px",
          border: "2px solid rgba(255, 255, 255, 0.5)", // Borde naranja semi-transparente
          marginLeft: "-30px",      // Centrado (mitad de 60)
          marginTop: "-30px",
          transition: "width 0.2s, height 0.2s" // Por si quieres animarlo luego al hacer click
        }}
      />
      
    </div>
  );
}