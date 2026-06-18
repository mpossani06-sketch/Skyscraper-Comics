import { SectionTitle } from "../SectionTitle";
import { Reveal } from "../Reveal";

/* A genuinely ordered process — so numbered inked badges are appropriate. */
const steps = [
  {
    n: 1,
    title: "Pick a series",
    body: "Browse the roster and find the world you want to live in. Cyberpunk heartbreak, haunted duplexes, big stompy robots — your call.",
  },
  {
    n: 2,
    title: "Read issue #1 free",
    body: "Every series opens its first issue with zero paywall, zero signup. Start reading in one click and see if it grabs you.",
  },
  {
    n: 3,
    title: "Subscribe for the rest",
    body: "Hooked? Subscribe to unlock the back catalogue and get every new drop the moment it lands.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how"
      className="relative scroll-mt-24 overflow-hidden border-t-4 border-ink bg-pop"
      aria-labelledby="how-heading"
    >
      <div aria-hidden className="absolute inset-0 halftone opacity-50" />
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <Reveal>
          <SectionTitle eyebrow="Start Reading" accent="pow" className="mb-10">
            How it works.
          </SectionTitle>
        </Reveal>

        <ol className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i * 0.1}>
              <div className="flex h-full flex-col border-4 border-ink bg-paper p-6 ink-shadow">
                <span
                  className="grid h-14 w-14 place-items-center rounded-full border-4 border-ink bg-pow font-display tracking-comic text-3xl text-paper"
                  aria-hidden
                >
                  {s.n}
                </span>
                <h3 className="mt-4 font-display tracking-comic text-3xl leading-none text-ink">
                  {s.title}
                </h3>
                <p className="mt-2 text-ink/80">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
