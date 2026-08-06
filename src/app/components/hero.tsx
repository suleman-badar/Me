import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, Terminal } from "lucide-react";
import { HeroOrb } from "./hero-orb";

// ─── Constants ────────────────────────────────────────────────────────────────

const ROLES = [
  "Backend Engineer",
  "MERN Stack Developer",
  "AI Engineer",
  "Open Source Contributor",
];

// ─── Hook: detect mobile once on mount ───────────────────────────────────────
// Uses pointer: coarse (touch) + screen width. SSR-safe.
function useIsMobile(): boolean {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const check = () =>
      setMobile(
        window.matchMedia("(pointer: coarse), (max-width: 768px)").matches
      );
    check();
    // No listener needed — layout doesn't change mid-session
  }, []);
  return mobile;
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

export function Hero() {
  const isMobile = useIsMobile();

  /* ── Mouse parallax (desktop only) ──────────────────────────────────────── */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), {
    stiffness: 80,
    damping: 18,
  });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), {
    stiffness: 80,
    damping: 18,
  });
  const px = useSpring(useTransform(mx, [-0.5, 0.5], [-20, 20]), {
    stiffness: 50,
    damping: 15,
  });
  const py = useSpring(useTransform(my, [-0.5, 0.5], [-20, 20]), {
    stiffness: 50,
    damping: 15,
  });
  const negPx = useTransform(px, (v) => -v);
  const negPy = useTransform(py, (v) => -v);

  /* ── Role rotator ────────────────────────────────────────────────────────── */
  const [roleIdx, setRoleIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(
      () => setRoleIdx((i) => (i + 1) % ROLES.length),
      2400
    );
    return () => clearInterval(t);
  }, []);

  /* ── Render ──────────────────────────────────────────────────────────────── */
  return (
    <section
      id="top"
      onMouseMove={
        isMobile
          ? undefined // no mousemove listener on touch devices
          : (e) => {
            const r = e.currentTarget.getBoundingClientRect();
            mx.set((e.clientX - r.left) / r.width - 0.5);
            my.set((e.clientY - r.top) / r.height - 0.5);
          }
      }
      className="relative min-h-screen w-full overflow-hidden pt-28 pb-16"
    >
      {/* Atmospheric bg layers */}
      <div className="absolute inset-0 grid-bg opacity-50 mask-fade-y pointer-events-none" />

      {/* Parallax blobs — static on mobile (no style prop = no JS per frame) */}
      {isMobile ? (
        <>
          <div className="absolute -top-40 -left-40 w-[640px] h-[640px] rounded-full blur-[140px] bg-[#c6ff3d]/[0.12] pointer-events-none" />
          <div className="absolute -bottom-40 -right-40 w-[720px] h-[720px] rounded-full blur-[160px] bg-[#3d8bff]/[0.12] pointer-events-none" />
        </>
      ) : (
        <>
          <motion.div
            style={{ x: px, y: py }}
            className="absolute -top-40 -left-40 w-[640px] h-[640px] rounded-full blur-[140px] bg-[#c6ff3d]/[0.12] pointer-events-none"
          />
          <motion.div
            style={{ x: negPx, y: negPy }}
            className="absolute -bottom-40 -right-40 w-[720px] h-[720px] rounded-full blur-[160px] bg-[#3d8bff]/[0.12] pointer-events-none"
          />
        </>
      )}

      <div className="absolute inset-0 noise opacity-[0.5] mix-blend-overlay pointer-events-none" />

      {/* Page content */}
      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        {/* Meta strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-[10px] uppercase tracking-[0.22em] text-white/45 border-y border-white/8 py-3">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#c6ff3d] rounded-full animate-pulse" />
            SYSTEM/ONLINE
          </div>
          <div className="hidden md:block">LAT 33.6844° / LON 73.0479°</div>
          <div className="hidden md:block">v2026.05.08 — BUILD STABLE</div>
          <div className="text-right">PORTFOLIO/SULEMAN—BADAR</div>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-12 gap-6 mt-12 md:mt-20">
          {/* Left column */}
          <div className="col-span-12 lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/45 mb-6 flex items-center gap-3"
            >
              <span className="w-8 h-px bg-white/30" />[Engineer / Index 001]
            </motion.div>

            <h1 className="font-display leading-[0.86] text-[64px] md:text-[120px] xl:text-[148px]">
              {["Suleman", "Badar"].map((word, i) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 80, rotateX: 40 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{
                    duration: 1,
                    delay: 0.2 + i * 0.15,
                    ease: [0.22, 0.61, 0.36, 1],
                  }}
                  className="block"
                >
                  {i === 1 ? (
                    <span className="text-[#c6ff3d]">{word}</span>
                  ) : (
                    word
                  )}
                </motion.span>
              ))}
            </h1>

            {/* Role rotator */}
            <div className="mt-8 md:mt-10 flex items-center gap-4 font-mono text-sm md:text-base">
              <span className="text-white/35">/&gt;</span>
              <div className="relative h-7 overflow-hidden flex-1 max-w-md">
                {ROLES.map((role, i) => (
                  <motion.div
                    key={role}
                    animate={{
                      y: (i - roleIdx) * 28,
                      opacity: i === roleIdx ? 1 : 0,
                    }}
                    transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
                    className="absolute inset-0 text-white"
                  >
                    {role}
                    <span className="blink text-[#c6ff3d] ml-1">▌</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 1 }}
              className="mt-10 max-w-xl text-white/60 leading-relaxed text-[15px]"
            >
              I architect resilient backend systems and ship considered,
              performant interfaces. From distributed search pipelines to KDE
              open source contributions, I build software that holds up under
              pressure.
            </motion.p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href="#work"
                className="group relative inline-flex items-center gap-3 bg-[#c6ff3d] text-black px-5 py-3 rounded-full font-mono text-[12px] uppercase tracking-wider"
              >
                <span>Explore Work</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-3 border border-white/15 hover:border-white/30 px-5 py-3 rounded-full font-mono text-[12px] uppercase tracking-wider transition-colors"
              >
                Initiate Contact
              </a>
            </div>
          </div>

          {/* ── Right column: network-orb composition ─────────── */}
          <div className="col-span-12 lg:col-span-5 relative mt-16 lg:mt-0 lg:-mr-4">
            <HeroOrb />
          </div>


        </div>

        {/* Terminal strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-16 md:mt-24 grid grid-cols-12 gap-4"
        >
          <div className="col-span-12 md:col-span-7 glass rounded-xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/8 font-mono text-[10px] uppercase tracking-wider text-white/45">
              <Terminal className="w-3 h-3" /> ~/suleman/identity.sh
              <span className="ml-auto flex gap-1.5">
                <span className="w-2 h-2 rounded-full bg-white/20" />
                <span className="w-2 h-2 rounded-full bg-white/20" />
                <span className="w-2 h-2 rounded-full bg-[#c6ff3d]" />
              </span>
            </div>
            <div className="p-4 font-mono text-[12.5px] leading-relaxed">
              <div className="text-white/45">$ whoami --verbose</div>
              <div className="text-white">
                {`>`} systems-thinker. backend-leaning. obsessed w/ scale.
              </div>
              <div className="text-white/45 mt-2">$ cat focus.json</div>
              <div className="text-[#c6ff3d]">{`{`}</div>
              <div className="pl-4">"core": "scalable backend architecture",</div>
              <div className="pl-4">"frontier": ["LLMs", "agentic systems"],</div>
              <div className="pl-4">"ethos": "engineering as craft"</div>
              <div className="text-[#c6ff3d]">
                {`}`}
                <span className="blink ml-2">▌</span>
              </div>
            </div>
          </div>

          <div className="col-span-12 md:col-span-5 grid grid-cols-2 gap-4">
            {[
              { k: "Years building", v: "2+" },
              { k: "OSS Merge Requests", v: "7+" },
              { k: "Production systems", v: "02" },
              { k: "Languages fluent", v: "03" },
            ].map((m) => (
              <div key={m.k} className="glass rounded-xl p-4">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">
                  {m.k}
                </div>
                <div className="font-display text-3xl mt-2">{m.v}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}