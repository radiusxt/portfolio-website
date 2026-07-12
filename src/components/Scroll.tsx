"use client";

import type { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Flex } from "@once-ui-system/core";

interface ScrollProps {
  children: ReactNode;
  target?: string;
  href?: string;
}

/* Scroll to top of page/target */
export function Scroll({ children, target, href }: ScrollProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = () => {
    const isSamePage = !href || href === pathname;

    if (isSamePage && target) {
      const element = document.getElementById(target);

      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }

      return;
    }

    if (!href) {
      return;
    }
    
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Wait till scroll animation reaches within 50 pixels of top.
    const waitForTop = () => {
      if (window.scrollY <= 50) {
        router.push(href);
        return;
      }

      requestAnimationFrame(waitForTop);
    };

    requestAnimationFrame(waitForTop);
  };

  return (
    <Flex cursor="pointer" onClick={handleClick}>
      {children}
    </Flex>
  );
}
