"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
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

  return <Flex onClick={handleClick} style={{ cursor: "pointer" }}>{children}</Flex>;
}

export function ScrollToHash() {
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash;

    if (hash) {
      const id = hash.replace("#", "");
      const element = document.getElementById(id);
      
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [router]);

  return null;
}
