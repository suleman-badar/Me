"use client";

import { useEffect, useMemo, useRef } from "react";
import { motion } from "motion/react";
import {
  Server,
  Brain,
  Code2,
  TerminalSquare,
} from "lucide-react";

const ACCENT = "198,255,61";

const CARDS = [
  {
    id: "backend",
    label: ["Backend", "Systems"],
    Icon: Server,
    pos: "top-2 left-0 lg:-left-6",
    tilt: 15,
  },
  {
    id: "ai",
    label: ["AI", "Engineer"],
    Icon: Brain,
    pos: "top-[74px] right-0 lg:-right-4",
    tilt: -15,
  },
  {
    id: "oss",
    label: ["Open", "Source"],
    Icon: Code2,
    pos: "bottom-[96px] left-0 lg:-left-2",
    tilt: 15,
  },
  {
    id: "solver",
    label: ["Problem", "Solver"],
    Icon: TerminalSquare,
    pos: "bottom-6 right-0 lg:-right-6",
    tilt: -15,
  },
] as const;

const PARTICLES = [
  { x: 16, y: 14, s: 2, d: 0, dur: 14 },
  { x: 74, y: 9, s: 1.5, d: 2.4, dur: 17 },
  { x: 90, y: 46, s: 2, d: 1.1, dur: 13 },
  { x: 7, y: 52, s: 1.5, d: 3.6, dur: 19 },
  { x: 37, y: 80, s: 2, d: 0.7, dur: 15 },
  { x: 66, y: 90, s: 1.5, d: 4.2, dur: 18 },
  { x: 52, y: 22, s: 1.5, d: 2.2, dur: 20 },
  { x: 86, y: 76, s: 2, d: 5.1, dur: 12 },
  { x: 24, y: 36, s: 1.5, d: 1.8, dur: 16 },
];

function NetworkOrb({ size = 340 }: { size?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const geometry = useMemo(() => {
    const N = 118;
    const golden = Math.PI * (3 - Math.sqrt(5));

    const nodes: { x: number; y: number; z: number }[] = [];

    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = golden * i;

      nodes.push({
        x: Math.cos(theta) * r,
        y,
        z: Math.sin(theta) * r,
      });
    }

    const edges: [number, number][] = [];

    for (let i = 0; i < N; i++) {
      for (let j = i + 1; j < N; j++) {
        const a = nodes[i];
        const b = nodes[j];

        const dot = a.x * b.x + a.y * b.y + a.z * b.z;

        if (dot > 0.86) {
          edges.push([i, j]);
        }
      }
    }

    return { nodes, edges };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = size * dpr;
    canvas.height = size * dpr;

    ctx.scale(dpr, dpr);

    const { nodes, edges } = geometry;

    const cx = size / 2;
    const cy = size / 2;
    const R = size * 0.42;

    const TILT = 0.34;
    const sinT = Math.sin(TILT);
    const cosT = Math.cos(TILT);

    const reduced = window
      .matchMedia?.("(prefers-reduced-motion: reduce)")
      .matches;

    let angle = 0;
    let raf = 0;

    const proj = new Array(nodes.length)
      .fill(null)
      .map(() => ({
        x: 0,
        y: 0,
        z: 0,
      }));

    const draw = () => {
      const sinA = Math.sin(angle);
      const cosA = Math.cos(angle);

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];

        const x1 = n.x * cosA + n.z * sinA;
        const z1 = -n.x * sinA + n.z * cosA;

        const y2 = n.y * cosT - z1 * sinT;
        const z2 = n.y * sinT + z1 * cosT;

        const p = proj[i];

        p.x = cx + x1 * R;
        p.y = cy - y2 * R;
        p.z = z2;
      }

      ctx.clearRect(0, 0, size, size);

      // Edges
      for (let e = 0; e < edges.length; e++) {
        const a = proj[edges[e][0]];
        const b = proj[edges[e][1]];

        const depth = (a.z + b.z) / 2;
        const t = (depth + 1) / 2;

        ctx.strokeStyle = `rgba(${ACCENT},${(
          0.05 +
          t * 0.34
        ).toFixed(3)})`;

        ctx.lineWidth = 0.4 + t * 0.5;

        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      // Nodes
      for (let i = 0; i < proj.length; i++) {
        const p = proj[i];
        const t = (p.z + 1) / 2;
        const r = 0.7 + t * 1.7;

        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);

        ctx.fillStyle = `rgba(${ACCENT},${(
          0.18 +
          t * 0.75
        ).toFixed(3)})`;

        if (t > 0.72) {
          ctx.shadowColor = `rgba(${ACCENT},0.75)`;
          ctx.shadowBlur = 8 * t;
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.fill();
      }

      ctx.shadowBlur = 0;

      if (!reduced) {
        angle += 0.0021;
        raf = requestAnimationFrame(draw);
      }
    };

    draw();

    return () => cancelAnimationFrame(raf);
  }, [geometry, size]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: size,
        height: size,
        display: "block",
      }}
      aria-hidden
    />
  );
}

