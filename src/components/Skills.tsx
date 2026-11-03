import { skills } from "@/data/skills";
import { Card } from "./Card";
import { Chip } from "./Chip";
import { SectionHeading } from "./SectionHeading";

export function Skills() {
  return (
    <section
      className="w-full border-b-2 border-[#3B2A20] bg-[#F5EAD4] py-space-xl"
      id="skills"
    >
      <div className="mx-auto max-w-[1100px] px-margin">
        <SectionHeading
          className="mb-space-xl"
          divider="after-copy"
          label={skills.label}
          subtitle={skills.subtitle}
          title={skills.title}
        />

        <div className="grid grid-cols-1 gap-space-lg md:grid-cols-2 lg:grid-cols-4">
          {skills.categories.map((category) => (
            <Card
              className="flex flex-col p-space-md"
              key={category.title}
              radius="2xl"
              shadow="base"
            >
              <div className="mb-space-md flex items-center gap-2 border-b border-[#3B2A20]/20 pb-2">
                <span aria-hidden="true" className="text-xl">
                  {category.emoji}
                </span>
                <h3 className="font-headline-sm text-xl font-bold text-[#3B2A20]">
                  {category.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <Chip
                    font="label-md"
                    key={skill.label}
                    shadow
                    size="sm"
                    tone={skill.highlighted ? "primary" : "parchment"}
                  >
                    {skill.label}
                  </Chip>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
