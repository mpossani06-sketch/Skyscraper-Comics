import { getFeaturedComic } from "@/lib/comics";
import { CoverArt } from "../CoverArt";
import { BurstButton } from "../BurstButton";
import { Reveal } from "../Reveal";

export function FeaturedDrop() {
  const comic = getFeaturedComic();
  const issue = comic.issues[0];

  return (
    <section
      className="relative overflow-hidden border-t-4 border-ink bg-ink text-paper"
      aria-labelledby="featured-heading"
    >
      {/* diagonal halftone band */}
      <div aria-hidden className="absolute inset-0 opacity-100">
        <div className="absolute inset-0 halftone-diagonal" />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-8 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2">
        <Reveal from="left">
          <div className="relative mx-auto max-w-sm border-4 border-paper ink-shadow-pow">
            <CoverArt comic={comic} size="splash" />
          </div>
        </Reveal>

        <Reveal from="right">
          <div>
            <span className="inline-block -rotate-2 border-2 border-paper bg-pow px-3 py-1 font-accent text-xs uppercase tracking-tight text-paper">
              This Week&apos;s Issue
            </span>
            <h2
              id="featured-heading"
              className="mt-4 font-display tracking-comic text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.9]"
            >
              {comic.title}
            </h2>
            <p className="mt-1 font-accent text-sm uppercase tracking-tight text-pop">
              Issue #{issue.number} · {issue.title}
            </p>
            <p className="mt-4 max-w-prose text-paper/85">{comic.synopsis}</p>
            <div className="mt-8">
              <BurstButton
                href={`/series/${comic.slug}`}
                variant="pow"
                pow
                aria-label={`Read ${comic.title} issue #${issue.number} now`}
              >
                Read Now
              </BurstButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
