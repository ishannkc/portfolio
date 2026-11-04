import { site } from "./site";
import type { SocialLink } from "./types";

export const contact = {
  label: "/contact",
  heading: "Let's Make Something Great Together!",
  body: "Got a project in mind, an HCI research discussion, or just want to chat about frontends over a hot cup of chiya in Dhulikhel?",
  socialsHeading: "Find me around the web:",
  socials: [
    {
      label: "GitHub @ishannkc",
      href: site.socials.github,
      icon: "github",
    },
    {
      label: "LinkedIn /in/ishan-kc-bb3380285",
      href: site.socials.linkedin,
      icon: "linkedin",
    },
    {
      label: "Twitter @ishannkc",
      href: site.socials.twitter,
      icon: "twitter",
    },
    {
      label: "Instagram @ishann.kc",
      href: site.socials.instagram,
      icon: "instagram",
    },
  ] satisfies SocialLink[],
  signature: "Sent with warmth from Nepal",
  stamp: "NEPAL 50R",
} as const;

export const footer = {
  copyright: "Built and designed by Ishan Kc.",
  rights: "All rights reserved. ©",
} as const;
