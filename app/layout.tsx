import type { Metadata } from "next";
import {
  Bangers,
  Bungee,
  Plus_Jakarta_Sans,
  Comic_Neue,
} from "next/font/google";
import "./globals.css";
import { SITE_NAME } from "@/lib/comics";

/* Display / headlines — single weight, all-caps comic lettering */
const bangers = Bangers({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bangers",
  display: "swap",
});

/* Accent / labels / buttons — blocky signage face */
const bungee = Bungee({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bungee",
  display: "swap",
});

/* Body / UI — modern, readable (variable font) */
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

/* In-panel dialogue only — never UI */
const comicNeue = Comic_Neue({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-comic-neue",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${SITE_NAME} — Indie Comics That Hit Different`,
  description:
    "Bold indie comics from the people who can't stop drawing. Pick a series and read issue #1 free.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${bangers.variable} ${bungee.variable} ${jakarta.variable} ${comicNeue.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
