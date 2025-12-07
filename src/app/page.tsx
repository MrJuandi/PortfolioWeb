import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects"; 
import Marquee from "@/components/Marquee";
import Contact from "@/components/Contact";
import Stack from "@/components/Stack";

export default function Home() {
  return (
    <main className="w-full relative bg-[#050505]">
      <Hero />
      <Marquee />
      <About />
      <Stack />
      <Projects />
      <Contact/>
    </main>
  );
}