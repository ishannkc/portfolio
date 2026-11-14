"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent, TouchEvent } from "react";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/cn";
import { GitHubIcon } from "./icons";
import { Reveal } from "./Reveal";

const LEAVE_MS = 420;

function githubFor(project: Project) {
  return project.actions.find((action) => action.label === "GitHub");
}

interface ProjectCarouselProps {
  items: readonly Project[];
}

export function ProjectCarousel({ items }: ProjectCarouselProps) {
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const [leaving, setLeaving] = useState<number | null>(null);
  const [reduceMotion, setReduceMotion] = useState(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const lastSwipeAt = useRef(0);
  const leaveTimer = useRef<number | null>(null);
  const count = items.length;

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  // Warm the neighbouring stills once the browser is idle, so a swipe or dot
  // click does not land on an empty slide.
  useEffect(() => {
    const connection = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    if (connection?.saveData) return;
    if (connection?.effectiveType && /(^|-)2g$/.test(connection.effectiveType)) {
      return;
    }

    const timer = window.setTimeout(() => {
      const neighbours = new Set([
        (active + 1) % count,
        (active - 1 + count) % count,
      ]);
      neighbours.forEach((index) => {
        const item = items[index];
        if (!item) return;
        const image = new window.Image();
        image.src = item.image.src;
      });
    }, 900);

    return () => window.clearTimeout(timer);
  }, [active, count, items]);

  useEffect(() => {
    return () => {
      if (leaveTimer.current) window.clearTimeout(leaveTimer.current);
    };
  }, []);

  const goTo = (index: number) => {
    const current = activeRef.current;
    const nextIndex = ((index % count) + count) % count;
    if (nextIndex === current) return;

    activeRef.current = nextIndex;
    setLeaving(current);
    setActive(nextIndex);

    if (leaveTimer.current) window.clearTimeout(leaveTimer.current);
    leaveTimer.current = window.setTimeout(() => {
      setLeaving(null);
      leaveTimer.current = null;
    }, LEAVE_MS);
  };
  const next = () => goTo(activeRef.current + 1);
  const prev = () => goTo(activeRef.current - 1);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      next();
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      prev();
    } else if (event.key === "Home") {
      event.preventDefault();
      goTo(0);
    } else if (event.key === "End") {
      event.preventDefault();
      goTo(count - 1);
    }
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;

    const touch = event.changedTouches[0];
    if (!touch) return;

    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;

    // Only treat deliberate horizontal swipes as navigation.
    if (Math.abs(dx) < 40 || Math.abs(dx) <= Math.abs(dy)) return;
    lastSwipeAt.current = Date.now();
    if (dx < 0) next();
    else prev();
  };

  if (count === 0) return null;

  return (
    <div
      aria-label="Project carousel. Use the left and right arrow keys to navigate."
      aria-roledescription="carousel"
      className="group relative"
      role="region"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <p aria-atomic="true" aria-live="polite" className="sr-only">
        Slide {active + 1} of {count}: {items[active]?.title}
      </p>

      <Reveal>
        <div
          className="ink-shadow-md relative aspect-[4/5] w-full overflow-hidden rounded-[24px] border-2 border-[#3B2A20] bg-primary-container transition-transform duration-200 ease-out group-hover:-translate-y-1 motion-reduce:transform-none sm:aspect-[16/10]"
          onTouchCancel={() => {
            touchStart.current = null;
          }}
          onTouchEnd={handleTouchEnd}
          onTouchStart={handleTouchStart}
        >
          {items.map((project, index) => {
            const isActive = index === active;
            const github = githubFor(project);
            // Keep the outgoing slide's media mounted for the fade-out; every
            // other slide stays lightweight until it is selected.
            const showMedia = isActive || index === leaving;

            return (
              <article
                aria-hidden={!isActive}
                aria-label={`${index + 1} of ${count}: ${project.title}`}
                aria-roledescription="slide"
                className={cn(
                  "absolute inset-0 flex items-end justify-center transition-opacity duration-[400ms] ease-out motion-reduce:transition-none",
                  isActive ? "opacity-100" : "pointer-events-none opacity-0",
                )}
                inert={!isActive}
                key={project.title}
              >
                {showMedia &&
                  (project.video && !reduceMotion ? (
                    <video
                      aria-label={project.image.alt}
                      autoPlay
                      className="absolute inset-0 h-full w-full object-cover object-top brightness-[0.7]"
                      loop
                      muted
                      playsInline
                      poster={project.image.src}
                      preload="metadata"
                      role="img"
                      src={project.video.src}
                    />
                  ) : (
                    <Image
                      alt={project.image.alt}
                      blurDataURL={project.image.blur}
                      className="object-cover object-top brightness-[0.7]"
                      fill
                      placeholder="blur"
                      sizes="(max-width: 640px) 92vw, 900px"
                      src={project.image.src}
                    />
                  ))}

                <div
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to bottom, transparent 0%, transparent 30%, rgba(40, 0, 10, 0.85) 65%, rgba(40, 0, 10, 0.95) 100%)",
                  }}
                />

                {github && (
                  <a
                    aria-label={`Open ${project.title} on GitHub`}
                    className="absolute inset-0 z-20 rounded-[24px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-white"
                    href={github.href}
                    rel="noopener noreferrer"
                    target="_blank"
                    onClick={(event) => {
                      // A horizontal swipe should navigate the carousel,
                      // not open the link it happened to end on.
                      if (Date.now() - lastSwipeAt.current < 400) {
                        event.preventDefault();
                      }
                    }}
                  />
                )}

                <div className="relative z-30 flex max-h-full w-full flex-col items-center overflow-y-auto overscroll-contain px-5 pb-2 pt-10 text-center sm:px-10">
                  <h3 className="font-headline-lg text-3xl font-bold leading-tight text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.7)] sm:text-4xl md:text-5xl">
                    {project.title}
                  </h3>

                  <p className="mt-1 max-w-[60ch] font-body-md text-base font-medium leading-[1.3] text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.7)] sm:mt-1.5">
                    {project.description}
                  </p>

                  <ul className="mx-auto mt-2 max-w-[65ch] space-y-1 text-left sm:mt-2.5">
                    {project.highlights.map((highlight) => (
                      <li
                        className="flex gap-2 font-body-md text-base font-medium leading-[1.3] text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.7)]"
                        key={highlight}
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[0.35em] text-xs font-black leading-none text-[#E8C77A]"
                        >
                          ▸
                        </span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="mt-2 whitespace-nowrap font-label-md text-[11px] font-bold tracking-wide text-secondary-container [text-shadow:0_2px_8px_rgba(0,0,0,0.7)] sm:mt-2.5 sm:text-sm">
                    {project.tags.join(" · ")}
                  </p>

                  {github && (
                    <a
                      aria-label={`Open ${project.title} on GitHub`}
                      className="ink-btn-press relative z-30 mt-2 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[#3B2A20] bg-primary text-white transition-colors hover:bg-[#6b001b] sm:mt-3"
                      href={github.href}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <GitHubIcon className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </Reveal>

      <button
        aria-label="Previous project"
        className="absolute left-2 top-1/2 z-20 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#3B2A20] bg-[#FAF0DC] text-xl font-bold text-[#3B2A20] shadow-[2px_2px_0px_#3B2A20] transition-colors hover:bg-[#EFE1C3] sm:-left-5 sm:h-11 sm:w-11"
        type="button"
        onClick={prev}
      >
        <span aria-hidden="true">←</span>
      </button>

      <button
        aria-label="Next project"
        className="absolute right-2 top-1/2 z-20 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#3B2A20] bg-[#FAF0DC] text-xl font-bold text-[#3B2A20] shadow-[2px_2px_0px_#3B2A20] transition-colors hover:bg-[#EFE1C3] sm:-right-5 sm:h-11 sm:w-11"
        type="button"
        onClick={next}
      >
        <span aria-hidden="true">→</span>
      </button>

      <div className="mt-space-md flex items-center justify-center gap-2">
        {items.map((project, index) => (
          <button
            aria-current={index === active ? "true" : undefined}
            aria-label={`Go to ${project.title}`}
            className="group/dot -mx-[3px] flex h-6 w-6 items-center justify-center"
            key={project.title}
            type="button"
            onClick={() => goTo(index)}
          >
            <span
              aria-hidden="true"
              className={cn(
                "block h-2.5 rounded-full border-2 border-[#3B2A20] transition-all duration-300 motion-reduce:transition-none",
                index === active
                  ? "w-8 bg-primary"
                  : "w-2.5 bg-[#FAF0DC] group-hover/dot:bg-[#EFE1C3]",
              )}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
