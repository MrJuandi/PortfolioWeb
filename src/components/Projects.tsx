"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FaWifi, FaBatteryFull, FaArrowRight, FaCode, FaMicrochip, FaDatabase, FaLayerGroup, FaTimes, FaChartLine, FaExclamationTriangle, FaLightbulb, FaRocket } from "react-icons/fa";

type Project = {
  id: string;
  label: string;
  title: string;
  cat: string;
  desc: string;
  image: string;
  tech: string;
  status: string;
  color: string;
  border: string;
  bg: string;
  businessCase: {
    problem: string;
    solution: string;
    impact: string;
    metrics: Array<{ label: string; value: string; color: string }>;
    challenges: string[];
    techHighlights: string[];
  };
};

const projects: Project[] = [
  {
    id: "01",
    label: "SIGNO",
    title: "SIGNO ENERGY",
    cat: "ENERGY RETAILER PORTAL",
    desc: "A high-performance corporate platform with a secure client portal. Designed for sub-second load times and full responsive adaptability using a lightweight architecture.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
    tech: "JAVASCRIPT (ES6+) • FIREBASE • HTML5/CSS3",
    status: "LIVE",
    color: "text-blue-400",
    border: "border-blue-500/50",
    bg: "bg-blue-500",
    businessCase: {
      problem: "The client required a digital transformation to reduce manual support tickets. They needed a centralized hub for customers to download invoices and manage contracts without human intervention.",
      solution: "A secure, responsive web ecosystem built on a Serverless architecture (Firebase). Features a custom Client Area for real-time billing management and a highly optimized frontend for instant page loads.",
      impact: "Digitized the customer relationship, significantly reducing support call volume. The lightweight frontend architecture ensures accessibility across all devices, improving user retention.",
      metrics: [
        { label: "Load Time", value: "<1s", color: "text-blue-400" },
        { label: "Uptime", value: "100%", color: "text-blue-400" },
        { label: "Self-Service", value: "24/7", color: "text-blue-400" }
      ],
      challenges: ["Strict data privacy for client invoices", "100% responsive across devices", "Seamless Firebase Auth flows"],
      techHighlights: ["Serverless Backend (Firebase)", "Vanilla JS minimal bundle", "Secure Cloud Storage"]
    }
  },
  {
    id: "02",
    label: "DATA",
    title: "CUSTOMER RISK ENGINE",
    cat: "ENTROPY-BASED SEGMENTATION",
    desc: "A custom-built Recursive Partitioning Algorithm designed to identify high-value customer segments. By leveraging Information Theory (Entropy) rather than black-box models, it provides fully explainable risk profiles linked to financial margins.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
    tech: "PYTHON • SQL • PANDAS • NUMPY",
    status: "DEPLOYED",
    color: "text-cyan-400",
    border: "border-cyan-500/50",
    bg: "bg-cyan-500",
    businessCase: {
      problem: "The company lacked a predictive mechanism to anticipate customer churn. The marketing team was operating blindly, with no visibility into which high-value segments were at risk until they had already left.",
      solution: "I built the company's first Risk Segmentation Engine from the ground up. By coding a custom recursive algorithm (Entropy-based), I structured the chaotic behavioral data into clear, actionable risk tiers linked to customer value.",
      impact: "Enabled a proactive retention strategy. For the first time, stakeholders could view the entire portfolio categorized by risk level, allowing for targeted interventions on specific high-margin clusters.",
      metrics: [
        { label: "Portfolio Visibility", value: "100%", color: "text-cyan-400" },
        { label: "Risk Profiles", value: "12+", color: "text-cyan-400" },
        { label: "Predictive Capability", value: "0→1", color: "text-cyan-400" }
      ],
      challenges: ["Greenfield: No historical benchmarks", "Data structuring from raw logs", "Manual Information Gain implementation"],
      techHighlights: ["Custom Entropy Heuristics", "First-Party Data APIs", "Automated Weekly Scoring", "Explainable White-box Logic"]
    }
  },
  {
    id: "03",
    label: "IOT",
    title: "BIO-SIGNAL STREAMING",
    cat: "REAL-TIME EMG SYSTEM",
    desc: "An end-to-end IoT platform for acquiring and visualizing Electromyography (muscle) signals. Bridges low-level firmware (ESP32) with a high-performance Python desktop application via Bluetooth Low Energy (BLE).",
    image: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=2670&auto=format&fit=crop",
    tech: "PYTHON (PYSIDE6) • C++ • ESP32 • BLE",
    status: "PROTOTYPE",
    color: "text-sky-400",
    border: "border-sky-500/50",
    bg: "bg-sky-500",
    businessCase: {
      problem: "Clinical EMG systems are notoriously bulky, expensive, and tethered by wires, limiting their use in dynamic environments. There was a need for a portable, wireless solution capable of maintaining medical-grade signal fidelity.",
      solution: "Designed a Wireless IoT System based on the ESP32-C3 RISC-V microcontroller. It captures analog muscle signals, processes them at the edge, and streams them wirelessly to a custom-built Python Desktop Dashboard for real-time visualization.",
      impact: "Democratized access to bio-signal analysis. The system achieves stable, low-latency transmission suitable for real-time monitoring, reducing hardware costs by over 90% compared to traditional medical equipment.",
      metrics: [
        { label: "Latency", value: "<1ms", color: "text-sky-400" },
        { label: "Packet Stability", value: "100%", color: "text-sky-400" },
        { label: "Cost Reduction", value: "-90%", color: "text-sky-400" }
      ],
      challenges: ["Async BLE streams with Bleak", "GPU-accelerated rendering (pyqtgraph)", "ESP32 ADC + BLE concurrency"],
      techHighlights: ["ESP32-C3 RISC-V + ADC", "BLE Custom GATT Server", "PySide6 + AsyncIO GUI", "CSV & MATLAB Export"]
    }
  },
  {
    id: "04",
    label: "R&D",
    title: "A.M. HOMODYNE RECEIVER",
    cat: "ANALOG CIRCUIT DESIGN",
    desc: "End-to-end design and assembly of an AM Radio Receiver. From component-level simulation in LTSpice to physical implementation, achieving clear demodulation of commercial broadcast bands (500kHz - 1MHz).",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2670&auto=format&fit=crop",
    tech: "LTSPICE • ANALOG ELECTRONICS • RF DESIGN",
    status: "COMPLETED",
    color: "text-indigo-400",
    border: "border-indigo-500/50",
    bg: "bg-indigo-500",
    businessCase: {
      problem: "Extracting low-power RF signals from a noisy electromagnetic spectrum requires precise filtering and amplification. The challenge was to design a purely analog circuit capable of isolating specific carrier frequencies without digital signal processing (DSP).",
      solution: "Engineered a multi-stage Homodyne Architecture: Tunable Band-Pass Filter → High-Gain RF Amplifier → Envelope Detector (Demodulator). The design was rigorously modeled in LTSpice to optimize the Signal-to-Noise Ratio (SNR) before physical assembly.",
      impact: "Successfully tuned and demodulated commercial AM broadcasts (RNE, SER, COPE) with high audio fidelity. Validated the theoretical models of amplitude modulation and analog filtering in a real-world environment.",
      metrics: [
        { label: "Tuning Range", value: "500kHz-1MHz", color: "text-indigo-400" },
        { label: "Modulation", value: "80%", color: "text-indigo-400" },
        { label: "Simulation", value: "100%", color: "text-indigo-400" }
      ],
      challenges: ["Band-Pass filter for noise rejection", "Multi-stage RF amplifier design", "Impedance matching optimization"],
      techHighlights: ["LTSpice Transient Analysis", "Homodyne + Envelope Detection", "Discrete Analog (Op-Amps, LC Tanks)", "Fourier & Filtering Theory"]
    }
  }
];

