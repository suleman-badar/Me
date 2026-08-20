"use client";

import { motion } from "motion/react";
import { EDGES, GROUP_COLOR, TECH } from "./stack-data";
import { useState } from "react";

export function StackGraph() {
  const [hover, setHover] = useState<string | null>(null);

  const techById = new Map(TECH.map((tech) => [tech.id, tech]));

  const isActive = (id: string) => {
    if (!hover) return true;

    if (id === hover) return true;

    return EDGES.some(
      ([a, b]) =>
        (a === hover && b === id) ||
        (b === hover && a === id)
    );
  };

  const edgeActive = (a: string, b: string) =>
    !hover || a === hover || b === hover;

  return (
    <>
      {/* Graph background */}
      <div className="absolute inset-0 dot-bg opacity-50" />

      {/* Edges */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {EDGES.map(([a, b]) => {
          const A = techById.get(a)!;
          const B = techById.get(b)!;
          const active = edgeActive(a, b);

          return (
            <line
              key={`${a}-${b}`}
              x1={A.x}
              y1={A.y}
              x2={B.x}
              y2={B.y}
              stroke={
                active
                  ? "rgba(198,255,61,0.45)"
                  : "rgba(255,255,255,0.06)"
              }
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
        const isHovered = hover === t.id;
        const color = GROUP_COLOR[t.group];

        return (
          <motion.button
            key={t.id}
            onMouseEnter={() => setHover(t.id)}
            onMouseLeave={() => setHover(null)}
            animate={{
              opacity: active ? 1 : 0.25,
              scale: isHovered ? 1.12 : 1,
            }}
            transition={{ duration: 0.3 }}
            className="absolute -translate-x-1/2 -translate-y-1/2 group"
            style={{
              left: `${t.x}%`,
              top: `${t.y}%`,
            }}
            aria-label={`Highlight ${t.label} connections`}
          >
            <div
              className="rounded-full flex items-center justify-center font-mono text-[10.5px] uppercase tracking-wider border"
              style={{
                width: size * 3.2,
                height: size * 3.2,
                borderColor: isHovered
                  ? color
                  : "rgba(255,255,255,0.1)",
                background: isHovered
                  ? `${color}18`
                  : "rgba(15,16,20,0.7)",
                boxShadow: isHovered
                  ? `0 0 40px ${color}40`
                  : "none",
                backdropFilter: "blur(8px)",
              }}
            >
              <span
                className="px-2 text-center"
                style={{
                  color: isHovered
                    ? color
                    : "rgba(255,255,255,0.7)",
                }}
              >
                {t.label}
              </span>
            </div>
          </motion.button>
        );
      })}

      {/* Legend */}
      <div className="absolute bottom-4 left-4 flex flex-wrap gap-3 font-mono text-[10px] uppercase tracking-[0.2em]">
        {Object.entries(GROUP_COLOR).map(([group, color]) => (
          <div
            key={group}
            className="flex items-center gap-2 text-white/55"
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: color }}
            />
            {group}
          </div>
        ))}
      </div>
    </>
  );
}