export function HeroOrb() {
  return (
    <div className="relative h-[440px] sm:h-[500px] lg:h-[520px]">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ opacity: [0.55, 0.95, 0.55] }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-1/2 top-[12%] w-[440px] h-[440px] -translate-x-1/2 rounded-full blur-[100px]"
          style={{
            background: `radial-gradient(circle, rgba(${ACCENT},0.15), rgba(${ACCENT},0.04) 55%, transparent 72%)`,
          }}
        />

        <motion.div
          animate={{ opacity: [0.3, 0.55, 0.3] }}
          transition={{
            duration: 13,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-1/2 bottom-[4%] w-[320px] h-[220px] -translate-x-1/2 rounded-full blur-[90px]"
          style={{
            background: `radial-gradient(ellipse, rgba(${ACCENT},0.16), transparent 70%)`,
          }}
        />
      </div>

      {/* Network orb */}
      <div className="absolute left-1/2 top-[8%] -translate-x-1/2 pointer-events-none">
        <div className="hidden sm:block">
          <NetworkOrb size={340} />
        </div>

        <div className="sm:hidden">
          <NetworkOrb size={230} />
        </div>
      </div>

      {/* HUD pedestal */}
      <div
        className="absolute left-1/2 bottom-[52px] -translate-x-1/2 pointer-events-none"
        aria-hidden
      >
        <div
          className="relative"
          style={{
            perspective: "700px",
            width: 420,
            height: 150,
          }}
        >
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              transform: "rotateX(70deg)",
              transformStyle: "preserve-3d",
            }}
          >
            {[120, 190, 262, 340].map((d, i) => (
              <div
                key={d}
                className="absolute rounded-full"
                style={{
                  width: d,
                  height: d,
                  border: `1px solid rgba(${ACCENT},${
                    0.3 - i * 0.055
                  })`,
                }}
              />
            ))}

            <div
              className="orbit-slow absolute rounded-full"
              style={{
                width: 300,
                height: 300,
                borderTop: `1px solid rgba(${ACCENT},0.4)`,
                borderRight: `1px solid rgba(${ACCENT},0.12)`,
                borderBottom: "1px solid transparent",
                borderLeft: "1px solid transparent",
              }}
            />
          </div>

          {/* Core flare */}
          <motion.div
            animate={{
              opacity: [0.6, 1, 0.6],
              scale: [0.94, 1.06, 0.94],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute left-1/2 top-1/2 w-[150px] h-[46px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[16px]"
            style={{
              background: `radial-gradient(ellipse, rgba(${ACCENT},0.85), rgba(${ACCENT},0.2) 45%, transparent 72%)`,
            }}
          />

          {/* Radial tick marks */}
          {[-64, -38, 38, 64].map((deg) => (
            <div
              key={deg}
              className="absolute left-1/2 top-1/2 origin-left"
              style={{
                width: 74,
                height: 1,
                background: `linear-gradient(90deg, rgba(${ACCENT},0.28), transparent)`,
                transform: `rotate(${deg}deg)`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Dotted connectors */}
      <svg
        viewBox="0 0 520 520"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block"
        aria-hidden
      >
        {[
          "M 150 96 L 196 150 L 214 168",
          "M 372 168 L 330 196 L 306 208",
          "M 158 392 L 208 350 L 232 336",
          "M 366 424 L 314 372 L 296 352",
        ].map((d) => (
          <motion.path
            key={d}
            d={d}
            fill="none"
            stroke={`rgba(${ACCENT},0.3)`}
            strokeWidth="1"
            strokeDasharray="2 7"
            animate={{
              strokeDashoffset: [0, -36],
            }}
            transition={{
              duration: 5.5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}

        {[
          [214, 168],
          [306, 208],
          [232, 336],
          [296, 352],
        ].map(([cx, cy]) => (
          <motion.circle
            key={`${cx}-${cy}`}
            cx={cx}
            cy={cy}
            r="2.5"
            fill={`rgb(${ACCENT})`}
            animate={{
              opacity: [0.35, 1, 0.35],
            }}
            transition={{
              duration: 3.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>

      {/* Drifting particles */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        {PARTICLES.map((p) => (
          <motion.span
            key={`${p.x}-${p.y}`}
            animate={{
              y: [0, -24, 0],
              opacity: [0.15, 0.6, 0.15],
            }}
            transition={{
              duration: p.dur,
              repeat: Infinity,
              delay: p.d,
              ease: "easeInOut",
            }}
            className="absolute rounded-full bg-[#c6ff3d]"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.s,
              height: p.s,
            }}
          />
        ))}
      </div>

      {/* Capability cards */}
      {CARDS.map(({ id, label, Icon, pos, tilt }) => (
        <div
          key={id}
          style={{
            filter:
              "drop-shadow(0 18px 30px rgba(0,0,0,0.5)) drop-shadow(0 0 22px rgba(198,255,61,0.07))",
          }}
          className={`absolute ${pos} z-20`}
        >
          <div
            style={{
              transform: `perspective(900px) rotateY(${tilt}deg)`,
              background:
                "linear-gradient(155deg, rgba(198,255,61,0.07), rgba(255,255,255,0.02) 45%, rgba(0,0,0,0.25))",
              border: `1px solid rgba(${ACCENT},0.22)`,
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
            }}
            className="relative w-[136px] sm:w-[152px] rounded-2xl px-4 py-3.5"
          >
            {[
              "top-1.5 left-1.5 border-t border-l",
              "top-1.5 right-1.5 border-t border-r",
              "bottom-1.5 left-1.5 border-b border-l",
              "bottom-1.5 right-1.5 border-b border-r",
            ].map((cls) => (
              <span
                key={cls}
                className={`absolute w-2 h-2 border-[#c6ff3d]/45 ${cls}`}
              />
            ))}

            <div className="font-mono text-[13px] leading-snug text-white/90">
              {label.map((line) => (
                <div key={line}>{line}</div>
              ))}
            </div>

            <Icon
              className="mt-3 w-5 h-5 text-[#c6ff3d]/80"
              strokeWidth={1.4}
            />
          </div>
        </div>
      ))}
    </div>
  );
}