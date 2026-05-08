import { motion } from "motion/react";
import { SectionLabel } from "./section-label";
import { ArrowUpRight, MapPin, Search, Shield, Cloud, Database, Zap, Github } from "lucide-react";

export function Projects() {
  return (
    <section id="work" className="relative py-32 md:py-44">
      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionLabel index="// 03 — selected work" title="Engineered, not assembled." subtitle="Case studies in shipping resilient software. Backend depth on the inside, considered interfaces on the outside." />

        {/* FLAGSHIP: FindHere */}
        <div className="relative glass rounded-3xl overflow-hidden">
          <div className="absolute inset-0 dot-bg opacity-30 mask-fade-y" />
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full blur-[140px] bg-[#c6ff3d]/12" />
          <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full blur-[140px] bg-[#3d8bff]/10" />

          <div className="relative grid grid-cols-12 gap-0">
            {/* Left: meta */}
            <div className="col-span-12 lg:col-span-5 p-8 md:p-12">
              <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-[#c6ff3d]">
                <span className="w-2 h-2 rounded-full bg-[#c6ff3d] animate-pulse" />
                Flagship · 2025 · Production
              </div>
              <h3 className="font-display text-5xl md:text-7xl leading-[0.92] mt-5">FindHere</h3>
              <p className="mt-5 text-white/65 leading-relaxed text-[15px]">
                A modern location discovery platform engineered for high-performance search and seamless navigation.
                Sub-50ms typo-tolerant queries via Meilisearch, JWT-secured access, Cloudinary media pipeline, and a
                Leaflet-driven map UI tuned for thousands of markers without jank.
              </p>

              {/* Architecture mini-flow */}
              <div className="mt-8 p-4 border border-white/10 rounded-xl bg-black/20">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/45 mb-3">/ system flow</div>
                <div className="flex items-center justify-between gap-2 text-[10px] font-mono">
                  {["Client","API","Auth","Index","Mongo"].map((s, i) => (
                    <div key={s} className="flex items-center gap-2">
                      <div className="px-2 py-1.5 rounded-md border border-white/15 bg-white/5">{s}</div>
                      {i < 4 && <div className="w-3 h-px bg-[#c6ff3d]/60" />}
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-6">
                {[
                  { i: <Search className="w-3.5 h-3.5" />, k: "p99 search", v: "47ms" },
                  { i: <Shield className="w-3.5 h-3.5" />, k: "auth", v: "JWT + refresh" },
                  { i: <Cloud className="w-3.5 h-3.5" />, k: "media", v: "Cloudinary CDN" },
                  { i: <Database className="w-3.5 h-3.5" />, k: "primary", v: "MongoDB" },
                ].map((m) => (
                  <div key={m.k} className="border border-white/8 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-white/45">
                      <span className="text-[#c6ff3d]">{m.i}</span>{m.k}
                    </div>
                    <div className="font-mono text-sm mt-1">{m.v}</div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {["Node.js","Express","MongoDB","Meilisearch","Cloudinary","JWT","React","Tailwind","Framer Motion","React Query","Leaflet","Maps API"].map(t => (
                  <span key={t} className="font-mono text-[10.5px] uppercase tracking-wider px-2.5 py-1 rounded-full border border-white/10 text-white/65">{t}</span>
                ))}
              </div>

              <div className="mt-8 flex items-center gap-3">
                <a href="#" className="inline-flex items-center gap-2 bg-[#c6ff3d] text-black px-4 py-2.5 rounded-full font-mono text-[11px] uppercase tracking-wider">
                  Live demo <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <a href="#" className="inline-flex items-center gap-2 border border-white/15 px-4 py-2.5 rounded-full font-mono text-[11px] uppercase tracking-wider hover:border-white/30">
                  <Github className="w-3.5 h-3.5" /> Source
                </a>
              </div>
            </div>

            {/* Right: cinematic mock */}
            <div className="col-span-12 lg:col-span-7 relative min-h-[520px] p-8 md:p-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9 }}
                className="relative w-full h-full"
              >
                {/* Map mock */}
                <div className="absolute inset-0 rounded-2xl border border-white/10 overflow-hidden bg-[#0c0e12]">
                  {/* topo lines */}
                  <svg className="absolute inset-0 w-full h-full opacity-40" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <path key={i} d={`M0 ${100 + i * 40} Q 200 ${60 + i * 40 + (i % 2 ? 30 : -10)} 400 ${100 + i * 40} T 800 ${100 + i * 40}`} fill="none" stroke="#c6ff3d" strokeWidth="0.6" opacity={0.3 + (i % 3) * 0.1} />
                    ))}
                    {Array.from({ length: 8 }).map((_, i) => (
                      <path key={"v"+i} d={`M${100 + i * 90} 0 Q ${130 + i * 90} 300 ${100 + i * 90} 600`} fill="none" stroke="#3d8bff" strokeWidth="0.4" opacity="0.25" />
                    ))}
                  </svg>

                  {/* grid */}
                  <div className="absolute inset-0 grid-bg opacity-30" />

                  {/* Pins */}
                  {[
                    { x: 28, y: 38, label: "Café Aurora", active: true },
                    { x: 62, y: 28, label: "Atlas Studio" },
                    { x: 75, y: 60, label: "Northgate" },
                    { x: 40, y: 70, label: "Foundry 21" },
                    { x: 18, y: 64, label: "The Vault" },
                  ].map((p) => (
                    <div key={p.label} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${p.x}%`, top: `${p.y}%` }}>
                      <div className={`relative w-3 h-3 ${p.active ? "" : ""}`}>
                        {p.active && <div className="absolute inset-0 rounded-full bg-[#c6ff3d]/40 pulse-ring" />}
                        <div className={`absolute inset-0 rounded-full ${p.active ? "bg-[#c6ff3d]" : "bg-white/70"}`} />
                      </div>
                      {p.active && (
                        <div className="absolute left-5 top-1 whitespace-nowrap glass rounded-lg px-2.5 py-1.5 text-[11px] font-mono">
                          <div className="flex items-center gap-1.5"><MapPin className="w-3 h-3 text-[#c6ff3d]" /> {p.label}</div>
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Search bar overlay */}
                  <div className="absolute top-5 left-5 right-5">
                    <div className="glass rounded-full flex items-center gap-3 px-4 py-2.5">
                      <Search className="w-4 h-4 text-[#c6ff3d]" />
                      <span className="font-mono text-[12.5px] text-white/80">cofee near rawalpndi<span className="blink text-[#c6ff3d]">▌</span></span>
                      <span className="ml-auto font-mono text-[10px] uppercase tracking-wider text-white/45">47ms</span>
                    </div>
                    <div className="mt-2 glass rounded-2xl divide-y divide-white/5 overflow-hidden">
                      {[
                        { n: "Café Aurora", d: "1.2 km · ★ 4.8", hi: "Cafe" },
                        { n: "Coffee Lab", d: "2.4 km · ★ 4.6" },
                        { n: "Foundry 21", d: "3.0 km · ★ 4.5" },
                      ].map((r, i) => (
                        <div key={r.n} className={`flex items-center gap-3 px-3.5 py-2.5 ${i === 0 ? "bg-[#c6ff3d]/8" : ""}`}>
                          <div className="w-7 h-7 rounded-md bg-white/5 flex items-center justify-center"><MapPin className="w-3.5 h-3.5 text-[#c6ff3d]" /></div>
                          <div className="flex-1">
                            <div className="text-[13px]">{r.n}</div>
                            <div className="font-mono text-[10.5px] text-white/45">{r.d}</div>
                          </div>
                          {i === 0 && <Zap className="w-3.5 h-3.5 text-[#c6ff3d]" />}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* bottom telemetry */}
                  <div className="absolute bottom-5 left-5 right-5 flex gap-3">
                    <div className="glass rounded-lg px-3 py-2 font-mono text-[10px] uppercase tracking-wider">
                      <span className="text-white/45">qps</span> <span className="text-[#c6ff3d]">2,140</span>
                    </div>
                    <div className="glass rounded-lg px-3 py-2 font-mono text-[10px] uppercase tracking-wider">
                      <span className="text-white/45">index</span> <span className="text-[#c6ff3d]">142k docs</span>
                    </div>
                    <div className="glass rounded-lg px-3 py-2 font-mono text-[10px] uppercase tracking-wider ml-auto">
                      <span className="text-white/45">region</span> <span className="text-[#c6ff3d]">eu-west-1</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* SECONDARY PROJECTS */}
        <div className="grid grid-cols-12 gap-6 mt-10">
          {[
            {
              tag: "Productivity · Fullstack",
              year: "2024",
              title: "Contact Management System",
              desc: "Self-hosted CRM with role-based auth, audit logs, and a normalized PostgreSQL schema designed to scale to millions of contacts.",
              stack: ["Node","Express","PostgreSQL","React","JWT"],
              accent: "#3d8bff",
            },
            {
              tag: "Systems · C/C++",
              year: "2023",
              title: "Multiplayer Networked Games",
              desc: "Low-level multiplayer games written in C/C++ with custom socket servers, game-state synchronization, and lock-step simulation.",
              stack: ["C","C++","Sockets","UDP","ncurses"],
              accent: "#ff6b3d",
            },
            {
              tag: "OSS · Desktop",
              year: "2024",
              title: "KDE Upstream Contributions",
              desc: "Patches, refactors, and feature work merged into KDE projects. Real-world C++ / Qt workflow under public review.",
              stack: ["C++","Qt","KDE Frameworks","CMake"],
              accent: "#c6ff3d",
            },
          ].map((p, i) => (
            <motion.a
              href="#" key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              className="col-span-12 md:col-span-4 group relative glass rounded-2xl p-6 hover:border-[#c6ff3d]/30 transition-all overflow-hidden"
            >
              <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity" style={{ background: p.accent }} />
              <div className="relative">
                <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">
                  <span>{p.tag}</span><span>{p.year}</span>
                </div>
                <h4 className="font-display text-2xl mt-4 leading-tight">{p.title}</h4>
                <p className="mt-3 text-[13px] text-white/55 leading-relaxed">{p.desc}</p>
                <div className="flex flex-wrap gap-1.5 mt-5">
                  {p.stack.map((s) => (
                    <span key={s} className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border border-white/10 text-white/55">{s}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/8">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-white/55 group-hover:text-[#c6ff3d] transition-colors">view case study</span>
                  <ArrowUpRight className="w-4 h-4 text-white/55 group-hover:text-[#c6ff3d] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* "more on github" placeholder card */}
        <div className="mt-6 glass rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">/ archive</div>
            <h4 className="font-display text-xl mt-1">More experiments and OSS work live on GitHub.</h4>
          </div>
          <a href="#" className="inline-flex items-center gap-2 border border-white/15 hover:border-[#c6ff3d]/50 hover:text-[#c6ff3d] px-4 py-2.5 rounded-full font-mono text-[11px] uppercase tracking-wider transition-colors">
            <Github className="w-3.5 h-3.5" /> Browse repositories <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
