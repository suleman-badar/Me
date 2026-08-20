import { ArrowUpRight, Github, Cloud, Database, Search, Shield, Users, Wifi, Zap } from "lucide-react";
import { SectionLabel } from "../section-label";
import TubeChatVisual from "./tubechat-visual";
import FindHereVisual from "./findhere-visual";
import RangVisual from "./rang-visual";
import FeaturedProject from "./featuredProject";
import type { FeaturedProjectType } from "./featuredProject";
import { ProjectsAnimations } from "./ProjectsAnimations";

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
      { key: "p99 search", value: "47ms", icon: "search" },
      { key: "auth", value: "JWT + refresh", icon: "shield" },
      { key: "media", value: "Cloudinary CDN", icon: "cloud" },
      { key: "primary", value: "MongoDB", icon: "database" },
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

    visual: "findhere",
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
      { key: "Embedding", value: "Gemini", icon: "database" },
      { key: "Latency", value: "<2s", icon: "zap" },
      { key: "Framework", value: "LangChain", icon: "cloud" },
      { key: "Database", value: "Postgres", icon: "database" },
    ],

    technologies: [
      "FastAPI",
      "React",
      "LangChain",
      "Gemini",
      "Neon",
      "PostgreSQL",
      "Groq",
    ],

    actions: ["demo", "source", "collaborate"],

    visual: "tubechat",
  },

  {
    title: "RANG",
    badge: "Featured · 2025",
    description:
      "A real-time multiplayer card game built around a server-authoritative architecture. Gameplay, validation, room management, synchronization, and scoring are fully orchestrated by the backend while Socket.IO keeps four players perfectly synchronized.",

    demo: "https://rangadvance.com/",
    github: "https://github.com/suleman-badar/RANG",

    metrics: [
      { key: "Players", value: "4 Real-time", icon: "users" },
      { key: "Latency", value: "<100ms", icon: "zap" },
      { key: "Transport", value: "Socket.IO", icon: "wifi" },
      { key: "Authority", value: "Server", icon: "shield" },
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

    visual: "rang",
  },
];

export type SecondaryProject = {
  tag: string;
  category: string;
  year: string;
  title: string;
  desc: string;
  github: string;
  demo: string | null;
  stack: string[];
  accent: string;
};

const SECONDARY_PROJECTS: SecondaryProject[] = [
  {
    tag: "Productivity · Fullstack",
    category: "Fullstack",
    year: "2025",
    title: "Contact Management System",
    desc:
      "Self-hosted CRM with role-based auth, audit logs, and a normalised PostgreSQL schema designed to scale to millions of contacts.",
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
    desc:
      "Low-level multiplayer games written in C/C++ with custom socket servers, game-state synchronisation, and lock-step simulation.",
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
    desc:
      "Patches, refactors, and feature work merged into KDE projects. Real world C++ / Qt workflow under public review.",
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
    desc:
      "React powered weather dashboard that fetches real time conditions, temperature, and multi day forecasts for any city via a live weather API.",
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
    desc:
      "Responsive vanilla JS currency converter with live exchange rates across 150+ currencies. No frameworks, just clean DOM manipulation and a public rates API.",
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
    desc:
      "Pixel faithful Spotify interface recreation in pure HTML and CSS, no JavaScript, no frameworks. A study in layout, flexbox, and responsive design discipline.",
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
    desc:
      "Classic two player browser game with win detection, draw handling, and board reset, built in vanilla JS with zero dependencies.",
    github: "https://github.com/suleman-badar/tic-tac-toe-WEB",
    demo: null,
    stack: ["HTML", "CSS", "JavaScript"],
    accent: "#a78bfa",
  },
];

const CATEGORIES = [
  "Fullstack",
  "Systems",
  "Side Projects",
  "OSS",
];

export function Projects() {
  return (
    <section id="work" className="relative py-8 md:py-12">
      <div className="relative mx-auto max-w-[1550px] px-6 md:px-10">
        <SectionLabel
          index="// 03 — selected work"
          title="Engineered, &ensp;&ensp;&ensp; &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp; not assembled."
          subtitle="Case studies in shipping resilient software. Backend depth on the inside, considered interfaces on the outside."
        />

        {/* Featured projects */}
        {FEATURED_PROJECTS.map((project) => (
          <FeaturedProject
            key={project.title}
            project={project}
          />
        ))}

        {/* Secondary projects + client-side interactions */}
        <ProjectsAnimations
          projects={SECONDARY_PROJECTS}
          categories={CATEGORIES}
        />

        {/* Archive footer */}
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
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-white/15 hover:border-[#c6ff3d]/50 hover:text-[#c6ff3d] px-4 py-2.5 rounded-full font-mono text-[11px] uppercase tracking-wider transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              Browse Github
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <a
              href="https://invent.kde.org/sulemanbadar"
              target="_blank"
              rel="noopener noreferrer"
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