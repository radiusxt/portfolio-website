"use client";

import type { MouseEvent, ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Flex } from "@once-ui-system/core";

interface ScrollProps {
  children: ReactNode;
  target?: string;
  href?: string;
}

/* Scroll to top of page or target location */
export function Scroll({ children, target, href }: ScrollProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    const isModifiedClick =
      e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey;

    if (isModifiedClick) {
      return;
    }

    const isSamePage = !href || href === pathname;

    if (isSamePage && target) {
      e.preventDefault();
      const element = document.getElementById(target);

      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }

      return;
    }

    if (!href) {
      return;
    }

    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Wait for animation to reach within 25px of top before transitioning.
    const waitForTop = () => {
      if (window.scrollY <= 25) {
        router.push(href);
        return;
      }

      requestAnimationFrame(waitForTop);
    };

    requestAnimationFrame(waitForTop);
  };

  return (
    <a href={href} onClick={handleClick}>
      <Flex cursor="pointer">{children}</Flex>
    </a>
  );
}
