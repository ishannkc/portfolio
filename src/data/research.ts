export const research = {
  label: "Research",
  publicationTag: "Research Publication",
  statusTag: "In Review / CHI Poster 2025",
  title:
    "Exploring Voice vs. Touch Input Modalities for Low-Literacy Users in Rural Himalayan Healthcare Systems",
  author: "Ishan S.",
  coAuthors:
    ", Dr. B. Sharma — KU Department of Computer Science & Engineering",
  methodologyHeading: "Methodology & Field Study:",
  methodology:
    "We conducted controlled usability sessions with 48 community health volunteers across 3 primary health posts in Kavre district. We evaluated error recovery rates, cognitive task completion times, and user comfort when recording patient vitals using localized Nepali conversational voice interfaces compared to pictorial high-contrast touch menus.",
  takeaways: [
    {
      title: "🎯 34% Faster Recovery",
      detail: "With hybrid voice-touch flow",
      highlight: true,
    },
    {
      title: "📊 Usability Score: 82/100",
      detail: "System Usability Scale (SUS)",
      highlight: false,
    },
    {
      title: "🏥 3 Kavre Clinics",
      detail: "Field tested under low connectivity",
      highlight: false,
    },
  ],
  cta: {
    label: "Read Pre-print (PDF)",
    href: "#",
    icon: "📄",
  },
  note: "Includes questionnaire dataset",
  graphic: {
    title: "HCI Field Kit",
    caption:
      "Testing accessibility heuristics on real tablet surfaces in rural terrain.",
  },
} as const;
