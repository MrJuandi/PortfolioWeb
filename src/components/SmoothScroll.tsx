"use client";
import { ReactLenis } from "@studio-freight/react-lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const Lenis = ReactLenis as any;

  return (
    <Lenis root>
      {children}
    </Lenis>
  );
}