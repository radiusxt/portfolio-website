import { Button, Column, Heading, Flex, Icon, Media, RevealFx, Row } from "@once-ui-system/core";
import { Loading, SpotlightBorder } from "@/components";
import { about, person, social } from "@/resources";
import styles from "@/components/about/Contents.module.scss";

/* Introduction About Me */
export function Introduction() {
  return (
    <Row fill center gap="24" s={{ direction: "column" }}>
      {/* Text & Links */}
      <RevealFx translateY="16" fillWidth horizontal="center">
        <Column fill gap="32">
          <Heading
            as="h1"
            id={about.title}
            variant="display-default-xl"
            style={{ letterSpacing: "0px", scrollMarginTop: "120px" }}
          >
            {about.greetings[0]}
          </Heading>
          <Heading variant="display-default-l">
            {about.kicker}
          </Heading>
          <Heading
            className={styles.mobile}
            variant="body-default-xl"
            wrap="pretty"
            style={{ whiteSpace: "pre-line", lineHeight: "1.5" }}
          >
            {about.intro}
          </Heading>
          {social.length > 0 &&
            <Row
              className={styles.mobile}
              data-border="rounded"
              gap="24"
              wrap
            >
              {social.map((item) =>
                <Button
                  key={item.name}
                  href={item.link}
                  prefixIcon={item.icon}
                  label={item.name}
                  size="xl"
                  weight="default"
                  variant="tertiary"
                  style={{ padding: "20px", letterSpacing: "0.3px" }}
                />
              )}
            </Row>
          }
        </Column>
      </RevealFx>
      {/* Profile Image */}
      <Column fill center>
        <RevealFx translateY="16" fillWidth horizontal="center" delay={0.9}>
          <SpotlightBorder
            primary="success-on-background-weak"
            secondary="accent-on-background-weak"
            spread={125}
            falloff={300}
          >
            <Loading
              fallback={<Media src="" radius="xl-8" aspectRatio="1/1" loading /> }
            >
              <Media
                src={person.image}
                alt={person.name}
                aspectRatio="4/5"
                radius="xl-8"
              />
            </Loading>
          </SpotlightBorder>
        </RevealFx>
      </Column>
    </Row>
  );
}
