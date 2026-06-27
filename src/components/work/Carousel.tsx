"use client";

import { Children, isValidElement, useEffect, useMemo, useState } from "react";
import { Column, Flex } from "@once-ui-system/core";
import { useCarousel } from "@/hooks";

interface CarouselProps {
  children: React.ReactNode;
}

/*
 * Scroll-driven ferris wheel to display a list of vertical elements by
 * fading out the previous element and fading in the next element.
 */
export function Carousel({ children }: CarouselProps) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const items = useMemo(
    () => Children.toArray(children).filter(isValidElement), [children]
  );

  const { wrapperRef, setCardRef } = useCarousel({
    count: items.length,
    enabled: !reducedMotion
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
      <Column fillWidth horizontal="center" vertical="center" gap="80">
        {items}
      </Column>
    );
  }

  const wrapperHeight = `calc(100vh + ${(items.length - 1) * 80}vh)`;

  return (
    <Flex ref={wrapperRef} style={{ position: "relative", height: wrapperHeight }}>
      <Column
        fillWidth
        horizontal="center"
        vertical="center"
        style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}
      >
        {items.map((item, index) => 
          <Flex
            key={item.key}
            ref={setCardRef(index)}
            paddingX="8"
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
      </Column>
    </Flex>
  );
}
