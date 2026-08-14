"use client";

import { usePathname } from "next/navigation";
import { Fade, Line, RevealFx, Row, ToggleButton } from "@once-ui-system/core";
import { Scroll, ThemeToggle } from "@/components";
import { about, display, gallery, home, routes, work } from "@/resources";

/* Page Header for Navigation */
export function Header() {
  return (
    <>
      <Fade
        position="fixed"
        zIndex={4}
        to="bottom"
        height={12}
        style={{ marginTop: "-8px" }}
      />
      <RevealFx position="sticky" zIndex={10} delay={0.2}>
        <Row
          as="header"
          position="sticky"
          zIndex={10}
          fillWidth
          fitHeight
          horizontal="center"
          data-border="rounded"
          padding="4"
        >
          <Row fillWidth horizontal="center">
            <Row
              background="overlay"
              zIndex={1}
              horizontal="center"
              border="neutral-weak"
              radius="xs"
              padding="4"
            >
              <Row vertical="center" textVariant="body-default-s" gap="4" suppressHydrationWarning>
                {routes["/"] && 
                  <Scroll target={home.title} href="/">
                    <ToggleButton prefixIcon="home" size="l" />
                  </Scroll>
                }
                <Line vert maxHeight="24" background="neutral-alpha-strong" />
                {routes["/about"] && 
                  <>
                    {/* Desktop & Mobile Layout */}
                    <Row s={{ hide: true }}>
                      <Scroll target={about.intro.title} href="/about">
                        <ToggleButton
                          prefixIcon="person"
                          label={about.label}
                          size="l"
                        />
                      </Scroll>
                    </Row>
                    {/* Mobile Layout */}
                    <Row hide s={{ hide: false }}>
                      <Scroll target={about.intro.title} href="/about">
                        <ToggleButton prefixIcon="person" size="l" />
                      </Scroll>
                    </Row>
                  </>
                }
                {routes["/work"] && 
                  <>
                    {/* Desktop & Mobile Layout */}
                    <Row s={{ hide: true }}>
                      <Scroll target={work.title} href="/work">
                        <ToggleButton
                          prefixIcon="code"
                          label={work.label}
                          size="l"
                        />
                      </Scroll>
                    </Row>
                    {/* Mobile Layout */}
                    <Row hide s={{ hide: false }}>
                      <Scroll target={work.title} href="/work">
                        <ToggleButton prefixIcon="code" size="l" />
                      </Scroll>
                    </Row>
                  </>
                }
                {routes["/gallery"] && 
                  <>
                    {/* Desktop & Mobile Layout */}
                    <Row s={{ hide: true }}>
                      <Scroll target={gallery.title} href="/gallery">
                        <ToggleButton
                          prefixIcon="gallery"
                          label={gallery.label}
                          size="l"
                        />
                      </Scroll>
                    </Row>
                    {/* Mobile Layout */}
                    <Row hide s={{ hide: false }}>
                      <Scroll target={gallery.title} href="/gallery">
                        <ToggleButton prefixIcon="gallery" size="l" />
                      </Scroll>
                    </Row>
                  </>
                }
                {display.themeSwitcher && 
                  <>
                    <Line vert maxHeight="24" background="neutral-alpha-strong" />
                    <ThemeToggle />
                  </>
                }
              </Row>
            </Row>
          </Row>
        </Row>
      </RevealFx>
    </>
  );
};
