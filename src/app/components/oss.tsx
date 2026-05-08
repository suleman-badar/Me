import { motion } from "motion/react";
import { SectionLabel } from "./section-label";
import { GitMerge, GitPullRequest, Star, Code2, Trophy } from "lucide-react";

function Heatmap() {
  const cols = 28;
  const rows = 7;
  return (
    <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0,1fr))` }}>
      {Array.from({ length: cols * rows }).map((_, i) => {
        const v = Math.random();
        const c = v > 0.85 ? "bg-[#c6ff3d]" : v > 0.65 ? "bg-[#c6ff3d]/60" : v > 0.4 ? "bg-[#c6ff3d]/30" : v > 0.2 ? "bg-white/12" : "bg-white/5";
        return <div key={i} className={`aspect-square rounded-[2px] ${c}`} />;
      })}
    </div>
  );
}

export function OpenSource() {
  const stats = [
    { i: <GitMerge className="w-4 h-4" />, k: "KDE merge requests", v: "20+", s: "merged & in-review upstream" },
    { i: <GitPullRequest className="w-4 h-4" />, k: "Public PRs", v: "84", s: "across 12 repositories" },
    { i: <Star className="w-4 h-4" />, k: "Repos starred by peers", v: "230+", s: "developer-tooling adjacent" },
    { i: <Trophy className="w-4 h-4" />, k: "CP problems solved", v: "600+", s: "Codeforces / LeetCode / SPOJ" },
  ];

  return (
    <section id="open-source" className="relative py-32 md:py-44">
      <div className="absolute inset-0 grid-bg opacity-25 mask-fade-y" />
      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionLabel index="// 04 — open source" title="Code that survives public review." subtitle="Open-source contributions and competitive programming aren't credentials — they're proof of work. Here's the receipts." />

        <div className="grid grid-cols-12 gap-6">
          {/* Stats grid */}
          <div className="col-span-12 lg:col-span-4 grid grid-cols-2 gap-4">
            {stats.map((m, i) => (
              <motion.div
                key={m.k}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="glass rounded-xl p-4"
              >
                <div className="w-8 h-8 rounded-lg bg-[#c6ff3d]/12 text-[#c6ff3d] flex items-center justify-center">{m.i}</div>
                <div className="font-display text-3xl mt-3">{m.v}</div>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/45 mt-1">{m.k}</div>
                <div className="text-[12px] text-white/45 mt-1">{m.s}</div>
              </motion.div>
            ))}
          </div>

          {/* Heatmap + recent activity */}
          <div className="col-span-12 lg:col-span-8 glass rounded-2xl p-6 md:p-8">
            <div className="flex items-center justify-between mb-5">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">/ contributions / 196 days</div>
                <div className="font-display text-2xl mt-1">A consistent rhythm of shipping.</div>
              </div>
              <div className="hidden md:flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-white/55">
                less
                <div className="flex gap-0.5">
                  {["bg-white/5","bg-white/12","bg-[#c6ff3d]/30","bg-[#c6ff3d]/60","bg-[#c6ff3d]"].map((c)=>(<div key={c} className={`w-3 h-3 rounded-[2px] ${c}`} />))}
                </div>
                more
              </div>
            </div>

            <Heatmap />

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { r: "kde/dolphin", t: "fix(view): debounce thumbnail regeneration on rapid scroll", s: "merged" },
                { r: "kde/kdevelop", t: "feat(parser): incremental symbol-tree refresh", s: "in review" },
                { r: "suleman/findhere", t: "perf(search): batched meilisearch index updates", s: "merged" },
                { r: "kde/plasma-workspace", t: "refactor: extract notification queue into service", s: "merged" },
              ].map((c) => (
                <div key={c.t} className="border border-white/8 rounded-lg p-3.5 flex items-start gap-3 hover:border-[#c6ff3d]/30 transition-colors">
                  <Code2 className="w-4 h-4 text-[#c6ff3d] mt-0.5 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="font-mono text-[11px] text-white/55 truncate">{c.r}</div>
                    <div className="text-[13px] mt-0.5 truncate">{c.t}</div>
                  </div>
                  <span className={`font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0 ${c.s === "merged" ? "bg-[#c6ff3d]/15 text-[#c6ff3d]" : "bg-white/8 text-white/65"}`}>{c.s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
