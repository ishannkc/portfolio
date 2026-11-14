import { blurData } from "./blur";

export interface Certification {
  title: string;
  issuer: string;
  year: string;
  description: string;
  meta: string;
  image: {
    src: string;
    alt: string;
    blur: string;
  };
  href: string;
}

export const certifications = {
  label: "/ certifications",
  items: [
    {
      title: "The Fullstack Developer Path",
      issuer: "Scrimba",
      year: "2026",
      description:
        "Completed Scrimba's 108-hour full-stack path covering modern JavaScript, React, Node.js, APIs, and production-ready web application development.",
      meta: "108.4 hours · 2,056 lessons",
      image: {
        src: "/images/certifications/fullstack-developer-path-text.webp",
        alt: "Scrimba Fullstack Developer Path certificate for Ishan Kc",
        blur: blurData.certFullstack,
      },
      href: "/certifications/Full%20Stack%20Developer%20Course%20_%20Scrimba.pdf",
    },
    {
      title: "Learn Next.js",
      issuer: "Scrimba",
      year: "2026",
      description:
        "Built modern React applications with the Next.js App Router, including server components, routing, data fetching, and deployment workflows.",
      meta: "8.5 hours · 127 lessons",
      image: {
        src: "/images/certifications/learn-nextjs-text.webp",
        alt: "Scrimba Learn Next.js certificate for Ishan Kc",
        blur: blurData.certNextjs,
      },
      href: "/certifications/Learn%20Nextjs%20-%20Scrimba.pdf",
    },
    {
      title: "Learn AI Agents",
      issuer: "Scrimba",
      year: "2026",
      description:
        "Learned to design and build LLM-powered agents, covering tool use, prompting workflows, and conversational application patterns.",
      meta: "2 hours · 30 lessons",
      image: {
        src: "/images/certifications/learn-ai-agents-text.webp",
        alt: "Scrimba Learn AI Agents certificate for Ishan Kc",
        blur: blurData.certAiAgents,
      },
      href: "/certifications/Learn%20AI%20Agents%20-%20Scrimba.pdf",
    },
    {
      title: "Intro to Supabase",
      issuer: "Scrimba",
      year: "2026",
      description:
        "Covered Supabase authentication, Postgres data modeling, row-level security, storage, and realtime application features.",
      meta: "4.8 hours · 57 lessons",
      image: {
        src: "/images/certifications/intro-to-supabase-text.webp",
        alt: "Scrimba Intro to Supabase certificate for Ishan Kc",
        blur: blurData.certSupabase,
      },
      href: "/certifications/Intro%20to%20Supabase%20-%20Scrimba.pdf",
    },
  ] satisfies Certification[],
};
