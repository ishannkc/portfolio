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

export interface Stat {
  emoji: string;
  label: string;
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
  mascotBadge: string;
  mascotCaption: string;
}

export interface AboutContent {
  label: string;
  heading: string;
  dropCap: string;
  lead: {
    before: string;
    highlight: string;
    after: string;
  };
  body: string;
  stats: Stat[];
  desk: {
    title: string;
    captionLeft: string;
    captionRight: string;
  };
}
