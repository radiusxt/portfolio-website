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
  Tag,
  Timeline
} from "@once-ui-system/core";
import { baseURL, about, person, social } from "@/resources";
import { TableOfContents } from "@/components/about/Contents";
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
  const structure = [
    {
      title: about.work.title,
      display: about.work.display,
      items: about.work.experiences.map((experience) => experience.company),
    },
    {
      title: about.studies.title,
      display: about.studies.display,
      items: about.studies.institutions.map((institution) => institution.name),
    },
    {
      title: about.technical.title,
      display: about.technical.display,
      items: about.technical.skills.map((skill) => skill.title),
    },
  ];

  return (
    <Column direction="column" maxWidth="l">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={about.title}
        description={about.description}
        path={about.path}
        image={`/api/og/generate?title=${encodeURIComponent(about.title)}`}
        author={{ name: person.name, url: `${baseURL}${about.path}`, image: `${baseURL}${person.avatar}`}}
      />
      {about.tableOfContent.display &&
        <TableOfContents structure={structure} about={about} />
      }
      <RevealFx translateY="16" delay={0.1}>
        <Row fillWidth horizontal="center" s={{ direction: "column" }}>
          {/* Avatar */}
          {about.avatar.display && 
            <Column
              position="sticky"
              horizontal="center"
              flex={3}
              top="64"
              fitHeight
              paddingX="32"
              paddingBottom="xl"
              gap="l"
              xs={{ style: { top: "auto" } }}
              s={{ position: "relative", style: { top: "auto" } }}
            >
              <Avatar src={person.avatar} size={16} border="neutral-strong" />
              <Row vertical="center" gap="8">
                <Icon name="globe" onBackground="brand-weak" size="l" />
                <Heading variant="body-default-xl">
                  {person.location}
                </Heading>
              </Row>
            </Column>
          }
          {/* Introduction */}
          <Column flex={9} minWidth="0">
            <Column fillWidth vertical="center" marginBottom="32">
              <Heading
                as="h1"
                id={about.intro.title}
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
              {about.intro.display && 
                <Column fillWidth marginBottom="32">
                  <Heading
                    className={styles.mobile} 
                    variant="body-default-xl"
                    wrap="wrap"
                    style={{ whiteSpace: "pre-line", lineHeight: "1.7", letterSpacing: "0.4px" }}
                  >
                    {about.intro.description}
                  </Heading>
                </Column>
              }
              {social.length > 0 && 
                <Row
                  className={styles.mobile}
                  horizontal="start"
                  fitWidth
                  data-border="rounded"
                  gap="12"
                >
                  {social.filter((item) => item.essential).map((item) => item.link && 
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
            {about.work.display && 
              <>
                <Heading
                  as="h2"
                  className={styles.mobile}
                  id={about.work.title}
                  variant="display-default-s"
                  marginBottom="32"
                  style={{ scrollMarginTop: "70px" }}
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
                      ...about.work.experiences.map((experience, index) => ({
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
                              <Heading variant="body-default-m" onBackground="accent-weak">
                                {experience.location}
                              </Heading>
                            </Row>
                          </Column>
                      })),
                      // Null object for disappearing marker effect.
                      { description: <></>, marker: <></> }
                    ]}
                  />
                </Column>
              </>
            }
            {/* Education */}
            {about.studies.display && 
              <>
                <Heading
                  as="h2"
                  className={styles.mobile}
                  id={about.studies.title}
                  variant="display-default-s"
                  marginBottom="32"
                  style={{ scrollMarginTop: "70px" }}
                >
                  {about.studies.title}
                </Heading>
                <Column fillWidth>
                  <Timeline
                    size="xs"
                    style={{
                      marginLeft: "-26px",
                      marginRight: "-18px",
                      maskImage: "linear-gradient(to bottom, black 75%, transparent 88%)",
                      WebkitMaskImage: "linear-gradient(to bottom, black 75%, transparent 88%)"
                    }}
                    items={[
                      ...about.studies.institutions.map((institution, index) => ({
                        state: "active" as const,
                        label:
                          <Column
                            fillWidth
                            key={`${institution.name}-${index}`}
                            style={ index !== 0 ? { marginTop: "-6px" } : { marginTop: "-4px" }}
                          >
                            <Row fillWidth horizontal="between" vertical="center" marginBottom="4">
                              <Heading id={institution.name} variant="heading-default-xl">
                                {institution.name}
                              </Heading>
                            </Row>
                            <Heading variant="body-default-m" onBackground="brand-weak" marginBottom="16">
                              {institution.degree}
                            </Heading>
                          </Column>
                        ,
                        description:
                          <Column as="ul" marginBottom="16" gap="16">
                            {institution.description.map((line, lineIndex) => 
                              <Heading
                                as="li"
                                key={`${institution.name}-line-${lineIndex}`}
                                variant="body-default-m"
                                onBackground="neutral-strong"
                                wrap="wrap"
                                style={{ marginLeft: "-24px" }}
                              >
                                {line}
                              </Heading>
                            )}
                          </Column>
                      })),
                      // Null object for disappearing marker effect.
                      { description: <></>, marker: <></> }
                    ]}
                  />
                </Column>
              </>
            }
            {/* Technical Skills */}
            {about.technical.display && 
              <>
                <Heading
                  as="h2"
                  className={styles.mobile}
                  id={about.technical.title}
                  variant="display-default-s"
                  marginBottom="32"
                  style={{ scrollMarginTop: "70px" }}
                >
                  {about.technical.title}
                </Heading>
                <Row fillWidth vertical="center" gap="20" style={{ marginLeft: "-22px" }}>
                  <Line
                    vert
                    fillHeight
                    style={{
                      background: "var(--neutral-on-background-strong)",
                      maskImage: `linear-gradient(
                        to bottom, transparent 1%, black 10%, black 90%, transparent 100%)`,
                      WebkitMaskImage: `linear-gradient(
                        to bottom, transparent 1%, black 10%, black 90%, transparent 100%)`
                    }}
                  />
                  <Column fillWidth gap="l" style={{ marginRight: "-18px" }}>
                    {about.technical.skills.map((skill, index) => 
                      <Column key={`${skill.title}-${index}`} fillWidth gap="m">
                        <Heading id={skill.title} variant="heading-default-xl" marginBottom="8">
                          {skill.title}
                        </Heading>
                        <Heading variant="body-default-m" onBackground="neutral-strong">
                          {skill.description}
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
                            {skill.tags.map((tag, index) => 
                              <Column key={`${skill.title}-${index}`} paddingX="32">
                                <Row vertical="center" margin="4" gap="16">
                                  <Icon name={tag.icon} onBackground="brand-weak" size="l" />
                                  <Heading variant="code-default-l" wrap="nowrap">
                                    {tag.name}
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
            }
          </Column>
        </Row>
      </RevealFx>
    </Column>
  );
}
