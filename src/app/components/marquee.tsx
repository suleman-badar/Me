export function Marquee() {
  const items = [
    "BACKEND SYSTEMS",
    "DISTRIBUTED SEARCH",
    "MERN STACK",
    "OPEN SOURCE / KDE",
    "AI / LLM EXPLORATION",
    "SCALABLE ARCHITECTURE",
    "DEVELOPER TOOLING",
    "DESKTOP APPLICATIONS",
  ];
  const row = [...items, ...items];
  return (
    <section className="relative py-10 border-y border-white/8 overflow-hidden">
      <div className="flex w-max ticker mask-fade-x">
        {row.map((t, i) => (
          <div key={i} className="flex items-center gap-10 pr-10">
            <span className="font-display text-[40px] md:text-[64px] tracking-tight">{t}</span>
            <span className="w-3 h-3 rotate-45 bg-[#c6ff3d]" />
          </div>
        ))}
      </div>
    </section>
  );
}
