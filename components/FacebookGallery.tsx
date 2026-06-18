"use client";

/**
 * FacebookGallery — METHOD A: native Facebook Page Plugin.
 *
 * Surfaces the Skyscraper Comics page timeline (posts incl. photos) inside a
 * comic-framed panel. Zero signup / no tokens — but the page MUST stay public.
 *
 * All Facebook specifics live in this file; the page just drops <FacebookGallery/>.
 * To swap to a themed photo grid later (aggregator widget / manual gallery),
 * replace the body below — the surrounding frame stays the same.
 */

import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { SectionTitle } from "./SectionTitle";
import { BurstButton } from "./BurstButton";
import { Panel } from "./Panel";

const FB_PAGE_URL = "https://www.facebook.com/Skyscrapercomics/";
const SDK_SRC =
  "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v23.0";

declare global {
  interface Window {
    FB?: { XFBML: { parse: (el?: HTMLElement) => void } };
  }
}

type Status = "loading" | "ready" | "error";

export function FacebookGallery() {
  const [status, setStatus] = useState<Status>("loading");
  const containerRef = useRef<HTMLDivElement>(null);

  // Re-parse XFBML after mount. The SDK does NOT auto-parse on App Router
  // client-side navigation, so we trigger it ourselves once FB is present.
  useEffect(() => {
    if (window.FB && containerRef.current) {
      window.FB.XFBML.parse(containerRef.current);
      setStatus("ready");
    }
  }, []);

  // Safety net: if the SDK never loads (blocked, offline), show the fallback.
  useEffect(() => {
    const t = window.setTimeout(() => {
      if (!window.FB) setStatus("error");
    }, 6000);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <section
      id="shop"
      className="relative scroll-mt-24 border-t-4 border-ink bg-paper"
      aria-labelledby="fb-heading"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionTitle
          eyebrow="From the Shop"
          accent="zap"
          className="mb-10"
        >
          Latest on Facebook.
        </SectionTitle>

        <Panel weight="bold" halftone shadow className="mx-auto max-w-2xl">
          <div className="p-4 sm:p-6">
            {/* #fb-root is required by the SDK; one instance anywhere is enough. */}
            <div id="fb-root" />

            {/* Load the SDK lazily — never block render on it. */}
            <Script
              id="facebook-jssdk"
              src={SDK_SRC}
              strategy="afterInteractive"
              onLoad={() => {
                if (window.FB && containerRef.current) {
                  window.FB.XFBML.parse(containerRef.current);
                }
                setStatus("ready");
              }}
              onError={() => setStatus("error")}
            />

            <div ref={containerRef} className="flex justify-center">
              {/* Skeleton shown until the iframe paints */}
              {status === "loading" && (
                <div
                  className="h-[700px] w-full max-w-[500px] animate-pulse border-2 border-dashed border-ink/40 bg-ink/5"
                  aria-hidden
                />
              )}

              {status === "error" ? (
                <div className="flex flex-col items-center gap-5 py-10 text-center">
                  <p className="max-w-sm font-dialogue text-lg text-ink">
                    Couldn&apos;t load the Facebook feed right now. Catch all our
                    latest shop photos and drops straight on the page.
                  </p>
                  <BurstButton href={FB_PAGE_URL} variant="zap">
                    Visit our Facebook
                  </BurstButton>
                </div>
              ) : (
                <div
                  className="fb-page"
                  data-href={FB_PAGE_URL}
                  data-tabs="timeline"
                  data-width="500"
                  data-height="700"
                  data-hide-cover="false"
                  data-show-facepile="true"
                  data-adapt-container-width="true"
                  style={status === "loading" ? { display: "none" } : undefined}
                >
                  {/* Plain-link fallback for no-JS / SDK failure */}
                  <blockquote
                    cite={FB_PAGE_URL}
                    className="fb-xfbml-parse-ignore"
                  >
                    <a href={FB_PAGE_URL} target="_blank" rel="noopener noreferrer">
                      Skyscraper Comics on Facebook
                    </a>
                  </blockquote>
                </div>
              )}
            </div>

            <p className="mt-4 text-center font-accent text-[0.7rem] uppercase tracking-tight text-ink/60">
              Live feed from facebook.com/Skyscrapercomics
            </p>
          </div>
        </Panel>
      </div>
    </section>
  );
}
