"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface useCarouselOptions {
  /** Number of cards in the carousel. */
  count: number;
  /** Set to false to skip pinning/scrubbing entirely (e.g. for reduced-motion users). */
  enabled?: boolean;

  /** Vertical drift (px) applied to cards as they enter/exit. */
  yAmplitude?: number;
  /** Subtle rotation (deg) applied to cards as they enter/exit — the "wheel" feel. */
  rotationAmplitude?: number;
  /** Higher = snappier crossfade, lower = longer overlap between adjacent cards. */
  fadeSharpness?: number;
  /** Fires when the card nearest the center changes (e.g. to drive a counter/label). */
  onActiveIndexChange?: (index: number) => void;
}

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Pins a tall wrapper element to the viewport with `position: sticky` and, as the
 * user scrolls through it, crossfades/translates a stack of absolutely-positioned
 * cards based on scroll progress. Only the page's native scrollbar is used — there's
 * no inner scroll container.
 *
 * Usage: attach `wrapperRef` to the tall outer div, and `setCardRef(index)` to each
 * absolutely-positioned card inside the sticky stage.
 */
export function useCarousel({
  count,
  enabled = true,
  yAmplitude = 64,
  rotationAmplitude = 4,
  fadeSharpness = 1.4,
  onActiveIndexChange,
}: useCarouselOptions) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lastActiveIndex = useRef(-1);

  const setCardRef = (index: number) => (el: HTMLDivElement | null) => {
    cardRefs.current[index] = el;
  };

  useEffect(() => {
    if (!enabled || count === 0 || !wrapperRef.current) return;

    const updateCards = (progress: number) => {
      // Map 0..1 scroll progress onto "card space": 0 = first card centered,
      // count - 1 = last card centered.
      const segment = progress * Math.max(count - 1, 0);
      const activeIndex = Math.round(segment);

      cardRefs.current.forEach((card, i) => {
        if (!card) return;

        const distance = i - segment; // negative = already passed, positive = upcoming
        const absDistance = Math.abs(distance);
        const isActive = absDistance < 0.5;
        const opacity = gsap.utils.clamp(0, 1, 1 - absDistance * fadeSharpness);

        gsap.set(card, {
          opacity,
          y: distance * yAmplitude,
          rotation: gsap.utils.clamp(-rotationAmplitude, rotationAmplitude, distance * rotationAmplitude),
          scale: gsap.utils.clamp(0.85, 1, 1 - absDistance * 0.15),
          pointerEvents: isActive ? "auto" : "none",
          zIndex: Math.round((1 - absDistance) * 100),
        });

        // Keep hidden cards out of the tab order / accessibility tree.
        card.setAttribute("aria-hidden", isActive ? "false" : "true");
        card.inert = !isActive;
      });

      if (activeIndex !== lastActiveIndex.current) {
        lastActiveIndex.current = activeIndex;
        onActiveIndexChange?.(activeIndex);
      }
    };

    const trigger = ScrollTrigger.create({
      trigger: wrapperRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      //markers: true,
      invalidateOnRefresh: true,
      onUpdate: (self) => updateCards(self.progress),
      onRefresh: (self) => updateCards(self.progress),
    });

    updateCards(0);

    return () => {
      trigger.kill();
    };
    // onActiveIndexChange intentionally omitted — pass a stable reference if you use it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, count, yAmplitude, rotationAmplitude, fadeSharpness, onActiveIndexChange]);

  return { wrapperRef, setCardRef };
}
