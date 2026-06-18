"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { Comic } from "@/lib/comics";
import { CoverArt } from "../CoverArt";
import { SpeechBubble } from "../SpeechBubble";
import { BurstButton } from "../BurstButton";

export interface HeroProps {
  flagship: Comic;
}

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const panelIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 20 },
  },
};

export function Hero({ flagship }: HeroProps) {
  const reduce = useReducedMotion();

  // When reduced motion is on, render panels in their final state instantly.
  const itemVariants = reduce ? undefined : panelIn;
  const containerProps = reduce
    ? {}
    : { variants: container, initial: "hidden" as const, animate: "show" as const };

  return (
    <section className="relative overflow-hidden" aria-labelledby="hero-heading">
      <div aria-hidden className="absolute inset-0 halftone" />
      <motion.div
        {...containerProps}
        className="relative mx-auto grid max-w-6xl gap-3 px-4 py-10 sm:gap-4 sm:px-6 sm:py-14 lg:grid-cols-3 lg:grid-rows-[auto_1fr_auto]"
      >
        {/* Headline panel */}
        <motion.div
          variants={itemVariants}
          className="border-4 border-ink bg-pop ink-shadow lg:col-span-2"
        >
          <div className="relative p-6 sm:p-8">
            <div aria-hidden className="absolute inset-0 halftone opacity-40" />
            <p className="relative font-accent text-xs uppercase tracking-tight text-ink">
              Indie comics · Issue #1 always free
            </p>
            <h1
              id="hero-heading"
              className="relative mt-2 font-display tracking-comic text-[clamp(3rem,9vw,7rem)] leading-[0.85] text-ink"
            >
              Stories that hit different.
            </h1>
          </div>
        </motion.div>

        {/* Splash panel — flagship cover + burst CTA */}
        <motion.div
          variants={itemVariants}
          className="relative border-4 border-ink ink-shadow lg:col-start-3 lg:row-span-3"
        >
          <CoverArt comic={flagship} size="splash" className="h-full min-h-[20rem]" />
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2">
            <BurstButton
              href={`/series/${flagship.slug}`}
              variant="pow"
              pow
              aria-label={`Read ${flagship.title} issue #1`}
            >
              Read #1
            </BurstButton>
          </div>
        </motion.div>

        {/* Speech-bubble subhead */}
        <motion.div
          variants={itemVariants}
          className="flex items-center border-4 border-ink bg-paper ink-shadow lg:col-span-1"
        >
          <div className="p-5">
            <SpeechBubble tail="bottom-left">
              Six worlds. One rule: the first issue&apos;s on us. Pick a fight,
              pick a feeling, pick a series.
            </SpeechBubble>
          </div>
        </motion.div>

        {/* Stat panel */}
        <motion.div
          variants={itemVariants}
          className="grid place-items-center border-4 border-ink bg-zap text-paper ink-shadow"
        >
          <div className="relative p-6 text-center">
            <div aria-hidden className="absolute inset-0 halftone-dense opacity-30" />
            <p className="relative font-display tracking-comic text-6xl leading-none">
              6
            </p>
            <p className="relative font-accent text-xs uppercase tracking-tight">
              ongoing series
            </p>
          </div>
        </motion.div>

        {/* CTA row */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center gap-4 border-4 border-ink bg-paper ink-shadow lg:col-span-2"
        >
          <div className="flex flex-wrap items-center gap-4 p-5">
            <BurstButton href={`/series/${flagship.slug}`} variant="pow" pow>
              Read Issue #1
            </BurstButton>
            <BurstButton href="/#roster" variant="ink">
              Browse the Roster
            </BurstButton>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
