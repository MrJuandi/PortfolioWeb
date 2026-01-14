"use client";
import { FaEnvelope, FaFileAlt, FaLinkedinIn } from "react-icons/fa";

export default function Contact() {
  return (
    <section id="contact" className="relative w-full bg-[#050505] text-white py-32 border-t border-white/10">

      <div className="container mx-auto px-4 md:px-8 flex flex-col lg:flex-row gap-16 lg:gap-20">

        {/* LEFT COLUMN - Text */}
        <div className="lg:w-1/2">
          <span className="text-xs text-blue-400/80 tracking-widest uppercase">
            Contact
          </span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mt-6 leading-[0.9] tracking-tighter uppercase">
            Let's <br />
            <span className="text-neutral-600">Collaborate.</span>
          </h2>

          <p className="mt-8 text-base md:text-lg text-gray-400 max-w-lg leading-relaxed">
            Whether you have a complex challenge or are looking for a strategic partner, I am ready to talk. Currently based in Madrid, but open to relocation for the right opportunity.
          </p>
        </div>

        {/* RIGHT COLUMN - Action Cards */}
        <div className="lg:w-1/2 flex flex-col justify-center">

          {/* ACTION 1: EMAIL ME */}
          <a
            href="mailto:juandiegodiazh@hotmail.es"
            className="group flex items-center gap-6 py-6 border-b border-white/10 hover:bg-white/[0.03] hover:border-l-2 hover:border-l-blue-500 hover:pl-6 transition-all duration-300"
          >
            <div className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center group-hover:border-blue-500 group-hover:text-blue-400 transition-all duration-300">
              <FaEnvelope size={18} />
            </div>
            <div className="flex-1">
              <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-blue-400 transition-colors uppercase tracking-wide">
                Email Me
              </h3>
              <p className="text-sm text-gray-500 group-hover:text-gray-400 transition-colors">
                Get in touch directly
              </p>
            </div>
          </a>

          {/* ACTION 2: LINKEDIN */}
          <a
            href="https://www.linkedin.com/in/juan-diego-diaz-hidalgo"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-6 py-6 border-b border-white/10 hover:bg-white/[0.03] hover:border-l-2 hover:border-l-blue-500 hover:pl-6 transition-all duration-300"
          >
            <div className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center group-hover:border-blue-500 group-hover:text-blue-400 transition-all duration-300">
              <FaLinkedinIn size={18} />
            </div>
            <div className="flex-1">
              <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-blue-400 transition-colors uppercase tracking-wide">
                LinkedIn
              </h3>
              <p className="text-sm text-gray-500 group-hover:text-gray-400 transition-colors">
                Connect professionally
              </p>
            </div>
          </a>

          {/* ACTION 3: REQUEST RESUME */}
          <a
            href="mailto:juandiegodiazh@hotmail.es?subject=Requesting%20Resume%20-%20[Your%20Name]&body=Hi%20Juan,%0A%0AI%20would%20like%20to%20request%20your%20full%20CV.%0A%0ABest%20regards,"
            className="group flex items-center gap-6 py-6 border-b border-white/10 hover:bg-white/[0.03] hover:border-l-2 hover:border-l-blue-500 hover:pl-6 transition-all duration-300"
          >
            <div className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center group-hover:border-blue-500 group-hover:text-blue-400 transition-all duration-300">
              <FaFileAlt size={18} />
            </div>
            <div className="flex-1">
              <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-blue-400 transition-colors uppercase tracking-wide">
                Request Resume
              </h3>
              <p className="text-sm text-gray-500 group-hover:text-gray-400 transition-colors">
                Request full CV via Email
              </p>
            </div>
          </a>

        </div>

      </div>

      {/* FOOTER */}
      <div className="container mx-auto px-4 mt-32 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono text-neutral-600 uppercase">
        <p>© 2026 JUAN DIEGO DÍAZ HIDALGO. ENGINEER & ANALYST.</p>
        <p>MADRID, SPAIN</p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="hover:text-white transition-colors cursor-pointer"
        >
          SCROLL TO TOP ↑
        </button>
      </div>
    </section>
  );
}