import {
  Users,
  Wifi,
  Crown,
  Activity,
} from "lucide-react";

export default function RangVisual() {
  return (
    <div className="relative h-full min-h-[520px] p-8 md:p-12">
      <div className="relative h-full rounded-2xl border border-white/10 bg-[#0c0e12] overflow-hidden">

        {/* Grid */}
        <div className="absolute inset-0 grid-bg opacity-30" />

        {/* Glow */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 w-72 h-72 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px] bg-[#c6ff3d]/10" />
        </div>

        {/* Match Header */}

        <div className="absolute top-5 left-5 right-5 flex items-center justify-between glass rounded-xl px-5 py-3">

          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/45">
              Live Match
            </div>

            <div className="mt-1 font-display text-xl">
              Room #A81F
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono text-[11px] text-[#c6ff3d]">
            <Activity className="w-4 h-4" />
            Connected
          </div>

        </div>

        {/* Network */}

        <div className="absolute inset-0 flex items-center justify-center">

          {/* Center */}

          <div className="absolute w-24 h-24 rounded-full border border-[#c6ff3d]/40 bg-[#c6ff3d]/10 flex flex-col items-center justify-center">

            <Wifi className="w-6 h-6 text-[#c6ff3d]" />

            <span className="font-mono text-[10px] mt-2">
              SERVER
            </span>

          </div>

          {[
            { x: "20%", y: "28%", name: "Player 1" },
            { x: "80%", y: "28%", name: "Player 2" },
            { x: "20%", y: "72%", name: "Player 3" },
            { x: "80%", y: "72%", name: "Player 4" },
          ].map((p) => (
            <div
              key={p.name}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{
                left: p.x,
                top: p.y,
              }}
            >
              <div className="glass rounded-xl px-5 py-4 w-36 border border-white/10">

                <div className="flex items-center gap-2">

                  <Users className="w-4 h-4 text-[#c6ff3d]" />

                  <span className="text-sm">
                    {p.name}
                  </span>

                </div>

                <div className="mt-3 h-2 rounded-full bg-white/10 overflow-hidden">

                  <div className="w-3/4 h-full bg-[#c6ff3d]" />

                </div>

              </div>
            </div>
          ))}

          {/* Connection Lines */}

          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <line x1="20" y1="28" x2="50" y2="50" stroke="#c6ff3d55" />
            <line x1="80" y1="28" x2="50" y2="50" stroke="#c6ff3d55" />
            <line x1="20" y1="72" x2="50" y2="50" stroke="#c6ff3d55" />
            <line x1="80" y1="72" x2="50" y2="50" stroke="#c6ff3d55" />
          </svg>

        </div>

        {/* Bottom Stats */}

        <div className="absolute bottom-5 left-5 right-5 grid grid-cols-3 gap-3">

          <div className="glass rounded-lg p-3">
            <div className="font-mono text-[10px] uppercase text-white/45">
              Active Players
            </div>

            <div className="mt-2 text-lg">
              4 / 4
            </div>
          </div>

          <div className="glass rounded-lg p-3">
            <div className="font-mono text-[10px] uppercase text-white/45">
              Tick Rate
            </div>

            <div className="mt-2 text-lg">
              60 Hz
            </div>
          </div>

          <div className="glass rounded-lg p-3">
            <div className="font-mono text-[10px] uppercase text-white/45">
              Winner
            </div>

            <div className="mt-2 flex items-center gap-2">
              <Crown className="w-4 h-4 text-[#c6ff3d]" />
              Player 2
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}