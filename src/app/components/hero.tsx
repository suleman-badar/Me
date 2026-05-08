import { motion, useMotionValue, useTransform, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { ArrowDown, Cpu, Activity, GitBranch, Terminal } from "lucide-react";

const ROLES = [
  "Backend Engineer",
  "MERN Stack Developer",
  "Open Source Contributor",
  "AI / LLM Explorer",
  "Desktop Apps Developer",
];

export function Hero() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 80, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 80, damping: 18 });
  const px = useSpring(useTransform(mx, [-0.5, 0.5], [-20, 20]), { stiffness: 50, damping: 15 });
  const py = useSpring(useTransform(my, [-0.5, 0.5], [-20, 20]), { stiffness: 50, damping: 15 });

  const [roleIdx, setRoleIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setRoleIdx((i) => (i + 1) % ROLES.length), 2400);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      id="top"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      className="relative min-h-screen w-full overflow-hidden pt-28"
    >
      {/* Atmospheric layers */}
      <div className="absolute inset-0 grid-bg opacity-50 mask-fade-y" />
      <motion.div
        style={{ x: px, y: py }}
        className="absolute -top-40 -left-40 w-[640px] h-[640px] rounded-full blur-[140px] bg-[#c6ff3d]/[0.12]"
      />
      <motion.div
        style={{ x: useTransform(px, (v) => -v), y: useTransform(py, (v) => -v) }}
        className="absolute -bottom-40 -right-40 w-[720px] h-[720px] rounded-full blur-[160px] bg-[#3d8bff]/[0.12]"
      />
      <div className="absolute inset-0 noise opacity-[0.5] mix-blend-overlay pointer-events-none" />

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        {/* Top meta strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-[10px] uppercase tracking-[0.22em] text-white/45 border-y border-white/8 py-3">
          <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#c6ff3d] rounded-full animate-pulse" />SYSTEM/ONLINE</div>
          <div className="hidden md:block">LAT 33.6844° / LON 73.0479°</div>
          <div className="hidden md:block">v2026.05.08 — BUILD STABLE</div>
          <div className="text-right">PORTFOLIO/SULEMAN—BADAR</div>
        </div>

        {/* Headline */}
        <div className="grid grid-cols-12 gap-6 mt-12 md:mt-20">
          <div className="col-span-12 lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/45 mb-6 flex items-center gap-3"
            >
              <span className="w-8 h-px bg-white/30" />
              [ Engineer / Index 001 ]
            </motion.div>
            <h1 className="font-display leading-[0.86] text-[64px] md:text-[120px] xl:text-[148px]">
              {["Suleman", "Badar."].map((w, i) => (
                <motion.span
                  key={w}
                  initial={{ opacity: 0, y: 80, rotateX: 40 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ duration: 1, delay: 0.2 + i * 0.15, ease: [0.22, 0.61, 0.36, 1] }}
                  className="block"
                >
                  {i === 1 ? <span className="text-[#c6ff3d]">{w}</span> : w}
                </motion.span>
              ))}
            </h1>

            {/* Role rotator */}
            <div className="mt-8 md:mt-10 flex items-center gap-4 font-mono text-sm md:text-base">
              <span className="text-white/35">/&gt;</span>
              <div className="relative h-7 overflow-hidden flex-1 max-w-md">
                {ROLES.map((r, i) => (
                  <motion.div
                    key={r}
                    animate={{ y: (i - roleIdx) * 28, opacity: i === roleIdx ? 1 : 0.0 }}
                    transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
                    className="absolute inset-0 text-white"
                  >
                    {r}<span className="blink text-[#c6ff3d] ml-1">▌</span>
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
              I architect resilient backend systems and ship considered, performant interfaces.
              From distributed search pipelines to KDE open-source contributions — I build software
              that holds up under pressure.
            </motion.p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a href="#work" className="group relative inline-flex items-center gap-3 bg-[#c6ff3d] text-black px-5 py-3 rounded-full font-mono text-[12px] uppercase tracking-wider overflow-hidden">
                <span>Explore Work</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </a>
              <a href="#contact" className="inline-flex items-center gap-3 border border-white/15 hover:border-white/30 px-5 py-3 rounded-full font-mono text-[12px] uppercase tracking-wider">
                Initiate Contact
              </a>
            </div>
          </div>

          {/* 3D-ish floating panel cluster */}
          <motion.div
            style={{ rotateX: rx, rotateY: ry, transformPerspective: 1200 }}
            className="col-span-12 lg:col-span-4 relative h-[520px]"
          >
            {/* Orbiting node ring */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-[420px] h-[420px]">
                <div className="absolute inset-0 rounded-full border border-white/8 orbit-slow" />
                <div className="absolute inset-8 rounded-full border border-white/10 orbit-rev" />
                <div className="absolute inset-16 rounded-full border border-[#c6ff3d]/20 orbit-slow" />
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute top-1/2 left-1/2 w-2 h-2 -ml-1 -mt-1"
                    style={{ transform: `rotate(${i * 45}deg) translateY(-200px)` }}
                  >
                    <div className="w-2 h-2 bg-[#c6ff3d] rounded-full lime-glow" />
                  </div>
                ))}
                {/* Core cube */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{ rotateY: [0, 360] }}
                    transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                    style={{ transformStyle: "preserve-3d", transformPerspective: 1000 }}
                    className="relative w-32 h-32"
                  >
                    {[
                      { t: "rotateY(0deg) translateZ(64px)" },
                      { t: "rotateY(90deg) translateZ(64px)" },
                      { t: "rotateY(180deg) translateZ(64px)" },
                      { t: "rotateY(270deg) translateZ(64px)" },
                      { t: "rotateX(90deg) translateZ(64px)" },
                      { t: "rotateX(-90deg) translateZ(64px)" },
                    ].map((f, i) => (
                      <div
                        key={i}
                        className="absolute inset-0 border border-[#c6ff3d]/40 bg-[#c6ff3d]/5"
                        style={{ transform: f.t }}
                      />
                    ))}
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Floating telemetry cards */}
            <motion.div
              animate={{ y: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-4 left-0 glass rounded-xl p-3 w-[200px]"
            >
              <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-white/55"><Activity className="w-3 h-3 text-[#c6ff3d]" /> uptime</div>
              <div className="font-mono text-lg mt-1">99.982<span className="text-white/30">%</span></div>
              <div className="mt-2 h-1.5 rounded-full bg-white/8 overflow-hidden">
                <div className="h-full bg-[#c6ff3d]" style={{ width: "92%" }} />
              </div>
            </motion.div>
            <motion.div
              animate={{ y: [0, 12, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-10 right-0 glass rounded-xl p-3 w-[210px]"
            >
              <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-white/55"><GitBranch className="w-3 h-3 text-[#c6ff3d]" /> commits/30d</div>
              <div className="flex items-end gap-1 mt-2 h-10">
                {[3,5,2,7,4,6,8,5,9,6,4,7,5,8].map((v,i)=>(
                  <div key={i} className="flex-1 bg-[#c6ff3d]/70 rounded-sm" style={{ height: `${v*10}%` }} />
                ))}
              </div>
            </motion.div>
            <motion.div
              animate={{ y: [0, -8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-40 left-2 glass rounded-xl p-3 w-[180px]"
            >
              <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-white/55"><Cpu className="w-3 h-3 text-[#c6ff3d]" /> req/s</div>
              <div className="font-mono text-lg mt-1">12,847</div>
            </motion.div>
          </motion.div>
        </div>

        {/* Terminal strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-16 md:mt-24 grid grid-cols-12 gap-4"
        >
          <div className="col-span-12 md:col-span-7 glass rounded-xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/8 font-mono text-[10px] uppercase tracking-wider text-white/45">
              <Terminal className="w-3 h-3" /> ~/suleman/identity.sh
              <span className="ml-auto flex gap-1.5">
                <span className="w-2 h-2 rounded-full bg-white/20"/>
                <span className="w-2 h-2 rounded-full bg-white/20"/>
                <span className="w-2 h-2 rounded-full bg-[#c6ff3d]"/>
              </span>
            </div>
            <div className="p-4 font-mono text-[12.5px] leading-relaxed">
              <div className="text-white/45">$ whoami --verbose</div>
              <div className="text-white">{`>`} systems-thinker. backend-leaning. obsessed w/ scale.</div>
              <div className="text-white/45 mt-2">$ cat focus.json</div>
              <div className="text-[#c6ff3d]">{`{`}</div>
              <div className="pl-4">"core": "scalable backend architecture",</div>
              <div className="pl-4">"frontier": ["LLMs", "agentic systems"],</div>
              <div className="pl-4">"ethos": "engineering as craft"</div>
              <div className="text-[#c6ff3d]">{`}`}<span className="blink ml-2">▌</span></div>
            </div>
          </div>
          <div className="col-span-12 md:col-span-5 grid grid-cols-2 gap-4">
            {[
              { k: "Years building", v: "4+" },
              { k: "OSS Merge Requests", v: "20+" },
              { k: "Production systems", v: "08" },
              { k: "Languages fluent", v: "06" },
            ].map((m) => (
              <div key={m.k} className="glass rounded-xl p-4">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">{m.k}</div>
                <div className="font-display text-3xl mt-2">{m.v}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
