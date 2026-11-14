export type IconName =
  | "mail"
  | "github"
  | "linkedin"
  | "twitter"
  | "instagram"
  | "external"
  | "temple"
  | "lab";

export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: IconName;
  handle?: string;
}

export interface TextSegment {
  text: string;
  bold?: boolean;
}

export interface HeroContent {
  heading: {
    before: string;
    highlight: string;
    after: string;
  };
  pitch: string;
  cta: {
    label: string;
    href: string;
  };
  resume: {
    label: string;
    href: string;
  };
  mascotBadge: string;
  mascotCaption: string;
}

export interface AboutContent {
  label: string;
  intro: TextSegment[];
  techLabel: string;
  technologies: string[];
  outro: string;
  portrait: {
    src: string;
    alt: string;
    blur: string;
  };
}
