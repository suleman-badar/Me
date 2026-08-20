"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

export function NavAnimation({ children }: { children: ReactNode }) {
  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      {children}
    </motion.header>
  );
}