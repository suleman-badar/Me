import {
  GitMerge,
  Code2,
  Trophy,
} from "lucide-react";
import { SectionLabel } from "../section-label";
import { OpenSourceAnimations } from "./OpenSourceAnimations";

interface DayData {
  github: number;
  leetcode: number;
  codeforces: number;
  gitlab: number;
}

type HeatmapData = Record<string, DayData>;

const PLATFORM_RGB: Record<
  keyof DayData,
  [number, number, number]
> = {
  github: [198, 255, 61],
  leetcode: [245, 166, 35],
  codeforces: [79, 195, 247],
  gitlab: [252, 109, 38],
};

function getLast52WeekDates(): string[] {
  const dates: string[] = [];
  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const dayOfWeek = today.getDay();

  const start = new Date(today);
  start.setDate(
    start.getDate() - dayOfWeek - 52 * 7 + 1
  );

  for (let i = 0; i < 52 * 7; i++) {
    const date = new Date(start);
    date.setDate(date.getDate() + i);

    dates.push(date.toISOString().split("T")[0]);
  }

  return dates;
}

function seededRand(seed: number): () => number {
  let value = seed >>> 0;

  return () => {
    value =
      Math.imul(1664525, value) + 1013904223;

    return (value >>> 0) / 4294967295;
  };
}

function buildHeatmap(): HeatmapData {
  const map: HeatmapData = {};
  const dates = getLast52WeekDates();
  const total52 = dates.length;

  const ensure = (date: string) => {
    if (!map[date]) {
      map[date] = {
        github: 0,
        leetcode: 0,
        codeforces: 0,
        gitlab: 0,
      };
    }
  };

  // LeetCode
  {
    const rand = seededRand(1337);
    let remaining = 209;

    for (const date of dates) {
      if (remaining <= 0) break;

      const random = rand();

      if (random > 0.2) {
        const count =
          random > 0.93
            ? 3
            : random > 0.72
              ? 2
              : 1;

        const actual = Math.min(
          count,
          remaining
        );

        ensure(date);
        map[date].leetcode = actual;
        remaining -= actual;
      }
    }
  }

  // Codeforces
  {
    const rand = seededRand(9999);
    let remaining = 111;

    for (const date of dates) {
      if (remaining <= 0) break;

      const random = rand();

      if (random > 0.42) {
        const count =
          random > 0.87 ? 2 : 1;

        const actual = Math.min(
          count,
          remaining
        );

        ensure(date);
        map[date].codeforces = actual;
        remaining -= actual;
      }
    }
  }

  // GitHub
  {
    const rand = seededRand(2468);
    let remaining = 255;

    for (let i = 1; i < dates.length; i++) {
      if (remaining <= 0) break;

      const date = dates[i];
      const recency = i / total52;
      const probability =
        recency > 0.5 ? 0.72 : 0.2;

      const random = rand();

      if (random < probability) {
        const count =
          random < probability * 0.12
            ? 4
            : random < probability * 0.32
              ? 3
              : random < probability * 0.58
                ? 2
                : 1;

        const actual = Math.min(
          count,
          remaining
        );

        ensure(date);
        map[date].github = actual;
        remaining -= actual;
      }
    }
  }

  // GitLab
  {
    const rand = seededRand(5555);
    let remaining = 155;

    for (const date of dates) {
      if (remaining <= 0) break;

      const dayOfWeek =
        new Date(date).getDay();

      const isWeekday =
        dayOfWeek >= 1 && dayOfWeek <= 5;

      const probability =
        isWeekday ? 0.5 : 0.1;

      const random = rand();

      if (random < probability) {
        const count =
          random < probability * 0.18
            ? 3
            : random < probability * 0.42
              ? 2
              : 1;

        const actual = Math.min(
          count,
          remaining
        );

        ensure(date);
        map[date].gitlab = actual;
        remaining -= actual;
      }
    }
  }

  return map;
}

const HEATMAP_DATA = buildHeatmap();

function getDayStyle(
  day: DayData
): React.CSSProperties | undefined {
  const total =
    day.github +
    day.leetcode +
    day.codeforces +
    day.gitlab;

  if (total === 0) return undefined;

  let r = 0;
  let g = 0;
  let b = 0;

  for (const platform of Object.keys(
    day
  ) as (keyof DayData)[]) {
    const weight = day[platform];

    if (weight === 0) continue;

    const [
      platformR,
      platformG,
      platformB,
    ] = PLATFORM_RGB[platform];

    r += platformR * weight;
    g += platformG * weight;
    b += platformB * weight;
  }

  r = Math.round(r / total);
  g = Math.round(g / total);
  b = Math.round(b / total);

  const opacity =
    total >= 5
      ? 1
      : total >= 3
        ? 0.75
        : total >= 2
          ? 0.5
          : 0.32;

  return {
    backgroundColor: `rgba(${r},${g},${b},${opacity})`,
  };
}

