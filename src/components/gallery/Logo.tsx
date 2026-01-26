"use client";

import React, { useEffect, useState } from "react";
import { Flex, Media, useTheme } from "@once-ui-system/core";

interface LogoSize {
  width?: number;
  height?: number;
  className?: string;
}

export const Logo: React.FC<LogoSize> = ({ width = 18, height }) => {
  const { theme } = useTheme();
  const [mount, setMount] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<string>("light");

  useEffect(() => {
    setMount(true);
    const themeAttr = document.documentElement.getAttribute("data-theme") || "light";
    setCurrentTheme(themeAttr);
  }, [theme]);

  if (!mount) {
    return <Flex style={{ width, height: height || 'auto' }} />;
  }

  const logoSrc = currentTheme === "dark" 
    ? "/images/brand/logo-light.png"
    : "/images/brand/logo-dark.png";

  return <Media src={logoSrc} alt="Logo" width={width} height={height} />;
};
