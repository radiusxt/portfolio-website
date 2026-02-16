"use client";

import { useState, useRef, useEffect, ReactNode } from "react";
import { Flex } from "@once-ui-system/core";

interface LoadingProps {
  fallback: ReactNode;
  children: ReactNode;
}

export function Loading({ fallback, children }: LoadingProps) {
  const [loaded, setLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check if image is already cached/loaded on mount
    const img = container.querySelector("img");
    if (img && img.complete && img.naturalHeight !== 0) {
      setLoaded(true);
    }

    const handleLoad = (e: Event) => {
      // We use event delegation to catch 'load' events from nested images
      if ((e.target as HTMLElement).tagName === "IMG") {
        setLoaded(true);
      }
    };

    // Load events do not bubble, so we use the capture phase (true)
    container.addEventListener("load", handleLoad, true);
    return () => container.removeEventListener("load", handleLoad, true);
  }, []);

  return (
    <Flex ref={containerRef} fillWidth style={{ display: "grid" }}>
      {!loaded && 
        <Flex fillWidth horizontal="center" style={{ gridArea: "1 / 1" }}>
          {fallback}
        </Flex>
      }
      <Flex
        fillWidth
        horizontal="center"
        style={{
          gridArea: "1 / 1",
          opacity: loaded ? 1 : 0,
          pointerEvents: loaded ? "auto" : "none",
          transition: "opacity 0.4s ease-in-out"
        }}
      >
        {children}
      </Flex>
    </Flex>
  );
}
