// components/Contact.tsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import GlowCard from "./GlowCard";

import { Variants } from "framer-motion";

const fade: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1], // easeOut cubic-bezier
    },
  },
};
export default function Contact() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");

  // Auto-fill from chatbot handoff (if present)
  useEffect(() => {
  const applyBrief = () => {
    const brief = localStorage.getItem("codeeee_brief");
    if (brief) {
      setMessage(brief);
      localStorage.removeItem("codeeee_brief");
    }
  };

  // apply once on first mount (if exists)
  applyBrief();

  // apply whenever chatbot handoff triggers
  window.addEventListener("codeeee:brief", applyBrief);

  return () => {
    window.removeEventListener("codeeee:brief", applyBrief);
  };
}, []);

  const onSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  // your company WhatsApp number (no +, no spaces)
  const COMPANY_WA = "923361287518";

  const body =
    `*CODEEEE Consultation Request*` +
    `\n\n*Name:* ${name}` +
    `\n*Client Contact:* ${contact}` +
    `\n\n*Brief:* \n${message}`;

  // 1) Send email automatically (server-side)
  try {
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        contact,
        message,
        pageUrl: window.location.href,
      }),
    });

    const data = await res.json();
    if (!data.ok) {
      alert(data.error || "Failed to send email");
      return;
    }
  } catch (err: any) {
    alert(err?.message || "Failed to send email");
    return;
  }

  // 2) Open WhatsApp (client-side)
  const waUrl = `https://wa.me/${COMPANY_WA}?text=${encodeURIComponent(body)}`;
  window.open(waUrl, "_blank", "noopener,noreferrer");

  // Optional: clear after success
  // setName("");
  // setContact("");
  // setMessage("");
};

  return (
    <section id="contact" className="relative px-6 py-24 bg-black text-white">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

      <motion.div
        variants={fade}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto max-w-6xl"
      >
        <p className="font-mono text-sm text-cyan-300/90">&gt; contact.init()</p>

        <h2 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight">
          Get a free consultation
        </h2>

        <p className="mt-3 max-w-2xl text-white/75">
          Tell us what you need. We’ll suggest the best approach, timeline, and a clear quote.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {/* Quick Contact */}
          <GlowCard className="h-full">
            <div className="font-mono text-sm text-cyan-200">{">"} quick_contact</div>

            <div className="mt-4 flex flex-col gap-3">
              {/* WhatsApp (replace number) */}
              <a
                href="https://wa.me/447399170468?text=Hi%20CODEEEE%2C%20I%20want%20a%20website%2Fsoftware%20quote."
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 font-mono text-sm text-white/85 transition hover:border-cyan-400/40 hover:bg-white/10"
              >
                &gt; WhatsApp_us <span className="text-white/50">(fastest)</span>
              </a>

              {/* Email (replace) */}
              <a
                href="mailto:codeeee.systems@gmail.com?subject=Free%20Consultation%20Request"
                className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 font-mono text-sm text-white/85 transition hover:border-cyan-400/40 hover:bg-white/10"
              >
                &gt; email_us <span className="text-white/50">(formal)</span>
              </a>
            </div>

            <p className="mt-4 text-xs text-white/55 font-mono">
              Response: same day • Karachi time
            </p>

            <div className="mt-4 rounded-xl border border-white/10 bg-black/40 p-3 font-mono text-[11px] text-white/65">
              <div className="text-cyan-200/90">{">"} tip</div>
              <div className="mt-1">
                If you used the AI chat, click{" "}
                <span className="text-cyan-200">handoff_brief</span> to auto-fill the form.
              </div>
            </div>
          </GlowCard>

          {/* Brief Form */}
          <GlowCard className="h-full">
            <div className="font-mono text-sm text-cyan-200">{">"} quick_brief</div>

            <form onSubmit={onSubmit} className="mt-4 grid gap-3">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400/50"
                placeholder="Your name"
                required
              />

              <input
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400/50"
                placeholder="WhatsApp / Email"
                required
              />

              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-[130px] w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400/50"
                placeholder="What do you need? (website, portal, booking, automation...)"
                required
              />

              <button
                type="submit"
                className="rounded-xl bg-cyan-400 px-5 py-3 font-mono text-sm text-black shadow-lg shadow-cyan-500/20 transition hover:brightness-110"
              >
                &gt; send_request
              </button>

              <p className="text-xs text-white/50 font-mono">
                (UI-only right now) We’ll wire this to WhatsApp/email next.
              </p>
            </form>
          </GlowCard>
        </div>
      </motion.div>
    </section>
  );
}