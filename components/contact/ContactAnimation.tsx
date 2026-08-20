"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

interface ContactAnimationProps {
  children: ReactNode;
}

export function ContactAnimation({
  children,
}: ContactAnimationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9 }}
      className="text-center"
    >
      {children}
    </motion.div>
  );
}