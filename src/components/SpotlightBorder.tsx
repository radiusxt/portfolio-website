"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { Flex } from "@once-ui-system/core";

interface SpotlightBorderProps {
  children: ReactNode;
  primary: string;
  secondary?: string;
  spread?: number;
  falloff?: number;
}

/* Dynamic border based on cursor proximity for styling */
export function SpotlightBorder({
    children, primary, secondary, spread = 100, falloff = 350, ...props }: SpotlightBorderProps) {
  const [mobile, setMobile] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    setMobile(mq.matches);

    const handler = (e: MediaQueryListEvent) => setMobile(e.matches);
    mq.addEventListener("change", handler);
    
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const calculate = (clientX: number, clientY: number) => {
      const wrapper = wrapperRef.current;
      const glow = glowRef.current;

      if (!wrapper || !glow) {
        return;
      }
      
      // Find element's centre (cx, cy). atan2 gives angle from centre to cursor in radians.
      // Multiply by 180/π to get degrees, then +90 rotates for CSS so 0° = top going clockwise.
      const rect = wrapper.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const peakDeg = Math.atan2(clientY - cy, clientX - cx) * (180 / Math.PI) + 90;
      
      // dists measure how far cursor is from each edge.
      // Taking minimum gives signed distance to the nearest edge:
      // negative/zero/positive means cursor is outside/on/inside element.
      const distLeft = clientX - rect.left;
      const distRight = rect.right - clientX;
      const distTop = clientY - rect.top;
      const distBottom = rect.bottom - clientY;
      const distToBorder = Math.min(distLeft, distRight, distTop, distBottom);

      // t is the cursor's position projected onto the top-left/bottom-right diagonal,
      // normalised to [0, 1] (0 is top-left and 1 is bottom-right).
      // This is a diagonal *projection* (dx + dy over width + height) and
      // reads as a corner-to-corner fade though not perpendicular.
      // Clamped so cursor positions outside the element don't overshoot the primary/secondary blend.
      const t = Math.min(1, Math.max(0,
        ((clientX - rect.left) + (clientY - rect.top)) / (rect.width + rect.height)));

      // proximity normalises |distToBorder| against falloff from 0 to 1.
      const proximity = Math.max(0, 1 - Math.abs(distToBorder) / falloff);

      // arc is spotlight's angular width in degrees, glow expands as cursor approaches.
      // half offsets conic-gradient start so peakDeg lands at the midpoint.
      const arc = spread * proximity;
      const half = arc / 2;

      // conic-gradient uses percent stops rather than degree stops to avoid negative value wrapping.
      // arcPercent converts arc width on a [0, 100] scale (arc / 360 * 100).
      // peakPercent is midpoint, so gradient is transparent → peak → transparent, centred on peakDeg.
      const arcPercent = (arc / 360) * 100;
      const peakPercent = arcPercent / 2;

      // opacityPercent scales opacity so glow dims as cursor moves away in either direction.
      const opacityPercent = (proximity * 100).toFixed(1);

      // baseColor blends primary → secondary along the diagonal using t. If no secondary
      // is provided, the spotlight is a flat primary color regardless of cursor position.
      const baseColor = secondary ? `color-mix(in srgb, var(--${primary}) ${((1 - t) * 100).toFixed(1)}%,
        var(--${secondary}) ${(t * 100).toFixed(1)}%)` : `var(--${primary})`;
      
      // peakColor layers the proximity-based opacity fade on top of the diagonal color blend where
      // baseColor gives the hue at this cursor position, then this mix fades it to transparent.
      const peakColor = `color-mix(in srgb, ${baseColor} ${opacityPercent}%, transparent)`;
      glow.style.background = `conic-gradient(from ${peakDeg - half}deg at 50% 50%, transparent 0%,
        ${peakColor} ${peakPercent.toFixed(1)}%, transparent ${arcPercent.toFixed(1)}%
      )`;
    };

    const handleMouseMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      calculate(e.clientX, e.clientY);
    };

    const handleScroll = () => {
      calculate(pos.current.x, pos.current.y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [primary, secondary, spread, falloff]);

  // Don't render on mobile device as it doesn't have a cursor.
  if (mobile) {
    return <>{children}</>;
  }

  return (
    <Flex ref={wrapperRef} position="relative" padding="40">
      <div
        ref={glowRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          zIndex: 1,
          inset: 0,
          padding: 2,
          borderRadius: "2rem",
          pointerEvents: "none",
          willChange: "background",
          background: "transparent",
          maskComposite: "exclude",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
        }}
      />
      <Flex zIndex="0" position="relative" {...props}>
        {children}
      </Flex>
    </Flex>
  );
};
