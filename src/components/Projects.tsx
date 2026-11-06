import Image from "next/image";
import type { Project } from "@/data/projects";
import { projects } from "@/data/projects";
import { Button } from "./Button";
import { Card } from "./Card";
import { Chip } from "./Chip";
import { GitHubIcon } from "./icons";
import { SectionHeading } from "./SectionHeading";

function ProjectArt({ project }: { project: Project }) {
  return (
    <div className="relative mb-space-md aspect-[16/9] w-full overflow-hidden rounded-xl border-2 border-[#3B2A20] bg-[#EFE1C3]">
      <Image
        alt={project.image.alt}
        className="object-cover object-top"
        fill
        quality={95}
        sizes="(max-width: 768px) 92vw, 512px"
        src={project.image.src}
        unoptimized={project.image.src.endsWith(".gif")}
      />
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
        <SectionHeading className="mb-space-sm" label={projects.label} />

        <div className="grid grid-cols-1 gap-space-lg md:grid-cols-2">
          {projects.items.map((project) => {
            const github = project.actions.find(
              (action) => action.label === "GitHub",
            );

            return (
              <Card
                className="ink-btn-press relative flex flex-col p-space-md transition-all"
                key={project.title}
                radius="2xl"
                shadow="base"
              >
                {github && (
                  <a
                    aria-label={`Open ${project.title} on GitHub`}
                    className="absolute inset-0 z-10 rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#800020]"
                    href={github.href}
                    rel="noopener noreferrer"
                    target="_blank"
                  />
                )}

                <ProjectArt project={project} />

              <h3 className="font-headline-sm text-2xl font-bold text-[#3B2A20]">
                {project.title}
              </h3>
              <p className="mt-1 font-body-md text-base leading-relaxed text-[#3B2A20]">
                {project.description}
              </p>

              <ul className="mt-3 space-y-1.5">
                {project.highlights.map((highlight) => (
                  <li
                    className="flex gap-2 font-body-md text-sm leading-snug text-[#3B2A20]"
                    key={highlight}
                  >
                    <span
                      aria-hidden="true"
                      className="mt-0.5 text-sm font-black leading-none text-[#800020]"
                    >
                      ▸
                    </span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              <div className="mb-space-md mt-auto flex flex-wrap items-center justify-between gap-x-3 gap-y-2 pt-space-md">
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <Chip key={tag} tone="parchment">
                      {tag}
                    </Chip>
                  ))}
                </div>

                <div className="relative z-20 flex items-center gap-space-sm">
                  {project.actions.map((action) =>
                    action.label === "GitHub" ? (
                      <a
                        aria-label={`${project.title} on GitHub`}
                        className="ink-btn-press inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border-2 border-[#3B2A20] bg-[#800020] text-[#FFF4E0] transition-colors hover:bg-[#6b001b]"
                        href={action.href}
                        key={action.label}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <GitHubIcon className="h-5 w-5" />
                      </a>
                    ) : (
                      <Button
                        external={action.href.startsWith("http")}
                        href={action.href}
                        key={action.label}
                        size="xs"
                        variant={action.primary ? "primary" : "secondary"}
                      >
                        <span>{action.label}</span>
                        <span aria-hidden="true">↗</span>
                      </Button>
                    ),
                  )}
                </div>
              </div>
            </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
