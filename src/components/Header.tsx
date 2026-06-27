"use client";

import { usePathname } from "next/navigation";
import { Fade, Line, Row, ToggleButton } from "@once-ui-system/core";
import { Scroll, ThemeToggle } from "@/components";
import { about, display, gallery, home, routes, work } from "@/resources";
import styles from "./Header.module.scss";

/* Page Header for Navigation */
export function Header() {
  const pathname = usePathname() ?? "";

  return (
    <>
      <Fade position="fixed" zIndex={4} to="bottom" height={6} style={{ marginTop: "-8px" }} />
      <Row
        as="header"
        className={styles.position}
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
            background="page"
            zIndex={1}
            horizontal="center"
            border="neutral-alpha-weak"
            padding="4"
            radius="m-4"
            shadow="l"
          >
            <Row vertical="center" textVariant="body-default-s" gap="4" suppressHydrationWarning>
              {routes["/"] && 
                <Scroll target={home.title} href="/">
                  <ToggleButton
                    prefixIcon="home"
                    selected={pathname === "/"}
                    size="l"
                  />
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
                        selected={pathname === "/about"}
                        label={about.label}
                        size="l"
                      />
                    </Scroll>
                  </Row>
                  {/* Mobile Layout */}
                  <Row hide s={{ hide: false }}>
                    <Scroll target={about.intro.title} href="/about">
                      <ToggleButton
                        prefixIcon="person"
                        selected={pathname === "/about"}
                        size="l"
                      />
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
                        selected={pathname.startsWith("/work")}
                        label={work.label}
                        size="l"
                      />
                    </Scroll>
                  </Row>
                  {/* Mobile Layout */}
                  <Row hide s={{ hide: false }}>
                    <Scroll target={work.title} href="/work">
                      <ToggleButton
                        prefixIcon="code"
                        selected={pathname.startsWith("/work")}
                        size="l"
                      />
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
                        selected={pathname.startsWith("/gallery")}
                        label={gallery.label}
                        size="l"
                      />
                    </Scroll>
                  </Row>
                  {/* Mobile Layout */}
                  <Row hide s={{ hide: false }}>
                    <Scroll target={gallery.title} href="/gallery">
                      <ToggleButton
                        prefixIcon="gallery"
                        selected={pathname.startsWith("/gallery")}
                        size="l"
                      />
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
    </>
  );
};
