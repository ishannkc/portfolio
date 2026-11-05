import { skills } from "@/data/skills";
import { SectionHeading } from "./SectionHeading";
import { SkillIcon } from "./SkillIcon";

export function Skills() {
  return (
    <section
      className="w-full border-b-2 border-[#3B2A20] bg-[#F5EAD4] py-space-xl"
      id="skills"
    >
      <div className="mx-auto max-w-[1100px] px-margin">
        <SectionHeading className="mb-space-lg" label={skills.label} />

        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
          {skills.items.map((skill, index) => (
            <div
              className="skill-badge group inline-flex h-11 items-center gap-2.5 whitespace-nowrap rounded-md border-2 border-[#3B2A20] px-3.5 shadow-[2px_2px_0px_#3B2A20] transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-[4px_4px_0px_#3B2A20] motion-reduce:transform-none"
              key={skill.label}
              style={{
                animationDelay: `${index * 40}ms`,
                backgroundColor: skill.background,
                color: skill.foreground,
              }}
            >
              <SkillIcon
                className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:scale-110"
                color={skill.iconColor ?? skill.foreground}
                name={skill.icon}
              />
              <span className="font-sans text-[11px] font-bold uppercase leading-none tracking-[0.08em]">
                {skill.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
