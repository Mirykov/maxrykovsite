import type { Metadata } from "next";
import { Fraunces, DM_Sans } from "next/font/google";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT", "opsz"],
});

// Just the classic "&" from Fraunces (its stylistic alternate), cut from the
// full OFL font because Google Fonts' copy drops it. See components/og/Amp.tsx.
const frauncesAmp = localFont({
  src: [
    { path: "./fonts/fraunces-amp-500.otf", weight: "500" },
    { path: "./fonts/fraunces-amp-700.otf", weight: "700" },
    { path: "./fonts/fraunces-amp-900.otf", weight: "900" },
  ],
  variable: "--font-amp",
  declarations: [{ prop: "unicode-range", value: "U+0026" }],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "OddGood Events | Real Meaningful Fun",
    template: "%s | OddGood Events",
  },
  description:
    "Game shows, custom events, creative campaigns, and emceeing in Birmingham, Alabama. Participatory experiences that get people laughing and connecting.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${frauncesAmp.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-og-cream text-og-ink">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-og-ink focus:px-5 focus:py-3 focus:text-white"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
