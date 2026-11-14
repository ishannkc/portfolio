import { site } from "./site";
import type { AboutContent, HeroContent } from "./types";
import { blurData } from "./blur";

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
    href: "/resume/ishankc_resume.pdf",
  },
  mascotBadge: "★ KU",
  mascotCaption: "Always building! 📜",
};

export const about: AboutContent = {
  label: "/about me",
  intro: [
    {
      text: "'m currently in my final year of Computer Science at ",
    },
    { text: "Kathmandu University (KU)", bold: true },
    { text: ", graduating in 2027. Nestled in the hills of " },
    { text: "Banepa", bold: true },
    {
      text: ", I split my time between writing code, experimenting with AI workflows, and learning new tech.",
    },
  ],
  techLabel: "Here are some technologies I have been working with:",
  technologies: [
    "Python",
    "Next.js",
    "Typescript",
    "React.js",
    "Javascript ES6+",
  ],
  outro:
    "In my free time, I’m usually watching movies, gaming for a bit, or glued to the Premier League every weekend.",
  portrait: {
    src: "/images/about-portrait.webp",
    alt: "Ishan Kc standing in front of mountain peaks",
    blur: blurData.aboutPortrait,
  },
};
