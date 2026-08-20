import { Github, Linkedin, Mail } from "lucide-react";
import { NavAnimation } from "./NavAnimation";

export function Nav() {
  const items = [
    { id: "stack", label: "01 / Stack" },
    { id: "work", label: "02 / Work" },
    { id: "open-source", label: "03 / OSS" },
    { id: "feedback", label: "04 / Signal" },
    { id: "contact", label: "05 / Contact" },
  ];

  return (
    <NavAnimation>
      <div className="mx-auto max-w-[1550px] px-6 md:px-10 pt-5">
        <div className="glass rounded-full flex items-center justify-between px-4 md:px-6 py-2.5">
          {/*Using anchor <a></a> tags bcz we are navigating in the same page */ }
          <a href="#top" className="flex items-center gap-2.5">
            <div className="relative w-7 h-7">
              <div className="absolute inset-0 rounded-md border border-[#c6ff3d]/40 rotate-45" />
              <div className="absolute inset-1 rounded-sm bg-[#c6ff3d]/80" />
            </div>

            <span className="font-mono tracking-tight text-[13px]">
              SB<span className="text-[#c6ff3d]">/</span>Engineer
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-1">
            {items.map((it) => (
              <a
                key={it.id}
                href={`#${it.id}`}
                className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/55 hover:text-white px-3 py-1.5 transition-colors"
              >
                {it.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="https://github.com/suleman-badar"
              className="hidden md:flex w-8 h-8 items-center justify-center rounded-full hover:bg-white/5"
            >
              <Github className="w-3.5 h-3.5" />
            </a>

            <a
              href="https://www.linkedin.com/in/suleman-badar/"
              className="hidden md:flex w-8 h-8 items-center justify-center rounded-full hover:bg-white/5"
            >
              <Linkedin className="w-3.5 h-3.5" />
            </a>

            <a
              href="#contact"
              className="group relative flex items-center gap-2 bg-[#c6ff3d] text-black rounded-full pl-3.5 pr-1.5 py-1 font-mono text-[11px] uppercase tracking-wider"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-black/80 animate-pulse" />
              Available
              <Mail className="w-3.5 h-3.5 ml-1 bg-black/85 text-[#c6ff3d] rounded-full p-[3px] w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </NavAnimation>
  );
}