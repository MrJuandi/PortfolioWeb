"use client";
import { FaGithub, FaLinkedinIn, FaEnvelope } from "react-icons/fa"; // Iconos

export default function Contact() {
  return (
    <section className="relative w-full bg-[#050505] text-white py-32 border-t border-white/10">
      
      <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row gap-20">
        
        {/* --- COLUMNA IZQUIERDA: LLAMADA A LA ACCIÓN --- */}
        <div className="md:w-1/2">
          <span className="text-xs font-mono text-orange-500 tracking-widest uppercase">
            // CONTACT_CHANNEL
          </span>
          <h2 className="text-6xl md:text-8xl font-display font-bold mt-6 leading-[0.9] tracking-tighter uppercase">
            Let's <br />
            <span className="text-neutral-600">Collaborate.</span>
          </h2>
          
          <p className="mt-8 font-mono text-sm text-neutral-400 max-w-md leading-relaxed">
            ¿Tienes un proyecto complejo, una idea disruptiva o simplemente quieres hablar de código? Mis canales están abiertos.
          </p>

          {/* REDES SOCIALES */}
          <div className="flex gap-6 mt-12">
            <a href="https://github.com/juandiegodiazh" target="_blank" rel="noopener noreferrer" 
               className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-black hover:scale-110 transition-all duration-300">
              <FaGithub size={20} />
            </a>
            <a href="https://www.linkedin.com/in/juan-diego-diaz-hidalgo" target="_blank" rel="noopener noreferrer" 
               className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center hover:bg-[#0077b5] hover:border-[#0077b5] hover:scale-110 transition-all duration-300">
              <FaLinkedinIn size={20} />
            </a>
            <a href="mailto:juandiegodiazh@hotmail.es" 
               className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center hover:bg-orange-500 hover:border-orange-500 hover:scale-110 transition-all duration-300">
              <FaEnvelope size={20} />
            </a>
          </div>
        </div>

        {/* --- COLUMNA DERECHA: FORMULARIO BRUTALISTA --- */}
        <div className="md:w-1/2 bg-[#0a0a0a] p-8 md:p-12 border border-white/5">
          <form className="flex flex-col gap-8">
            
            {/* Input Nombre */}
            <div className="group relative">
              <input 
                type="text" 
                placeholder="NAME_ID" 
                className="w-full bg-transparent border-b border-white/20 py-4 text-white font-mono text-sm focus:outline-none focus:border-orange-500 transition-colors placeholder:text-neutral-600"
              />
            </div>

            {/* Input Email */}
            <div className="group relative">
              <input 
                type="email" 
                placeholder="EMAIL_ADDRESS" 
                className="w-full bg-transparent border-b border-white/20 py-4 text-white font-mono text-sm focus:outline-none focus:border-orange-500 transition-colors placeholder:text-neutral-600"
              />
            </div>

            {/* Input Mensaje */}
            <div className="group relative">
              <textarea 
                rows={4}
                placeholder="MESSAGE_DATA..." 
                className="w-full bg-transparent border-b border-white/20 py-4 text-white font-mono text-sm focus:outline-none focus:border-orange-500 transition-colors placeholder:text-neutral-600 resize-none"
              />
            </div>

            {/* Botón de Envío */}
            <button 
              type="submit" 
              className="mt-4 w-full bg-white text-black font-bold uppercase py-4 tracking-widest hover:bg-orange-500 hover:text-white transition-all duration-300"
            >
              Send Transmission
            </button>

          </form>
        </div>

      </div>

      {/* FOOTER INTEGRADO */}
      <div className="container mx-auto px-4 mt-32 pt-8 border-t border-white/10 flex justify-between items-center text-[10px] font-mono text-neutral-600 uppercase">
        <p>© 2025 JUAN DIEGO DÍAZ</p>
        <p>MADRID, SPAIN</p>
        <p>SCROLL TO TOP ↑</p>
      </div>
    </section>
  );
}