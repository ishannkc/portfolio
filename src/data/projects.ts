export interface ProjectAction {
  label: string;
  href: string;
  primary?: boolean;
}

export interface Project {
  title: string;
  description: string;
  highlights: string[];
  tags: string[];
  image: {
    src: string;
    alt: string;
  };
  actions: ProjectAction[];
}

export const projects = {
  label: "/projects",
  items: [
    {
      title: "Intervia",
      description:
        "An AI interview prep platform with voice-native mock interviews, instant feedback, and progress analytics for on-demand practice.",
      highlights: [
        "Enabled real-time voice interviews with Vapi and Gemini via the Vercel AI SDK.",
        "Secured sessions with HTTP-only cookies and Zod-validated feedback schemas.",
      ],
      tags: ["Next.js 15", "TypeScript", "Firebase", "Vapi · Gemini"],
      image: {
        src: "/images/intervia.jpeg",
        alt: "Intervia dashboard with AI interview cards and feedback",
      },
      actions: [
        {
          label: "GitHub",
          href: "https://github.com/ishannkc/Intervia",
          primary: true,
        },
      ],
    },
    {
      title: "Shortest Path Visualizer",
      description:
        "A visualizer that compares Dijkstra and Bellman-Ford across a weighted university road network, with walking, vehicle, and multi-modal parking routes.",
      highlights: [
        "Built a Flask API over a weighted road graph using NetworkX routing utilities.",
        "Added step-by-step visualizations of visited nodes, explored edges, and final paths.",
      ],
      tags: ["Python", "Flask", "NetworkX", "JavaScript"],
      image: {
        src: "/images/spv.gif",
        alt: "Animated shortest path visualization on a university road network",
      },
      actions: [
        {
          label: "GitHub",
          href: "https://github.com/ishannkc/Shortest-Path-Visualizer",
          primary: true,
        },
      ],
    },
    {
      title: "SajiloSite",
      description:
        "An AI website builder that turns natural-language prompts into responsive sites and apps, with a live editor and one-click deployment.",
      highlights: [
        "Co-led AI integration for a five-person team using DeepSeek via OpenRouter.",
        "Added Firebase auth, a live Monaco editor with AI chat, and public site URLs.",
      ],
      tags: ["React", "Express", "MongoDB", "DeepSeek"],
      image: {
        src: "/images/sajilosite.png",
        alt: "SajiloSite dashboard with generated website previews",
      },
      actions: [
        {
          label: "GitHub",
          href: "https://github.com/anujmagar777/SajiloSite",
          primary: true,
        },
      ],
    },
    {
      title: "Learnify",
      description:
        "An AI-assisted course platform that generates learning content, supports professor approval, and tracks learner progress.",
      highlights: [
        "Automated course structure, chapter content, and banner art with Gemini APIs.",
        "Delivered 10+ REST API routes on a Neon PostgreSQL schema using Drizzle ORM.",
      ],
      tags: ["Next.js", "Drizzle ORM", "Neon Postgres", "Gemini API"],
      image: {
        src: "/images/learnify.png",
        alt: "Learnify course dashboard with verified courses",
      },
      actions: [
        {
          label: "GitHub",
          href: "https://github.com/anujmagar777/Learnify",
          primary: true,
        },
      ],
    },
  ] satisfies Project[],
};
