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
        horizontal="center"
        data-border="rounded"
        padding="4"
      >
        <Row
          fillWidth
          vertical="center"
          textVariant="label-default-m"
          paddingLeft="4"
          style={{ letterSpacing: "0.3px" }}
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
            zIndex={1}
            horizontal="center"
            border="neutral-alpha-weak"
            radius="m-4"
            shadow="l"
            padding="4"
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
        <Flex fillWidth horizontal="end" vertical="center">
          <Flex
            horizontal="end"
            vertical="center"
            textVariant="code-default-m"
            paddingRight="4"
          >
            <Flex s={{ hide: true }}>
              {display.time && 
                <TimeDisplay timeZone={person.location} />
              }
            </Flex>
          </Flex>
        </Flex>
      </Row>
    </>
  );
};
