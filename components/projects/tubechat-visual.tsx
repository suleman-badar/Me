"use client";

import { motion } from "motion/react";
import {
  Play,
  Youtube,
  Bot,
  User,
  Search,
  Clock3,
  FileText,
} from "lucide-react";

export default function TubeChatVisual() {
  return (
    <div className="relative min-h-[520px] sm:min-h-[560px] lg:min-h-[620px] p-4 sm:p-6 md:p-8 lg:p-12">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="relative w-full min-h-[520px] sm:min-h-[560px] lg:min-h-[620px]"
      >
        {/* Main window */}
        <div className="absolute inset-0 rounded-xl sm:rounded-2xl border border-white/10 overflow-hidden bg-[#0b0d11]">
          {/* Background glow */}
          <div className="absolute -top-24 -right-24 w-56 h-56 sm:w-72 sm:h-72 rounded-full blur-[100px] sm:blur-[120px] bg-[#c6ff3d]/10" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 sm:w-80 sm:h-80 rounded-full blur-[110px] sm:blur-[140px] bg-[#3d8bff]/10" />

          <div className="absolute inset-0 grid-bg opacity-30" />

          {/* HEADER */}
          <div className="absolute top-3 sm:top-5 left-3 sm:left-5 right-3 sm:right-5">
            {/* URL bar */}
            <div className="glass rounded-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-2.5">
              <Youtube className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500 shrink-0" />

              <span className="font-mono text-[10px] sm:text-[12px] text-white/80 truncate">
                youtube.com/watch?v=AI8r...
              </span>

              <div className="ml-auto flex items-center gap-1.5 sm:gap-2 font-mono text-[8px] sm:text-[10px] uppercase tracking-wider text-[#c6ff3d] shrink-0">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#c6ff3d] animate-pulse" />
                <span className="hidden xs:inline">Indexed</span>
              </div>
            </div>

            {/* Search prompt */}
            <div className="mt-2 sm:mt-3 glass rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 flex items-center gap-2 sm:gap-3">
              <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#c6ff3d] shrink-0" />

              <span className="text-[10px] sm:text-[13px] text-white/80 font-mono truncate">
                Explain the retrieval pipeline...
                <span className="blink text-[#c6ff3d]">▌</span>
              </span>
            </div>
          </div>

          {/* CONTENT */}
          <div className="absolute left-3 sm:left-5 right-3 sm:right-5 top-[108px] sm:top-32 bottom-4 sm:bottom-6 lg:bottom-24 flex flex-col lg:grid lg:grid-cols-12 gap-3 sm:gap-4 overflow-y-auto lg:overflow-visible">
            {/* LEFT SIDE */}
            <div className="w-full lg:col-span-5 rounded-lg sm:rounded-xl border border-white/10 overflow-hidden bg-black/20 shrink-0">
              {/* Video */}
              <div className="relative h-32 sm:h-40 md:h-44 bg-gradient-to-br from-[#11161f] to-[#0b0d11] flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{
                    repeat: Infinity,
                    duration: 3,
                  }}
                  className="mb-16 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#c6ff3d] text-black flex items-center justify-center"
                >
                  <Play className="w-6 h-6 sm:w-8 sm:h-8 ml-0.5 sm:ml-1" />
                </motion.div>

                <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 glass rounded-md sm:rounded-lg px-2.5 sm:px-3 py-1.5 sm:py-2">
                  <div className="text-[11px] sm:text-[13px] font-medium truncate">
                    Building a RAG Application
                  </div>

                  <div className="font-mono text-[8px] sm:text-[10px] uppercase tracking-wider text-white/45 mt-1">
                    18:24 • TechWithTim
                  </div>
                </div>
              </div>

              {/* Transcript */}
              <div className="p-3 sm:p-4">
                <div className="flex items-center gap-2 font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-white/45">
                  <FileText className="w-3 h-3" />
                  Transcript
                </div>

                <div className="mt-2 sm:mt-3 space-y-1.5 sm:space-y-2">
                  {[
                    "RAG combines retrieval with generation...",
                    "The transcript is chunked before embedding...",
                    "Semantic search returns relevant context...",
                    "The LLM generates grounded responses...",
                  ].map((line, i) => (
                    <div
                      key={i}
                      className={`rounded-md px-2.5 sm:px-3 py-1.5 sm:py-2 text-[9px] sm:text-[11px] ${
                        i === 2
                          ? "bg-[#c6ff3d]/10 border border-[#c6ff3d]/20"
                          : "bg-white/[0.03]"
                      }`}
                    >
                      {line}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="w-full lg:col-span-7 rounded-lg sm:rounded-xl border border-white/10 bg-black/20 overflow-hidden shrink-0">
              <div className="border-b border-white/10 px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between">
                <div className="flex items-center gap-2 min-w-0">
                  <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#c6ff3d] shrink-0" />

                  <span className="font-mono text-[9px] sm:text-[11px] uppercase tracking-wider truncate">
                    TubeChat Assistant
                  </span>
                </div>

                <div className="font-mono text-[8px] sm:text-[10px] uppercase tracking-wider text-white/45 shrink-0 ml-2">
                  Streaming
                </div>
              </div>

              <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
                {/* User */}
                <div className="flex gap-2 sm:gap-3">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>

                  <div className="glass rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-[11px] sm:text-[13px] max-w-[85%]">
                    Explain how semantic retrieval works in this video.
                  </div>
                </div>

                {/* AI */}
                <div className="flex gap-2 sm:gap-3">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#c6ff3d]/15 flex items-center justify-center shrink-0">
                    <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#c6ff3d]" />
                  </div>

                  <div className="glass rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 max-w-[92%]">
                    <div className="text-[11px] sm:text-[13px] leading-relaxed text-white/90">
                      The retriever first searches embedded transcript
                      chunks using semantic similarity, then injects the
                      highest scoring passages into the LLM prompt before
                      generation.

                      <span className="blink text-[#c6ff3d] ml-1">▌</span>
                    </div>

                    {/* Sources */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-3 sm:mt-4">
                      {["02:31", "05:48", "09:17"].map((time) => (
                        <div
                          key={time}
                          className="flex items-center gap-1 rounded-full border border-[#c6ff3d]/20 bg-[#c6ff3d]/10 px-1.5 sm:px-2 py-0.5 sm:py-1 font-mono text-[8px] sm:text-[10px]"
                        >
                          <Clock3 className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#c6ff3d]" />
                          {time}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}