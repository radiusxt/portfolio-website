"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { Flex } from "@once-ui-system/core";

interface SpotlightBorderProps {
  children: ReactNode;
  color: string;
  /**
   * Maximum arc spread in degrees when the cursor is directly on the border.
   * Narrows automatically as the cursor moves further away.
   * @default 100
   */
  //maxSpread?: number;
  /**
   * Distance (px) beyond which the spotlight fades to its minimum size.
   * @default 400
   */
  //falloffDistance?: number;
}

export function SpotlightBorder({ children, color, ...props }: SpotlightBorderProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  //const lastMouse = useRef({ x: 0, y: 0 });
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    setMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const wrapper = wrapperRef.current;
      const glow = glowRef.current;

      if (!wrapper || !glow) {
        return;
      }

      /*
       * Find element's centre (cx, cy). atan2 gives angle from centre to cursor in radians.
       * Multiply by 180/π to get degrees, then +90 rotates for CSS (0° = top, clockwise).
       * Clamp cursor to rect to find nearest point on or inside element.
       * hypot measures straight-line distance from cursor to that point.
       * proximity normalises distance to [0, 1]: 1 on the border, 0 at falloffDistance.
       * arc scales the max spread (100°) by proximity, so glow widens as cursor approaches.
       * conic-gradient takes percentage stops, not degrees.
       * arcPercent converts  arc width to a 0–100 scale (arc / 360 * 100).
       * peakPercent is midpoint, so gradient is transparent→peak→transparent, centred on peakDeg.
       */
      const rect = wrapper.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const peakDeg = Math.atan2(e.clientY - cy, e.clientX - cx) * (180 / Math.PI) + 90;
      const nearX = Math.max(rect.left, Math.min(e.clientX, rect.right));
      const nearY = Math.max(rect.top, Math.min(e.clientY, rect.bottom));
      const distToBorder = Math.hypot(e.clientX - nearX, e.clientY - nearY);
      const proximity = Math.max(0, 1 - distToBorder / 400);
      const arc = 90 * proximity;
      const half = arc / 2;
      const arcPercent = (arc / 360) * 100;
      const peakPercent = arcPercent / 2;

      glow.style.background = `conic-gradient(from ${peakDeg - half}deg at 50% 50%, transparent 0%,
        var(--${color}) ${peakPercent.toFixed(1)}%, transparent ${arcPercent.toFixed(1)}%)`;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [color]);

  // Don't render border if viewed on mobile.
  if (mobile) {
    return <>{children}</>;
  }

  return (
    <Flex
      ref={wrapperRef}
      position="relative"
      padding="40"
      style={{
        display: "flex",
        flexDirection: "column",
        minWidth: 0,
        minHeight: 0
      }}
    >
      <div
        ref={glowRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "2rem",
          padding: 2,
          background: "transparent",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          pointerEvents: "none",
          zIndex: 1,
          willChange: "background",
        }}
      />
      <Flex zIndex="0" position="relative" {...props}>
        {children}
      </Flex>
    </Flex>
  );
};
