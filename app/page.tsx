import { getComic, getAllComics } from "@/lib/comics";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/sections/Hero";
import { CinematicBand } from "@/components/sections/CinematicBand";
import { Roster } from "@/components/sections/Roster";
import { FacebookGallery } from "@/components/FacebookGallery";
import { FeaturedDrop } from "@/components/sections/FeaturedDrop";
import { Creators } from "@/components/sections/Creators";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Newsletter } from "@/components/sections/Newsletter";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  const flagship = getComic("neon-reverie") ?? getAllComics()[0];

  return (
    <>
      <Nav />
      <main>
        <Hero flagship={flagship} />
        {/* Plain, cinematic interlude — half video, half minimal panel. */}
        <CinematicBand />
        <Roster />
        {/* Facebook section sits between the Roster and the Featured drop. */}
        <FacebookGallery />
        <FeaturedDrop />
        <Creators />
        <HowItWorks />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
