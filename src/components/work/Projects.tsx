"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { Column, TiltFx } from "@once-ui-system/core";
import { ProjectCard, Scroll } from "@/components";
import type { Post } from "@/utils/utils";

interface ProjectProps {
  projects: Post[];
  visible?: number;
}

gsap.registerPlugin(ScrollTrigger);

export function Projects({ projects, visible = 2 }: ProjectProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const observer = new ResizeObserver(() => ScrollTrigger.refresh());
 
    if (!wrapper || projects.length === 0) {
      return;
    }
 
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-stack-card]");
      const first = cards[0];
      const step = cards.length > 1 ? 1 / (cards.length - 1) : 1;
      const centerY = () => Math.max(0, (window.innerHeight - first.offsetHeight) / 2 - 104);
 
      // Nothing to stack, so centre a single card
      if (cards.length < 2) {
        gsap.set(first, { y: centerY });
        return;
      }

      // One timeline, scrubbed across the whole wrapper
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: wrapper,
          start: "top 104px",
          end: "bottom bottom+=104",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
 
      cards.forEach((card, i) => {
        const start = i * step;
 
        if (start >= 1) {
          return;
        }
        
        // Card i begins shrinking at i * step and finishes at the end,
        // so earlier cards shrink further as more cards stack on top
        const targetScale = Math.max(0.5, 1 - (cards.length - i - 1) * 0.1);
        tl.to(card, { scale: targetScale, duration: 1 - start }, start);

        if (i + visible <= cards.length - 1) {
          tl.to(card, { autoAlpha: 0, duration: step }, (i + visible - 1) * step);
        }
      });

      tl.fromTo(first, { y: centerY }, { y: 0, duration: step }, 0);
      
      // When a card starts to fade out, push the stack upwards
      // on the viewport so it's position remains the same
      if (cards.length > visible) {
        const slots = gsap.utils.toArray<HTMLElement>("[data-stack-slot]");
        const pushStart = (visible - 1) * step;
        tl.to(slots, { y: -(cards.length - visible) * 72, duration: 1 - pushStart }, pushStart);
      }

      observer.observe(first);
    }, wrapper);
 
    return () => {
      observer.disconnect();
      ctx.revert();
    };
  }, [projects.length, visible]);

  return (
    <Column ref={wrapperRef} fillWidth position="relative" top="48">
      {projects.map(({ slug, metadata }, index) =>
        <div
          key={slug}
          data-stack-slot
          style={{
            height: "100vh",
            justifyContent: "flex-start",
            position: "sticky",
            top: 104,
          }}
        >
          <div
            data-stack-card
            style={{
              position: "relative",
              top: index * 72,
              transformOrigin: "top center",
              width: "100%",
              willChange: "transform",
            }}
          >
            <Scroll href={`/work/${slug}`} label={`${metadata.title}`}>
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
          </div>
        </div>
      )}
    </Column>
  );
}
