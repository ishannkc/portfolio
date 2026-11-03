export interface GalleryItem {
  emoji: string;
  plate: string;
  title: string;
  description: string;
}

export const gallery = {
  label: "/ gallery",
  title: "Codex Doodles & Campus Artifacts",
  subtitle:
    "Sketches from Dhulikhel labs, whiteboard architectures, and handmade UI experiments.",
  items: [
    {
      emoji: "🏔️",
      plate: "Plate 01",
      title: "Dhulikhel Mountain Vista Lab",
      description:
        "Field notebook sketches from sunrise coding sessions at KU hilltop.",
    },
    {
      emoji: "🖋️",
      plate: "Plate 02",
      title: "Renaissance UI Study & Grids",
      description:
        "Manuscript typography experiments with Cormorant Garamond and newsprint layout.",
    },
    {
      emoji: "☕",
      plate: "Plate 03",
      title: "The Spiced Chiya Companion",
      description:
        "Hand-drawn mascot concepts for the ChiyaLog mobile routine tracker.",
    },
  ] satisfies GalleryItem[],
  feature: {
    plateLabel: "Archival Folio • Plate 04",
    eyebrow: "Official Heritage Mark",
    title: "Temple Sigil & Architectural Emblem",
    description:
      "Hand-inked multi-tiered pagoda temple inspired by Newari architecture in the Kathmandu Valley. Rendered in traditional crosshatch woodcut style with rich crimson eaves, preserving Nepali cultural iconography across Ishan's digital artifacts.",
    features: [
      "🖼️ High-Res Ink & Wash Illustration",
      "✨ Transparent PNG Asset",
    ],
    dimensions: "953 × 1183 px",
    saveLabel: "Save Asset (PNG)",
    viewLabel: "View Full Resolution",
    image: {
      src: "/images/temple.png",
      width: 399,
      height: 501,
      alt: "Hand-inked multi-tiered Newari pagoda temple emblem with crimson eaves",
    },
  },
} as const;
