import {
  Avatar,
  AutoScroll,
  Button,
  Column,
  Fade,
  Flex,
  Heading,
  Icon,
  Line,
  Meta,
  RevealFx,
  Row,
  Schema,
  Timeline
} from "@once-ui-system/core";
import { baseURL, about, person, social } from "@/resources";
import styles from "@/components/about/Contents.module.scss";

export async function generateMetadata() {
  return Meta.generate({
    title: about.title,
    description: about.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(about.title)}`,
    path: about.path,
  });
}

/* About Page Layout */
export default function About() {
  return (
    <Column maxWidth="l" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={about.title}
        description={about.description}
        path={about.path}
        image={`/api/og/generate?title=${encodeURIComponent(about.title)}`}
        author={{ name: person.name, url: `${baseURL}${about.path}`, image: `${baseURL}${person.image}`}}
      />
      <Row fillWidth horizontal="center" s={{ direction: "column" }}>
        {/* Introduction */}
        <Column
          position="sticky"
          horizontal="center"
          flex={3}
          top="64"
          fitHeight
          paddingX="32"
          paddingBottom="xl"
          gap="l"
          xs={{ style: { top: "auto" }}}
          s={{ position: "relative", style: { top: "auto" }}}
        >
          <Avatar src={person.image} size={16} />
          <Row vertical="center" gap="16">
            <Icon name="globe" onBackground="brand-medium" size="xl" />
            <Heading variant="heading-default-xl">
              {person.location}
            </Heading>
          </Row>
        </Column>
        <Column flex={9} minWidth="0">
          <Column fillWidth vertical="center" marginBottom="32">
            <Heading
              as="h1"
              id={about.title}
              className={styles.mobile}
              variant="display-default-xl"
              paddingBottom="24"
              style={{ letterSpacing: "-1px", scrollMarginTop: "120px" }}
            >
              {person.name}
            </Heading>
            <Heading className={styles.mobile} variant="display-default-s" paddingBottom="32">
              {person.role}
            </Heading>
            <Column fillWidth marginBottom="32">
              <Heading
                className={styles.mobile} 
                variant="body-default-xl"
                wrap="wrap"
                style={{ whiteSpace: "pre-line", lineHeight: "1.7", letterSpacing: "0.4px" }}
              >
                {about.intro}
              </Heading>
            </Column>
            {social.length > 0 && 
              <Row
                className={styles.mobile}
                horizontal="start"
                data-border="rounded"
                gap="12"
              >
                {social.map((item) => item.link && 
                  <Flex key={item.name}>
                    <Button
                      key={item.name}
                      href={item.link}
                      prefixIcon={item.icon}
                      label={item.name}
                      size="m"
                      weight="default"
                      variant="tertiary"
                      style={{ padding: "20px", gap: "12px", letterSpacing: "0.3px" }}
                    />
                  </Flex>
                )}
              </Row>
            }
          </Column>
          {/* Work Experience */}
          <>
            <Heading
              as="h2"
              className={styles.mobile}
              id={about.work.title}
              variant="display-default-s"
              marginBottom="32"
            >
              {about.work.title}
            </Heading>
            <Column fillWidth>
              <Timeline
                size="xs"
                style={{
                  marginLeft: "-26px",
                  marginRight: "-18px",
                  maskImage: "linear-gradient(to bottom, black 94%, transparent 98%)",
                  WebkitMaskImage: "linear-gradient(to bottom, black 94%, transparent 98%)"
                }}
                items={[
                  ...about.work.experience.map((experience, index) => ({
                    state: "active" as const,
                    label:
                      <Column
                        fillWidth
                        key={`${experience.company}-${experience.role}-${index}`}
                        style={ index !== 0 ? { marginTop: "-6px" } : { marginTop: "-4px" }}
                      >
                        <Row fillWidth horizontal="between" vertical="center" marginBottom="4">
                          <Heading id={experience.company} variant="heading-default-xl">
                            {experience.company}
                          </Heading>
                          <Heading variant="heading-default-s" onBackground="neutral-weak">
                            {experience.timeframe}
                          </Heading>
                        </Row>
                        <Row fillWidth horizontal="between" vertical="center" marginBottom="4">
                          <Heading variant="body-default-m" onBackground="brand-weak">
                            {experience.role}
                          </Heading>
                          {experience.location &&
                            <Heading variant="body-default-m" onBackground="accent-weak">
                              {experience.location}
                            </Heading>
                          }
                        </Row>
                      </Column>
                  })),
                  // Null object for disappearing marker effect.
                  { description: <></>, marker: <></> }
                ]}
              />
            </Column>
          </>
          {/* Skills */}
          <>
            <Heading
              as="h2"
              className={styles.mobile}
              id={about.technical.title}
              variant="display-default-s"
              marginBottom="32"
            >
              {about.technical.title}
            </Heading>
            <Row fillWidth vertical="center" gap="20">
              <Column fillWidth gap="l">
                {about.technical.category.map((category, index) => 
                  <Column key={`${category.title}-${index}`} fillWidth gap="m">
                    <Heading id={category.title} variant="heading-default-xl" marginBottom="8">
                      {category.title}
                    </Heading>
                    <Heading variant="body-default-l" onBackground="neutral-strong">
                      {category.description}
                    </Heading>
                    <Column>
                      <Fade
                        position="absolute"
                        zIndex={1}
                        fillHeight
                        top="0"
                        left="0"
                        to="right"
                        width="80"
                      />
                      <AutoScroll
                        speed="slow"
                        hover="none"
                        reverse={index % 2 === 0}
                        paddingTop="64"
                        paddingBottom="40"
                      >
                        {category.skills.map((skill, index) => 
                          <Column key={`${skill.name}-${index}`} paddingX="32">
                            <Row vertical="center" margin="4" gap="16">
                              <Icon name={skill.icon} onBackground="brand-weak" size="l" />
                              <Heading variant="body-default-l" wrap="nowrap">
                                {skill.name}
                              </Heading>
                            </Row>
                          </Column>
                        )}
                      </AutoScroll>
                      <Fade
                        position="absolute"
                        zIndex={1}
                        fillHeight
                        top="0"
                        right="0"
                        to="left"
                        width="80"
                        s={{ style: { marginRight: "-4px" }}}
                      />
                    </Column>
                  </Column>
                )}
              </Column>
            </Row>
          </>
        </Column>
      </Row>
    </Column>
  );
}
