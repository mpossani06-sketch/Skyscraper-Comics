"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

export interface RevealProps {
  children: ReactNode;
  /** Stagger offset in seconds. */
  delay?: number;
  /** Slide direction. */
  from?: "up" | "left" | "right" | "none";
  className?: string;
  as?: "div" | "li" | "section";
}

/**
 * Fade/slide content up on scroll into view (once). Falls back to an
 * instant, no-transform state when the user prefers reduced motion.
 */
export function Reveal({
  children,
  delay = 0,
  from = "up",
  className = "",
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const offset =
    from === "up"
      ? { y: 28 }
      : from === "left"
        ? { x: -28 }
        : from === "right"
          ? { x: 28 }
          : {};

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
