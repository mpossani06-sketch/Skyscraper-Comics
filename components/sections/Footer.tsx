import Link from "next/link";
import { SITE_NAME, getAllComics } from "@/lib/comics";

const columns = [
  {
    heading: "Read",
    links: [
      { label: "The Roster", href: "/#roster" },
      { label: "This Week's Issue", href: "/#shop" },
      { label: "How it works", href: "/#how" },
    ],
  },
  {
    heading: "Studio",
    links: [
      { label: "Creators", href: "/#creators" },
      { label: "About", href: "/#how" },
      { label: "Shop", href: "/#shop" },
    ],
  },
];

const socials = [
  { label: "Facebook", href: "https://www.facebook.com/Skyscrapercomics/" },
  {
    label: "Instagram",
    href: "https://www.instagram.com/skyscraper_comics/?hl=en",
  },
];

// Single source of truth for shop contact details.
const contact = {
  addressLines: ["3291 Truxel Rd. Suite 11", "Sacramento, CA, United States"],
  mapHref:
    "https://maps.google.com/?q=3291+Truxel+Rd+Suite+11+Sacramento+CA",
  phoneDisplay: "(916) 515-8293",
  phoneHref: "tel:+19165158293",
  email: "Skyscrapercomics1@gmail.com",
};

export function Footer() {
  const series = getAllComics().slice(0, 4);

  return (
    <footer className="relative overflow-hidden border-t-4 border-ink bg-ink text-paper">
      <div aria-hidden className="absolute inset-0 halftone opacity-20" />
      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              className="font-display tracking-comic text-4xl leading-none text-paper"
            >
              {SITE_NAME}
            </Link>
            <p className="mt-3 max-w-xs text-sm text-paper/70">
              Bold indie comics from the people who can&apos;t stop drawing.
              First issue&apos;s always free.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.heading}>
              <h3 className="font-accent text-xs uppercase tracking-tight text-pop">
                {col.heading}
              </h3>
              <ul className="mt-3 space-y-2">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-paper/80 transition-colors hover:text-pop"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="font-accent text-xs uppercase tracking-tight text-pop">
              Series
            </h3>
            <ul className="mt-3 space-y-2">
              {series.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/series/${c.slug}`}
                    className="text-sm text-paper/80 transition-colors hover:text-pop"
                  >
                    {c.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Visit Us — shop contact details */}
        <div className="mt-12 grid grid-cols-1 gap-6 border-t-2 border-paper/20 pt-8 sm:grid-cols-3">
          <div>
            <h3 className="font-accent text-xs uppercase tracking-tight text-pop">
              Visit the Shop
            </h3>
            <a
              href={contact.mapHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 block text-sm not-italic text-paper/80 transition-colors hover:text-pop"
            >
              <address className="not-italic">
                {contact.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            </a>
          </div>
          <div>
            <h3 className="font-accent text-xs uppercase tracking-tight text-pop">
              Call
            </h3>
            <a
              href={contact.phoneHref}
              className="mt-3 block text-sm text-paper/80 transition-colors hover:text-pop"
            >
              {contact.phoneDisplay}
            </a>
          </div>
          <div>
            <h3 className="font-accent text-xs uppercase tracking-tight text-pop">
              Email
            </h3>
            <a
              href={`mailto:${contact.email}`}
              className="mt-3 block break-words text-sm text-paper/80 transition-colors hover:text-pop"
            >
              {contact.email}
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t-2 border-paper/20 pt-6 sm:flex-row sm:items-center">
          <ul className="flex flex-wrap gap-3">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-paper/40 px-3 py-1 font-accent text-xs uppercase tracking-tight text-paper transition-colors hover:border-pop hover:text-pop"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="text-xs text-paper/50">
            © {new Date().getFullYear()} {SITE_NAME}. A fictional publisher.
            All series are made up for demo purposes.
          </p>
        </div>
      </div>
    </footer>
  );
}
