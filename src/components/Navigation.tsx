"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLenis } from "lenis/react";

interface NavigationContextValue {
  exiting: boolean;
  navigate: (href: string) => void;
}

const NavigationContext = createContext<NavigationContextValue | null>(null);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [exiting, setExiting] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const lenis = useLenis();

  const navigate = useCallback((href: string) => {
    setExiting(true);
    lenis?.stop();
    setTimeout(() => router.push(href), 200);
  }, [router, lenis]);

  // Reset fade once the route has changed and new page is mounted
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setExiting(false);
    lenis?.scrollTo(0, { immediate: true });
    lenis?.start();
  }, [pathname]);

  return (
    <NavigationContext.Provider value={{ exiting, navigate }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);

  if (!context) {
    throw new Error("useNavigation must be used within NavigationProvider");
  }
  
  return context;
}
