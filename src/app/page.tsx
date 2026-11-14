import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ImagePrefetch } from "@/components/ImagePrefetch";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Research } from "@/components/Research";
import { Skills } from "@/components/Skills";
import { Certifications } from "@/components/Certifications";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { site } from "@/data/site";
import { siteUrl } from "@/lib/site-url";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${siteUrl}/#person`,
  name: site.name,
  url: siteUrl,
  image: `${siteUrl}/images/temple-sigil.png`,
  jobTitle: "Computer Science Student & HCI Researcher",
  description: site.description,
  email: `mailto:${site.email}`,
  affiliation: {
    "@type": "CollegeOrUniversity",
    name: site.university,
    department: {
      "@type": "Organization",
      name: "Department of Computer Science & Engineering",
    },
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: site.university,
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dhulikhel",
    addressRegion: "Bagmati",
    addressCountry: "NP",
  },
  sameAs: [
    site.socials.github,
    site.socials.linkedin,
    site.socials.twitter,
    site.socials.instagram,
  ],
  knowsAbout: [
    "Human-Computer Interaction",
    "Frontend Development",
    "React",
    "Next.js",
    "Accessibility",
    "TypeScript",
  ],
};

export default function Home() {
  return (
    <>
      <link
        as="image"
        fetchPriority="high"
        href="/images/profile-particle.webp"
        rel="preload"
      />
      <link
        as="image"
        fetchPriority="high"
        href="/images/about-portrait.webp"
        rel="preload"
      />
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
        }}
        type="application/ld+json"
      />
      <a
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:border-2 focus:border-[#3B2A20] focus:bg-[#FAF0DC] focus:px-4 focus:py-2 focus:font-label-lg focus:text-sm focus:font-semibold focus:text-[#3B2A20] focus:shadow-[3px_3px_0_#3B2A20]"
        href="#main-content"
      >
        Skip to content
      </a>
      <Navbar />
      <main
        className="min-h-[calc(100vh-20rem)] w-full bg-[#F5EAD4] focus:outline-none"
        id="main-content"
        tabIndex={-1}
      >
        <Hero />
        <About />
        <Projects />
        <Research />
        <Skills />
        <Certifications />
        {/* Gallery hidden for now; re-enable when the section is ready. */}
        <Contact />
      </main>
      <Footer />
      <ImagePrefetch />
    </>
  );
}
