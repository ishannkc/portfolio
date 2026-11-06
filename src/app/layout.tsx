import type { Metadata, Viewport } from "next";
import {
  Cormorant_Garamond,
  EB_Garamond,
  Newsreader,
} from "next/font/google";
import "./globals.css";
import { ScrollToTopOnReload } from "@/components/ScrollToTopOnReload";
import { siteUrl } from "@/lib/site-url";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
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

const title =
  "Ishan Kc";
const description =
  "Ishan Kc is a final-year Computer Science student at Kathmandu University, crafting intuitive web tools and researching human-computer interaction in Dhulikhel, Nepal.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: "Ishan Kc — Portfolio",
  authors: [{ name: "Ishan Kc", url: siteUrl }],
  creator: "Ishan Kc",
  publisher: "Ishan Kc",
  keywords: [
    "Ishan Kc",
    "Kathmandu University",
    "Computer Science student",
    "HCI researcher",
    "frontend developer",
    "Nepal portfolio",
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
    images: [
      {
        url: "/images/temple-sigil.png",
        width: 337,
        height: 435,
        alt: "Hand-inked Newari pagoda temple sigil used as Ishan Kc's mark",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [
      {
        url: "/images/temple-sigil.png",
        alt: "Hand-inked Newari pagoda temple sigil used as Ishan Kc's mark",
      },
    ],
  },
  icons: {
    icon: [{ url: "/images/temple-sigil.png", type: "image/png" }],
    shortcut: "/images/temple-sigil.png",
    apple: "/images/temple-sigil.png",
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${ebGaramond.variable} ${newsreader.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-[#F5EAD4] font-body-md text-[#3B2A20] antialiased">
        <ScrollToTopOnReload />
        {children}
      </body>
    </html>
  );
}
