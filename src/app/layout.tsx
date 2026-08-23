import "@once-ui-system/core/css/styles.css";
import "@once-ui-system/core/css/tokens.css";
import classNames from "classnames";

import Script from "next/script";
import { Column, Flex, Meta, Particle, RevealFx } from "@once-ui-system/core";
import { Footer, Header, Providers, RouteGuard, Starfield, Transition } from "@/components";
import { baseURL, dataStyle, fonts, home, style } from "@/resources";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "lenis/dist/lenis.css";

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });
}

export default async function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <Flex
      as="html"
      lang="en"
      fillWidth
      suppressHydrationWarning
      className={classNames(
        fonts.heading.variable,
        fonts.body.variable,
        fonts.label.variable,
        fonts.code.variable,
      )}
    >
      <head>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const root = document.documentElement;
                  const defaultTheme = 'system';
                  
                  // Set defaults from config
                  const config = ${JSON.stringify({
                    brand: style.brand,
                    accent: style.accent,
                    neutral: style.neutral,
                    solid: style.solid,
                    "solid-style": style.solidStyle,
                    border: style.border,
                    surface: style.surface,
                    transition: style.transition,
                    scaling: style.scaling,
                    "viz-style": dataStyle.variant,
                  })};
                  
                  // Apply default values
                  root.setAttribute('data-scroll-behavior', 'smooth');
                  Object.entries(config).forEach(([key, value]) => {
                    root.setAttribute('data-' + key, value);
                  });
                  
                  // Resolve theme
                  const resolveTheme = (themeValue) => {
                    if (!themeValue || themeValue === 'system') {
                      return window.matchMedia('(prefers-color-scheme: dark)').matches
                        ? 'dark'
                        : 'light';
                    }
                    return themeValue;
                  };
                  
                  // Apply saved theme
                  const savedTheme = localStorage.getItem('data-theme');
                  const resolvedTheme = resolveTheme(savedTheme);
                  root.setAttribute('data-theme', resolvedTheme);
                  
                  // Apply any saved style overrides
                  const styleKeys = Object.keys(config);
                  styleKeys.forEach(key => {
                    const value = localStorage.getItem('data-' + key);
                    if (value) {
                      root.setAttribute('data-' + key, value);
                    }
                  });
                } catch (e) {
                  console.error('Failed to initialize theme:', e);
                  document.documentElement.setAttribute('data-theme', 'dark');
                }
              })();
            `,
          }}
        />
      </head>
      <Providers>
        <Column
          fill
          as="body"
          position="relative"
          minHeight="100vh"
          background="page"
          marginTop="0"
        >
          {/* Starfield Animation */}
          <Flex position="fixed" zIndex={0} pointerEvents="none" style={{ inset: 0 }}>
            <RevealFx speed="fast">
              <Starfield />
            </RevealFx>
          </Flex>
          {/* Particle Animation */}
          <Flex position="fixed" zIndex={0} pointerEvents="none" style={{ inset: 0 }}>
            <RevealFx speed="fast">
              <Particle
                speed={1.5}
                density={60}
                size="1"
                color="neutral-on-background-strong"
              />
            </RevealFx>
          </Flex>
          {/* Page Content */}
          <Header />
          <Flex zIndex={0} flex={1} fill horizontal="center">
            <Transition>
              <RouteGuard>
                {children}
              </RouteGuard>
            </Transition>
          </Flex>
          <RevealFx>
            <Footer />
          </RevealFx>
        </Column>
        <Analytics />
        <SpeedInsights />
      </Providers>
    </Flex>
  );
}
