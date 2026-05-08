import { motion } from "motion/react";
import { SectionLabel } from "./section-label";
import { Boxes, GitMerge, Cpu, Sparkles } from "lucide-react";

const TIMELINE = [
  { y: "2021", t: "First production system", d: "Shipped a contact platform end-to-end. Learned the gap between code that runs and software that ships." },
  { y: "2022", t: "MERN deep-dive", d: "Built half a dozen fullstack applications. Internalized REST, JWT, MongoDB schema design, and Express middleware patterns." },
  { y: "2023", t: "Systems thinking", d: "Studied scalable architecture, indexing strategies, query planning. Started thinking in throughput, not features." },
  { y: "2024", t: "KDE / Open source", d: "Began contributing upstream. Merge requests reviewed by senior maintainers — the most rigorous code review possible." },
  { y: "2025", t: "FindHere — flagship", d: "Engineered a high-performance discovery platform with Meilisearch, Cloudinary, JWT, and a Leaflet/Maps frontend." },
  { y: "2026", t: "AI / LLM frontier", d: "Currently exploring agentic systems, retrieval architectures, and embedding-driven backends." },
];

export function About() {
  return (
    <section id="about" className="relative py-32 md:py-44">
      <div className="absolute inset-0 dot-bg opacity-30 mask-fade-y" />
      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionLabel index="// 01 — origin" title="Engineering as a long, deliberate compound." subtitle="Not a list of frameworks. A trajectory — five years of building, breaking, shipping, and contributing upstream." />

        <div className="grid grid-cols-12 gap-6">
          {/* Left rail: principle cards */}
          <div className="col-span-12 lg:col-span-4 space-y-4">
            {[
              { i: <Boxes className="w-4 h-4" />, t: "Systems first", d: "I optimize for the second-order effects: cache strategy, index design, blast radius." },
              { i: <GitMerge className="w-4 h-4" />, t: "Open source", d: "KDE upstream contributions. Real review. Real merge friction. Real growth." },
              { i: <Cpu className="w-4 h-4" />, t: "Backend gravity", d: "Frontends are the surface. The system underneath is what holds the company up." },
              { i: <Sparkles className="w-4 h-4" />, t: "AI literate", d: "LLMs as primitives, not magic. Building intuition for the next platform shift." },
            ].map((p) => (
              <div key={p.t} className="glass rounded-2xl p-5 hover:border-[#c6ff3d]/30 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#c6ff3d]/12 text-[#c6ff3d] flex items-center justify-center">{p.i}</div>
                  <div className="font-display text-lg">{p.t}</div>
                </div>
                <p className="mt-3 text-white/55 text-[13.5px] leading-relaxed">{p.d}</p>
              </div>
            ))}
          </div>

          {/* Right: timeline */}
          <div className="col-span-12 lg:col-span-8">
            <div className="relative pl-8 md:pl-12 border-l border-white/10">
              {TIMELINE.map((e, i) => (
                <motion.div
                  key={e.y}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.05 }}
                  className="relative mb-10 last:mb-0"
                >
                  <div className="absolute -left-[34px] md:-left-[50px] top-2 w-3 h-3 rotate-45 bg-[#07080a] border border-[#c6ff3d]" />
                  <div className="absolute -left-[40px] md:-left-[56px] top-0.5 w-7 h-7 border border-[#c6ff3d]/20 rounded-full" />
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-[11px] tracking-[0.2em] text-[#c6ff3d]">{e.y}</span>
                    <h3 className="font-display text-2xl md:text-3xl">{e.t}</h3>
                  </div>
                  <p className="mt-2 text-white/55 max-w-2xl leading-relaxed">{e.d}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
