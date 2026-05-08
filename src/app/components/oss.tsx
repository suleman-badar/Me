import { motion } from "motion/react";
import { SectionLabel } from "./section-label";
import { GitMerge, Code2, Trophy } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface DayData {
  github: number;
  leetcode: number;
  codeforces: number;
  gitlab: number;
}

type HeatmapData = Record<string, DayData>;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getLast52WeekDates(): string[] {
  const dates: string[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dayOfWeek = today.getDay();
  const start = new Date(today);
  start.setDate(start.getDate() - dayOfWeek - 52 * 7 + 1);
  for (let i = 0; i < 52 * 7; i++) {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    dates.push(d.toISOString().split("T")[0]);
  }
  return dates;
}

// Seeded pseudo-random — stable across renders, unique per date+platform
function seededRand(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = Math.imul(1664525, s) + 1013904223;
    return (s >>> 0) / 4294967295;
  };
}

// ─── Hardcoded Activity Generator ────────────────────────────────────────────
//
//  LeetCode:   209 solved · daily grinder · ~1-2/day, occasional 3
//  Codeforces: 111 solved · daily but lighter
//  GitHub:     255 commits · heavier in recent 6 months (Nov 2025–May 2026)
//  GitLab:     155 commits · Dec 2024–today, weekday-heavy

function buildHeatmap(): HeatmapData {
  const map: HeatmapData = {};
  const dates = getLast52WeekDates();
  const total52 = dates.length; // 364

  const ensure = (date: string) => {
    if (!map[date]) map[date] = { github: 0, leetcode: 0, codeforces: 0, gitlab: 0 };
  };

  // ── LeetCode ───────────────────────────────────────────────────────────────
  {
    const rand = seededRand(1337);
    let remaining = 209;
    for (const date of dates) {
      if (remaining <= 0) break;
      const r = rand();
      if (r > 0.20) {                                     // ~80% chance of activity
        const count = r > 0.93 ? 3 : r > 0.72 ? 2 : 1;
        const actual = Math.min(count, remaining);
        ensure(date);
        map[date].leetcode = actual;
        remaining -= actual;
      }
    }
  }

  // ── Codeforces ─────────────────────────────────────────────────────────────
  {
    const rand = seededRand(9999);
    let remaining = 111;
    for (const date of dates) {
      if (remaining <= 0) break;
      const r = rand();
      if (r > 0.42) {                                     // ~58% chance of activity
        const count = r > 0.87 ? 2 : 1;
        const actual = Math.min(count, remaining);
        ensure(date);
        map[date].codeforces = actual;
        remaining -= actual;
      }
    }
  }

  // ── GitHub ─────────────────────────────────────────────────────────────────
  {
    const rand = seededRand(2468);
    let remaining = 255;
    for (let i =1; i < dates.length; i++) {
      if (remaining <= 0) break;
      const date = dates[i];
      const recency = i / total52;                        // 0=oldest, 1=newest
      const prob = recency > 0.5 ? 0.72 : 0.20;          // heavy in last 26 weeks
      const r = rand();
      if (r < prob) {
        const count = r < prob * 0.12 ? 4 : r < prob * 0.32 ? 3 : r < prob * 0.58 ? 2 : 1;
        const actual = Math.min(count, remaining);
        ensure(date);
        map[date].github = actual;
        remaining -= actual;
      }
    }
  }

  // ── GitLab ─────────────────────────────────────────────────────────────────
  // All 52-week dates are May 2025+, so we spread across all of them
  // with weekday bias to reflect real dev behaviour
  {
    const rand = seededRand(5555);
    let remaining = 155;
    for (const date of dates) {
      if (remaining <= 0) break;
      const dow = new Date(date).getDay();                // 0=Sun, 6=Sat
      const isWeekday = dow >= 1 && dow <= 5;
      const prob = isWeekday ? 0.50 : 0.10;
      const r = rand();
      if (r < prob) {
        const count = r < prob * 0.18 ? 3 : r < prob * 0.42 ? 2 : 1;
        const actual = Math.min(count, remaining);
        ensure(date);
        map[date].gitlab = actual;
        remaining -= actual;
      }
    }
  }

  return map;
}

const HEATMAP_DATA: HeatmapData = buildHeatmap();

// ─── Color Blending ───────────────────────────────────────────────────────────
//
//  GitHub     #c6ff3d  portfolio lime
//  LeetCode   #f5a623  amber
//  Codeforces #4fc3f7  sky blue
//  GitLab     #fc6d26  gitlab orange

const PLATFORM_RGB: Record<keyof DayData, [number, number, number]> = {
  github:     [198, 255,  61],
  leetcode:   [245, 166,  35],
  codeforces: [ 79, 195, 247],
  gitlab:     [252, 109,  38],
};

function getDayStyle(day: DayData): React.CSSProperties | undefined {
  const total = day.github + day.leetcode + day.codeforces + day.gitlab;
  if (total === 0) return undefined;

  let r = 0, g = 0, b = 0;
  for (const platform of Object.keys(day) as (keyof DayData)[]) {
    const w = day[platform];
    if (w === 0) continue;
    const [pr, pg, pb] = PLATFORM_RGB[platform];
    r += pr * w; g += pg * w; b += pb * w;
  }
  r = Math.round(r / total);
  g = Math.round(g / total);
  b = Math.round(b / total);

  const opacity = total >= 5 ? 1 : total >= 3 ? 0.75 : total >= 2 ? 0.5 : 0.32;
  return { backgroundColor: `rgba(${r},${g},${b},${opacity})` };
}

// ─── Heatmap ──────────────────────────────────────────────────────────────────

