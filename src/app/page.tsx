import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects"; // <--- Aquí está la magia
import Marquee from "@/components/Marquee";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="w-full relative bg-[#050505]">
      <Hero />
      <Marquee />
      <About />
      <Projects />
      <Contact/>
    </main>
  );
}