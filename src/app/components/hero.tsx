import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  useScroll,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  Cpu,
  Activity,
  GitBranch,
  Terminal,
} from "lucide-react";

// ─── Constants ────────────────────────────────────────────────────────────────

const ROLES = [
  "Backend Engineer",
  "MERN Stack Developer",
  "Open Source Contributor",
  "Desktop Apps Developer",
];

const CUBE_FACES = [
  "rotateY(0deg) translateZ(64px)",
  "rotateY(90deg) translateZ(64px)",
  "rotateY(180deg) translateZ(64px)",
  "rotateY(270deg) translateZ(64px)",
  "rotateX(90deg) translateZ(64px)",
  "rotateX(-90deg) translateZ(64px)",
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

// ─── Hook: prefers-reduced-motion ────────────────────────────────────────────
function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = () => setReduced(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

// ─── Orbit nodes ─────────────────────────────────────────────────────────────
// Extracted to avoid re-rendering when parent motion values change.
// Node glow uses CSS animation instead of per-node JS spring —
// compositor-only, zero JS cost per frame.
function OrbitNodes({ count }: { count: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="absolute top-1/2 left-1/2 w-2 h-2 -ml-1 -mt-1"
          style={{ transform: `rotate(${i * (360 / count)}deg) translateY(-200px)` }}
        >
          {/* Pulse halo — pure CSS, GPU composited */}
          <div
            className="absolute -inset-2 rounded-full bg-[#c6ff3d]/15 animate-node-pulse"
            style={{ animationDelay: `${i * 0.28}s` }}
          />
          {/* Node core — static glow via drop-shadow filter (composited) */}
          <div
            className="w-2 h-2 bg-[#c6ff3d] rounded-full relative z-10"
            style={{ filter: "drop-shadow(0 0 7px rgba(198,255,61,0.36))" }}
          />
        </div>
      ))}
    </>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

export function Hero() {
  const isMobile = useIsMobile();
  const reducedMotion = usePrefersReducedMotion();
  const disableScrollAnim = isMobile || reducedMotion;

  // Node count: fewer on mobile to reduce compositor layers
  const nodeCount = isMobile ? 6 : 8;

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

  /* ── Scroll tracking ─────────────────────────────────────────────────────── */
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Spring only computed on desktop — on mobile it's an unused motion value
  // but hooks must be called unconditionally, so we gate the USAGE not the call.
  const sp = useSpring(scrollYProgress, {
    stiffness: 75,
    damping: 28,
    restDelta: 0.0003,
  });

  // All scroll-driven transforms reference `sp` on desktop, static 0 on mobile.
  // We use useTransform unconditionally (rules of hooks) but pass
  // a no-op range [0,0] → [0,0] on mobile so they never produce non-zero output.
  const _zero = useMotionValue(0);
  const src = disableScrollAnim ? _zero : sp;

  const objectY      = useTransform(src, [0, 1], [0, 220]);
  const objectRotX   = useTransform(src, [0, 1], [0, 3]);
  const cubeScrollRX = useTransform(src, [0, 1], [0, 22]);
  const cubeScrollRZ = useTransform(src, [0, 1], [0, -6]);
  const ring1Rot     = useTransform(src, [0, 1], [0, 48]);
  const ring2Rot     = useTransform(src, [0, 1], [0, -68]);
  const ring3Rot     = useTransform(src, [0, 1], [0, 34]);
  const ring1DepthY  = useTransform(src, [0, 1], [0, -7]);
  const ring2DepthY  = useTransform(src, [0, 1], [0, 9]);
  const ring3DepthY  = useTransform(src, [0, 1], [0, -4]);

  /* ── Render ──────────────────────────────────────────────────────────────── */
  return (
    <section
      ref={sectionRef}
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
      className="relative min-h-screen w-full overflow-hidden pt-28"
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
          <div className="col-span-12 lg:col-span-8">
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

          {/* Right column — orbital system */}
          <motion.div
            style={
              isMobile
                ? { transformPerspective: 1200 }
                : { rotateX: rx, rotateY: ry, transformPerspective: 1200 }
            }
            className="col-span-12 lg:col-span-4 relative h-[520px]"
          >
            {/* Physical object wrapper — slides on scroll (desktop only) */}
            <motion.div
              style={{
                y: objectY,
                rotateX: objectRotX,
                transformPerspective: 900,
                willChange: "transform",
              }}
              className="absolute inset-0"
            >
              {/* Orbital arena */}
              <div className="absolute inset-0 flex items-center justify-center">
                {/*
                  Force this subtree onto its own GPU compositor layer.
                  translateZ(0) promotes it without affecting layout.
                  This means ring/cube repaints stay isolated.
                */}
                <div
                  className="relative w-[420px] h-[420px]"
                  style={{ transform: "translateZ(0)", willChange: "transform" }}
                >
                  {/* Ring 1 — will-change lets browser pre-promote the layer */}
                  <motion.div
                    style={{ rotateZ: ring1Rot, y: ring1DepthY, willChange: "transform" }}
                    className="absolute inset-0"
                  >
                    <div className="absolute inset-0 rounded-full border border-white/[0.08] orbit-slow" />
                  </motion.div>

                  {/* Ring 2 */}
                  <motion.div
                    style={{ rotateZ: ring2Rot, y: ring2DepthY, willChange: "transform" }}
                    className="absolute inset-8"
                  >
                    <div className="absolute inset-0 rounded-full border border-white/[0.11] orbit-rev" />
                  </motion.div>

                  {/* Ring 3 */}
                  <motion.div
                    style={{ rotateZ: ring3Rot, y: ring3DepthY, willChange: "transform" }}
                    className="absolute inset-16"
                  >
                    <div className="absolute inset-0 rounded-full border border-[#c6ff3d]/[0.22] orbit-slow" />
                  </motion.div>

                  {/* Radar sweep */}
                  <div
                    className="absolute inset-0 rounded-full overflow-hidden pointer-events-none"
                    style={{ opacity: 0.16 }}
                  >
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0"
                    >
                      <div
                        className="absolute left-1/2 top-0 h-1/2 w-px"
                        style={{
                          background:
                            "linear-gradient(to bottom, transparent 0%, #c6ff3d 60%, transparent 100%)",
                          transformOrigin: "bottom center",
                        }}
                      />
                    </motion.div>
                  </div>

                  {/* Orbit nodes — memoised component, CSS-only glow */}
                  <OrbitNodes count={nodeCount} />

                  {/* Core wireframe cube */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="absolute w-36 h-36 rounded-full blur-[50px] bg-[#c6ff3d]/[0.05]" />
                    <motion.div
                      animate={{ rotateY: [0, 360] }}
                      transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                      style={{
                        rotateX: cubeScrollRX,
                        rotateZ: cubeScrollRZ,
                        transformStyle: "preserve-3d",
                        transformPerspective: 1000,
                        willChange: "transform",
                      }}
                      className="relative w-32 h-32"
                    >
                      {CUBE_FACES.map((transform, i) => (
                        <div
                          key={i}
                          className="absolute inset-0 border border-[#c6ff3d]/38 bg-[#c6ff3d]/[0.03]"
                          style={{ transform }}
                        />
                      ))}
                      {CUBE_FACES.map((transform, i) => (
                        <div
                          key={`g${i}`}
                          className="absolute inset-0"
                          style={{
                            transform,
                            background:
                              "linear-gradient(135deg, rgba(198,255,61,0.07) 0%, transparent 55%)",
                          }}
                        />
                      ))}
                    </motion.div>
                  </div>

                  {/* HUD corner ticks */}
                  {(
                    [
                      "top-0 left-0 border-t border-l",
                      "top-0 right-0 border-t border-r",
                      "bottom-0 left-0 border-b border-l",
                      "bottom-0 right-0 border-b border-r",
                    ] as const
                  ).map((cls, i) => (
                    <div
                      key={i}
                      className={`absolute w-4 h-4 border-[#c6ff3d]/28 ${cls}`}
                    />
                  ))}
                </div>
              </div>

              {/* Telemetry cards */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-4 left-0 glass rounded-xl p-3 w-[200px]"
              >
                <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-white/55">
                  <Activity className="w-3 h-3 text-[#c6ff3d]" /> uptime
                </div>
                <div className="font-mono text-lg mt-1">
                  98.982<span className="text-white/30">%</span>
                </div>
                <div className="mt-2 h-1.5 rounded-full bg-white/8 overflow-hidden">
                  <motion.div
                    className="h-full bg-[#c6ff3d] rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: "92%" }}
                    transition={{
                      delay: 1.2,
                      duration: 1.4,
                      ease: [0.22, 0.61, 0.36, 1],
                    }}
                  />
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-10 right-0 glass rounded-xl p-3 w-[210px]"
              >
                <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-white/55">
                  <GitBranch className="w-3 h-3 text-[#c6ff3d]" /> commits/30d
                </div>
                <div className="flex items-end gap-1 mt-2 h-10">
                  {[3, 5, 2, 7, 4, 6, 8, 5, 9, 6, 4, 7, 5, 8].map((v, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${v * 10}%` }}
                      transition={{
                        delay: 1.4 + i * 0.06,
                        duration: 0.5,
                        ease: "easeOut",
                      }}
                      className="flex-1 bg-[#c6ff3d]/70 rounded-sm"
                    />
                  ))}
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-40 left-2 glass rounded-xl p-3 w-[180px]"
              >
                <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-white/55">
                  <Cpu className="w-3 h-3 text-[#c6ff3d]" /> req/s
                </div>
                <div className="font-mono text-lg mt-1">1,847</div>
                <div className="flex gap-1 mt-1.5">
                  {[0.6, 0.8, 0.5, 0.9, 0.7].map((o, i) => (
                    <motion.div
                      key={i}
                      animate={{ opacity: [o, 1, o] }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        delay: i * 0.2,
                        ease: "easeInOut",
                      }}
                      className="flex-1 h-0.5 bg-[#c6ff3d] rounded-full"
                    />
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
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