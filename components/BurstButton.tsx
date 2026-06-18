"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

type Variant = "pow" | "pop" | "zap" | "ink";

const variantClasses: Record<Variant, string> = {
  pow: "bg-pow text-paper",
  pop: "bg-pop text-ink",
  zap: "bg-zap text-paper",
  ink: "bg-ink text-paper",
};

export interface BurstButtonProps {
  children: ReactNode;
  variant?: Variant;
  /** Render as a link when provided, otherwise a <button>. */
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  /** Show a quick "POW!" flash on click. */
  pow?: boolean;
  className?: string;
  "aria-label"?: string;
}

/* Starburst silhouette via clip-path (a 16-point spike polygon). */
const burstClip =
  "polygon(50% 0%, 61% 13%, 77% 8%, 78% 25%, 95% 27%, 86% 42%, 100% 50%, 86% 58%, 95% 73%, 78% 75%, 77% 92%, 61% 87%, 50% 100%, 39% 87%, 23% 92%, 22% 75%, 5% 73%, 14% 58%, 0% 50%, 14% 42%, 5% 27%, 22% 25%, 23% 8%, 39% 13%)";

export function BurstButton({
  children,
  variant = "pow",
  href,
  onClick,
  type = "button",
  pow = false,
  className = "",
  "aria-label": ariaLabel,
}: BurstButtonProps) {
  const reduce = useReducedMotion();
  const [flash, setFlash] = useState(false);

  const handleClick = () => {
    if (pow && !reduce) {
      setFlash(true);
      window.setTimeout(() => setFlash(false), 450);
    }
    onClick?.();
  };

  const label = (
    <span
      className={[
        "relative z-10 inline-grid place-items-center text-center font-accent uppercase leading-none",
        "px-7 py-4 text-sm tracking-tight sm:px-9 sm:py-5 sm:text-base",
      ].join(" ")}
    >
      {children}
    </span>
  );

  // The inked burst is drawn as an ::before-style layer behind the label so
  // the spiky silhouette gets a black outline (clip-path can't take a border).
  const inner = (
    <>
      <span
        aria-hidden
        className="absolute inset-0 bg-ink"
        style={{ clipPath: burstClip }}
      />
      <span
        aria-hidden
        className={`absolute inset-[5px] ${variantClasses[variant]}`}
        style={{ clipPath: burstClip }}
      />
      {label}
      {flash && (
        <span
          aria-hidden
          className="pointer-events-none absolute -top-5 -right-3 z-20 -rotate-12 font-display text-2xl text-pop drop-shadow-[2px_2px_0_var(--color-ink)]"
        >
          POW!
        </span>
      )}
    </>
  );

  const motionProps = reduce
    ? {}
    : {
        whileHover: { scale: 1.08 },
        whileTap: { scale: 0.92 },
        transition: { type: "spring" as const, stiffness: 500, damping: 18 },
      };

  const sharedClass = [
    "relative inline-grid place-items-center select-none",
    "min-h-[3.5rem] min-w-[3.5rem]",
    className,
  ].join(" ");

  if (href) {
    const external = href.startsWith("http");
    const MotionLink = motion.create(Link);
    return (
      <MotionLink
        href={href}
        aria-label={ariaLabel}
        onClick={handleClick}
        className={sharedClass}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...motionProps}
      >
        {inner}
      </MotionLink>
    );
  }

  return (
    <motion.button
      type={type}
      aria-label={ariaLabel}
      onClick={handleClick}
      className={sharedClass}
      {...motionProps}
    >
      {inner}
    </motion.button>
  );
}
