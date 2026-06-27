"use client";

import { Children, isValidElement, useEffect, useMemo, useState } from "react";
import { Column, Flex } from "@once-ui-system/core";
import { useCarousel } from "@/hooks";

interface CarouselProps {
  children: React.ReactNode;
  /** Wheel/touch px needed to fully transition from one card to the next. Lower = more sensitive. */
  scrollSensitivity?: number;
}
 
export function Carousel({ children, scrollSensitivity = 400 }: CarouselProps) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const items = useMemo(
    () => Children.toArray(children).filter(isValidElement), [children]
  );
 
  const { wrapperRef, setCardRef } = useCarousel({
    count: items.length,
    enabled: !reducedMotion,
    scrollSensitivity,
  });
 
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);
 
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    query.addEventListener("change", handler);
 
    return () => query.removeEventListener("change", handler);
  }, []);
 
  // Reduced motion fallback to render a plain stacked list with standard scroll.
  if (reducedMotion) {
    return (
      <Column fillWidth horizontal="center" vertical="center" gap="104">
        {items}
      </Column>
    );
  }
 
  return (
    <Flex
      ref={wrapperRef}
      fillWidth
      style={{ position: "relative", height: "90vh", overflow: "hidden", touchAction: "none" }}
    >
      <Column fillWidth horizontal="center" vertical="center" gap="40" style={{ height: "100%" }}>
        <Flex fillWidth style={{ position: "relative", flex: 1, overflow: "hidden" }}>
          {items.map((item, index) =>
            <Flex
              key={item.key}
              ref={setCardRef(index)}
              paddingX="12"
              horizontal="center"
              style={{
                position: "absolute",
                inset: 0,
                alignItems: "center",
                willChange: "transform, opacity"
              }}
            >
              {item}
            </Flex>
          )}
        </Flex>
      </Column>
    </Flex>
  );
}
