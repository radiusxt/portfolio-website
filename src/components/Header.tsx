"use client";

import { Button, Line, RevealFx, Row } from "@once-ui-system/core";
import { Scroll, ThemeToggle } from "@/components";
import { about, display, gallery, home, routes, work } from "@/resources";
import type { RoutesConfig } from "@/types";
import styles from "./Header.module.scss";

/* Page Header for Navigation */
export function Header() {
  const headerItems:
      { path: keyof RoutesConfig; target: string; icon: string; label: string }[] = [
    { path: "/about", target: about.intro.title, icon: "person", label: about.label },
    { path: "/work", target: work.title, icon: "code", label: work.label },
    { path: "/gallery", target: gallery.title, icon: "gallery", label: gallery.label },
  ];

  return (
    <RevealFx position="sticky" zIndex={10} delay={0.2}>
      <Row as="header" fill center margin="16">
        <Row
          className={styles.glass}
          background="page"
          border="neutral-alpha-weak"
          radius="full"
          padding="2"
          shadow="m"
        >
          <Row center textVariant="body-default-s">
            {routes["/"] &&
              <Scroll target={home.title} href="/">
                <Button variant="ghost" prefixIcon="home" size="xl" />
              </Scroll>
            }
            <Line vert maxHeight="32" background="neutral-strong" />
            {headerItems.map(({ path, target, icon, label }) =>
              Object.entries({
                desktop: { s: { hide: true }, label },
                mobile: { hide: true, s: { hide: false }, label: undefined },
              }).map(([key, { label, ...rowProps }]) =>
                <Row key={`${path}-${key}`} {...rowProps}>
                  <Scroll target={target} href={path}>
                    <Button
                      variant="ghost"
                      prefixIcon={icon}
                      label={label}
                      weight="default"
                      size="xl"
                    />
                  </Scroll>
                </Row>
              )
            )}
            <Line vert maxHeight="32" background="neutral-strong" />
            {display.themeSwitcher &&
              <ThemeToggle />
            }
          </Row>
        </Row>
      </Row>
    </RevealFx>
  );
};
