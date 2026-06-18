import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getComic,
  getAllComicSlugs,
  getAllComics,
  SITE_NAME,
} from "@/lib/comics";
import { accentBg, accentOn } from "@/lib/accents";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/sections/Footer";
import { Panel } from "@/components/Panel";
import { CoverArt } from "@/components/CoverArt";
import { SpeechBubble } from "@/components/SpeechBubble";
import { BurstButton } from "@/components/BurstButton";
import { SectionTitle } from "@/components/SectionTitle";

type Params = Promise<{ slug: string }>;

// Pre-render every series page at build time.
export function generateStaticParams() {
  return getAllComicSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const comic = getComic(slug);
  if (!comic) return { title: `Series not found — ${SITE_NAME}` };
  return {
    title: `${comic.title} — ${SITE_NAME}`,
    description: comic.hook,
  };
}

export default async function SeriesPage({ params }: { params: Params }) {
  const { slug } = await params;
  const comic = getComic(slug);
  if (!comic) notFound();

  const firstIssue = comic.issues[0];
  const others = getAllComics()
    .filter((c) => c.slug !== comic.slug)
    .slice(0, 3);

  return (
    <>
      <Nav />
      <main>
        {/* Hero / cover + synopsis */}
        <section className="relative overflow-hidden border-b-4 border-ink bg-paper">
          <div aria-hidden className="absolute inset-0 halftone" />
          <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
            <Link
              href="/#roster"
              className="inline-block font-accent text-xs uppercase tracking-tight text-zap hover:text-pow"
            >
              ← Back to the roster
            </Link>

            <div className="mt-6 grid items-start gap-8 lg:grid-cols-[2fr_3fr]">
              <Panel weight="bold" shadow className="mx-auto w-full max-w-sm">
                <CoverArt comic={comic} size="splash" />
              </Panel>

              <div>
                <span
                  className={`inline-block -rotate-1 border-2 border-ink ${accentBg[comic.accent]} ${accentOn[comic.accent]} px-3 py-1 font-accent text-xs uppercase tracking-tight`}
                >
                  {comic.genre}
                </span>
                <h1 className="mt-4 font-display tracking-comic text-[clamp(2.75rem,8vw,5.5rem)] leading-[0.85] text-ink">
                  {comic.title}
                </h1>

                <div className="mt-5">
                  <SpeechBubble tail="bottom-left">{comic.hook}</SpeechBubble>
                </div>

                <p className="mt-6 max-w-prose text-lg text-ink/85">
                  {comic.synopsis}
                </p>
                <p className="mt-4 font-accent text-xs uppercase tracking-tight text-ink/70">
                  By {comic.creator}
                </p>

                <div className="mt-8">
                  <BurstButton
                    href="/#how"
                    variant="pow"
                    pow
                    aria-label={`Read ${comic.title} issue #${firstIssue.number} free`}
                  >
                    Read Issue #1
                  </BurstButton>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Issue list */}
        <section className="border-b-4 border-ink bg-paper">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
            <SectionTitle eyebrow="Issues" accent="zap" as="h2" className="mb-8">
              The run so far.
            </SectionTitle>

            <ul className="space-y-3">
              {comic.issues.map((issue) => (
                <li key={issue.number}>
                  <Panel
                    weight="normal"
                    className="flex items-center justify-between gap-4 p-4"
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 border-ink ${accentBg[comic.accent]} ${accentOn[comic.accent]} font-display tracking-comic text-2xl`}
                        aria-hidden
                      >
                        {issue.number}
                      </span>
                      <div>
                        <p className="font-display tracking-comic text-2xl leading-none text-ink">
                          {issue.title}
                        </p>
                        <p className="font-accent text-[0.7rem] uppercase tracking-tight text-ink/60">
                          Issue #{issue.number}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`shrink-0 border-2 border-ink px-3 py-1 font-accent text-[0.65rem] uppercase tracking-tight ${
                        issue.free
                          ? "bg-pop text-ink"
                          : "bg-paper text-ink/70"
                      }`}
                    >
                      {issue.free ? "Free" : "Subscribers"}
                    </span>
                  </Panel>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Credits + keep reading */}
        <section className="bg-paper">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
            <SectionTitle
              eyebrow="Keep Reading"
              accent="grape"
              as="h2"
              className="mb-8"
            >
              More from the roster.
            </SectionTitle>

            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {others.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/series/${c.slug}`}
                    className="flex h-full flex-col border-4 border-ink bg-paper ink-shadow"
                  >
                    <div className="border-b-4 border-ink">
                      <CoverArt comic={c} />
                    </div>
                    <div className="p-4">
                      <h3 className="font-display tracking-comic text-2xl leading-none text-ink">
                        {c.title}
                      </h3>
                      <p className="mt-1 text-sm text-ink/75">{c.hook}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
