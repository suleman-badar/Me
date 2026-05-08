import { motion } from "motion/react";
import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="relative pt-32 md:pt-44 pb-16 overflow-hidden">
      {/* Atmospheric */}
      <div className="absolute inset-0 grid-bg opacity-40 mask-fade-y" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] rounded-full blur-[160px] bg-[#c6ff3d]/15" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c6ff3d]/40 to-transparent" />

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-[#c6ff3d] mb-8">
            <span className="w-2 h-2 rounded-full bg-[#c6ff3d] animate-pulse" />
            // 06 — initiate contact
            <span className="w-2 h-2 rounded-full bg-[#c6ff3d] animate-pulse" />
          </div>
          <h2 className="font-display text-[60px] md:text-[140px] leading-[0.88]">
            Let's build<br /><span className="text-stroke">something</span> <span className="text-[#c6ff3d]">durable.</span>
          </h2>
          <p className="mt-8 max-w-xl mx-auto text-white/55 leading-relaxed">
            Open to startup engineering roles, serious open-source collaboration, and high-trust freelance work.
            Currently in <span className="text-white">UTC+5</span>, replying within <span className="text-white">24h</span>.
          </p>
        </motion.div>

        {/* CTA cluster */}
        <div className="mt-16 grid grid-cols-12 gap-4">
          <a href="mailto:hello@suleman.dev" className="col-span-12 md:col-span-6 group glass rounded-2xl p-6 flex items-center justify-between hover:border-[#c6ff3d]/40 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#c6ff3d]/12 text-[#c6ff3d] flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">primary channel</div>
                <div className="font-display text-xl mt-0.5">hello@suleman.dev</div>
              </div>
            </div>
            <ArrowUpRight className="w-5 h-5 text-white/55 group-hover:text-[#c6ff3d] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
          </a>

          {[
            { i: <Github className="w-5 h-5" />, k: "github", v: "/suleman-badar" },
            { i: <Linkedin className="w-5 h-5" />, k: "linkedin", v: "/in/suleman-badar" },
          ].map((c) => (
            <a key={c.k} href="#" className="col-span-12 md:col-span-3 group glass rounded-2xl p-6 hover:border-[#c6ff3d]/40 transition-colors">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-white/5 text-white flex items-center justify-center">{c.i}</div>
                <ArrowUpRight className="w-4 h-4 text-white/55 group-hover:text-[#c6ff3d] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/45 mt-5">{c.k}</div>
              <div className="font-display text-lg mt-0.5">{c.v}</div>
            </a>
          ))}
        </div>

        {/* Footer strip */}
        <div className="mt-20 pt-8 border-t border-white/8 grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">
          <div>© 2026 Suleman Badar</div>
          <div className="hidden md:block">Designed & built in-house</div>
          <div className="hidden md:block">React · Tailwind · Motion</div>
          <div className="text-right flex items-center gap-2 justify-end">
            <span className="w-1.5 h-1.5 bg-[#c6ff3d] rounded-full animate-pulse" />
            All systems nominal
          </div>
        </div>
      </div>
    </section>
  );
}
