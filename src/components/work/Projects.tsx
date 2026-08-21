"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Column, TiltFx } from "@once-ui-system/core";
import { ProjectCard, Scroll } from "@/components";
import type { Post } from "@/utils/utils";

export function Projects({ projects }: { projects: Post[] }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);

  const setCardRefs = useMemo(() => Array.from({ length: projects.length }, (_, i) =>
    (el: HTMLDivElement | null) => {
      cardRefs.current[i] = el;
    }), [projects.length]
  );

  useEffect(() => {
    const wrapper = wrapperRef.current;

    if (!wrapper || projects.length === 0) {
      return;
    }

    const updateOpacity = () => {
      const rect = wrapper.getBoundingClientRect();
      const scrollableDistance = rect.height - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), scrollableDistance);
      const progress = scrollableDistance > 0 ? scrolled / scrollableDistance : 0;
      const floatIndex = progress * (projects.length - 1);
      const nearestIndex = Math.round(floatIndex);
      const distance = Math.abs(floatIndex - nearestIndex);
      const opacity = distance <= 0.25 ? 1 : Math.max(0, 1 - (distance - 0.25) / 0.225);
      const activeCard = cardRefs.current[nearestIndex];

      if (activeCard) {
        activeCard.style.opacity = String(opacity);
      }

      if (nearestIndex !== activeIndexRef.current) {
        activeIndexRef.current = nearestIndex;
        setActiveIndex(nearestIndex);
      }
    };

    let ticking = false;

    const onScroll = () => {
      if (ticking) {
        return;
      }

      ticking = true;

      requestAnimationFrame(() => {
        updateOpacity();
        ticking = false;
      });
    };

    updateOpacity();
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
      position="relative"
      height={`${projects.length * 100}vh`}
    >
      <Column fill center position="sticky" top="40" height="100vh">
        {projects.map(({ slug, metadata }, index) =>
          <Column
            key={slug}
            ref={setCardRefs[index]}
            fill
            center
            position="absolute"
            pointerEvents={index === activeIndex ? "auto" : "none" }
            style={{ inset: 0, willChange: "opacity" }}
          >
            {index === activeIndex &&
              <Scroll href={`/work/${slug}`}>
                <TiltFx intensity={0.5}>
                  <ProjectCard
                    title={metadata.title}
                    description={metadata.summary}
                    image={metadata.image}
                    team={metadata.team}
                    link={metadata.link || ""}
                    tags={metadata.tags || []}
                  />
                </TiltFx>
              </Scroll>
            }
          </Column>
        )}
      </Column>
    </Column>
  );
}
