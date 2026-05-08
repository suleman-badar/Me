import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SectionLabel } from "./section-label";
import { ArrowUpRight, MapPin, Search, Shield, Cloud, Database, Zap, Github, ExternalLink } from "lucide-react";

const SECONDARY_PROJECTS = [
  {
    tag: "Productivity · Fullstack",
    category: "Fullstack",
    year: "2024",
    title: "Contact Management System",
    desc: "Self-hosted CRM with role-based auth, audit logs, and a normalised PostgreSQL schema designed to scale to millions of contacts.",
    github: "https://github.com/suleman-badar/Contact-App",
    demo: "https://contact-app-pglo.onrender.com/",   
    stack: ["Node", "Express", "PostgreSQL", "React", "JWT"],
    accent: "#3d8bff",
  },
  {
    tag: "Systems · C/C++",
    category: "Systems",
    year: "2023",
    title: "Multiplayer Networked Games",
    desc: "Low-level multiplayer games written in C/C++ with custom socket servers, game-state synchronisation, and lock-step simulation.",
    github: "https://github.com/suleman-badar?tab=repositories",
    demo: null,
    stack: ["C", "C++", "Sockets", "UDP", "ncurses"],
    accent: "#ff6b3d",
  },
  {
    tag: "OSS · Desktop",
    category: "OSS",
    year: "2024",
    title: "KDE Upstream Contributions",
    desc: "Patches, refactors, and feature work merged into KDE projects. Real-world C++ / Qt workflow under public review.",
    github: "https://invent.kde.org/sulemanbadar",
    demo: null,
    stack: ["C++", "Qt", "KDE Frameworks", "CMake"],
    accent: "#c6ff3d",
  },
  {
    tag: "Frontend · React",
    category: "Side Projects",
    year: "2024",
    title: "Weather App",
    desc: "React-powered weather dashboard that fetches real-time conditions, temperature, and multi-day forecasts for any city via a live weather API.",
    github: "https://github.com/suleman-badar/Weather-App",
    demo: null,
    stack: ["React", "Vite", "JavaScript", "CSS", "Weather API"],
    accent: "#38bdf8",
  },
  {
    tag: "Frontend · Vanilla",
    category: "Side Projects",
    year: "2024",
    title: "Currency Converter",
    desc: "Responsive vanilla JS currency converter with live exchange rates across 150+ currencies. No frameworks — just clean DOM manipulation and a public rates API.",
    github: "https://github.com/suleman-badar/Currency-Converter--",
    demo: null,
    stack: ["HTML", "CSS", "JavaScript", "Exchange Rate API"],
    accent: "#f59e0b",
  },
  {
    tag: "UI Clone · CSS",
    category: "Side Projects",
    year: "2024",
    title: "Spotify UI Clone",
    desc: "Pixel-faithful Spotify interface recreation in pure HTML and CSS — no JavaScript, no frameworks. A study in layout, flexbox, and responsive design discipline.",
    github: "https://github.com/suleman-badar/spotify-clone",
    demo: null,
    stack: ["HTML", "CSS", "Flexbox", "Responsive"],
    accent: "#1db954",
  },
  {
    tag: "Game · Vanilla",
    category: "Side Projects",
    year: "2024",
    title: "Tic Tac Toe",
    desc: "Classic two-player browser game with win detection, draw handling, and board reset — built in vanilla JS with zero dependencies.",
    github: "https://github.com/suleman-badar/tic-tac-toe-WEB",
    demo: null,
    stack: ["HTML", "CSS", "JavaScript"],
    accent: "#a78bfa",
  },

  // ── PASTE YOUR ADDITIONAL PROJECTS BELOW THIS LINE ──────────────────────
  
];

// Add or remove category names to match the `category` fields above.
// "All" is always injected automatically, do not list it here.
const CATEGORIES = ["Fullstack", "Systems", "Side projects", "OSS"];

// Cards shown before the "Show more" button appears.
const INITIAL_SHOWN = 6;


