"use client";

import { ReactNode } from "react";
import { Flex } from "@once-ui-system/core";

interface ScrollProps {
  children: ReactNode;
  target: string;
}

export function Scroll({ children, target }: ScrollProps) {
  const handleClick = () => {
    const element = document.getElementById(target)

    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <Flex onClick={handleClick} style={{ cursor: "pointer" }}>
      {children}
    </Flex>
  );
}
