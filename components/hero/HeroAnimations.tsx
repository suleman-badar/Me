"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import type { ReactNode } from "react";
import { HeroOrb } from "./HeroOrb";

type Variant =
  | "background"
  | "eyebrow"
  | "name"
  | "description"
  | "orb"
  | "terminal";

interface HeroAnimationsProps {
  variant: Variant;
  children?: ReactNode;
  delay?: number;
}

export function HeroAnimations({
  variant,
  children,
  delay = 0,
}: HeroAnimationsProps) {
  /*
   * These values are created only for the background parallax variant.
   * Keeping them inside the client component avoids putting any of this
   * browser-side state into the main Server Component.
   */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const px = useSpring(
    useTransform(mx, [-0.5, 0.5], [-20, 20]),
    {
      stiffness: 50,
      damping: 15,
    }
  );

  const py = useSpring(
    useTransform(my, [-0.5, 0.5], [-20, 20]),
    {
      stiffness: 50,
      damping: 15,
    }
  );

  const negPx = useTransform(px, (value) => -value);
  const negPy = useTransform(py, (value) => -value);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();

    mx.set((event.clientX - rect.left) / rect.width - 0.5);
    my.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  switch (variant) {
    case "background":
      return (
        <>
          {/* Desktop interactive background */}
          <div
            onMouseMove={handleMouseMove}
            className="absolute inset-0 hidden lg:block"
            aria-hidden="true"
          >
            <motion.div
              style={{ x: px, y: py }}
              className="absolute -top-40 -left-40 w-[640px] h-[640px] rounded-full blur-[140px] bg-[#c6ff3d]/[0.12] pointer-events-none"
            />

            <motion.div
              style={{ x: negPx, y: negPy }}
              className="absolute -bottom-40 -right-40 w-[720px] h-[720px] rounded-full blur-[160px] bg-[#3d8bff]/[0.12] pointer-events-none"
            />
          </div>

          {/* Mobile static version */}
          <div
            className="absolute inset-0 lg:hidden pointer-events-none"
            aria-hidden="true"
          >
            <div className="absolute -top-40 -left-40 w-[640px] h-[640px] rounded-full blur-[140px] bg-[#c6ff3d]/[0.12]" />

            <div className="absolute -bottom-40 -right-40 w-[720px] h-[720px] rounded-full blur-[160px] bg-[#3d8bff]/[0.12]" />
          </div>
        </>
      );

    case "eyebrow":
      return (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay }}
        >
          {children}
        </motion.div>
      );

    case "name":
      return (
        <motion.span
          initial={{ opacity: 0, y: 80, rotateX: 40 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 1,
            delay,
            ease: [0.22, 0.61, 0.36, 1],
          }}
          className="block"
        >
          {children}
        </motion.span>
      );

    case "description":
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 1 }}
        >
          {children}
        </motion.div>
      );

    case "orb":
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1,
            delay: 0.3,
            ease: [0.22, 0.61, 0.36, 1],
          }}
          style={{
            transformOrigin: "center center",
          }}
          className="relative aspect-square max-w-[480px] mx-auto"
        >
          <HeroOrb />
        </motion.div>
      );

    case "terminal":
      return (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          {children}
        </motion.div>
      );
  }
}