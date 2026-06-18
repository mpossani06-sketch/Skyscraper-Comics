"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { BurstButton } from "../BurstButton";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [signedUp, setSignedUp] = useState(false);
  const reduce = useReducedMotion();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    // v1: no backend — just confirm. Wire to a list provider later.
    setSignedUp(true);
    setEmail("");
  }

  return (
    <section
      className="relative overflow-hidden border-t-4 border-ink bg-pow text-paper"
      aria-labelledby="newsletter-heading"
    >
      <div aria-hidden className="absolute inset-0 halftone opacity-30" />
      <div className="relative mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 sm:py-20">
        <h2
          id="newsletter-heading"
          className="font-display tracking-comic text-[clamp(2.25rem,6vw,4rem)] leading-[0.9]"
        >
          Get the next drop.
        </h2>
        <p className="mx-auto mt-3 max-w-md text-paper/90">
          New issues land every week. Drop your email and we&apos;ll tell you
          the second they go live — no spam, just comics.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-8 flex max-w-lg flex-col items-stretch gap-3 sm:flex-row sm:items-center"
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            className="min-h-[3.25rem] flex-1 border-4 border-ink bg-paper px-4 font-body text-ink placeholder:text-ink/50 focus-visible:outline-3 focus-visible:outline-zap"
          />
          <BurstButton type="submit" variant="ink">
            Sign me up
          </BurstButton>
        </form>

        {/* Success toast */}
        <AnimatePresence>
          {signedUp && (
            <motion.div
              role="status"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
              className="mx-auto mt-6 inline-block -rotate-1 border-4 border-ink bg-pop px-5 py-2 font-display tracking-comic text-2xl text-ink ink-shadow"
            >
              You&apos;re on the list!
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
