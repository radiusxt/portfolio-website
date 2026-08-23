"use client";

import { Button, Line, Row } from "@once-ui-system/core";
import { Scroll, ThemeToggle } from "@/components";
import { about, gallery, home, routes, work } from "@/resources";
import type { RoutesConfig } from "@/types";
import styles from "./Header.module.scss";

/* Page Header for Navigation */
export function Header() {
  const structure: {
    path: keyof RoutesConfig;
    target: string;
    icon: string;
    label: string
  }[] = [
    {
      path: "/about",
      target: about.intro.title,
      icon: "person",
      label: about.label
    },
    {
      path: "/work",
      target: work.title,
      icon: "code",
      label: work.label
    },
    {
      path: "/gallery",
      target: gallery.title,
      icon: "gallery",
      label: gallery.label
    }
  ];

  return (
    <Row className={styles.header} as="header" position="sticky" zIndex={10}>
      <Row fill center radius="full" paddingTop="20" paddingBottom="32">
        <Row
          className={styles.glass}
          border="neutral-alpha-weak"
          radius="full"
          padding="2"
          shadow="xl"
        >
          <Row center>
            {routes["/"] &&
              <Scroll target={home.title} href="/">
                <Button variant="ghost" prefixIcon="home" size="xl" />
              </Scroll>
            }
            <Line vert maxHeight="32" background="neutral-alpha-strong" />
            {structure.map(({ path, target, icon, label }) =>
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
            <Line vert maxHeight="32" background="neutral-alpha-strong" />
            <ThemeToggle />
          </Row>
        </Row>
      </Row>
    </Row>
  );
};
