import { motion } from "motion/react";

export function SectionLabel({ index, title, subtitle }: { index: string; title: string; subtitle?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7 }}
      className="grid grid-cols-12 gap-6 items-end mb-12 md:mb-20"
    >
      <div className="col-span-12 md:col-span-3 flex items-center gap-3">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#c6ff3d]">[ {index} ]</div>
        <div className="flex-1 h-px bg-white/15" />
      </div>
      <div className="col-span-12 md:col-span-9">
        <h2 className="font-display text-[40px] md:text-[72px] leading-[0.95]">{title}</h2>
        {subtitle && <p className="mt-4 max-w-2xl text-white/55 text-[15px] leading-relaxed">{subtitle}</p>}
      </div>
    </motion.div>
  );
}
