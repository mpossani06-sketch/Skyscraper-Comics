/**
 * Skyscraper Comics content layer.
 *
 * For v1 the roster lives in this typed array. The shapes below are
 * deliberately CMS-friendly: swap `getAllComics` / `getComic` for async
 * fetchers later and the rest of the app keeps working unchanged.
 */

/** Publisher name — single source of truth for the wordmark, metadata, etc. */
export const SITE_NAME = "Skyscraper Comics";

/** Palette accent tokens — map to Tailwind colors (bg-pow, text-zap, …). */
export type Accent = "pow" | "zap" | "pop" | "grape";

export interface Creator {
  name: string;
  role: string;
  /** One-line speech-bubble quote, fan-facing voice. */
  quote: string;
  /** Accent token used for their avatar block. */
  accent: Accent;
}

export interface Issue {
  number: number;
  title: string;
  /** Is issue #1 free to read? Drives the "Read Issue #1" CTA. */
  free?: boolean;
}

export interface Comic {
  slug: string;
  title: string;
  genre: string;
  /** Short, punchy hook line shown on cards. */
  hook: string;
  /** Longer synopsis for the detail page. */
  synopsis: string;
  creator: string;
  /** Accent color pulled from the palette. */
  accent: Accent;
  /**
   * Cover art. For v1 these are color-block placeholders rendered from
   * `accent` + `title`; drop in a real image URL here later.
   */
  cover?: string;
  issues: Issue[];
}

const comics: Comic[] = [
  {
    slug: "neon-reverie",
    title: "Neon Reverie",
    genre: "Cyberpunk Noir",
    hook: "A memory-thief falls for the one mind she can't sell.",
    synopsis:
      "In a drowned megacity that runs on borrowed dreams, Suki rips memories out of the rich and sells them to the bored. Then a client's stolen night refuses to stay sold — it talks back, and it knows her name. A neon-soaked chase through other people's heads, where the only thing more dangerous than forgetting is remembering everything.",
    creator: "Rae Okafor",
    accent: "zap",
    issues: [
      { number: 1, title: "Borrowed Light", free: true },
      { number: 2, title: "The Client Who Talked Back" },
      { number: 3, title: "Drowned Downtown" },
    ],
  },
  {
    slug: "hex-house",
    title: "Hex House",
    genre: "Supernatural Comedy",
    hook: "Four witches, one haunted duplex, zero chill.",
    synopsis:
      "When broke art-school dropout Priya signs the cheapest lease in the city, she gets three roommates, a possessed water heater, and a landlord who is technically a demon (it's in the fine print). Hex House is a workplace sitcom where the workplace is hell-adjacent and the rent is, somehow, still due on the first.",
    creator: "Marisol Vega",
    accent: "grape",
    issues: [
      { number: 1, title: "The Cheapest Lease in Town", free: true },
      { number: 2, title: "Security Deposit of the Damned" },
    ],
  },
  {
    slug: "iron-pulse",
    title: "Iron Pulse",
    genre: "Mecha Action",
    hook: "The last pilot. The first machine that says no.",
    synopsis:
      "Decades after the war machines were mothballed, retired ace Dovid Mor is dragged back into the cockpit when an old rig boots itself up and starts walking toward the capital. It won't take orders. It won't power down. And it keeps signing its messages with a name Dovid buried a long time ago. Big stompy robots, bigger feelings.",
    creator: "Dovid Mor",
    accent: "pow",
    issues: [
      { number: 1, title: "Cold Start", free: true },
      { number: 2, title: "It Won't Power Down" },
      { number: 3, title: "March on the Capital" },
      { number: 4, title: "The Name It Signed" },
    ],
  },
  {
    slug: "saltwater-saints",
    title: "Saltwater Saints",
    genre: "Coming-of-Age Fantasy",
    hook: "A fishing town. A sleeping god. One very stubborn kid.",
    synopsis:
      "Every kid in Hollow Tide knows the rule: don't go past the third buoy. Twelve-year-old Wren goes past the third buoy. What she pulls up in her net is small, scaly, furious, and — according to her grandmother — supposed to have stayed asleep for another thousand years. A salt-and-sunburn story about growing up faster than the tide.",
    creator: "Wren Castellanos",
    accent: "pop",
    issues: [
      { number: 1, title: "Past the Third Buoy", free: true },
      { number: 2, title: "What the Net Pulled Up" },
    ],
  },
  {
    slug: "deadline",
    title: "Deadline",
    genre: "Supernatural Thriller",
    hook: "She gets one week of warning before each death. Hers is Friday.",
    synopsis:
      "Investigative reporter Cass Imani has chased every story but the one that matters: a week ago she started getting obituaries in the mail — accurate, detailed, and dated for the future. She's stopped four. The fifth envelope has her own name on it, and the clock says Friday. A breakneck thriller about deadlines you can't extend.",
    creator: "Cass Imani",
    accent: "pow",
    issues: [
      { number: 1, title: "First Envelope", free: true },
      { number: 2, title: "Four Saved" },
      { number: 3, title: "Friday" },
    ],
  },
  {
    slug: "starveil-diner",
    title: "Starveil Diner",
    genre: "Cosmic Slice-of-Life",
    hook: "Open 24/7 at the edge of the galaxy. Pie's good. Don't ask about Booth 9.",
    synopsis:
      "Park the ship, grab a stool, mind the regulars. The Starveil Diner sits on a wormhole junction where bounty hunters, runaway princes, and one extremely polite hive-mind all order the same bottomless coffee. Behind the counter, short-order cook Tomasz keeps the grill hot and the secrets hotter. Warm, weird, and quietly enormous.",
    creator: "Tomasz Bright",
    accent: "zap",
    issues: [
      { number: 1, title: "The Usual", free: true },
      { number: 2, title: "Booth 9" },
    ],
  },
];

const creators: Creator[] = [
  {
    name: "Rae Okafor",
    role: "Writer · Neon Reverie",
    quote: "I write the city I'm scared of, then I move in.",
    accent: "zap",
  },
  {
    name: "Marisol Vega",
    role: "Artist · Hex House",
    quote: "Every panel is a haunted house I get to decorate.",
    accent: "grape",
  },
  {
    name: "Dovid Mor",
    role: "Writer/Artist · Iron Pulse",
    quote: "Big robots. Bigger feelings. No apologies.",
    accent: "pow",
  },
  {
    name: "Cass Imani",
    role: "Writer · Deadline",
    quote: "I never met a deadline I didn't want to outrun.",
    accent: "pop",
  },
];

/* --- Access functions: keep these as the only entry points so a CMS
       swap stays local. They're async-ready even though v1 is sync. --- */

export function getAllComics(): Comic[] {
  return comics;
}

export function getComic(slug: string): Comic | undefined {
  return comics.find((c) => c.slug === slug);
}

export function getAllCreators(): Creator[] {
  return creators;
}

/** Slugs for static generation of /series/[slug]. */
export function getAllComicSlugs(): string[] {
  return comics.map((c) => c.slug);
}

/** This week's spotlighted issue (drives the Featured drop section). */
export function getFeaturedComic(): Comic {
  return getComic("deadline") ?? comics[0];
}
