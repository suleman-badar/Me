"use client";

import {
  Users,
  Wifi,
  Crown,
  Activity,
} from "lucide-react";

const PLAYERS = [
  { x: "18%", y: "24%", name: "Player 1" },
  { x: "82%", y: "24%", name: "Player 2" },
  { x: "18%", y: "76%", name: "Player 3" },
  { x: "82%", y: "76%", name: "Player 4" },
];

export default function RangVisual() {
  return (
    <div className="relative w-full min-h-[360px] xs:min-h-[390px] sm:min-h-[450px] md:min-h-[520px] p-3 xs:p-4 sm:p-6 md:p-8 lg:p-12">
      <div className="relative w-full h-[360px] xs:h-[390px] sm:h-[450px] md:h-[520px] rounded-xl sm:rounded-2xl border border-white/10 bg-[#0c0e12] overflow-hidden">
        {/* Grid */}
        <div className="absolute inset-0 grid-bg opacity-30" />

        {/* Glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="
              absolute
              left-1/2 top-1/2
              -translate-x-1/2 -translate-y-1/2
              w-40 h-40
              xs:w-48 xs:h-48
              sm:w-60 sm:h-60
              md:w-72 md:h-72
              rounded-full
              blur-[70px]
              sm:blur-[100px]
              md:blur-[120px]
              bg-[#c6ff3d]/10
            "
          />
        </div>

        {/* Match Header */}
        <div
          className="
            absolute
            top-2.5 xs:top-3 sm:top-4 md:top-5
            left-2.5 xs:left-3 sm:left-4 md:left-5
            right-2.5 xs:right-3 sm:right-4 md:right-5
            z-20
            flex items-center justify-between
            gap-2
            glass
            rounded-lg sm:rounded-xl
            px-2.5 xs:px-3 sm:px-4 md:px-5
            py-2 xs:py-2.5 sm:py-3
          "
        >
          <div className="min-w-0">
            <div className="font-mono text-[7px] xs:text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-white/45">
              Live Match
            </div>

            <div className="mt-0.5 font-display text-sm xs:text-base sm:text-lg md:text-xl truncate">
              Room #A81F
            </div>
          </div>

          <div className="flex items-center gap-1 xs:gap-1.5 sm:gap-2 shrink-0 font-mono text-[8px] xs:text-[9px] sm:text-[10px] md:text-[11px] text-[#c6ff3d]">
            <Activity className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden xs:inline">Connected</span>
          </div>
        </div>

        {/* Network area */}
        <div
          className="
            absolute
            top-[72px] xs:top-[78px] sm:top-[92px] md:top-[108px]
            left-0 right-0
            bottom-[64px] xs:bottom-[68px] sm:bottom-[82px] md:bottom-[96px]
          "
        >
          {/* Connection lines */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden
          >
            <line
              x1="18"
              y1="24"
              x2="50"
              y2="50"
              stroke="rgba(198,255,61,0.32)"
              strokeWidth="0.5"
            />
            <line
              x1="82"
              y1="24"
              x2="50"
              y2="50"
              stroke="rgba(198,255,61,0.32)"
              strokeWidth="0.5"
            />
            <line
              x1="18"
              y1="76"
              x2="50"
              y2="50"
              stroke="rgba(198,255,61,0.32)"
              strokeWidth="0.5"
            />
            <line
              x1="82"
              y1="76"
              x2="50"
              y2="50"
              stroke="rgba(198,255,61,0.32)"
              strokeWidth="0.5"
            />
          </svg>

          {/* Server */}
          <div
            className="
              absolute
              left-1/2 top-1/2
              -translate-x-1/2 -translate-y-1/2
              z-10
              w-14 h-14
              xs:w-16 xs:h-16
              sm:w-20 sm:h-20
              md:w-24 md:h-24
              rounded-full
              border border-[#c6ff3d]/40
              bg-[#c6ff3d]/10
              flex flex-col items-center justify-center
            "
          >
            <Wifi className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#c6ff3d]" />

            <span className="font-mono text-[7px] xs:text-[8px] sm:text-[9px] md:text-[10px] mt-1 sm:mt-1.5 md:mt-2">
              SERVER
            </span>
          </div>

          {/* Players */}
          {PLAYERS.map((player) => (
            <div
              key={player.name}
              className="
                absolute
                -translate-x-1/2 -translate-y-1/2
                z-10
              "
              style={{
                left: player.x,
                top: player.y,
              }}
            >
              <div
                className="
                  glass
                  rounded-md xs:rounded-lg sm:rounded-xl
                  border border-white/10
                  px-2
                  xs:px-2.5
                  sm:px-3.5
                  md:px-5
                  py-2
                  xs:py-2.5
                  sm:py-3
                  md:py-4
                  w-[78px]
                  xs:w-[88px]
                  sm:w-[110px]
                  md:w-36
                "
              >
                <div className="flex items-center gap-1 xs:gap-1.5 sm:gap-2">
                  <Users className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 text-[#c6ff3d] shrink-0" />

                  <span className="font-mono text-[8px] xs:text-[9px] sm:text-[11px] md:text-sm truncate">
                    {player.name}
                  </span>
                </div>

                <div className="mt-1.5 xs:mt-2 sm:mt-2.5 md:mt-3 h-1 xs:h-1.5 sm:h-2 rounded-full bg-white/10 overflow-hidden">
                  <div className="w-3/4 h-full bg-[#c6ff3d]" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom stats */}
        <div
          className="
            absolute
            bottom-2.5 xs:bottom-3 sm:bottom-4 md:bottom-5
            left-2.5 xs:left-3 sm:left-4 md:left-5
            right-2.5 xs:right-3 sm:right-4 md:right-5
            grid grid-cols-3
            gap-1.5 xs:gap-2 sm:gap-3
          "
        >
          <div className="glass rounded-md sm:rounded-lg px-2 xs:px-2.5 sm:px-3 py-2 xs:py-2.5 sm:py-3">
            <div className="font-mono text-[7px] xs:text-[8px] sm:text-[10px] uppercase tracking-tight text-white/45 truncate">
              Active
            </div>

            <div className="mt-1 xs:mt-1.5 text-sm xs:text-base sm:text-lg">
              4 / 4
            </div>
          </div>

          <div className="glass rounded-md sm:rounded-lg px-2 xs:px-2.5 sm:px-3 py-2 xs:py-2.5 sm:py-3">
            <div className="font-mono text-[7px] xs:text-[8px] sm:text-[10px] uppercase tracking-tight text-white/45 truncate">
              Tick Rate
            </div>

            <div className="mt-1 xs:mt-1.5 text-sm xs:text-base sm:text-lg">
              60 Hz
            </div>
          </div>

          <div className="glass rounded-md sm:rounded-lg px-2 xs:px-2.5 sm:px-3 py-2 xs:py-2.5 sm:py-3">
            <div className="font-mono text-[7px] xs:text-[8px] sm:text-[10px] uppercase tracking-tight text-white/45 truncate">
              Winner
            </div>

            <div className="mt-1 xs:mt-1.5 flex items-center gap-1 xs:gap-1.5 text-[10px] xs:text-xs sm:text-sm truncate">
              <Crown className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 text-[#c6ff3d] shrink-0" />
              <span className="truncate">Player 2</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}