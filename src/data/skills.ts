export interface SkillCategory {
  title: string;
  emoji: string;
  skills: Array<{
    label: string;
    highlighted?: boolean;
  }>;
}

export const skills = {
  label: "/ skills",
  title: "Collect Them All!",
  subtitle:
    "No boring percentage progress bars here. Just tools I genuinely enjoy using.",
  categories: [
    {
      title: "Languages",
      emoji: "⌨️",
      skills: [
        { label: "TypeScript" },
        { label: "JavaScript" },
        { label: "Python" },
        { label: "C++ (KU Core)" },
        { label: "HTML5" },
        { label: "CSS3" },
      ],
    },
    {
      title: "Frontend",
      emoji: "🖥️",
      skills: [
        { label: "React", highlighted: true },
        { label: "Next.js" },
        { label: "Tailwind CSS" },
        { label: "Redux Toolkit" },
        { label: "Vite" },
      ],
    },
    {
      title: "HCI & Design",
      emoji: "📐",
      skills: [
        { label: "Figma", highlighted: true },
        { label: "User Testing" },
        { label: "Wireframing" },
        { label: "a11y Auditing" },
        { label: "SUS Metrics" },
      ],
    },
    {
      title: "Backend & Lab",
      emoji: "⚙️",
      skills: [
        { label: "Node.js" },
        { label: "Git & GitHub" },
        { label: "PostgreSQL" },
        { label: "Supabase", highlighted: true },
        { label: "Linux CLI" },
      ],
    },
  ] satisfies SkillCategory[],
};
