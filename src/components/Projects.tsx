import type { Project } from "@/data/projects";
import { projects } from "@/data/projects";
import { Button } from "./Button";
import { Card } from "./Card";
import { Chip } from "./Chip";
import { SectionHeading } from "./SectionHeading";

function ProjectArt({ project }: { project: Project }) {
  if (project.thumbnail === "sajilo") {
    return (
      <div className="ink-shadow-sm flex items-center gap-3 rounded-xl border-2 border-[#3B2A20] bg-[#FAF0DC] p-3">
        <span aria-hidden="true" className="text-2xl text-[#800020]">
          🪄
        </span>
        <div className="flex flex-col">
          <span className="font-headline-sm text-base font-bold text-[#3B2A20]">
            SajiloSite Studio
          </span>
          <span className="font-label-sm text-xs font-semibold text-[#800020]">
            AI Site Canvas for Nepali Small Shops
          </span>
        </div>
      </div>
    );
  }

  if (project.thumbnail === "katha") {
    return (
      <div className="flex flex-wrap items-center justify-center gap-3">
        <div className="ink-shadow-sm rounded-md border-2 border-[#3B2A20] bg-[#800020] px-3 py-1 font-label-sm text-xs font-bold text-[#FFF4E0]">
          Button ✦
        </div>
        <div className="ink-shadow-sm flex h-7 w-12 items-center rounded-full border-2 border-[#3B2A20] bg-[#B8923A] px-1">
          <div className="h-4 w-4 rounded-full border border-[#3B2A20] bg-[#FAF0DC]" />
        </div>
        <div className="ink-shadow-sm whitespace-nowrap rounded-md border-2 border-[#3B2A20] bg-[#FAF0DC] px-3 py-1 font-label-sm text-xs text-[#3B2A20]">
          Tag: &apos;Fun&apos;
        </div>
      </div>
    );
  }

  if (project.thumbnail === "chiya") {
    return (
      <div className="flex flex-wrap items-center justify-center gap-4">
        <div className="ink-shadow-sm flex items-center gap-2 rounded-xl border-2 border-[#3B2A20] bg-[#FAF0DC] px-3 py-2">
          <span aria-hidden="true" className="text-xl">
            ☕
          </span>
          <span className="whitespace-nowrap font-label-sm text-xs font-bold text-[#3B2A20]">
            Streak: 14 Days
          </span>
        </div>
        <div className="ink-shadow-sm flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#3B2A20] bg-[#800020] text-[#FFF4E0]">
          <span aria-hidden="true" className="text-xs">
            ✓
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="ink-shadow-sm rounded-xl border-2 border-[#3B2A20] bg-[#FAF0DC] p-3 text-center">
      <span className="font-label-sm text-xs text-[#800020] line-through">
        namastye
      </span>
      <span aria-hidden="true" className="mx-1 text-[#3B2A20]">
        →
      </span>
      <span className="whitespace-nowrap font-headline-sm text-sm font-bold text-[#3B2A20]">
        नमस्ते (Namaste)
      </span>
    </div>
  );
}

export function Projects() {
  return (
    <section
      className="w-full border-b-2 border-[#3B2A20] bg-[#F5EAD4] py-space-xl"
      id="projects"
    >
      <div className="mx-auto max-w-[1100px] px-margin">
        <SectionHeading
          className="mb-space-xl"
          divider="after-copy"
          label={projects.label}
          subtitle={projects.subtitle}
          title={projects.title}
        />

        <div className="grid grid-cols-1 gap-space-lg md:grid-cols-2">
          {projects.items.map((project) => (
            <Card
              className="ink-btn-press flex flex-col p-space-md transition-all"
              key={project.title}
              radius="2xl"
              shadow="base"
            >
              <div className="relative mb-space-md flex h-48 w-full items-center justify-center overflow-hidden rounded-xl border-2 border-[#3B2A20] bg-[#EFE1C3] p-3">
                <ProjectArt project={project} />
                <Chip
                  className="ink-shadow-sm absolute right-3 top-3"
                  shape="pill"
                  size="xs"
                  tone={project.badge.tone}
                >
                  {project.badge.label}
                </Chip>
              </div>

              <h3 className="font-headline-sm text-2xl font-bold text-[#3B2A20]">
                {project.title}
              </h3>
              <p className="mb-space-md mt-1 flex-1 font-body-md text-base leading-relaxed text-[#3B2A20]">
                {project.description}
              </p>

              <div className="mb-space-md flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <Chip key={tag} tone="parchment">
                    {tag}
                  </Chip>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-space-sm pt-space-xs">
                {project.actions.map((action) => (
                  <Button
                    href={action.href}
                    key={action.label}
                    size="xs"
                    variant={action.primary ? "primary" : "secondary"}
                  >
                    <span>{action.label}</span>
                    <span aria-hidden="true">↗</span>
                  </Button>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
