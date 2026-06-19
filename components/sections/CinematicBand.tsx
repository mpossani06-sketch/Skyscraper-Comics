"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * CinematicBand — a deliberate break from the comic styling.
 *
 * One half is a looping background video; the other half is a calm, plain
 * panel (clean sans-serif, generous whitespace, no halftone / ink borders /
 * Bangers). Autoplay is gated on prefers-reduced-motion: reduced-motion users
 * get a paused first frame instead of moving footage.
 */
export function CinematicBand() {
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (reduce) {
      v.pause();
    } else {
      // Some browsers reject autoplay until muted is confirmed at runtime.
      v.muted = true;
      v.play().catch(() => {
        /* autoplay blocked — leave the first frame showing */
      });
    }
  }, [reduce]);

  return (
    <section
      aria-label="Skyscraper Comics in motion"
      className="relative bg-ink text-paper"
    >
      <div className="grid min-h-[70vh] md:grid-cols-2">
        {/* Video half */}
        <div className="relative min-h-[55vh] overflow-hidden md:min-h-full">
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            src="/skyscraper-superhero.mp4"
            muted
            loop
            playsInline
            autoPlay={!reduce}
            preload="auto"
            aria-hidden
          />
          {/* gradient blends the footage into the plain side for cohesion */}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-b from-transparent to-ink/70 md:bg-gradient-to-r md:to-ink"
          />
        </div>

        {/* Plain half — intentionally minimal, non-comic */}
        <div className="flex items-center">
          <div className="max-w-md px-6 py-16 sm:px-12">
            <p className="font-body text-xs uppercase tracking-[0.25em] text-paper/50">
              In motion
            </p>
            <h2 className="mt-5 font-body text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
              Our worlds, animated.
            </h2>
            <p className="mt-5 leading-relaxed text-paper/70">
              No panels, no ink lines — just the story moving. A first look at
              Skyscraper Comics in motion, with more on the way.
            </p>
            <a
              href="/#roster"
              className="mt-9 inline-block border border-paper/40 px-7 py-3 font-body text-sm uppercase tracking-wide text-paper transition-colors hover:bg-paper hover:text-ink"
            >
              Explore the series
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
