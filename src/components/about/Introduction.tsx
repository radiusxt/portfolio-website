"use client";

import { useEffect, useRef } from "react";
import { Button, Column, Heading, Media, RevealFx, Row } from "@once-ui-system/core";
import { Loading, SpotlightBorder } from "@/components";
import { about, person, social } from "@/resources";
import gsap from "gsap";

/* Introduction About Me */
export function Introduction() {
  const indexRef = useRef(0);

  useEffect(() => {
    const el = document.getElementById("greeting");

    if (!el || about.greetings.length <= 1) {
      return;
    }

    const TRANSITION = 0.5;
    const HOLD = 5 - 2 * TRANSITION;
    const tl = gsap.timeline({ repeat: -1, delay: HOLD + 1, repeatDelay: HOLD });

    tl.to(el, {
      scaleY: 0.05,
      opacity: 0,
      duration: TRANSITION,
      ease: "power2.in",
      transformOrigin: "bottom",
      onComplete: () => {
        indexRef.current = (indexRef.current + 1) % about.greetings.length;
        el.textContent = about.greetings[indexRef.current];
      },
    }).to(el, {
      scaleY: 1,
      opacity: 1,
      duration: TRANSITION,
      ease: "power2.out",
      transformOrigin: "top",
    });

    return () => { tl.kill(); };
  }, []);

  return (
    <Row
      fill
      center
      id={about.title}
      gap="8"
      style={{ letterSpacing: "0px", scrollMarginTop: "6rem" }}
      s={{ direction: "column" }}
    >
      {/* Intro Text & Links */}
      <RevealFx translateY="16" fillWidth horizontal="center">
        <Column fill gap="32">
          <Heading as="h1" id="greeting" variant="display-default-xl">
            {about.greetings[0]}
          </Heading>
          <Heading variant="display-default-l">
            {about.kicker}
          </Heading>
          <Heading
            variant="body-default-xl"
            wrap="pretty"
            style={{ whiteSpace: "pre-line", lineHeight: "1.5" }}
          >
            {about.intro}
          </Heading>
          {social.length > 0 &&
            <Row data-border="rounded" gap="24">
              {social.map((item) =>
                <Button
                  key={item.name}
                  href={item.link}
                  prefixIcon={item.icon}
                  label={item.name}
                  size="xl"
                  weight="default"
                  variant="tertiary"
                />
              )}
            </Row>
          }
        </Column>
      </RevealFx>
      {/* Profile Image */}
      <RevealFx translateY="16" fillWidth horizontal="center">
        <Column fill>
          <SpotlightBorder
            primary="success-on-background-weak"
            secondary="accent-on-background-weak"
            spread={125}
            falloff={300}
          >
            <Loading
              fallback={
                <Media src="" aspectRatio="4/5" radius="xl-8" loading />
              }
            >
              <Media
                src={person.image}
                alt={person.name}
                aspectRatio="4/5"
                radius="xl-8"
                priority
              />
            </Loading>
          </SpotlightBorder>
        </Column>
      </RevealFx>
    </Row>
  );
}
