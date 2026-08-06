import { useState } from "react";
import { motion, AnimatePresence, Feature } from "motion/react";
import { SectionLabel } from "./section-label";
import { ArrowUpRight, Search, Shield, Cloud, Database, Zap, Github, ExternalLink, Users, Wifi } from "lucide-react";
import TubeChatVisual from "./tubechat-visual";
import FindHereVisual from "./findhere-visual";
import RangVisual from "./rang-visual";
import FeaturedProject from "./featuredProject";
import type { FeaturedProjectType } from "./featuredProject";

const FEATURED_PROJECTS: FeaturedProjectType[] = [
  {
    title: "FindHere",
    badge: "Flagship · 2025-2026 · Production",
    description:
      "A modern location discovery platform engineered for high performance search and seamless navigation.",
    demo: "https://find-here.vercel.app/",
    github: "https://github.com/suleman-badar/FindHere",

    systemFlow: [
      "Client",
      "API",
      "Auth",
      "Index",
      "Mongo",
    ],

    metrics: [
      { key: "p99 search", value: "47ms", icon: Search },
      { key: "auth", value: "JWT + refresh", icon: Shield },
      { key: "media", value: "Cloudinary CDN", icon: Cloud },
      { key: "primary", value: "MongoDB", icon: Database },
    ],


    technologies: [
      "Node.js",
      "Express",
      "MongoDB",
      "Meilisearch",
      "React",
      "Tailwind",
      "Leaflet",
    ],
    actions: ["demo", "source", "collaborate"],

    visual: FindHereVisual,
  },

  {
    title: "TubeChat",
    badge: "Featured · 2026",
    description:
      "RAG powered YouTube chatbot with persistent conversations and semantic search.",

    demo: "https://tube-chat-web.vercel.app/",
    github: "https://github.com/suleman-badar/TubeChat-Web",

    systemFlow: [
      "Client",
      "FastAPI",
      "RAG",
      "Gemini",
      "Neon",
    ],

    metrics: [
      { key: "Embedding", value: "Gemini", icon: Database },
      { key: "Latency", value: "<2s", icon: Zap },
      { key: "Framework", value: "LangChain", icon: Cloud },
      { key: "Database", value: "Postgres", icon: Database },
    ],

    technologies: [
      "FastAPI",
      "React",
      "LangChain",
      "Gemini",
      "Neon",
      "PostgreSQL",
      "Groq"
    ],
    actions: ["demo", "source", "collaborate"],

    visual: TubeChatVisual,
  },
  {
  title: "RANG",

  badge: "Featured · 2025",

  description:
    "A real-time multiplayer card game built around a server-authoritative architecture. Gameplay, validation, room management, synchronization, and scoring are fully orchestrated by the backend while Socket.IO keeps four players perfectly synchronized.",

  demo: "https://rangadvance.com/",
  github: "https://github.com/suleman-badar/RANG",

  metrics: [
    { key: "Players", value: "4 Real-time", icon: Users },
    { key: "Latency", value: "<100ms", icon: Zap },
    { key: "Transport", value: "Socket.IO", icon: Wifi },
    { key: "Authority", value: "Server", icon: Shield },
  ],

  technologies: [
    "React",
    "TypeScript",
    "Node.js",
    "Express",
    "Socket.IO",
    "Vite",
  ],

  systemFlow: [
    "Client",
    "Socket.IO",
    "Server",
    "Game Logic",
    "Broadcast",
  ],
  actions: ["demo", "private"],

  visual: RangVisual,
}
];


const SECONDARY_PROJECTS = [
  {
    tag: "Productivity · Fullstack",
    category: "Fullstack",
    year: "2025",
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
    year: "2025",
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
    year: "2025",
    title: "KDE Upstream Contributions",
    desc: "Patches, refactors, and feature work merged into KDE projects. Real world C++ / Qt workflow under public review.",
    github: "https://invent.kde.org/sulemanbadar",
    demo: null,
    stack: ["C++", "Qt", "KDE Frameworks", "CMake"],
    accent: "#c6ff3d",
  },
  {
    tag: "Frontend · React",
    category: "Side Projects",
    year: "2025",
    title: "Weather App",
    desc: "React powered weather dashboard that fetches real time conditions, temperature, and multi day forecasts for any city via a live weather API.",
    github: "https://github.com/suleman-badar/Weather-App",
    demo: null,
    stack: ["React", "Vite", "JavaScript", "CSS", "Weather API"],
    accent: "#38bdf8",
  },
  {
    tag: "Frontend · Vanilla",
    category: "Side Projects",
    year: "2025",
    title: "Currency Converter",
    desc: "Responsive vanilla JS currency converter with live exchange rates across 150+ currencies. No frameworks, just clean DOM manipulation and a public rates API.",
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
    desc: "Pixel faithful Spotify interface recreation in pure HTML and CSS, no JavaScript, no frameworks. A study in layout, flexbox, and responsive design discipline.",
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
    desc: "Classic two player browser game with win detection, draw handling, and board reset, built in vanilla JS with zero dependencies.",
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
    <section id="work" className="relative py-8 md:py-12">
      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionLabel
          index="// 03 — selected work"
          title="Engineered, &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp; not assembled."
          subtitle="Case studies in shipping resilient software. Backend depth on the inside, considered interfaces on the outside."
        />


        {FEATURED_PROJECTS.map((project) => (

          <FeaturedProject
           key={project.title}
            project={project}
          />

        ))}


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