"use client";

import { useEffect } from "react";
import { motion, Variants } from "framer-motion";
import FxBackground from "../components/FxBackground";
import BinaryDecodeText from "../components/BinaryDecodeText";
import Services from "../components/Services";
import MagneticButton from "../components/MagneticButton";
import Trust from "../components/Trust";
import Contact from "../components/Contact";
import Chatbot from "../components/Chatbot";
import ConsultationFunnel from "../components/ConsultationFunnel";
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
    document.getElementById("services")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const goToContact = () => {
    document.getElementById("contact")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    if (window.location.hash) {
      window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search
      );
    }
  }, []);

  return (
    <main className="bg-black text-white">
      {/* HERO */}
      <section className="relative min-h-screen flex items-center px-4 sm:px-6 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <FxBackground />
        </div>

        {/* Hero content */}
        <div className="relative z-10 mx-auto w-full max-w-6xl">
          <div className="grid w-full gap-12 md:grid-cols-2 md:items-center">
            {/* LEFT SIDE */}
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="show"
              className="text-center md:text-left"
            >
              <motion.p
                variants={fadeUp}
                className="mb-4 font-mono text-sm text-cyan-300"
              >
                &gt; high_performance_digital_infrastructure
              </motion.p>

              <motion.h1
                variants={fadeUp}
                className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-[0_2px_18px_rgba(0,0,0,0.85)]"
              >
                Scalable <span className="text-cyan-300">Web Apps</span> <br />
                engineered for <span className="text-cyan-300">Growth</span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-6 text-lg text-white/80 drop-shadow-[0_2px_18px_rgba(0,0,0,0.85)]"
              >
                CODEEEE engineers premium, SEO-optimized websites and AI-driven 
                automation systems that turn small business operations into 
                high-velocity digital powerhouses.
              </motion.p>

              {/* Buttons */}
              <motion.div
                variants={fadeUp}
                className="mt-8 flex flex-col sm:flex-row gap-4 md:justify-start justify-center"
              >
                <MagneticButton
                  onClick={goToContact}
                  strength={18}
                  className="rounded-xl bg-cyan-400 px-6 py-3 text-black font-mono hover:bg-cyan-300 shadow-[0_0_30px_rgba(34,211,238,0.25)]"
                >
                  {" > "}
                  <BinaryDecodeText
                    text="launch_your_system"
                    delayMs={320}
                    durationMs={750}
                    binaryOnly
                  />
                </MagneticButton>

                <MagneticButton
                  onClick={goToServices}
                  strength={14}
                  className="rounded-xl border border-cyan-300 px-6 py-3 font-mono text-cyan-200 hover:bg-cyan-500/10"
                >
                  {" > "}
                  <BinaryDecodeText
                    text="explore_capabilities"
                    delayMs={450}
                    durationMs={750}
                    binaryOnly
                  />
                </MagneticButton>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="mt-8 flex flex-wrap gap-2 md:justify-start justify-center text-xs text-white/70"
              >
                {["Next.js", "Enterprise Java", "Python AI", "Rest APIs", "Workflow Automation", "SEO Dominance"].map(
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

            {/* RIGHT SIDE: CODE BOX */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.2,
              }}
              className="relative w-full max-w-full max-h-[calc(100vh-4rem)] overflow-auto"
            >
              <div className="w-full rounded-2xl border border-white/10 bg-black/40 backdrop-blur overflow-hidden shadow-[0_0_80px_rgba(34,211,238,0.12)]">
                <div className="flex items-center gap-2 border-b border-white/10 bg-black/50 px-4 py-3">
                  <div className="h-3 w-3 rounded-full bg-red-500/70" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/70" />
                  <div className="h-3 w-3 rounded-full bg-green-500/70" />
                  <span className="ml-3 font-mono text-xs text-white/70">
                    /production/deployment_ready.ts
                  </span>
                </div>

                <pre className="p-4 sm:p-5 text-[11px] sm:text-[12px] leading-6 text-white/85 font-mono">
{`export const solution = {
  architecture: "Cloud-Native + Secure",
  impact: "Automated Growth & Conversion",
  visibility: "Tier-1 SEO Optimization",
  techStack: ["React", "Java", "Python", "OpenAI"],
  speed: "Lightning Fast Core Web Vitals",
}

> execute business.scale_up()
✓ UI/UX: premium + conversion-focused
✓ SEO: metadata & index ready
✓ Automation: workflows active
✓ Performance: 100/100 Lighthouse`}
                </pre>
              </div>

              {/* Contained radial glow */}
              <div className="absolute inset-0 -z-10 blur-3xl opacity-30 bg-[radial-gradient(circle_at_40%_40%,rgba(34,211,238,0.35),transparent_60%)]" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CYLINDRICAL SERVICES REEL */}
      <CapabilitiesReel />

      {/* SERVICES */}
      <Services />

      {/* TRUST / PROCESS */}
      <Trust />

      <ConsultationFunnel />

      {/* CONTACT */}
      <Contact />

      {/* CHATBOT */}
      <Chatbot />
    </main>
  );
}