import { getAllCreators } from "@/lib/comics";
import { accentBg, accentOn } from "@/lib/accents";
import { SectionTitle } from "../SectionTitle";
import { SpeechBubble } from "../SpeechBubble";
import { Reveal } from "../Reveal";

export function Creators() {
  const creators = getAllCreators();

  return (
    <section
      id="creators"
      className="relative scroll-mt-24 border-t-4 border-ink bg-paper"
      aria-labelledby="creators-heading"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <Reveal>
          <SectionTitle
            eyebrow="Meet the Creators"
            accent="grape"
            className="mb-10"
          >
            The people who can&apos;t stop drawing.
          </SectionTitle>
        </Reveal>

        {/* No 01/02/03 numbering — these aren't an ordered sequence. */}
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {creators.map((c, i) => (
            <Reveal as="li" key={c.name} delay={(i % 4) * 0.07}>
              <div className="flex h-full flex-col items-center border-4 border-ink bg-paper p-5 text-center ink-shadow">
                <div
                  className={`grid h-20 w-20 place-items-center rounded-full border-4 border-ink ${accentBg[c.accent]} ${accentOn[c.accent]} font-display tracking-comic text-3xl`}
                  aria-hidden
                >
                  {c.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <h3 className="mt-4 font-display tracking-comic text-2xl leading-none text-ink">
                  {c.name}
                </h3>
                <p className="mt-1 font-accent text-[0.7rem] uppercase tracking-tight text-ink/70">
                  {c.role}
                </p>
                <div className="mt-4">
                  <SpeechBubble tail="bottom-left" className="text-base">
                    {c.quote}
                  </SpeechBubble>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
