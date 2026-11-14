import { blurData } from "./blur";

export const research = {
  label: "/research",
  publicationTag: "Ongoing",
  statusTag: "HCI Course Paper · 2026",
  title:
    "A Comparative Usability Study of Voice Input and Touch Interaction for Completing Small Screen Mobile Tasks",
  authors: "Pranav Koirala, Diksha Sharma, Ishan KC",
  affiliation:
    "Department of Computer Science and Engineering, Kathmandu University",
  course: "COMP 341, Human Computer Interaction Research Paper",
  supervisor: "Under the supervision of Dr. Sushil Shrestha",
  methodologyHeading: "Methodology & Field Study:",
  methodology:
    "This study followed a discovery-first HCI process: a structured online survey of 64 smartphone users compared voice and touch input across ten routine, public, and hands-busy scenarios. We analyzed perceived speed, accuracy, ease of use, privacy, and situational preference, then translated the findings into concrete design requirements. The results inform the working prototype and moderated usability evaluation planned for the next phase.",
  takeaways: [
    {
      title: "64 Valid Responses",
      detail: "Smartphone users aged 15–50",
      highlight: false,
    },
    {
      title: "10 Task Scenarios",
      detail: "Routine, public, and hands-busy contexts",
      highlight: false,
    },
    {
      title: "Hands-Free Advantage",
      detail: "62.5% preferred voice with one hand occupied",
      highlight: true,
    },
  ],
  cta: {
    label: "Read Pre-Print (PDF)",
    href: "/research/HCI%20RP.pdf",
    download: "HCI RP.pdf",
  },
  paperPreview: {
    src: "/images/research-paper.webp",
    alt: "First page of the HCI research paper",
    blur: blurData.researchPaper,
  },
} as const;