export function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [showAll, setShowAll] = useState(false);

  const allTabs = ["All", ...CATEGORIES];

  const filtered =
    activeCategory === "All"
      ? SECONDARY_PROJECTS
      : SECONDARY_PROJECTS.filter((p) => p.category === activeCategory);

  const visible = showAll ? filtered : filtered.slice(0, INITIAL_SHOWN);
  const hiddenCount = filtered.length - INITIAL_SHOWN;

  return (
    <section id="work" className="relative py-32 md:py-44">
      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionLabel
          index="// 03 — selected work"
          title="Engineered, &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp; not assembled."
          subtitle="Case studies in shipping resilient software. Backend depth on the inside, considered interfaces on the outside."
        />

        {/*  FLAGSHIP: FindHere  */}
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
                A modern location discovery platform engineered for high performance search and seamless navigation.
                Sub-50ms typo tolerant queries via Meilisearch, JWT secured access, Cloudinary media pipeline, and a
                Leaflet driven map UI tuned for thousands of markers without jank.
              </p>

              {/* Architecture mini-flow */}
              <div className="mt-8 p-4 border border-white/10 rounded-xl bg-black/20">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/45 mb-3">/ system flow</div>
                <div className="flex items-center justify-between gap-2 text-[10px] font-mono">
                  {["Client", "API", "Auth", "Index", "Mongo"].map((s, i) => (
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
                {["Node.js", "Express", "MongoDB", "Meilisearch", "Cloudinary", "JWT", "React", "Tailwind", "Framer Motion", "React Query", "Leaflet", "Maps API"].map((t) => (
                  <span key={t} className="font-mono text-[10.5px] uppercase tracking-wider px-2.5 py-1 rounded-full border border-white/10 text-white/65">{t}</span>
                ))}
              </div>

              <div className="mt-8 flex items-center gap-3">
                <a href="https://find-here.vercel.app/" className="inline-flex items-center gap-2 bg-[#c6ff3d] text-black px-4 py-2.5 rounded-full font-mono text-[11px] uppercase tracking-wider">
                  Live demo <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <a href="https://github.com/suleman-badar/FindHere" className="inline-flex items-center gap-2 border border-white/15 px-4 py-2.5 rounded-full font-mono text-[11px] uppercase tracking-wider hover:border-white/30">
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
                      <path key={"v" + i} d={`M${100 + i * 90} 0 Q ${130 + i * 90} 300 ${100 + i * 90} 600`} fill="none" stroke="#3d8bff" strokeWidth="0.4" opacity="0.25" />
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
                      <div className={`relative w-3 h-3`}>
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
                        { n: "Café Aurora", d: "1.2 km · ★ 4.8" },
                        { n: "Coffee Lab",  d: "2.4 km · ★ 4.6" },
                        { n: "Foundry 21",  d: "3.0 km · ★ 4.5" },
                      ].map((r, i) => (
                        <div key={r.n} className={`flex items-center gap-3 px-3.5 py-2.5 ${i === 0 ? "bg-[#c6ff3d]/8" : ""}`}>
                          <div className="w-7 h-7 rounded-md bg-white/5 flex items-center justify-center">
                            <MapPin className="w-3.5 h-3.5 text-[#c6ff3d]" />
                          </div>
                          <div className="flex-1">
                            <div className="text-[13px]">{r.n}</div>
                            <div className="font-mono text-[10.5px] text-white/45">{r.d}</div>
                          </div>
                          {i === 0 && <Zap className="w-3.5 h-3.5 text-[#c6ff3d]" />}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom telemetry */}
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
        <div className="mt-16">

          {/* Section divider + label */}
          <div className="flex items-center gap-4 mb-8">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/35">/ more work</span>
            <div className="flex-1 h-px bg-white/[0.07]" />
          </div>

          {/* Category filter tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {allTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveCategory(tab);
                  setShowAll(false);
                }}
                className={[
                  "font-mono text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-full border transition-all duration-200",
                  activeCategory === tab
                    ? "border-[#c6ff3d]/50 text-[#c6ff3d] bg-[#c6ff3d]/[0.06]"
                    : "border-white/10 text-white/35 hover:text-white/60 hover:border-white/20",
                ].join(" ")}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Project cards grid */}
          <div className="grid grid-cols-12 gap-6">
            <AnimatePresence mode="popLayout">
              {visible.map((p, i) => (
                <motion.div
                  key={p.title}
                  layout
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.055 }}
                  className="col-span-12 md:col-span-4 group relative glass rounded-2xl p-6 border border-white/[0.07] hover:border-[#c6ff3d]/20 transition-all duration-300 overflow-hidden flex flex-col"
                >
                  {/* Accent glow blob */}
                  <div
                    className="absolute -top-20 -right-20 w-48 h-48 rounded-full blur-3xl opacity-[0.14] group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
                    style={{ background: p.accent }}
                  />

                  <div className="relative flex flex-col flex-1">

                    {/* Header row */}
                    <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                      <span>{p.tag}</span>
                      <div className="flex items-center gap-2.5">
                        {/* Pulsing live dot — only when a demo URL exists */}
                        {p.demo && (
                          <span className="flex items-center gap-1 text-[#c6ff3d]/70">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#c6ff3d] animate-pulse" />
                            live
                          </span>
                        )}
                        <span>{p.year}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h4 className="font-display text-[1.35rem] mt-4 leading-tight text-white/90">
                      {p.title}
                    </h4>

                    {/* Description */}
                    <p className="mt-3 text-[13px] text-white/50 leading-relaxed flex-1">
                      {p.desc}
                    </p>

                    {/* Stack pills */}
                    <div className="flex flex-wrap gap-1.5 mt-5">
                      {p.stack.map((s) => (
                        <span
                          key={s}
                          className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border border-white/10 text-white/45"
                        >
                          {s}
                        </span>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/[0.07]">
                      {p.demo ? (
                        // Has demo → two explicit links
                        <>
                          <a
                            href={p.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-white/35 hover:text-white/65 transition-colors"
                          >
                            <Github className="w-3 h-3" />
                            Source
                          </a>
                          <a
                            href={p.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-full border border-[#c6ff3d]/35 bg-[#c6ff3d]/[0.07] text-[#c6ff3d] hover:bg-[#c6ff3d]/15 hover:border-[#c6ff3d]/55 transition-all duration-200"
                          >
                            Live demo
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </>
                      ) : (
                        // No demo → single GitHub CTA with group hover
                        <>
                          <span className="font-mono text-[11px] uppercase tracking-wider text-white/40 group-hover:text-[#c6ff3d] transition-colors duration-200">
                            view on github
                          </span>
                          <a
                            href={p.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white/40 group-hover:text-[#c6ff3d] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
                          >
                            <ArrowUpRight className="w-4 h-4" />
                          </a>
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Show more / show less */}
          {(hiddenCount > 0 || showAll) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-center mt-10"
            >
              <button
                onClick={() => setShowAll((prev) => !prev)}
                className="font-mono text-[11px] uppercase tracking-[0.2em] px-6 py-2.5 rounded-full border border-white/12 text-white/40 hover:border-[#c6ff3d]/35 hover:text-[#c6ff3d] transition-all duration-200"
              >
                {showAll
                  ? "Show less"
                  : `+${hiddenCount} more project${hiddenCount !== 1 ? "s" : ""}`}
              </button>
            </motion.div>
          )}
        </div>

        {/* Archive footer card */}
        <div className="mt-8 glass rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center gap-4">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">
              / archive
            </div>
            <h4 className="font-display text-xl mt-1">
              More experiments and OSS work live on GitLab.
            </h4>
          </div>
          <div className="flex items-center gap-3 md:ml-auto">
            <a
              href="https://github.com/suleman-badar"
              className="inline-flex items-center gap-2 border border-white/15 hover:border-[#c6ff3d]/50 hover:text-[#c6ff3d] px-4 py-2.5 rounded-full font-mono text-[11px] uppercase tracking-wider transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              Browse Github
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://invent.kde.org/sulemanbadar"
              className="inline-flex items-center gap-2 border border-white/15 hover:border-[#c6ff3d]/50 hover:text-[#c6ff3d] px-4 py-2.5 rounded-full font-mono text-[11px] uppercase tracking-wider transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              Browse Gitlab
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}