"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { Flex, RevealFx, type SpacingToken } from "@once-ui-system/core";

interface RevealProps {
  children: ReactNode;
  translateY?: number | SpacingToken;
}

export function Reveal({ children, translateY }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTriggered(true);
        observer.disconnect();
      }
    // Fires when 15% of the element's height is in viewport.
    }, { threshold: 0.15 });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <Flex ref={ref} direction="column" fillWidth>
      <RevealFx
        translateY={translateY}
        horizontal="center"
        // Long delay until triggered
        delay={99999}
        trigger={triggered}
      >
        {children}
      </RevealFx>
    </Flex>
  );
}
