import dynamic from "next/dynamic";
import { projects } from "@/data/projects";
import { site } from "@/data/site";
import { SectionHeading } from "./SectionHeading";

const ProjectCarousel = dynamic(
  () =>
    import("./ProjectCarousel").then((module) => ({
      default: module.ProjectCarousel,
    })),
  {
    loading: () => (
      <div aria-hidden="true">
        <div className="ink-shadow-md aspect-[4/5] w-full rounded-[24px] border-2 border-[#3B2A20] bg-primary-container sm:aspect-[16/10]" />
        <div className="mt-space-md flex h-2.5 items-center justify-center gap-2">
          {projects.items.map((project) => (
            <span
              className="h-2.5 w-2.5 rounded-full border-2 border-[#3B2A20] bg-[#FAF0DC]"
              key={project.title}
            />
          ))}
        </div>
      </div>
    ),
  },
);

export function Projects() {
  return (
    <section
      aria-label="Projects"
      className="w-full border-b-2 border-[#3B2A20] bg-[#F5EAD4] py-space-lg"
      id="projects"
    >
      <div className="mx-auto max-w-[900px] px-margin">
        <div className="relative mb-space-sm">
          <SectionHeading label={projects.label} />
          <div className="mt-2 flex justify-center sm:absolute sm:right-0 sm:top-8 sm:mt-0">
            <a
              className="group inline-flex items-center gap-1.5 border-b-2 border-[#800020] pb-0.5 font-headline-md text-sm font-semibold text-[#800020] transition-all duration-200 hover:-translate-y-1 hover:border-[#3B2A20] hover:text-[#3B2A20] motion-reduce:transform-none sm:text-base"
              href={site.socials.github}
              rel="noopener noreferrer"
              target="_blank"
            >
              <span>View all Projects</span>
              <span aria-hidden="true" className="font-bold">
                →
              </span>
            </a>
          </div>
        </div>

        <ProjectCarousel items={projects.items} />
      </div>
    </section>
  );
}
