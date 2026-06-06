"use client";

import { type ReactNode, useRef, useState, useCallback } from "react";
import { type Colors, Flex } from "@once-ui-system/core";

interface SpotlightBorderProps {
  children: ReactNode;
  /** Border thickness in px */
  background: Colors | "surface" | "overlay" | "page" | "transparent";
  /** Colour of the spotlight glow on the border */
  spotlightColor?: string;
  /** How wide the spotlight cone is in px */
  spotlightSize?: number;
  /** Background of the card interior — use your Once UI surface token */
  innerBackground?: Colors | "surface" | "overlay" | "page" | "transparent";
  /** Subtle border shown when the cursor is not over the card */
  defaultBorderColor?: Colors;
}

/**
 * SpotlightBorder
 *
 * Wraps any content in a container whose border is only visible near
 * the cursor, following it as the mouse moves around the card.
 *
 * Technique: a two-layer `background` shorthand —
 *   Layer 1 (padding-box): fills the content area with the card background,
 *                          hiding the gradient underneath it.
 *   Layer 2 (border-box):  a radial-gradient that bleeds into the transparent
 *                          `border`, creating the glowing stroke.
 */
export function SpotlightBorder({
  children,
  background = "page",
  spotlightColor = "rgba(255, 110, 60, 0.9)",
  spotlightSize = 80,
  innerBackground = "page",
  defaultBorderColor = "neutral-weak",
}: SpotlightBorderProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { left, top } = ref.current.getBoundingClientRect();
    setPos({ x: e.clientX - left, y: e.clientY - top });
  }, []);

  return (
    <Flex
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      radius="l"
      style={{
        padding: "1px",
        // Only the gradient itself needs raw CSS — everything else is tokenised
        background: hovered
          ? `radial-gradient(${spotlightSize}px circle at ${pos.x}px ${pos.y}px, ${spotlightColor}, transparent 80%)`
          : "var(--neutral-alpha-weak)", // Once UI token for the resting border
        transition: hovered ? "none" : "background 0.4s ease",
      }}
    >
      <Flex direction="column" background={background} fillWidth radius="l">
        {children}
      </Flex>
    </Flex>
  );
}
