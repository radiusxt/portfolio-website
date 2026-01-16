"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

export function Scroll({ children }: { children: ReactNode }) {
  const handleClick = () => {
    document
      .getElementById("featured_project")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return <div onClick={handleClick} style={{ cursor: "pointer" }}>{children}</div>;
}

export function ScrollToHash() {
  const router = useRouter();

  useEffect(() => {
    // Get the hash from the URL
    const hash = window.location.hash;
    if (hash) {
      // Remove the '#' symbol
      const id = hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [router]);

  return null;
}
