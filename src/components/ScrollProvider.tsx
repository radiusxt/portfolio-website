"use client";

import type { ReactNode } from "react";
import { ReactLenis } from "lenis/react";

export function ScrollProvider({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.05, duration: 1 }}> 
      {children}
    </ReactLenis>
  );
}
