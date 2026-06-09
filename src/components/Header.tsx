"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Fade, Flex, Line, Row, ToggleButton } from "@once-ui-system/core";
import { routes, display, person, home, about, work, gallery } from "@/resources";
import { Scroll, ThemeToggle } from "@/components";
import styles from "./Header.module.scss";

type TimeDisplayProps = {
  timeZone: string;
  locale?: string;
};

export const TimeDisplay: React.FC<TimeDisplayProps> = ({ timeZone, locale = "en-GB" }) => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };

      setCurrentTime(new Intl.DateTimeFormat(locale, options).format(now));
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, [timeZone, locale]);

  return <>{currentTime}</>;
};

export function Header() {
  const pathname = usePathname() ?? "";

  return (
    <>
      <Fade zIndex={4} position="fixed" to="bottom" height={6} style={{ marginTop: "-8px" }} />
      <Row
        as="header"
        className={styles.position}
        position="sticky"
        zIndex={10}
        fillWidth
        fitHeight
        padding="4"
        horizontal="center"
        data-border="rounded"
      >
        <Row
          paddingLeft="4"
          fillWidth
          vertical="center"
          textVariant="label-default-m"
          style={{ letterSpacing: "0.01em" }}
        >
          {display.location && 
            <Row s={{ hide: true }}>
              {person.location}
            </Row>
          }
        </Row>
        <Row fillWidth horizontal="center">
          <Row
            background="page"
            border="neutral-alpha-weak"
            radius="m-4"
            shadow="l"
            padding="4"
            horizontal="center"
            zIndex={1}
          >
            <Row gap="4" vertical="center" textVariant="body-default-s" suppressHydrationWarning>
              {routes["/"] && 
                <Scroll target={home.title} href="/">
                  <ToggleButton
                    prefixIcon="home"
                    size="l"
                    selected={pathname === "/"}
                  />
                </Scroll>
              }
              <Line background="neutral-alpha-strong" vert maxHeight="24" />
              {routes["/about"] && 
                <>
                  <Row s={{ hide: true }}>
                    <Scroll target={about.intro.title} href="/about">
                      <ToggleButton
                        prefixIcon="person"
                        label={about.label}
                        size="l"
                        selected={pathname === "/about"}
                      />
                    </Scroll>
                  </Row>
                  <Row hide s={{ hide: false }}>
                    <Scroll target={about.intro.title} href="/about">
                      <ToggleButton
                        prefixIcon="person"
                        size="l"
                        selected={pathname === "/about"}
                      />
                    </Scroll>
                  </Row>
                </>
              }
              {routes["/work"] && 
                <>
                  <Row s={{ hide: true }}>
                    <Scroll target={work.title} href="/work">
                      <ToggleButton
                        prefixIcon="code"
                        label={work.label}
                        size="l"
                        selected={pathname.startsWith("/work")}
                      />
                    </Scroll>
                  </Row>
                  <Row hide s={{ hide: false }}>
                    <Scroll target={work.title} href="/work">
                      <ToggleButton
                        prefixIcon="code"
                        size="l"
                        selected={pathname.startsWith("/work")}
                      />
                    </Scroll>
                  </Row>
                </>
              }
              {routes["/gallery"] && 
                <>
                  <Row s={{ hide: true }}>
                    <Scroll target={gallery.title} href="/gallery">
                      <ToggleButton
                        prefixIcon="gallery"
                        label={gallery.label}
                        size="l"
                        selected={pathname.startsWith("/gallery")}
                      />
                    </Scroll>
                  </Row>
                  <Row hide s={{ hide: false }}>
                    <Scroll target={gallery.title} href="/gallery">
                      <ToggleButton
                        prefixIcon="gallery"
                        size="l"
                        selected={pathname.startsWith("/gallery")}
                      />
                    </Scroll>
                  </Row>
                </>
              }
              {display.themeSwitcher && 
                <>
                  <Line background="neutral-alpha-strong" vert maxHeight="24" />
                  <ThemeToggle />
                </>
              }
            </Row>
          </Row>
        </Row>
        <Flex fillWidth horizontal="end" vertical="center">
          <Flex
            paddingRight="4"
            horizontal="end"
            vertical="center"
            textVariant="code-default-m"
          >
            <Flex s={{ hide: true }}>
              {display.time && <TimeDisplay timeZone={person.location} />}
            </Flex>
          </Flex>
        </Flex>
      </Row>
    </>
  );
};