function Heatmap() {
  const dates = getLast52WeekDates();
  return (
    <div className="grid gap-[3px]" style={{ gridTemplateColumns: "repeat(52, minmax(0,1fr))" }}>
      {dates.map((date) => {
        const day = HEATMAP_DATA[date] ?? { github: 0, leetcode: 0, codeforces: 0, gitlab: 0 };
        const style = getDayStyle(day);
        const tip = Object.entries(day)
          .filter(([, v]) => v > 0)
          .map(([k, v]) => `${k}:${v}`)
          .join(" ");
        return (
          <div
            key={date}
            title={tip ? `${date} · ${tip}` : date}
            className={`aspect-square rounded-[2px] transition-opacity hover:opacity-70 ${!style ? "bg-white/5" : ""}`}
            style={style}
          />
        );
      })}
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export function OpenSource() {
  const statCards = [
    {
      icon:  <GitMerge className="w-4 h-4" />,
      label: "GitLab · kde/okular",
      value: "7+",
      sub:   "merge requests",
      detail:"150+ commits upstream",
      color: "#fc6d26",
      href:  "https://invent.kde.org/sulemanbadar",
    },
    {
      icon:  <Code2 className="w-4 h-4" />,
      label: "LeetCode",
      value: "209",
      sub:   "problems solved",
      detail:"98E · 96M · 15H",
      color: "#f5a623",
      href:  "https://leetcode.com/u/sulemanbadar/",
    },
    {
      icon:  <Trophy className="w-4 h-4" />,
      label: "Codeforces",
      value: "111",
      sub:   "problems solved",
      detail:"suleman.badar.butt",
      color: "#4fc3f7",
      href:  "https://codeforces.com/profile/suleman.badar.butt",
    },
  ];

  const legend = [
    { label: "GitHub",     color: "#c6ff3d" },
    { label: "LeetCode",   color: "#f5a623" },
    { label: "Codeforces", color: "#4fc3f7" },
    { label: "GitLab",     color: "#fc6d26" },
  ];

  const recentActivity = [
    {
      repo:   "kde/okular",
      title:  "feature: make sidebar persist over sessions using KConfig",
      status: "merged",
    },
    {
      repo:   "kde/okular",
      title:  "feature: Add Home/End keybindings for document navigation",
      status: "in review",
    },
  ];

  return (
    <section id="open-source" className="relative py-32 md:py-44">
      <div className="absolute inset-0 grid-bg opacity-25 mask-fade-y" />
      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionLabel
          index="// 04 — open source"
          title="Code that survives &ensp;&ensp;&ensp;&ensp; public review."
          subtitle="Open-source contributions and competitive programming aren't credentials — they're proof of work. Here's the receipts."
        />

        <div className="grid grid-cols-12 gap-6">

          {/* ── Stat Cards ── */}
          <div className="col-span-12 lg:col-span-4 grid grid-cols-1 gap-4">
            {statCards.map((card, i) => (
              <motion.a
                key={card.label}
                href={card.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="glass rounded-xl p-5 block hover:ring-1 hover:ring-white/15 transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${card.color}18`, color: card.color }}
                  >
                    {card.icon}
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">
                    {card.label}
                  </span>
                </div>

                <div className="mt-3 flex items-end gap-2">
                  <span className="font-display text-4xl leading-none">{card.value}</span>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-white/40 mb-1">
                    {card.sub}
                  </span>
                </div>

                <div
                  className="mt-2 font-mono text-[11px] tracking-wide"
                  style={{ color: `${card.color}99` }}
                >
                  {card.detail}
                </div>
              </motion.a>
            ))}
          </div>

          {/* ── Heatmap Panel ── */}
          <div className="col-span-12 lg:col-span-8 glass rounded-2xl p-6 md:p-8">

            {/* Header row */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">
                  / contributions / 52 weeks
                </div>
                <div className="font-display text-2xl mt-1">
                  A consistent rhythm of shipping.
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 md:justify-end">
                {legend.map((l) => (
                  <div key={l.label} className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-[2px]" style={{ backgroundColor: l.color }} />
                    <span className="font-mono text-[10px] uppercase tracking-wider text-white/45">
                      {l.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <Heatmap />

            {/* Intensity scale */}
            {/* <div className="mt-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-white/35">
              <span>less</span>
              <div className="flex gap-0.5">
                {[
                  undefined,
                  "rgba(198,255,61,0.32)",
                  "rgba(198,255,61,0.5)",
                  "rgba(198,255,61,0.75)",
                  "rgba(198,255,61,1)",
                ].map((c, idx) => (
                  <div
                    key={idx}
                    className={`w-3 h-3 rounded-[2px] ${!c ? "bg-white/5" : ""}`}
                    style={c ? { backgroundColor: c } : undefined}
                  />
                ))}
              </div>
              <span>more</span>
            </div> */}

            {/* Recent activity */}
            <div className="mt-8">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/35 mb-3">
                / recent activity · kde/okular
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {recentActivity.map((c) => (
                  <div
                    key={c.title}
                    className="border border-white/8 rounded-lg p-3.5 flex items-start gap-3 hover:border-[#fc6d26]/40 transition-colors"
                  >
                    <Code2 className="w-4 h-4 text-[#fc6d26] mt-0.5 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="font-mono text-[11px] text-white/50 truncate">{c.repo}</div>
                      <div className="text-[13px] mt-0.5 line-clamp-2 leading-snug">{c.title}</div>
                    </div>
                    <span
                      className={`font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0 mt-0.5 ${
                        c.status === "merged"
                          ? "bg-[#fc6d26]/15 text-[#fc6d26]"
                          : "bg-white/8 text-white/65"
                      }`}
                    >
                      {c.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}