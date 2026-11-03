export interface Certification {
  symbol: string;
  year: string;
  issuer: string;
  title: string;
  description: string;
  folio: string;
  href: string;
  distinction?: string;
  featured?: boolean;
}

export const certifications = {
  label: "/ certifications",
  title: "Scholarly Credentials & Honors",
  subtitle:
    "Authenticated certificates in human interaction, modern frontends, and academic excellence.",
  items: [
    {
      symbol: "★",
      year: "2024",
      issuer: "IxDF • Stanford Online • KU HCI Lab",
      title: "Human-Centered Design Practitioner",
      description:
        "Field usability protocols, contextual inquiry for low-resource interfaces, and human-computer cognitive modeling in Himalayan health nodes.",
      folio: "Folio: IXDF-KU-78401",
      href: "#",
    },
    {
      symbol: "⚙",
      year: "2023",
      issuer: "Meta & Coursera Professional",
      title: "Full-Stack Web Architect & Modern Frontend",
      description:
        "Advanced component lifecycle, React architectural patterns, Node runtime optimization, and high-performance offline client state management.",
      folio: "Folio: META-FS-99120",
      href: "#",
    },
    {
      symbol: "👁",
      year: "2024",
      issuer: "W3Cx • IAAP Recognized Track",
      title: "Accessibility & Inclusive Web Standards (WCAG 2.2)",
      description:
        "Rigorous assistive technology auditing, ARIA authoring landmarks, keyboard navigation trees, and color contrast compliance for low-vision readers.",
      folio: "Folio: W3C-A11Y-4431",
      href: "#",
    },
    {
      symbol: "❦",
      year: "2024",
      issuer: "Kathmandu University Dept of CS",
      title: "Academic Excellence Award (Dean's Honor Roll)",
      description:
        "Conferred for highest academic standing in foundational computer science coursework, peer mentorship leadership, and laboratory HCI research initiatives.",
      folio: "Folio: KU-SOE-2024-H08",
      href: "#",
      distinction: "Distinction",
      featured: true,
    },
  ] satisfies Certification[],
};
