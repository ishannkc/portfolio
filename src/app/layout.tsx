import type { Metadata, Viewport } from "next";
import {
  Cormorant_Garamond,
  EB_Garamond,
  Newsreader,
} from "next/font/google";
import "./globals.css";
import { ScrollToTopOnReload } from "@/components/ScrollToTopOnReload";
import { site } from "@/data/site";
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
