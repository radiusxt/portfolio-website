"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

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

  return <div onClick={handleClick} style={{ cursor: "pointer" }}>{children}</div>;
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
