import { motion } from "motion/react";
import {
  Play,
  Youtube,
  Bot,
  User,
  Search,
  Clock3,
  MessageSquare,
  Sparkles,
  FileText,
} from "lucide-react";

export default function TubeChatVisual() {
  return (
    <div className="relative min-h-[620px] p-8 md:p-12">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="relative w-full min-h-[620px]"
      >
        {/* Main window */}
        <div className="absolute inset-0 rounded-2xl border border-white/10 overflow-hidden bg-[#0b0d11]">

          {/* background glow */}
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-[120px] bg-[#c6ff3d]/10" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full blur-[140px] bg-[#3d8bff]/10" />

          <div className="absolute inset-0 grid-bg opacity-30" />

          {/* ================= HEADER ================= */}

          <div className="absolute top-5 left-5 right-5">

            {/* URL Bar */}
            <div className="glass rounded-full flex items-center gap-3 px-4 py-2.5">

              <Youtube className="w-4 h-4 text-red-500" />

              <span className="font-mono text-[12px] text-white/80 truncate">
                youtube.com/watch?v=AI8r...
              </span>

              <div className="ml-auto flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-[#c6ff3d]">

                <span className="w-2 h-2 rounded-full bg-[#c6ff3d] animate-pulse" />

                Indexed
              </div>
            </div>

            {/* Search prompt */}

            <div className="mt-3 glass rounded-xl px-4 py-3 flex items-center gap-3">

              <Search className="w-4 h-4 text-[#c6ff3d]" />

              <span className="text-[13px] text-white/80 font-mono">
                Explain the retrieval pipeline...
                <span className="blink text-[#c6ff3d]">▌</span>
              </span>

            </div>
          </div>

          {/* ================= CONTENT ================= */}

          <div className="absolute left-5 right-5 top-32 bottom-24 grid grid-cols-12 gap-4">

            {/* LEFT SIDE */}

            <div className="col-span-5 rounded-xl border border-white/10 overflow-hidden bg-black/20">

              {/* video */}

              <div className="relative h-44 bg-gradient-to-br from-[#11161f] to-[#0b0d11] flex items-center justify-center">

                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{
                    repeat: Infinity,
                    duration: 3,
                  }}
                  className="w-16 h-16 rounded-full bg-[#c6ff3d] text-black flex items-center justify-center"
                >
                  <Play className="w-8 h-8 ml-1" />
                </motion.div>

                <div className="absolute bottom-4 left-4 right-4 glass rounded-lg px-3 py-2">

                  <div className="text-[13px] font-medium">
                    Building a RAG Application
                  </div>

                  <div className="font-mono text-[10px] uppercase tracking-wider text-white/45 mt-1">

                    18:24 • TechWithTim
                  </div>

                </div>
              </div>

              {/* transcript */}

              <div className="p-4">

                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-white/45">

                  <FileText className="w-3 h-3" />

                  Transcript
                </div>

                <div className="mt-3 space-y-2">

                  {[
                    "RAG combines retrieval with generation...",
                    "The transcript is chunked before embedding...",
                    "Semantic search returns relevant context...",
                    "The LLM generates grounded responses...",
                  ].map((line, i) => (
                    <div
                      key={i}
                      className={`rounded-md px-3 py-2 text-[11px] ${i === 2
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

            <div className="col-span-7 rounded-xl border border-white/10 bg-black/20 overflow-hidden">

              <div className="border-b border-white/10 px-4 py-3 flex items-center justify-between">

                <div className="flex items-center gap-2">

                  <Bot className="w-4 h-4 text-[#c6ff3d]" />

                  <span className="font-mono text-[11px] uppercase tracking-wider">

                    TubeChat Assistant

                  </span>

                </div>

                <div className="font-mono text-[10px] uppercase tracking-wider text-white/45">

                  Streaming

                </div>

              </div>

              <div className="p-4 space-y-4">

                {/* user */}

                <div className="flex gap-3">

                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">

                    <User className="w-4 h-4" />

                  </div>

                  <div className="glass rounded-xl px-4 py-3 text-[13px] max-w-sm">

                    Explain how semantic retrieval works in this video.

                  </div>

                </div>

                {/* ai */}

                <div className="flex gap-3">

                  <div className="w-8 h-8 rounded-full bg-[#c6ff3d]/15 flex items-center justify-center">

                    <Bot className="w-4 h-4 text-[#c6ff3d]" />

                  </div>

                  <div className="glass rounded-xl px-4 py-3 max-w-md">

                    <div className="text-[13px] leading-relaxed text-white/90">

                      The retriever first searches embedded transcript
                      chunks using semantic similarity, then injects the
                      highest scoring passages into the LLM prompt before
                      generation.

                      <span className="blink text-[#c6ff3d] ml-1">▌</span>

                    </div>

                    {/* sources */}

                    <div className="flex flex-wrap gap-2 mt-4">

                      {[
                        "02:31",
                        "05:48",
                        "09:17",
                      ].map((time) => (

                        <div
                          key={time}
                          className="flex items-center gap-1 rounded-full border border-[#c6ff3d]/20 bg-[#c6ff3d]/10 px-2 py-1 font-mono text-[10px]"
                        >

                          <Clock3 className="w-3 h-3 text-[#c6ff3d]" />

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