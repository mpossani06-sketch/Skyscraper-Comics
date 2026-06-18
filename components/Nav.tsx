"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SITE_NAME } from "@/lib/comics";
import { BurstButton } from "./BurstButton";

const links = [
  { label: "Series", href: "/#roster" },
  { label: "Creators", href: "/#creators" },
  { label: "Shop", href: "/#shop" },
  { label: "About", href: "/#how" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b-4 border-ink bg-paper">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6"
      >
        <Link
          href="/"
          className="font-display tracking-comic text-3xl leading-none text-ink sm:text-4xl"
        >
          {SITE_NAME}
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="font-accent text-sm uppercase tracking-tight text-ink transition-colors hover:text-pow"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <BurstButton href="/#roster" variant="pow">
            Read Now
          </BurstButton>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="grid h-11 w-11 place-items-center border-2 border-ink bg-pop md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-4 w-6">
            <span
              className={`absolute left-0 block h-[3px] w-6 bg-ink transition-transform ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute top-1.5 left-0 block h-[3px] w-6 bg-ink transition-opacity ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-[3px] w-6 bg-ink transition-transform ${
                open ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </nav>

      {/* Full-screen mobile panel menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-x-0 top-[var(--nav-h,4rem)] bottom-0 z-40 border-t-4 border-ink bg-pow md:hidden"
            initial={reduce ? false : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative h-full overflow-y-auto">
              <div aria-hidden className="absolute inset-0 halftone-dense opacity-25" />
              <ul className="relative flex flex-col gap-2 p-6">
                {links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="block border-b-2 border-paper/40 py-4 font-display tracking-comic text-5xl text-paper"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
                <li className="mt-6">
                  <BurstButton
                    href="/#roster"
                    variant="pop"
                    onClick={() => setOpen(false)}
                  >
                    Read Issue #1
                  </BurstButton>
                </li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
