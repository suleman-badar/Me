"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

interface OpenSourceAnimationsProps {
  children: ReactNode;
  delay?: number;
}

export function OpenSourceAnimations({
  children,
  delay = 0,
}: OpenSourceAnimationsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}