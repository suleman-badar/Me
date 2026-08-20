"use client";

import { motion } from "motion/react";
import { Search, Zap, MapPin } from "lucide-react";

export default function FindHereVisual() {
  return (
    <div className="relative min-h-[620px] p-8 md:p-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="relative w-full min-h-[620px]"
      >
        {/* Map mock */}
        <div className="absolute inset-0 rounded-2xl border border-white/10 overflow-hidden bg-[#0c0e12]">
          {/* topo lines */}
          <svg className="absolute inset-0 w-full h-full opacity-40" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
            {Array.from({ length: 10 }).map((_, i) => (
              <path key={i} d={`M0 ${100 + i * 40} Q 200 ${60 + i * 40 + (i % 2 ? 30 : -10)} 400 ${100 + i * 40} T 800 ${100 + i * 40}`} fill="none" stroke="#c6ff3d" strokeWidth="0.6" opacity={0.3 + (i % 3) * 0.1} />
            ))}
            {Array.from({ length: 8 }).map((_, i) => (
              <path key={"v" + i} d={`M${100 + i * 90} 0 Q ${130 + i * 90} 300 ${100 + i * 90} 600`} fill="none" stroke="#3d8bff" strokeWidth="0.4" opacity="0.25" />
            ))}
          </svg>

          {/* grid */}
          <div className="absolute inset-0 grid-bg opacity-30" />

          {/* Pins */}
          {[
            { x: 28, y: 38, label: "Café Aurora", active: true },
            { x: 62, y: 28, label: "Atlas Studio" },
            { x: 75, y: 60, label: "Northgate" },
            { x: 40, y: 70, label: "Foundry 21" },
            { x: 18, y: 64, label: "The Vault" },
          ].map((p) => (
            <div key={p.label} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${p.x}%`, top: `${p.y}%` }}>
              <div className={`relative w-3 h-3`}>
                {p.active && <div className="absolute inset-0 rounded-full bg-[#c6ff3d]/40 pulse-ring" />}
                <div className={`absolute inset-0 rounded-full ${p.active ? "bg-[#c6ff3d]" : "bg-white/70"}`} />
              </div>
              {p.active && (
                <div className="absolute left-5 top-1 whitespace-nowrap glass rounded-lg px-2.5 py-1.5 text-[11px] font-mono">
                  <div className="flex items-center gap-1.5"><MapPin className="w-3 h-3 text-[#c6ff3d]" /> {p.label}</div>
                </div>
              )}
            </div>
          ))}

          {/* Search bar overlay */}
          <div className="absolute top-5 left-5 right-5">
            <div className="glass rounded-full flex items-center gap-3 px-4 py-2.5">
              <Search className="w-4 h-4 text-[#c6ff3d]" />
              <span className="font-mono text-[12.5px] text-white/80">cofee near rawalpndi<span className="blink text-[#c6ff3d]">▌</span></span>
              <span className="ml-auto font-mono text-[10px] uppercase tracking-wider text-white/45">47ms</span>
            </div>
            <div className="mt-2 glass rounded-2xl divide-y divide-white/5 overflow-hidden">
              {[
                { n: "Café Aurora", d: "1.2 km · ★ 4.8" },
                { n: "Coffee Lab", d: "2.4 km · ★ 4.6" },
                { n: "Foundry 21", d: "3.0 km · ★ 4.5" },
              ].map((r, i) => (
                <div key={r.n} className={`flex items-center gap-3 px-3.5 py-2.5 ${i === 0 ? "bg-[#c6ff3d]/8" : ""}`}>
                  <div className="w-7 h-7 rounded-md bg-white/5 flex items-center justify-center">
                    <MapPin className="w-3.5 h-3.5 text-[#c6ff3d]" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[13px]">{r.n}</div>
                    <div className="font-mono text-[10.5px] text-white/45">{r.d}</div>
                  </div>
                  {i === 0 && <Zap className="w-3.5 h-3.5 text-[#c6ff3d]" />}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom telemetry */}
          <div className="absolute bottom-5 left-5 right-5 flex gap-3">
            <div className="glass rounded-lg px-3 py-2 font-mono text-[10px] uppercase tracking-wider">
              <span className="text-white/45">qps</span> <span className="text-[#c6ff3d]">2,140</span>
            </div>
            <div className="glass rounded-lg px-3 py-2 font-mono text-[10px] uppercase tracking-wider">
              <span className="text-white/45">index</span> <span className="text-[#c6ff3d]">142k docs</span>
            </div>
            <div className="glass rounded-lg px-3 py-2 font-mono text-[10px] uppercase tracking-wider ml-auto">
              <span className="text-white/45">region</span> <span className="text-[#c6ff3d]">eu-west-1</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}