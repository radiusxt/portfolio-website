"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Fade, Flex, Line, Row, ToggleButton } from "@once-ui-system/core";
import { routes, display, person, home, about, work, gallery, style } from "@/resources";
import { Scroll } from "@/components/Scroll";
import { ThemeToggle } from "./ThemeToggle";
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

export const Header = () => {
  const pathname = usePathname() ?? "";

  return (
    <>
      <Fade position="fixed" to="bottom" height={4.5} s={{ hide: true }} />
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
          paddingLeft="16"
          fillWidth
          vertical="center"
          textVariant="label-default-m"
          style={{ letterSpacing: "0.01em" }}
        >
          {display.location &&
            <Row s={{ hide: true }}>{person.location}</Row>
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
                <Scroll target={home.title}>
                  <ToggleButton
                    prefixIcon="home"
                    href="/"
                    size="l"
                    selected={pathname === "/"}
                  />
                </Scroll>
              }
              <Line background="neutral-alpha-strong" vert maxHeight="24" />
              {routes["/about"] && 
                <>
                  <Row s={{ hide: true }}>
                    <Scroll target={about.intro.title}>
                      <ToggleButton
                        prefixIcon="person"
                        href="/about"
                        label={about.label}
                        size="l"
                        selected={pathname === "/about"}
                      />
                    </Scroll>
                  </Row>
                  <Row hide s={{ hide: false }}>
                    <Scroll target={about.intro.title}>
                      <ToggleButton
                        prefixIcon="person"
                        href="/about"
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
                    <Scroll target={work.title}>
                      <ToggleButton
                        prefixIcon="code"
                        href="/work"
                        label={work.label}
                        size="l"
                        selected={pathname.startsWith("/work")}
                      />
                    </Scroll>
                  </Row>
                  <Row hide s={{ hide: false }}>
                    <Scroll target={work.title}>
                      <ToggleButton
                        prefixIcon="code"
                        href="/work"
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
                    <Scroll target={gallery.title}>
                      <ToggleButton
                        prefixIcon="gallery"
                        href="/gallery"
                        label={gallery.label}
                        size="l"
                        selected={pathname.startsWith("/gallery")}
                      />
                    </Scroll>
                  </Row>
                  <Row hide s={{ hide: false }}>
                    <Scroll target={gallery.title}>
                      <ToggleButton
                        prefixIcon="gallery"
                        href="/gallery"
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
            paddingRight="16"
            horizontal="end"
            vertical="center"
            textVariant="code-default-m"
            gap="20"
          >
            <Flex s={{ hide: true }} >
              {display.time && <TimeDisplay timeZone={person.location} />}
            </Flex>
          </Flex>
        </Flex>
      </Row>
    </>
  );
};
