import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import {
  Cormorant_Garamond,
  EB_Garamond,
  Newsreader,
} from "next/font/google";
import "./globals.css";
import { HashRouteGuard } from "@/components/HashRouteGuard";
import { ScrollToTopOnReload } from "@/components/ScrollToTopOnReload";
import { site } from "@/data/site";
import { KNOWN_HASHES } from "@/lib/hash-routes";
import { siteUrl } from "@/lib/site-url";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
  display: "swap",
  variable: "--font-cormorant",
});

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-eb-garamond",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-newsreader",
});

const title = site.title;
const description = site.description;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: `%s | ${site.name}`,
  },
  description,
  applicationName: "Ishan Kc — Portfolio",
  authors: [{ name: "Ishan Kc", url: siteUrl }],
  creator: "Ishan Kc",
  publisher: "Ishan Kc",
  keywords: [
    "Ishan Kc",
    'ishankc website',
    'ishankc np',
    "Kathmandu University",
    "Computer Science student",
    "HCI researcher",
    "frontend developer",
    "Nepal portfolio",
    'ai engineer',
    'forward deployed engineer',
    "React",
    "Next.js",
    'ishan-kc'
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Ishan Kc — Portfolio",
    title,
    description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  icons: {
    icon: [
      { url: "/images/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/images/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/images/icon-192.png",
    apple: [
      {
        url: "/images/apple-icon-180.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#F5EAD4",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

/**
 * Runs before hydration so an unknown fragment such as `/#projects/hi` is
 * rewritten to `/projects/hi` immediately, letting Next render the Not Found
 * page without flashing the home page first.
 */
const hashRouteScript = `
(function () {
  var known = ${JSON.stringify(KNOWN_HASHES)};
  var hash = window.location.hash;
  if (window.location.pathname !== "/" || !hash || hash === "#") return;
  if (known.indexOf(hash) === -1) {
    window.location.replace("/" + hash.slice(1));
  }
})();
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${ebGaramond.variable} ${newsreader.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-[#F5EAD4] font-body-md text-[#3B2A20] antialiased">
        <Script id="hash-route-guard" strategy="beforeInteractive">
          {hashRouteScript}
        </Script>
        <ScrollToTopOnReload />
        <HashRouteGuard />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
