export type SkillIconName =
  | "gemini"
  | "openai"
  | "openrouter"
  | "c"
  | "cplusplus"
  | "html5"
  | "css3"
  | "javascript"
  | "typescript"
  | "vite"
  | "nextjs"
  | "nodejs"
  | "express"
  | "react"
  | "nodemon"
  | "python"
  | "postgresql"
  | "supabase"
  | "git"
  | "github";

export interface Skill {
  label: string;
  icon: SkillIconName;
  background: string;
  foreground: string;
  iconColor?: string;
}

export const skills = {
  label: "/skills",
  items: [
    {
      label: "Google Gemini",
      icon: "gemini",
      background: "#8E75B2",
      foreground: "#FFFFFF",
    },
    {
      label: "OpenAI",
      icon: "openai",
      background: "#10A37F",
      foreground: "#FFFFFF",
    },
    {
      label: "OpenRouter",
      icon: "openrouter",
      background: "#1E293B",
      foreground: "#FFFFFF",
      iconColor: "#94A3B8",
    },
    {
      label: "C",
      icon: "c",
      background: "#1E2A44",
      foreground: "#FFFFFF",
      iconColor: "#A8B9CC",
    },
    {
      label: "C++",
      icon: "cplusplus",
      background: "#00599C",
      foreground: "#FFFFFF",
    },
    {
      label: "HTML5",
      icon: "html5",
      background: "#E34F26",
      foreground: "#FFFFFF",
    },
    {
      label: "CSS3",
      icon: "css3",
      background: "#1572B6",
      foreground: "#FFFFFF",
    },
    {
      label: "JavaScript",
      icon: "javascript",
      background: "#F7DF1E",
      foreground: "#1E1E1E",
    },
    {
      label: "TypeScript",
      icon: "typescript",
      background: "#3178C6",
      foreground: "#FFFFFF",
    },
    {
      label: "Vite",
      icon: "vite",
      background: "#9135FF",
      foreground: "#FFFFFF",
    },
    {
      label: "Next.js",
      icon: "nextjs",
      background: "#111111",
      foreground: "#FFFFFF",
    },
    {
      label: "Node.js",
      icon: "nodejs",
      background: "#339933",
      foreground: "#FFFFFF",
    },
    {
      label: "Express.js",
      icon: "express",
      background: "#0A0A0A",
      foreground: "#FFFFFF",
    },
    {
      label: "React.js",
      icon: "react",
      background: "#20232A",
      foreground: "#FFFFFF",
      iconColor: "#61DAFB",
    },
    {
      label: "Nodemon",
      icon: "nodemon",
      background: "#76D04B",
      foreground: "#FFFFFF",
    },
    {
      label: "Python",
      icon: "python",
      background: "#3776AB",
      foreground: "#FFFFFF",
      iconColor: "#FFD43B",
    },
    {
      label: "PostgreSQL",
      icon: "postgresql",
      background: "#4169E1",
      foreground: "#FFFFFF",
    },
    {
      label: "Supabase",
      icon: "supabase",
      background: "#3FCF8E",
      foreground: "#083A2E",
    },
    {
      label: "Git",
      icon: "git",
      background: "#F03C2E",
      foreground: "#FFFFFF",
    },
    {
      label: "GitHub",
      icon: "github",
      background: "#181717",
      foreground: "#FFFFFF",
    },
  ] satisfies Skill[],
};
