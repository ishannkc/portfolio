import type { NavItem, SocialLink } from "./types";

export const site = {
  name: "Ishan Kc",
  title: "Ishan Kc — Renaissance Scholar & CS Student Portfolio",
  description:
    "Ishan Kc is a final-year Computer Science student at Kathmandu University, crafting intuitive web tools and researching human-computer interaction in Dhulikhel, Nepal.",
  email: "ishan.student@ku.edu.np",
  location: "Dhulikhel, Nepal",
  university: "Kathmandu University",
  navItems: [
    { label: "Home", href: "#" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Research", href: "#research" },
    { label: "Skills", href: "#skills" },
    { label: "Certifications", href: "#certifications" },
    { label: "Gallery", href: "#gallery" },
  ] satisfies NavItem[],
  socials: {
    github: "https://github.com/ishan-ku",
    linkedin: "https://www.linkedin.com/in/ishan-cs",
    twitter: "https://twitter.com/ishan_codes",
    kuPortal: "https://ku.edu.np",
  },
  navSocials: [
    {
      label: "Email",
      href: "mailto:ishan.student@ku.edu.np",
      icon: "mail",
    },
    {
      label: "GitHub",
      href: "https://github.com/ishan-ku",
      icon: "github",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/ishan-cs",
      icon: "linkedin",
    },
  ] satisfies SocialLink[],
} as const;
