import { ArrowDown, Terminal } from "lucide-react";
import { HeroAnimations } from "./HeroAnimations";
import { HeroRoleRotator } from "./HeroRoleRotator";

const ROLES = [
  "Backend Engineer",
  "MERN Stack Developer",
  "AI Engineer",
  "Open Source Contributor",
];

export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen w-full overflow-hidden pt-28 pb-16"
    >
      {/* Atmospheric background */}
      <div className="absolute inset-0 grid-bg opacity-50 mask-fade-y pointer-events-none" />

      {/* Parallax background blobs */}
      <HeroAnimations variant="background" />

      <div className="absolute inset-0 noise opacity-[0.5] mix-blend-overlay pointer-events-none" />

      {/* Page content */}
      <div className="relative mx-auto max-w-[1550px] px-6 md:px-10">
        {/* Meta strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-[10px] uppercase tracking-[0.22em] text-white/45 border-y border-white/8 py-3">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#c6ff3d] rounded-full animate-pulse" />
            SYSTEM/ONLINE
          </div>

          <div className="hidden md:block">
            LAT 33.6844° / LON 73.0479°
          </div>

          <div className="hidden md:block">
            v2026.05.08 — BUILD STABLE
          </div>

          <div className="text-right">
            PORTFOLIO/SULEMAN—BADAR
          </div>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-12 gap-6 mt-12 md:mt-20">
          {/* Left column */}
          <div className="col-span-12 lg:col-span-7">
            {/* Eyebrow */}
            <HeroAnimations variant="eyebrow">
              <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/45 mb-6 flex items-center gap-3">
                <span className="w-8 h-px bg-white/30" />
                [Engineer / Index 001]
              </div>
            </HeroAnimations>

            {/* Name */}
            <h1 className="font-display leading-[0.86] text-[64px] md:text-[120px] xl:text-[148px]">
              <HeroAnimations variant="name" delay={0.2}>
                <span className="block">Suleman</span>
              </HeroAnimations>

              <HeroAnimations variant="name" delay={0.35}>
                <span className="block text-[#c6ff3d]">Badar</span>
              </HeroAnimations>
            </h1>

            {/* Role rotator */}
            <div className="mt-8 md:mt-10 flex items-center gap-4 font-mono text-sm md:text-base">
              <span className="text-white/35">/&gt;</span>

              <HeroRoleRotator roles={ROLES} />
            </div>

            {/* Description */}
            <HeroAnimations variant="description">
              <p className="mt-10 max-w-xl text-white/60 leading-relaxed text-[15px]">
                I architect resilient backend systems and ship considered,
                performant interfaces. From distributed search pipelines to KDE
                open source contributions, I build software that holds up under
                pressure.
              </p>
            </HeroAnimations>

            {/* Actions */}
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href="#work"
                className="group relative inline-flex items-center gap-3 bg-[#c6ff3d] text-black px-5 py-3 rounded-full font-mono text-[12px] uppercase tracking-wider"
              >
                <span>Explore Work</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </a>

              <a
                href="https://github.com/suleman-badar"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/15 font-mono text-[12px] uppercase tracking-wider hover:border-white/30 transition-colors"
              >
                <Terminal className="w-4 h-4" />
                <span>View Source</span>
              </a>
            </div>
          </div>

          {/* Right column */}
          <div className="col-span-12 lg:col-span-5 relative">
            <HeroAnimations variant="orb" />
          </div>
        </div>

        {/*Terminal Section*/}
        <HeroAnimations variant="terminal">
          <div className="mt-16 md:mt-24 grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-7 glass rounded-xl overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/8 font-mono text-[10px] uppercase tracking-wider text-white/45">
                <Terminal className="w-3 h-3" />

                ~/suleman/identity.sh

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

                <div className="pl-4">
                  "core": "scalable backend architecture",
                </div>

                <div className="pl-4">
                  "frontier": ["LLMs", "agentic systems"],
                </div>

                <div className="pl-4">
                  "ethos": "engineering as craft"
                </div>

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

                  <div className="font-display text-3xl mt-2">
                    {m.v}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </HeroAnimations>
      </div>
    </section>
  );
}