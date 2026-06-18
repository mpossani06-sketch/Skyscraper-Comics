import { getAllComics } from "@/lib/comics";
import { SectionTitle } from "../SectionTitle";
import { ComicCard } from "../ComicCard";
import { Reveal } from "../Reveal";

export function Roster() {
  const comics = getAllComics();

  return (
    <section
      id="roster"
      className="relative scroll-mt-24 border-t-4 border-ink bg-paper"
      aria-labelledby="roster-heading"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <Reveal>
          <SectionTitle
            eyebrow="The Roster"
            accent="pow"
            as="h2"
            className="mb-10"
          >
            Pick your poison.
          </SectionTitle>
        </Reveal>

        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {comics.map((comic, i) => (
            <Reveal as="li" key={comic.slug} delay={(i % 3) * 0.08}>
              <ComicCard comic={comic} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
