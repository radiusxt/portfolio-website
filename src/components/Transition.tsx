"use client";

import type { ReactNode } from "react";
import { Flex } from "@once-ui-system/core";
import { useNavigation } from "@/components";

export function Transition({ children }: { children: ReactNode }) {
  const { exiting } = useNavigation();

  return (
    <Flex
      fillWidth
      horizontal="center"
      minHeight="0"
      style={{
        opacity: exiting ? 0 : 1,
        transform: exiting ? "translateY(var(--static-space-16))" : "translateY(0)",
        transition: "opacity 200ms ease, transform 200ms ease"
      }}
    >
      {children}
    </Flex>
  );
}
