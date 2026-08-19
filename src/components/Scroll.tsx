"use client";

import type { MouseEvent, ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Flex } from "@once-ui-system/core";
import { useNavigation } from "@/components";

interface ScrollProps {
  children: ReactNode;
  target?: string;
  href?: string;
}

/* Scroll to top of page or target location */
export function Scroll({ children, target, href }: ScrollProps) {
  const pathname = usePathname();
  const { navigate } = useNavigation();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    const isModifiedClick =
      e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey;

    if (isModifiedClick) {
      return;
    }

    const samePage = !href || href === pathname;

    if (samePage && target) {
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

    if (!samePage) {
      navigate(href);
      return;
    }
    
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <a href={href} onClick={handleClick}>
      <Flex cursor="pointer">
        {children}
      </Flex>
    </a>
  );
}
