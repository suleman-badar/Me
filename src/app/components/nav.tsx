import { motion } from "motion/react";
import { Github, Linkedin, Mail } from "lucide-react";

export function Nav() {
  const items = [
    { id: "work", label: "01 / Work" },
    { id: "stack", label: "02 / Stack" },
    { id: "open-source", label: "03 / OSS" },
    { id: "philosophy", label: "04 / Philosophy" },
    { id: "contact", label: "05 / Contact" },
  ];
  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 pt-5">
        <div className="glass rounded-full flex items-center justify-between px-4 md:px-6 py-2.5">
          <a href="#top" className="flex items-center gap-2.5">
            <div className="relative w-7 h-7">
              <div className="absolute inset-0 rounded-md border border-[#c6ff3d]/40 rotate-45" />
              <div className="absolute inset-1 rounded-sm bg-[#c6ff3d]/80" />
            </div>
            <span className="font-mono tracking-tight text-[13px]">SB<span className="text-[#c6ff3d]">/</span>Engineer</span>
          </a>
          <nav className="hidden md:flex items-center gap-1">
            {items.map((it) => (
              <a key={it.id} href={`#${it.id}`} className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/55 hover:text-white px-3 py-1.5 transition-colors">
                {it.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a href="https://github.com/suleman-badar" className="hidden md:flex w-8 h-8 items-center justify-center rounded-full hover:bg-white/5"><Github className="w-3.5 h-3.5" /></a>
            <a href="https://www.linkedin.com/in/suleman-badar/" className="hidden md:flex w-8 h-8 items-center justify-center rounded-full hover:bg-white/5"><Linkedin className="w-3.5 h-3.5" /></a>
            <a href="#contact" className="group relative flex items-center gap-2 bg-[#c6ff3d] text-black rounded-full pl-3.5 pr-1.5 py-1 font-mono text-[11px] uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-black/80 animate-pulse" />
              Available
              <Mail className="w-3.5 h-3.5 ml-1 bg-black/85 text-[#c6ff3d] rounded-full p-[3px] w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
