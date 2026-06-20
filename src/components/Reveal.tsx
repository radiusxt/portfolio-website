"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { Flex, RevealFx, type SpacingToken } from "@once-ui-system/core";

interface RevealProps {
  children: ReactNode;
  translateY?: number | SpacingToken;
  fillWidth?: boolean;
  horizontal?: "start" | "center" | "end";
}

export function Reveal({
  children, translateY, fillWidth = false, horizontal = "center"
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTriggered(true);
        observer.disconnect();
      }
    // Fires when 250px is in viewport.
    }, { rootMargin: "0px 0px 250px 0px" });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <Flex ref={ref} direction="column" fillWidth={fillWidth}>
      <RevealFx
        translateY={translateY}
        fillWidth={fillWidth}
        horizontal={horizontal}
        // Long delay until triggered
        delay={99999}
        trigger={triggered}
      >
        {children}
      </RevealFx>
    </Flex>
  );
}
