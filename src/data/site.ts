import type { NavItem, SocialLink } from "./types";

const email = "ishankc777@gmail.com";
const github = "https://github.com/ishannkc";
const linkedin = "https://www.linkedin.com/in/ishan-kc-bb3380285/";

export const site = {
  name: "Ishan Kc",
  title: "Ishan Kc — Renaissance Scholar & CS Student Portfolio",
  description:
    "Ishan Kc is a final-year Computer Science student at Kathmandu University, crafting intuitive web tools and researching human-computer interaction in Dhulikhel, Nepal.",
  email,
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
    github,
    linkedin,
    twitter: "https://x.com/ishannkc",
    instagram: "https://www.instagram.com/ishann.kc/",
  },
  navSocials: [
    {
      label: "Email",
      href: `mailto:${email}`,
      icon: "mail",
    },
    {
      label: "GitHub",
      href: github,
      icon: "github",
    },
    {
      label: "LinkedIn",
      href: linkedin,
      icon: "linkedin",
    },
  ] satisfies SocialLink[],
} as const;
