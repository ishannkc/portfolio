export type ProjectThumbnail = "sajilo" | "katha" | "chiya" | "spell";

export interface ProjectAction {
  label: string;
  href: string;
  primary?: boolean;
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  badge: {
    label: string;
    tone: "primary" | "gold";
  };
  thumbnail: ProjectThumbnail;
  actions: ProjectAction[];
}

export const projects = {
  label: "/projects",
  title: "Things I Built to Solve Real Problems",
  subtitle:
    "From local tools for Nepal to playful frontend component toolkits.",
  items: [
    {
      title: "SajiloSite",
      description:
        "AI-powered website builder tailored for Nepali local creators and small shop owners with effortless localized copy, WhatsApp shop integration, and low-bandwidth asset optimization.",
      tags: ["React", "Next.js", "OpenAI API", "Tailwind"],
      badge: { label: "Featured", tone: "primary" },
      thumbnail: "sajilo",
      actions: [
        { label: "Live Demo", href: "#", primary: true },
        { label: "GitHub", href: "#" },
      ],
    },
    {
      title: "KathaUI",
      description:
        "A whimsical, accessible React component library crafted for playful apps and children's digital literacy tools. Fully keyboard navigable, WCAG AAA compliant, and delightfully animated.",
      tags: ["TypeScript", "React", "Storybook", "Radix UI"],
      badge: { label: "Design System", tone: "gold" },
      thumbnail: "katha",
      actions: [
        { label: "Components", href: "#", primary: true },
        { label: "Docs", href: "#" },
      ],
    },
    {
      title: "ChiyaLog",
      description:
        "A cozy personal habit and tea-tracker app built for KU college students to manage semester study routines, monitor caffeine, and schedule group peer reviews.",
      tags: ["React Native", "Expo", "SQLite", "Node.js"],
      badge: { label: "Mobile App", tone: "primary" },
      thumbnail: "chiya",
      actions: [
        { label: "Expo Build", href: "#", primary: true },
        { label: "Source", href: "#" },
      ],
    },
    {
      title: "NepaliSpellCheck",
      description:
        "Lightweight browser extension offering fast, context-aware suggestions for Romanized Nepali typing across search bars, email clients, and online campus forums.",
      tags: ["WebExtensions", "JavaScript", "NLP Heuristics"],
      badge: { label: "Extension", tone: "gold" },
      thumbnail: "spell",
      actions: [
        { label: "WebStore", href: "#", primary: true },
        { label: "GitHub", href: "#" },
      ],
    },
  ] satisfies Project[],
};
