import { site } from "./site";
import type { SocialLink } from "./types";

export const contact = {
  label: "Chapter 06: Say Hello! 📮",
  heading: "Let's Make Something Great Together!",
  body: "Got a project in mind, an HCI research discussion, or just want to chat about frontends over a hot cup of chiya in Dhulikhel?",
  copyLabel: "Copy Email",
  copiedLabel: "Copied! ✨",
  socialsHeading: "Find me around the web:",
  socials: [
    {
      label: "GitHub /ishan-ku",
      href: site.socials.github,
      icon: "github",
    },
    {
      label: "LinkedIn /in/ishan-cs",
      href: site.socials.linkedin,
      icon: "linkedin",
    },
    {
      label: "Twitter @ishan_codes",
      href: site.socials.twitter,
      icon: "twitter",
    },
    {
      label: "KU Portal",
      href: site.socials.kuPortal,
      icon: "external",
    },
  ] satisfies SocialLink[],
  signature: "Sent with warmth from Nepal",
  stamp: "NEPAL 50R",
} as const;

export const footer = {
  tagline: "Handcrafted with cozy tea & code in Dhulikhel, Nepal",
  links: [
    {
      label: "GitHub",
      href: site.socials.github,
      icon: "↗",
    },
    {
      label: "LinkedIn",
      href: site.socials.linkedin,
      icon: "↗",
    },
    {
      label: "Email",
      href: `mailto:${site.email}`,
      icon: "✉",
    },
    {
      label: "KU CS Lab",
      href: site.socials.kuPortal,
      icon: "🧪",
    },
  ],
  copyright: "© 2025 Ishan • Class of '27 Kathmandu University",
  department: "Department of Computer Science & Engineering",
} as const;
