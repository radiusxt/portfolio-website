"use client";

import { useEffect, useRef, useState } from "react";
import { Column, TiltFx } from "@once-ui-system/core";
import { ProjectCard, Scroll } from "@/components";
import type { Post } from "@/utils/utils";

export function Projects({ projects }: { projects: Post[] }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const wrapper = wrapperRef.current;

    if (!wrapper) {
      return;
    }

    const updateOpacities = () => {
      const rect = wrapper.getBoundingClientRect();
      const scrollableDistance = rect.height - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), scrollableDistance);
      const progress = scrollableDistance > 0 ? scrolled / scrollableDistance : 0;
      const floatIndex = progress * (projects.length - 1);
      const nearestIndex = Math.round(floatIndex);

      cardRefs.current.forEach((card, i) => {
        if (!card) {
          return;
        }

        const distance = Math.abs(floatIndex - i);
        let opacity: number;

        if (distance <= 0.25) {
          opacity = 1;

        } else {
          const rampProgress = (distance - 0.25) / (0.5 - 0.25);
          opacity = Math.max(0, 1 - rampProgress);
        }

        card.style.opacity = String(opacity);
        card.style.zIndex = i === nearestIndex ? "2" : "1";
      });

      if (nearestIndex !== activeIndexRef.current) {
        activeIndexRef.current = nearestIndex;
        setActiveIndex(nearestIndex);
      }
    };

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateOpacities();
          ticking = false;
        });
        ticking = true;
      }
    };

    updateOpacities();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [projects.length]);

  return (
    <Column
      ref={wrapperRef}
      fill
      style={{ position: "relative", height: `${projects.length * 100}vh` }}
    >
      <Column
        fill
        horizontal="center"
        vertical="center"
        style={{ position: "sticky", top: 40, height: "100vh" }}
      >
        {projects.map((project, index) => {
          const card = (
            <TiltFx intensity={0.5}>
              <ProjectCard
                title={project.metadata.title}
                description={project.metadata.summary}
                image={project.metadata.image}
                team={project.metadata.team}
                link={project.metadata.link || ""}
                tags={project.metadata.tags || []}
              />
            </TiltFx>
          );

          return (
            <Column
              key={project.slug}
              ref={(el) => { cardRefs.current[index] = el; }}
              fill
              center
              style={{ position: "absolute", inset: 0, transition: "opacity 0.15s linear" }}
            >
              {index === activeIndex ? (
                <Scroll href={`/work/${project.slug}`}>{card}</Scroll>
              ) : (
                card
              )}
            </Column>
          );
        })}
      </Column>
    </Column>
  );
}

/*
import { Column, Swiper, TiltFx } from "@once-ui-system/core";
import { ProjectCard, Scroll } from "@/components";
import { getPosts } from "@/utils/utils";

interface ProjectsProps {
  range?: [number, number?];
}

export function Projects({ range }: ProjectsProps) {
  const projects = getPosts(["src", "app", "work", "projects"]).sort((a, b) => {
    return new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime();
  });

  const displayedProjects = projects.slice((range?.[0] ?? 1) - 1, range?.[1]);

  return (
    <Column fill horizontal="center">
      <Swiper
        fill
        priority
        aspectRatio="3 / 2"
        controls={false}
        border="transparent"
        m={{ aspectRatio: "1 / 1 "}}
        s={{ aspectRatio: "4 / 5" }}
        items={[
          ...displayedProjects.map((project) => ({
            slide:
              <Column key={project.slug} fill center>
                <TiltFx intensity={0.5}>
                  <Scroll href={`/work/${project.slug}`}>
                    <ProjectCard
                      key={project.slug}
                      title={project.metadata.title}
                      description={project.metadata.summary}
                      image={project.metadata.image}
                      team={project.metadata.team}
                      link={project.metadata.link || ""}
                      tags={project.metadata.tags || []}
                    />
                  </Scroll>
                </TiltFx>
              </Column>
          }))
        ]}
      />
    </Column>
  );
}*/
