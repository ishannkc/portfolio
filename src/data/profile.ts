import { site } from "./site";
import type { AboutContent, HeroContent } from "./types";

export const hero: HeroContent = {
  heading: {
    before: "hi, ",
    highlight: "Ishan",
    after: " here.",
  },
  pitch:
    "Developer-in-training by day, researcher of how humans poke and talk at phones by night. Fueled by side projects, AI experiments, and the occasional mountain.",
  cta: {
    label: "Say Hi!",
    href: `mailto:${site.email}`,
  },
  resume: {
    label: "Resume",
    href: "/resume.pdf",
  },
  mascotBadge: "★ KU",
  mascotCaption: "Always building! 📜",
};

export const about: AboutContent = {
  label: "/about me",
  heading: "Student by Day, Tinkerer by Night",
  dropCap: "I",
  lead: {
    before: "'m currently in my third year of Computer Science at ",
    highlight: "Kathmandu University (KU)",
    after:
      ", graduating in 2027. Nestled in the hills of Dhulikhel, I split my time between writing frontends, experimenting with AI workflows, and researching human-computer interaction in our lab.",
  },
  body:
    "When I'm not coding, you'll find me sketching cartoon doodles, brewing spiced milk tea, or fixing broken CSS with friends around the department courtyard.",
  stats: [
    { emoji: "📍", label: "Dhulikhel, Nepal" },
    { emoji: "☕", label: "1,400+ Chais" },
  ],
  desk: {
    title: "Ishan's Desk in Dhulikhel 🛋️",
    captionLeft: '🌿 Succulent: "Pixel"',
    captionRight: "⚡ KU Lab Node: #04",
  },
};
