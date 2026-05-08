import { motion } from "motion/react";
import { useState } from "react";
import { SectionLabel } from "./section-label";

type Tech = { id: string; label: string; group: string; x: number; y: number; r?: number };

const TECH: Tech[] = [
  // Backend (left cluster)
  { id: "node", label: "Node.js", group: "backend", x: 22, y: 30, r: 32 },
  { id: "express", label: "Express", group: "backend", x: 12, y: 50 },
  { id: "rest", label: "REST APIs", group: "backend", x: 28, y: 60 },
  { id: "jwt", label: "JWT / Auth", group: "backend", x: 8, y: 28 },
  { id: "meili", label: "Meilisearch", group: "backend", x: 22, y: 75 },
  // Databases (bottom-left)
  { id: "mongo", label: "MongoDB", group: "db", x: 38, y: 86 },
  { id: "postgres", label: "PostgreSQL", group: "db", x: 50, y: 92 },
  { id: "mysql", label: "MySQL", group: "db", x: 62, y: 86 },
  // Frontend (right)
  { id: "react", label: "React", group: "frontend", x: 78, y: 30, r: 30 },
  { id: "tw", label: "Tailwind", group: "frontend", x: 88, y: 50 },
  { id: "motion", label: "Framer Motion", group: "frontend", x: 72, y: 60 },
  { id: "js", label: "JavaScript", group: "frontend", x: 90, y: 28 },
  // Tools
  { id: "docker", label: "Docker", group: "tools", x: 50, y: 18 },
  { id: "git", label: "Git", group: "tools", x: 60, y: 30 },
  { id: "postman", label: "Postman", group: "tools", x: 40, y: 30 },
  // AI
  { id: "ai", label: "LLMs", group: "ai", x: 50, y: 50, r: 36 },
];

const EDGES: [string, string][] = [
  ["node","express"],["node","rest"],["node","jwt"],["node","meili"],
  ["express","mongo"],["express","postgres"],["express","mysql"],
  ["meili","mongo"],
  ["react","tw"],["react","motion"],["react","js"],
  ["docker","node"],["docker","postgres"],["docker","mongo"],
  ["git","node"],["git","react"],["postman","rest"],
  ["ai","node"],["ai","react"],["ai","meili"],
];

const GROUP_COLOR: Record<string, string> = {
  backend: "#c6ff3d",
  frontend: "#3d8bff",
  db: "#ff6b3d",
  tools: "#b1b8c4",
  ai: "#d83dff",
};

export function Stack() {
  const [hover, setHover] = useState<string | null>(null);

  const isActive = (id: string) => {
    if (!hover) return true;
    if (id === hover) return true;
    return EDGES.some(([a, b]) => (a === hover && b === id) || (b === hover && a === id));
  };
  const edgeActive = (a: string, b: string) => !hover || a === hover || b === hover;

  return (
    <section id="stack" className="relative py-32 md:py-44">
      <div className="absolute inset-0 grid-bg opacity-30 mask-fade-y" />
      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionLabel index="// 02 — stack" title="An ecosystem, not a checklist." subtitle="Hover any node to surface its connected technologies. The graph reflects how the stack actually wires together in production." />

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-9 glass rounded-2xl relative aspect-[16/10] overflow-hidden">
            <div className="absolute inset-0 dot-bg opacity-50" />
            {/* Edges */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              {EDGES.map(([a, b]) => {
                const A = TECH.find(t => t.id === a)!;
                const B = TECH.find(t => t.id === b)!;
                const active = edgeActive(a, b);
                return (
                  <line key={a + b} x1={A.x} y1={A.y} x2={B.x} y2={B.y}
                    stroke={active ? "rgba(198,255,61,0.45)" : "rgba(255,255,255,0.06)"}
                    strokeWidth={active ? 0.18 : 0.1}
                    style={{ transition: "stroke 300ms" }}
                  />
                );
              })}
            </svg>

            {/* Nodes */}
            {TECH.map((t) => {
              const size = t.r || 22;
              const active = isActive(t.id);
              return (
                <motion.button
                  key={t.id}
                  onMouseEnter={() => setHover(t.id)}
                  onMouseLeave={() => setHover(null)}
                  animate={{ opacity: active ? 1 : 0.25, scale: hover === t.id ? 1.12 : 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group"
                  style={{ left: `${t.x}%`, top: `${t.y}%` }}
                >
                  <div
                    className="rounded-full flex items-center justify-center font-mono text-[10.5px] uppercase tracking-wider border"
                    style={{
                      width: size * 3.2,
                      height: size * 3.2,
                      borderColor: hover === t.id ? GROUP_COLOR[t.group] : "rgba(255,255,255,0.1)",
                      background: hover === t.id ? `${GROUP_COLOR[t.group]}18` : "rgba(15,16,20,0.7)",
                      boxShadow: hover === t.id ? `0 0 40px ${GROUP_COLOR[t.group]}40` : "none",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    <span className="px-2 text-center" style={{ color: hover === t.id ? GROUP_COLOR[t.group] : "rgba(255,255,255,0.7)" }}>{t.label}</span>
                  </div>
                </motion.button>
              );
            })}

            {/* Legend */}
            <div className="absolute bottom-4 left-4 flex flex-wrap gap-3 font-mono text-[10px] uppercase tracking-[0.2em]">
              {Object.entries(GROUP_COLOR).map(([k, c]) => (
                <div key={k} className="flex items-center gap-2 text-white/55">
                  <span className="w-2 h-2 rounded-full" style={{ background: c }} />
                  {k}
                </div>
              ))}
            </div>
          </div>

          {/* Side panel */}
          <div className="col-span-12 lg:col-span-3 space-y-3">
            {[
              { t: "Backend Core", v: "Node · Express · REST · JWT · Meilisearch", c: "#c6ff3d" },
              { t: "Data Layer", v: "MongoDB · PostgreSQL · MySQL", c: "#ff6b3d" },
              { t: "Frontend", v: "React · Tailwind · Framer Motion", c: "#3d8bff" },
              { t: "Tooling", v: "Docker · Git · Postman", c: "#b1b8c4" },
              { t: "Frontier", v: "LLMs · Agentic systems", c: "#d83dff" },
            ].map((g) => (
              <div key={g.t} className="glass rounded-xl p-4">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/55">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: g.c }} />
                  {g.t}
                </div>
                <div className="mt-2 text-[13px] text-white/85">{g.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
