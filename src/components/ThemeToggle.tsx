"use client";

import { useEffect, useState } from "react";
import { Button, useTheme } from "@once-ui-system/core";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [_, setMounted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("dark");

  useEffect(() => {
    setMounted(true);
    setCurrentTheme(document.documentElement.getAttribute("data-theme") || "light");
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() =>
    setCurrentTheme(document.documentElement.getAttribute("data-theme") || "light"), [theme]
  );

  const icon = currentTheme === "dark" ? "dark" : "light";
  const nextTheme = currentTheme === "light" ? "dark" : "light";

  return (
    <Button
      prefixIcon={icon}
      variant="ghost"
      size="xl"
      onClick={() => setTheme(nextTheme)}
      aria-label={`Switch to ${nextTheme} mode.`}
      onClickCapture={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setTheme(nextTheme);
        (e.currentTarget).blur();
      }}
    />
  );
}
