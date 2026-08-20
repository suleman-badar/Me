"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

interface HeroRoleRotatorProps {
  roles: readonly string[];
}

export function HeroRoleRotator({
  roles,
}: HeroRoleRotatorProps) {
  const [roleIdx, setRoleIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIdx((index) => (index + 1) % roles.length);
    }, 2400);

    return () => clearInterval(timer);
  }, [roles.length]);

  return (
    <div className="relative h-7 overflow-hidden flex-1 max-w-md">
      {roles.map((role, index) => (
        <motion.div
          key={role}
          animate={{
            y: (index - roleIdx) * 28,
            opacity: index === roleIdx ? 1 : 0,
          }}
          transition={{
            duration: 0.6,
            ease: [0.22, 0.61, 0.36, 1],
          }}
          className="absolute inset-0 text-white"
        >
          {role}
          <span className="blink text-[#c6ff3d] ml-1">▌</span>
        </motion.div>
      ))}
    </div>
  );
}