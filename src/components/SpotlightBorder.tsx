"use client";

import { useRef, useState, useCallback, type CSSProperties, type ReactNode } from "react";
import { Flex } from "@once-ui-system/core";

interface SpotlightBorderProps {
  children: ReactNode;
  /** Border radius — accepts any CSS value or a Once UI token e.g. "var(--radius-l)" */
  radius?: string;
  /** Border thickness in px */
  borderWidth?: number;
  /** Colour of the spotlight glow on the border */
  spotlightColor?: string;
  /** How wide the spotlight cone is in px */
  spotlightSize?: number;
  /** Background of the card interior — use your Once UI surface token */
  innerBackground?: string;
  /** Subtle border shown when the cursor is not over the card */
  defaultBorderColor?: string;
  style?: CSSProperties;
  className?: string;
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
 *
 * No CSS / SCSS files needed — everything lives in inline styles.
 */
export const SpotlightBorder = ({
  children,
  radius = "var(--radius-l)",
  borderWidth = 1,
  spotlightColor = "rgba(255, 110, 60, 0.9)",
  spotlightSize = 280,
  innerBackground = "var(--page-background)",
  defaultBorderColor = "rgba(255, 255, 255, 0.07)",
  style,
  className,
}: SpotlightBorderProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;
      const { left, top } = ref.current.getBoundingClientRect();
      setPos({ x: e.clientX - left, y: e.clientY - top });
    }, []
  );

  /**
   * When hovered: a radial-gradient centred at the cursor position.
   * When idle:    a flat, barely-visible colour so the container still
   *               has a hint of a border (optional — set to "transparent"
   *               if you want it fully invisible when not hovered).
   */
  const borderLayer = hovered
    ? `radial-gradient(${spotlightSize}px circle at ${pos.x}px ${pos.y}px, ${spotlightColor}, transparent 80%)`
    : defaultBorderColor;

  return (
    <Flex
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={className}
      style={{
        borderRadius: radius,
        // `border` must use `transparent` so the background shows through.
        border: `${borderWidth}px solid transparent`,
        /**
         * Two backgrounds stacked:
         *  1. innerBackground padding-box  → fills content area, hides gradient
         *  2. borderLayer     border-box   → visible only in the transparent border strip
         */
        background: `${innerBackground} padding-box, ${borderLayer} border-box`,
        // Smooth fade when entering / leaving hover
        transition: hovered ? "none" : "background 0.4s ease",
        ...style,
      }}
    >
      {children}
    </Flex>
  );
};