export default function TacticalSwitcher() {
  const [activeTab, setActiveTab] = useState(0);
  const [openModal, setOpenModal] = useState<number | null>(null);

  return (
    <section className="bg-[#050505] min-h-screen py-20 px-4 md:px-8 border-t border-white/10 flex flex-col items-center justify-center">

      {/* HEADER DE LA MÁQUINA */}
      <div className="w-full max-w-6xl mb-8 flex justify-between items-end border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            <span className="text-[10px] text-blue-400/80 tracking-widest uppercase">Portfolio</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter leading-none">
            Projects <span className="text-neutral-600">Feed</span>
          </h2>
        </div>
        <div className="hidden md:flex gap-4 text-neutral-600">
          <FaWifi />
          <FaBatteryFull />
        </div>
      </div>

      {/* --- LA INTERFAZ DE CONTROL (EL MONITOR) --- */}
      <div className="w-full max-w-6xl flex flex-col md:flex-row h-[75vh] md:h-[600px] border border-white/10 bg-[#080808] relative overflow-hidden rounded-lg shadow-2xl">

        {/* BARRA DE NAVEGACIÓN (TABS) */}
        {/* En móvil: Abajo (horizontal). En PC: Izquierda (vertical). */}
        <div className="order-2 md:order-1 w-full md:w-64 bg-[#0a0a0a] border-t md:border-t-0 md:border-r border-white/10 flex md:flex-col overflow-x-auto hide-scrollbar z-20">
          {projects.map((project, index) => {
            const isActive = activeTab === index;
            return (
              <button
                key={project.id}
                onClick={() => setActiveTab(index)}
                className={`
                            relative flex-shrink-0 md:flex-shrink p-4 md:p-6 flex flex-col items-start justify-center gap-1 transition-all duration-300
                            ${isActive ? "bg-white/5" : "hover:bg-white/5 opacity-50 hover:opacity-100"}
                            min-w-[100px] md:min-w-0 md:h-1/4 border-r md:border-r-0 md:border-b border-white/5
                        `}
              >
                <span className={`font-mono text-[10px] font-bold ${isActive ? project.color : "text-neutral-500"}`}>
                  0{project.id}
                </span>
                <span className={`text-xs md:text-sm font-bold uppercase tracking-wider ${isActive ? "text-white" : "text-neutral-400"}`}>
                  {project.label}
                </span>

                {/* Indicador Activo */}
                {isActive && (
                  <motion.div
                    layoutId="active-indicator"
                    className={`absolute bottom-0 left-0 h-0.5 w-full md:h-full md:w-1 md:top-0 md:left-0 md:bottom-auto ${project.bg}`}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* PANTALLA PRINCIPAL (VISUALIZADOR) */}
        <div className="order-1 md:order-2 flex-grow relative overflow-hidden group">

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.4, ease: "circOut" }}
              className="absolute inset-0 w-full h-full"
            >
              {/* IMAGEN DE FONDO */}
              <Image
                src={projects[activeTab].image}
                alt={projects[activeTab].title}
                fill
                className="object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500 grayscale group-hover:grayscale-0"
              />

              {/* OVERLAYS */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" />

              {/* CONTENIDO FLOTANTE SOBRE LA IMAGEN */}
              <div className="absolute inset-0 z-20 p-6 md:p-12 flex flex-col justify-end">

                {/* Etiqueta Flotante */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mb-auto self-end"
                >
                  <span className={`px-3 py-1 bg-black/50 backdrop-blur border ${projects[activeTab].border} text-xs font-mono ${projects[activeTab].color} uppercase tracking-widest`}>
                    STATUS: {projects[activeTab].status}
                  </span>
                </motion.div>

                {/* Textos Principales */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`w-8 h-[2px] ${projects[activeTab].bg}`} />
                    <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest">
                      {projects[activeTab].cat}
                    </span>
                  </div>

                  <h2 className="text-4xl md:text-7xl font-black text-white uppercase italic tracking-tighter leading-none mb-4">
                    {projects[activeTab].title}
                  </h2>

                  <p className="max-w-lg text-neutral-300 text-sm md:text-lg leading-relaxed mb-6 border-l-2 border-white/20 pl-4">
                    {projects[activeTab].desc}
                  </p>

                  <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                    <div className="font-mono text-xs text-neutral-500 bg-white/5 px-2 py-1 rounded">
                      STACK: <span className="text-white">{projects[activeTab].tech}</span>
                    </div>

                    <button
                      onClick={() => setOpenModal(activeTab)}
                      data-interactive
                      className={`flex items-center gap-2 px-4 py-2 bg-white text-black font-bold uppercase text-xs hover:bg-neutral-200 transition-colors`}
                    >
                      Business Case <FaChartLine />
                    </button>
                  </div>
                </motion.div>
              </div>

            </motion.div>
          </AnimatePresence>

          {/* Borde Decorativo */}
          <div className={`absolute top-0 left-0 w-full h-1 z-30 transition-colors duration-500 ${projects[activeTab].bg}`} />
        </div>

      </div>

      {/* MODAL BUSINESS CASE */}
      <AnimatePresence>
        {openModal !== null && (
          <BusinessCaseModal
            project={projects[openModal]}
            onClose={() => setOpenModal(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

// COMPONENTE MODAL BUSINESS CASE - VERSIÓN MOBILE-PROOF
function BusinessCaseModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    // ✅ BLOQUEO BRUTO DEL BODY (Position Fixed + Guardar posición)
    const scrollY = window.scrollY;
    const originalOverflow = document.body.style.overflow;
    const originalPosition = document.body.style.position;
    const originalTop = document.body.style.top;
    const originalWidth = document.body.style.width;

    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      // Restaurar TODO y volver a la posición original
      document.body.style.overflow = originalOverflow;
      document.body.style.position = originalPosition;
      document.body.style.top = originalTop;
      document.body.style.width = originalWidth;
      window.scrollTo(0, scrollY);
    };
  }, [onClose]);

  return (
    <>
      {/* Backdrop - touch-none para bloquear gestos */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] touch-none"
      />

      {/* Modal Container - h-[100dvh] para móvil */}
      <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 h-[100dvh] touch-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
          className="relative w-full max-w-4xl max-h-[90dvh] bg-[#0a0a0a] border border-white/10 rounded-lg flex flex-col overflow-hidden touch-auto"
        >

          {/* Header - FIJO */}
          <div className="relative bg-[#080808] p-4 md:p-6 flex-shrink-0 border-b border-white/10">
            <div className={`absolute top-0 left-0 w-full h-1 ${project.bg}`} />

            <div className="relative flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`w-1.5 h-1.5 ${project.bg} rounded-full flex-shrink-0`} />
                  <span className="font-mono text-[10px] text-white/40 tracking-widest uppercase">
                    BUSINESS_CASE
                  </span>
                </div>
                <h2 className="text-xl md:text-2xl font-black text-white uppercase italic tracking-tighter leading-tight mb-2 truncate">
                  {project.title}
                </h2>
                <div className="flex items-center gap-2 text-[10px] font-mono flex-wrap">
                  <span className="text-white/50">{project.cat}</span>
                  <span className="text-white/20">•</span>
                  <span className={project.color}>{project.status}</span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded transition-colors flex-shrink-0"
                aria-label="Close"
              >
                <FaTimes className="text-white/50 text-lg" />
              </button>
            </div>
          </div>

          {/* Content - touch-pan-y + stopPropagation */}
          <div
            className="flex-1 overflow-y-auto overscroll-contain p-4 md:p-6 touch-pan-y"
            onTouchMove={(e) => e.stopPropagation()}
            onWheel={(e) => e.stopPropagation()}
          >
            <div className="space-y-6">

              {/* Problem & Solution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/3 border-l-2 border-white/10 pl-4 py-3">
                  <div className="flex items-center gap-2 mb-3">
                    <FaExclamationTriangle className={`${project.color} text-sm`} />
                    <h3 className="font-mono text-xs text-white uppercase tracking-widest font-semibold">
                      PROBLEM
                    </h3>
                  </div>
                  <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                    {project.businessCase.problem}
                  </p>
                </div>

                <div className="bg-white/3 border-l-2 border-white/10 pl-4 py-3">
                  <div className="flex items-center gap-2 mb-3">
                    <FaLightbulb className={`${project.color} text-sm`} />
                    <h3 className="font-mono text-xs text-white uppercase tracking-widest font-semibold">
                      SOLUTION
                    </h3>
                  </div>
                  <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                    {project.businessCase.solution}
                  </p>
                </div>
              </div>

              {/* Impact */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <FaRocket className={`${project.color} text-sm`} />
                  <h3 className="font-mono text-xs text-white uppercase tracking-widest font-semibold">
                    BUSINESS IMPACT
                  </h3>
                </div>
                <p className="text-sm md:text-base text-gray-300 leading-relaxed mb-6">
                  {project.businessCase.impact}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {project.businessCase.metrics.map((metric, idx) => (
                    <div key={idx} className={`bg-white/5 border ${project.border} rounded-lg p-5`}>
                      <div className={`text-2xl md:text-3xl font-black ${project.color} mb-2`}>
                        {metric.value}
                      </div>
                      <div className="font-mono text-[10px] text-white/70 uppercase tracking-widest">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Challenges & Tech */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/3 rounded-lg p-5">
                  <h3 className="font-mono text-xs text-white uppercase tracking-widest mb-4 font-semibold">
                    KEY CHALLENGES
                  </h3>
                  <ul className="space-y-3">
                    {project.businessCase.challenges.map((challenge, idx) => (
                      <li key={idx} className="text-sm md:text-base text-gray-300 flex items-start gap-3">
                        <span className={`${project.color} mt-1.5 text-xs`}>▸</span>
                        <span className="flex-1 leading-relaxed">{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white/3 rounded-lg p-5">
                  <h3 className="font-mono text-xs text-white uppercase tracking-widest mb-4 font-semibold">
                    TECH HIGHLIGHTS
                  </h3>
                  <ul className="space-y-3">
                    {project.businessCase.techHighlights.map((highlight, idx) => (
                      <li key={idx} className="text-sm md:text-base text-gray-300 flex items-start gap-3">
                        <span className={`${project.color} mt-1.5 text-xs`}>▸</span>
                        <span className="flex-1 leading-relaxed">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
          </div>

          {/* Footer - FIJO */}
          <div className="border-t border-white/10 p-4 bg-[#080808] flex items-center justify-between flex-shrink-0">
            <div className="font-mono text-[10px] text-white/40 uppercase tracking-widest truncate">
              {project.tech}
            </div>
            <button
              onClick={onClose}
              className={`px-4 py-2 ${project.bg} hover:opacity-90 text-black font-bold uppercase text-[10px] tracking-widest transition-opacity rounded flex-shrink-0`}
            >
              Close
            </button>
          </div>

        </motion.div>
      </div>
    </>
  );
}