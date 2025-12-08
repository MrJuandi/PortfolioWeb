import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Anton, Inter } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import LenisWrapper from "@/components/LenisWrapper"; 
import Preloader from "@/components/Preloader";


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
        <Preloader />
        <SpeedInsights />
        <CustomCursor />
        
        <div className="bg-noise" />
        <LenisWrapper>
          
          {children}
        </LenisWrapper>

      </body>
    </html>
  );
}