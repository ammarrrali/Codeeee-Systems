"use client";

import { useEffect } from "react";
import { motion, Variants } from "framer-motion";
import FxBackground from "../components/FxBackground";
import BinaryDecodeText from "../components/BinaryDecodeText";
import Services from "../components/Services";
import ScrollCue from "../components/ScrollCue";
import MagneticButton from "../components/MagneticButton";
import Trust from "../components/Trust";
import Contact from "../components/Contact";
import Chatbot from "../components/Chatbot";
import ConsultationFunnel from "../components/ConsultationFunnel";
import SystemStatus from "../components/SystemStatus";
import CapabilitiesReel from "../components/CapabilitiesReel";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const stagger: Variants = {
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

export default function Home() {
  const goToServices = () => {
    const el = document.getElementById("services");
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const goToContact = () => {
    document.getElementById("contact")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  }, []);

  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden w-full">
      {/* HERO SECTION */}
      <section className="relative min-h-screen px-4 sm:px-6 overflow-hidden flex flex-col justify-center">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <FxBackground />
        </div>

        <ScrollCue />

        <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl items-center py-20 md:py-0">
          <div className="grid w-full gap-12 md:grid-cols-2 md:items-center">
            
            {/* LEFT SIDE: Text Content */}
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="show"
              className="text-center md:text-left z-20"
            >
              <motion.p
                variants={fadeUp}
                className="mb-4 font-mono text-xs sm:text-sm text-cyan-300 tracking-[0.2em] uppercase"
              >
                &gt; Codeeee_Intelligence_Systems
              </motion.p>

              <motion.h1
                variants={fadeUp}
                className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.1] drop-shadow-[0_2px_18px_rgba(0,0,0,0.85)]"
              >
                Next-gen <span className="text-cyan-300">Web Apps</span> <br className="hidden sm:block" />
                engineered by <span className="text-cyan-300">Codeeee</span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-6 text-base sm:text-lg text-white/80 max-w-lg mx-auto md:mx-0 drop-shadow-[0_2px_18px_rgba(0,0,0,0.85)]"
              >
                Codeeee specializes in building high-performance web applications and 
                AI-driven workflow automations. We leverage Python, Java, and Next.js 
                to scale your digital infrastructure and SEO dominance.
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                variants={fadeUp}
                className="mt-8 flex flex-col sm:flex-row gap-4 md:justify-start justify-center items-center"
              >
                <MagneticButton
                  onClick={goToContact}
                  strength={10}
                  className="w-full sm:w-auto rounded-xl bg-cyan-400 px-6 py-3 text-black font-mono hover:bg-cyan-300 shadow-[0_0_30px_rgba(34,211,238,0.25)]"
                >
                  {" > "}
                  <BinaryDecodeText
                    text="start_automation"
                    delayMs={320}
                    durationMs={750}
                    binaryOnly={true}
                  />
                </MagneticButton>

                <MagneticButton
                  onClick={goToServices}
                  strength={10}
                  className="w-full sm:w-auto rounded-xl border border-cyan-300 px-6 py-3 font-mono text-cyan-200 hover:bg-cyan-500/10"
                >
                  {" > "}
                  <BinaryDecodeText
                    text="view_stack"
                    delayMs={450}
                    durationMs={750}
                    binaryOnly={true}
                  />
                </MagneticButton>
              </motion.div>

              {/* Tech Stack Chips */}
              <motion.div
                variants={fadeUp}
                className="mt-10 flex flex-wrap gap-2 md:justify-start justify-center text-[10px] sm:text-xs text-white/70"
              >
                {["Next.js", "AI Automations", "Python", "Node.js", "Java", "Advanced SEO"].map(
                  (t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 bg-black/40 px-3 py-1 font-mono backdrop-blur"
                    >
                      {t}
                    </span>
                  )
                )}
              </motion.div>
            </motion.div>

            {/* RIGHT SIDE: Code Window */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="relative w-full max-w-full"
            >
              <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur overflow-hidden shadow-[0_0_80px_rgba(34,211,238,0.12)]">
                <div className="flex items-center gap-2 border-b border-white/10 bg-black/50 px-4 py-3">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
                  <span className="ml-3 font-mono text-[10px] text-white/50 truncate">
                    /systems/Codeeee.ts
                  </span>
                </div>

                <pre className="p-5 text-[11px] sm:text-[12px] leading-relaxed text-white/85 font-mono whitespace-pre-wrap break-words">
{`export const Codeeee = {
  stack: ["Next.js", "Python", "Node.js", "Java"],
  core: "AI-Driven Workflow Automations",
  output: "Next-Gen Web Applications",
  seo: "Optimized Architecture",
  status: "Ready_To_Deploy"
}

> Codeeee.run_automation()
✓ AI integration active
✓ Workflows synced
✓ SEO dominance verified
✓ Systems optimized`}
                </pre>
              </div>

              {/* Glowing Background - Mobile Optimized */}
              <div className="absolute -inset-4 -z-10 blur-3xl opacity-30 bg-[radial-gradient(circle_at_40%_40%,rgba(34,211,238,0.35),transparent_60%)] pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </section>

      <CapabilitiesReel />

      {/* ADDITIONAL SECTIONS */}
      <div className="relative z-10">
        <Services />
        <Trust />
        <SystemStatus />
        <ConsultationFunnel />
        <Contact />
      </div>

      <Chatbot />
    </main>
  );
}