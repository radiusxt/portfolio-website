import { Button, Column, Heading, Media, RevealFx, Row } from "@once-ui-system/core";
import { Loading, SpotlightBorder } from "@/components";
import { about, person, social } from "@/resources";

/* Introduction About Me */
export function Introduction() {
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
          <Heading as="h1" variant="display-default-xl">
            {about.greetings}
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
                <Media src="" radius="xl-8" aspectRatio="1/1" loading />
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
