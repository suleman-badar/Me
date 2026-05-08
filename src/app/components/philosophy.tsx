import { motion } from "motion/react";
import { SectionLabel } from "./section-label";

const TENETS = [
  { n: "01", t: "Build for the second order.", d: "The first version is easy. The system that survives growth, churn, and outages is the work." },
  { n: "02", t: "Backend before flourish.", d: "Interfaces matter but they sit on top of correctness, latency, and durability. Earn the surface." },
  { n: "03", t: "Open source as gym.", d: "Public review and merge friction sharpen judgment in ways closed codebases never can." },
  { n: "04", t: "Treat AI as a primitive.", d: "LLMs aren't magic. They're a new kind of system component, design for their failure modes, not their best days." },
  { n: "05", t: "Ship, observe, iterate.", d: "Latency graphs and error budgets are honest critics. Listen to telemetry, not vibes." },
  { n: "06", t: "Optimize for clarity.", d: "Code is read more than it's written. Naming, structure, and boundaries are senior level decisions." },
];

export function Philosophy() {
  return (
    <section id="philosophy" className="relative py-32 md:py-44">
      <div className="absolute inset-0 dot-bg opacity-30 mask-fade-y" />
      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionLabel index="// 05 — philosophy" title="How I think about &ensp;&ensp;&ensp; software." subtitle="Six tenets that shape every decisions from schema design to API contracts to which features to say no to." />

        <div className="grid grid-cols-12 gap-4 md:gap-6">
          {TENETS.map((t, i) => (
            <motion.div
              key={t.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="col-span-12 md:col-span-6 lg:col-span-4 group relative p-7 border border-white/8 hover:border-[#c6ff3d]/30 rounded-2xl bg-gradient-to-b from-white/[0.02] to-transparent transition-colors"
            >
              <div className="flex items-start gap-5">
                <div className="font-display text-5xl text-stroke shrink-0">{t.n}</div>
                <div>
                  <h3 className="font-display text-xl leading-tight">{t.t}</h3>
                  <p className="mt-3 text-[13.5px] text-white/55 leading-relaxed">{t.d}</p>
                </div>
              </div>
              <div className="absolute bottom-0 left-7 right-7 h-px bg-gradient-to-r from-transparent via-[#c6ff3d]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>

        {/* Quote */}
        <div className="mt-16 md:mt-24 grid grid-cols-12 gap-6 items-center">
          <div className="col-span-12 lg:col-span-2 flex justify-center">
            <div className="w-16 h-16 rounded-full border border-[#c6ff3d]/30 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-[#c6ff3d]/15" />
            </div>
          </div>
          <div className="col-span-12 lg:col-span-10">
            <p className="font-display text-3xl md:text-5xl leading-[1.1] max-w-4xl">
              "Engineering is the discipline of being honest with yourself about what you don't know, and shipping anyway, instrumented."
            </p>
            <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.25em] text-white/45">— working notes / 2026</p>
          </div>
        </div>
      </div>
    </section>
  );
}