function Heatmap() {
  const dates = getLast52WeekDates();

  return (
    <div
      className="grid gap-[3px]"
      style={{
        gridTemplateColumns:
          "repeat(52, minmax(0,1fr))",
      }}
    >
      {dates.map((date) => {
        const day =
          HEATMAP_DATA[date] ?? {
            github: 0,
            leetcode: 0,
            codeforces: 0,
            gitlab: 0,
          };

        const style = getDayStyle(day);

        const tooltip =
          Object.entries(day)
            .filter(([, value]) => value > 0)
            .map(([platform, value]) =>
              `${platform}:${value}`
            )
            .join(" ");

        return (
          <div
            key={date}
            title={
              tooltip
                ? `${date} · ${tooltip}`
                : date
            }
            className={`aspect-square rounded-[2px] transition-opacity hover:opacity-70 ${
              !style ? "bg-white/5" : ""
            }`}
            style={style}
          />
        );
      })}
    </div>
  );
}

const STAT_CARDS = [
  {
    icon: <GitMerge className="w-4 h-4" />,
    label: "GitLab · kde/okular",
    value: "7+",
    sub: "merge requests",
    detail: "150+ commits upstream",
    color: "#fc6d26",
    href: "https://invent.kde.org/sulemanbadar",
  },
  {
    icon: <Code2 className="w-4 h-4" />,
    label: "LeetCode",
    value: "209",
    sub: "problems solved",
    detail: "98E · 96M · 15H",
    color: "#f5a623",
    href: "https://leetcode.com/u/sulemanbadar/",
  },
  {
    icon: <Trophy className="w-4 h-4" />,
    label: "Codeforces",
    value: "111",
    sub: "problems solved",
    detail: "suleman.badar.butt",
    color: "#4fc3f7",
    href: "https://codeforces.com/profile/suleman.badar.butt",
  },
];

const LEGEND = [
  { label: "GitHub", color: "#c6ff3d" },
  { label: "LeetCode", color: "#f5a623" },
  { label: "Codeforces", color: "#4fc3f7" },
  { label: "GitLab", color: "#fc6d26" },
];

const RECENT_ACTIVITY = [
  {
    repo: "kde/okular",
    title:
      "feature: make sidebar persist over sessions using KConfig",
    status: "merged",
  },
  {
    repo: "kde/okular",
    title:
      "feature: Add Home/End keybindings for document navigation",
    status: "in review",
  },
];

export function OpenSource() {
  return (
    <section
      id="open-source"
      className="relative py-8 md:py-12"
    >
      <div className="absolute inset-0 grid-bg opacity-25 mask-fade-y" />

      <div className="relative mx-auto max-w-[1550px] px-6 md:px-10">
        <SectionLabel
          index="// 04 — open source"
          title="Code that survives &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp; public review."
          subtitle="Open-source contributions and competitive programming aren't credentials — they're proof of work. Here's the receipts."
        />

        <div className="grid grid-cols-12 gap-6">
          {/* Stat cards */}
          <div className="col-span-12 lg:col-span-4 grid grid-cols-1 gap-4">
            {STAT_CARDS.map((card, index) => (
              <OpenSourceAnimations
                key={card.label}
                delay={index * 0.07}
              >
                <a
                  href={card.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass rounded-xl p-5 block hover:ring-1 hover:ring-white/15 transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{
                        backgroundColor: `${card.color}18`,
                        color: card.color,
                      }}
                    >
                      {card.icon}
                    </div>

                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">
                      {card.label}
                    </span>
                  </div>

                  <div className="mt-3 flex items-end gap-2">
                    <span className="font-display text-4xl leading-none">
                      {card.value}
                    </span>

                    <span className="font-mono text-[11px] uppercase tracking-wider text-white/40 mb-1">
                      {card.sub}
                    </span>
                  </div>

                  <div
                    className="mt-2 font-mono text-[11px] tracking-wide"
                    style={{
                      color: `${card.color}99`,
                    }}
                  >
                    {card.detail}
                  </div>
                </a>
              </OpenSourceAnimations>
            ))}
          </div>

          {/* Heatmap */}
          <div className="col-span-12 lg:col-span-8 glass rounded-2xl p-6 md:p-8">
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
                {LEGEND.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-1.5"
                  >
                    <div
                      className="w-2.5 h-2.5 rounded-[2px]"
                      style={{
                        backgroundColor: item.color,
                      }}
                    />

                    <span className="font-mono text-[10px] uppercase tracking-wider text-white/45">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <Heatmap />

            {/* Recent activity */}
            <div className="mt-8">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/35 mb-3">
                / recent activity · kde/okular
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {RECENT_ACTIVITY.map((activity) => (
                  <div
                    key={activity.title}
                    className="border border-white/8 rounded-lg p-3.5 flex items-start gap-3 hover:border-[#fc6d26]/40 transition-colors"
                  >
                    <Code2 className="w-4 h-4 text-[#fc6d26] mt-0.5 shrink-0" />

                    <div className="min-w-0 flex-1">
                      <div className="font-mono text-[11px] text-white/50 truncate">
                        {activity.repo}
                      </div>

                      <div className="text-[13px] mt-0.5 line-clamp-2 leading-snug">
                        {activity.title}
                      </div>
                    </div>

                    <span
                      className={`font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0 mt-0.5 ${
                        activity.status === "merged"
                          ? "bg-[#fc6d26]/15 text-[#fc6d26]"
                          : "bg-white/8 text-white/65"
                      }`}
                    >
                      {activity.status}
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