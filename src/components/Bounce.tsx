"use client";

import { type ReactNode, useEffect, useRef } from "react";
import { Flex } from "@once-ui-system/core";

interface BounceProps {
  children: ReactNode;
  distance: number;
  duration: number;
  // Set high value to disable
  fade?: number;
}

/* Bounce animation with fade in/out */
export function Bounce({ children, distance, duration, fade = 400 }: BounceProps) {
  const fadeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const updateOpacity = () => {
      const opacity = Math.max(0, 1 - window.scrollY / fade);

      if (fadeRef.current) {
        fadeRef.current.style.opacity = opacity.toString();
      }

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateOpacity);
        ticking = true;
      }
    };

    // Set correct state on mount
    updateOpacity(); 
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [fade]);

  return (
    <Flex ref={fadeRef} style={{ transition: "opacity 0.2s ease-out" }}>
      <style>
        {`@keyframes bounce {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(${distance}px);
            }
          }

          .animation {
            animation: bounce ${duration}s ease-in-out infinite;
          }`
        }
      </style>
      <Flex className="animation">
        {children}
      </Flex>
    </Flex>
  );
}
