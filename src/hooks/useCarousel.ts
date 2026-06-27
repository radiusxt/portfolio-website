"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

interface UseCarouselOptions {
  /** Number of cards in the carousel. */
  count: number;
  /** Set to false to skip wheel/touch capture entirely (e.g. reduced-motion users). */
  enabled?: boolean;
  
  /** Vertical drift (px) applied to cards as they enter/exit. */
  yAmplitude?: number;
  /** Subtle rotation (deg) applied to cards as they enter/exit, for the "wheel" feel. */
  rotationAmplitude?: number;
  /** Higher = snappier crossfade, lower = longer overlap between adjacent cards. */
  fadeSharpness?: number;
  /** Wheel/touch px needed to fully transition from one card to the next. Lower = more sensitive. */
  scrollSensitivity?: number;
  /** Fires when the nearest-to-center card changes (e.g. to update a counter/label). */
  onActiveIndexChange?: (index: number) => void;
}

/**
 * Drives a stack of absolutely-positioned cards by intercepting wheel/touch input
 * directly on `wrapperRef`, rather than by consuming real page-scroll distance.
 * While the wrapper is what's under the cursor/finger, wheel and touch deltas are
 * converted into an internal progress value (and the real scroll is prevented) —
 * so the document's actual scroll position barely moves while cycling through
 * cards. Once progress hits the first or last card and the user keeps scrolling
 * in that direction, the event is allowed through normally, releasing the page to
 * scroll on past the section as usual.
 *
 * Known tradeoffs: only wheel and touch input are captured. Page Down/spacebar
 * and dragging the scrollbar thumb don't fire wheel/touch events, so they'll
 * scroll straight through the section rather than stepping through cards.
 */
export function useCarousel({
  count,
  enabled = true,
  yAmplitude = 64,
  rotationAmplitude = 4,
  fadeSharpness = 1.4,
  scrollSensitivity = 600,
  onActiveIndexChange,
}: UseCarouselOptions) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressRef = useRef(0); // 0..count-1, "card space"
  const lastActiveIndex = useRef(-1);

  const setCardRef = (index: number) => (el: HTMLDivElement | null) => {
    cardRefs.current[index] = el;
  };

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!enabled || count === 0 || !wrapper) return;

    const maxProgress = Math.max(count - 1, 0);
    const EPS = 0.001;

    const updateCards = (segment: number) => {
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

        card.setAttribute("aria-hidden", isActive ? "false" : "true");
        card.inert = !isActive;
      });

      if (activeIndex !== lastActiveIndex.current) {
        lastActiveIndex.current = activeIndex;
        onActiveIndexChange?.(activeIndex);
      }
    };

    const step = (delta: number, sensitivity: number) => {
      const goingForward = delta > 0;
      const goingBackward = delta < 0;

      // At a boundary and trying to go further out-of-bounds — release control,
      // let the page scroll past the section normally.
      if (goingForward && progressRef.current >= maxProgress - EPS) return false;
      if (goingBackward && progressRef.current <= EPS) return false;

      progressRef.current = gsap.utils.clamp(0, maxProgress, progressRef.current + delta / sensitivity);
      updateCards(progressRef.current);
      return true;
    };

    const handleWheel = (event: WheelEvent) => {
      if (step(event.deltaY, scrollSensitivity)) {
        event.preventDefault();
      }
    };

    let touchStartY = 0;

    const handleTouchStart = (event: TouchEvent) => {
      if (!event.touches[0]) return;
      touchStartY = event.touches[0].clientY;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (!event.touches[0]) return;
      const currentY = event.touches[0].clientY;
      const delta = touchStartY - currentY; // swiping up = positive, like scrolling down
      touchStartY = currentY;

      // Touch deltas per event are smaller than wheel deltas, so it wants a
      // gentler divisor to feel similarly responsive.
      if (step(delta, scrollSensitivity * 0.5)) {
        event.preventDefault();
      }
    };

    updateCards(progressRef.current);

    wrapper.addEventListener("wheel", handleWheel, { passive: false });
    wrapper.addEventListener("touchstart", handleTouchStart, { passive: true });
    wrapper.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      wrapper.removeEventListener("wheel", handleWheel);
      wrapper.removeEventListener("touchstart", handleTouchStart);
      wrapper.removeEventListener("touchmove", handleTouchMove);
    };
    // onActiveIndexChange intentionally omitted — pass a stable reference if you use it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, count, yAmplitude, rotationAmplitude, fadeSharpness, scrollSensitivity, onActiveIndexChange]);

  return { wrapperRef, setCardRef };
}
