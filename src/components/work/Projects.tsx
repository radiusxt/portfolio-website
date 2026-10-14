"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { Column, TiltFx } from "@once-ui-system/core";
import { ProjectCard, Scroll } from "@/components";
import type { Post } from "@/utils/utils";

gsap.registerPlugin(ScrollTrigger);

const STACK_TOP = 100; // px from the viewport top where every card's top edge pins
const STACK_OFFSET = 64; // px each card sits below the one before it
const SCALE_STEP = 0.075; // how much smaller each earlier card ends up
const MIN_SCALE = 0.5;
const VISIBLE_STACK = 2; // cards left showing at rest (one more while a new card slides in)

export function Projects({ projects }: { projects: Post[] }) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
 
    if (!wrapper || projects.length === 0) {
      return;
    }
 
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const observer = new ResizeObserver(() => ScrollTrigger.refresh());
    
    // gsap.context scopes the selector below to this component and
    // lets ctx.revert() clean up the timeline + ScrollTrigger on unmount
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-stack-card]");
      const first = cards[0];
      const step = cards.length > 1 ? 1 / (cards.length - 1) : 1;
      
      // y offset that puts the first card in the vertical middle of the
      // viewport (its pinned position is STACK_TOP, hence the subtraction)
      const centerY = () => Math.max(0, (window.innerHeight - first.offsetHeight) / 2 - STACK_TOP);
 
      // Nothing to stack, so just centre the single card
      if (cards.length < 2) {
        gsap.set(first, { y: centerY });
        return;
      }

      // One timeline, scrubbed across the whole wrapper (0 -> 1)
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: wrapper,
          start: `top ${STACK_TOP}px`,
          end: `bottom bottom+=${STACK_TOP}`,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
 
      cards.forEach((card, i) => {
        const start = i * step;
 
        if (start >= 1) {
          return;
        }
 
        const targetScale = Math.max(MIN_SCALE, 1 - (cards.length - i - 1) * SCALE_STEP);
 
        // Card i begins shrinking at i * step and finishes at the end,
        // so earlier cards shrink further as more cards stack on top
        tl.to(card, { scale: targetScale, duration: 1 - start }, start);

        if (i + VISIBLE_STACK <= cards.length - 1) {
          tl.to(
            card,
            { autoAlpha: 0, duration: step },
            (i + VISIBLE_STACK - 1) * step
          );
        }
      });

      tl.fromTo(first, { y: centerY }, { y: 0, duration: step }, 0);

      if (cards.length > VISIBLE_STACK) {
        const slots = gsap.utils.toArray<HTMLElement>("[data-stack-slot]");
        const pushStart = (VISIBLE_STACK - 1) * step;
 
        tl.to(
          slots,
          {
            y: -(cards.length - VISIBLE_STACK) * STACK_OFFSET,
            duration: 1 - pushStart,
          },
          pushStart
        );
      }

      observer.observe(first);
    }, wrapper);
 
    return () => {
      observer.disconnect();
      ctx.revert();
    };
  }, [projects.length]);

  return (
    <Column ref={wrapperRef} fillWidth position="relative" top="40">
      {projects.map(({ slug, metadata }, index) =>
        <Column
          key={slug}
          fillWidth
          style={{
            position: "sticky",
            top: STACK_TOP,
            height: "100vh",
            justifyContent: "flex-start",
          }}
        >
          <div
            data-stack-card
            style={{
              position: "relative",
              top: index * STACK_OFFSET,
              width: "100%",
              transformOrigin: "top center",
              willChange: "transform",
            }}
          >
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
          </div>
        </Column>
      )}
    </Column>
  );
}
