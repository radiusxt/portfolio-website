import "@once-ui-system/core/css/styles.css";
import "@once-ui-system/core/css/tokens.css";
import classNames from "classnames";

import {
  Background,
  Column,
  Flex,
  MatrixFx,
  Meta,
  type opacity,
  Particle,
  RevealFx,
  type SpacingToken,
} from "@once-ui-system/core";
import { Footer, Header, Providers, Reveal, RouteGuard } from "@/components";
import { baseURL, dataStyle, effects, fonts, home, style } from "@/resources";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

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
      suppressHydrationWarning
      as="html"
      lang="en"
      fillWidth
      className={classNames(
        fonts.heading.variable,
        fonts.body.variable,
        fonts.label.variable,
        fonts.code.variable,
      )}
    >
      <head>
        <script
          id="theme-init"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const root = document.documentElement;
                  const defaultTheme = 'system';
                  root.setAttribute('data-scroll-behavior', 'smooth');
                  
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
          as="body"
          background="page"
          fillWidth
          style={{
            position: "relative",
            minHeight: "100dvh"
          }}
        >
          {/*Matrix Background Animation*/}
          <Flex
            zIndex={0}
            fillHeight
            style={{
              position: "absolute",
              inset: 0,
              maxHeight: "100vh",
              pointerEvents: "none",
              maskImage: "radial-gradient(circle at 50% 0%, black 18%, transparent 58%)",
              WebkitMaskImage: "radial-gradient(circle at 50% 0%, black 18%, transparent 58%)",
            }}
            s={{
              style: {
                maxHeight: "150vh",
                maskImage: "radial-gradient(circle at 50% 0%, black 0%, transparent 50%)",
                WebkitMaskImage: "radial-gradient(circle at 50% 0%, black 0%, transparent 50%)",
              } 
            }}
            m={{
              style: {
                maxHeight: "250vh",
                maskImage: "radial-gradient(circle at 50% 0%, black 0%, transparent 50%)",
                WebkitMaskImage: "radial-gradient(circle at 50% 0%, black 0%, transparent 50%)",
              } 
            }}
          >
            <RevealFx fill position="absolute">
              <MatrixFx
                fill
                speed={4}
                spacing={20}
                size={2}
                flicker
                revealFrom="top"
                colors={[
                  "accent-on-background-weak",
                  "accent-on-background-medium",
                  "brand-on-background-weak",
                  "brand-on-background-medium",
                  "neutral-on-background-strong",
                ]}
              >
                <Background
                  mask={{
                    x: effects.mask.x,
                    y: effects.mask.y,
                    radius: effects.mask.radius,
                    cursor: effects.mask.cursor,
                  }}
                  gradient={{
                    display: effects.gradient.display,
                    opacity: effects.gradient.opacity as opacity,
                    x: effects.gradient.x,
                    y: effects.gradient.y,
                    width: effects.gradient.width,
                    height: effects.gradient.height,
                    tilt: effects.gradient.tilt,
                    colorStart: effects.gradient.colorStart,
                    colorEnd: effects.gradient.colorEnd,
                  }}
                  dots={{
                    display: effects.dots.display,
                    opacity: effects.dots.opacity as opacity,
                    size: effects.dots.size as SpacingToken,
                    color: effects.dots.color,
                  }}
                  grid={{
                    display: effects.grid.display,
                    opacity: effects.grid.opacity as opacity,
                    color: effects.grid.color,
                    width: effects.grid.width,
                    height: effects.grid.height,
                  }}
                  lines={{
                    display: effects.lines.display,
                    opacity: effects.lines.opacity as opacity,
                    size: effects.lines.size as SpacingToken,
                    thickness: effects.lines.thickness,
                    angle: effects.lines.angle,
                    color: effects.lines.color,
                  }}
                />
              </MatrixFx>
            </RevealFx>
          </Flex>
          {/*Particle Background Animation*/}
          <Flex
            zIndex={0}
            fillHeight
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              maskImage: "radial-gradient(circle at 50% 0%, transparent 20%, black 40%)",
              WebkitMaskImage: "radial-gradient(circle at 50% 0%, transparent 20%, black 40%)",
            }}
          >
            <RevealFx fill position="absolute" delay={1}>
              <Particle fill speed={1} density={150} size="4" color="brand-on-background-weak" />
            </RevealFx>
          </Flex>
          <Flex fillWidth minHeight="8" s={{ hide: true }} />
          <Header />
          <Flex zIndex={0} flex={1} fillWidth horizontal="center" padding="40">
            <Flex fillWidth horizontal="center" minHeight="0">
              <RouteGuard>
                {children}
              </RouteGuard>
            </Flex>
          </Flex>
          <Reveal>
            <Footer />
          </Reveal>
        </Column>
        <Analytics />
        <SpeedInsights />
      </Providers>
    </Flex>
  );
}
