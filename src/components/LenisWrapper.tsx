"use client"; // <--- ESTO ES LO QUE FALTABA
import { ReactLenis } from "@studio-freight/react-lenis";

export default function LenisWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root>
      {children}
    </ReactLenis>
  );
}