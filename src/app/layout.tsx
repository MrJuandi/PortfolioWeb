import type { Metadata } from "next";
import { Anton, Inter } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import LenisWrapper from "@/components/LenisWrapper"; // <--- Importamos NUESTRO componente


const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton" });
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Engineering Portfolio",
  description: "Portfolio",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${anton.variable} bg-background text-foreground antialiased`}>
        
        {/* Cursor y UI siempre visibles y fijos */}
        <CustomCursor />
        
        <div className="bg-noise" />

        {/* El Scroll envuelve el contenido, pero ya no rompe el servidor */}
        <LenisWrapper>
          {children}
        </LenisWrapper>

      </body>
    </html>
  );
}