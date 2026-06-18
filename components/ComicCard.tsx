"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { Comic } from "@/lib/comics";
import { accentBg, accentOn } from "@/lib/accents";
import { CoverArt } from "./CoverArt";

export interface ComicCardProps {
  comic: Comic;
}

/**
 * Series card: ink-framed cover, title, genre badge, hook line.
 * Hover tilts the card ~2.5°, lifts it, and sweeps a halftone overlay across.
 */
export function ComicCard({ comic }: ComicCardProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      whileHover={reduce ? undefined : { rotate: -2.5, y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 18 }}
      className="group h-full"
    >
      <Link
        href={`/series/${comic.slug}`}
        className="flex h-full flex-col border-4 border-ink bg-paper ink-shadow focus-visible:outline-3"
        aria-label={`${comic.title} — ${comic.genre}. Read issue #1`}
      >
        <div className="relative overflow-hidden border-b-4 border-ink">
          <CoverArt comic={comic} />
          {/* halftone sweep on hover */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 -translate-x-full halftone-dense transition-transform duration-500 ease-out group-hover:translate-x-0 motion-reduce:transition-none motion-reduce:hidden"
          />
        </div>

        <div className="flex flex-1 flex-col gap-2 p-4">
          <span
            className={`w-fit border-2 border-ink ${accentBg[comic.accent]} ${accentOn[comic.accent]} px-2 py-0.5 font-accent text-[0.65rem] uppercase tracking-tight`}
          >
            {comic.genre}
          </span>
          <h3 className="font-display tracking-comic text-3xl leading-[0.95] text-ink">
            {comic.title}
          </h3>
          <p className="text-sm leading-snug text-ink/80">{comic.hook}</p>
          <span className="mt-auto pt-2 font-accent text-xs uppercase tracking-tight text-zap">
            Read Issue #1 →
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
