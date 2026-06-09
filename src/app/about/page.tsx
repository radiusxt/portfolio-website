import {
  Avatar,
  AutoScroll,
  Button,
  Column,
  Fade,
  Flex,
  Heading,
  HoverCard,
  Icon,
  IconButton,
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

export default function About() {
  const structure = [
    {
      title: about.intro.title,
      display: about.intro.display,
      items: [],
    },
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
    <Column maxWidth="l" direction="column">
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
        <Column
          zIndex={2}
          position="fixed"
          left="8"
          paddingLeft="24"
          gap="48"
          style={{ top: "50%", transform: "translateY(-50%)" }}
          s={{ hide: true }}
        >
          <RevealFx delay={0.6}>
            <TableOfContents structure={structure} about={about} />
          </RevealFx>
        </Column>
      }
      <RevealFx delay={0.1}>
        <Row fillWidth horizontal="center" s={{ direction: "column" }}>
          {/* Avatar */}
          {about.avatar.display && 
            <Column
              position="sticky"
              flex={3}
              className={styles.avatar}
              fitHeight
              horizontal="center"
              top="64"
              paddingX="xl"
              paddingBottom="xl"
              gap="l"
              xs={{ style: { top: "auto" } }}
              s={{ position: "relative", style: { top: "auto" } }}
            >
              <Avatar src={person.avatar} size={15} border="neutral-alpha-weak" />
              <Row gap="8" vertical="center">
                <Icon onBackground="brand-weak" size="l" name="globe" />
                <Heading variant="body-default-xl">{person.location}</Heading>
              </Row>
              {person.languages && person.languages.length > 0 &&
                <Row gap="12">
                  {person.languages.map((language) => 
                    <Tag variant="brand" key={language} size="l" radius="xl">
                      <Heading variant="label-default-l" padding="2">
                        {language}
                      </Heading>
                    </Tag>
                  )}
                </Row>
              }
            </Column>
          }
          {/* Introduction */}
          <Column minWidth="0" flex={9}>
            <Column fillWidth vertical="center" minHeight="160" marginBottom="32">
              <Heading
                id={about.intro.title}
                className={styles.textAlign}
                variant="display-default-xl"
                paddingBottom="24"
                style={{ letterSpacing: "-1px", scrollMarginTop: "120px" }}
              >
                {person.name}
              </Heading>
              <Heading className={styles.textAlign} variant="display-default-s" paddingBottom="32">
                {person.role}
              </Heading>
              {about.intro.display && 
                <Column fillWidth marginBottom="l">
                  <Heading
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
                  className={styles.blockAlign}
                  fitWidth
                  horizontal="center"
                  data-border="rounded"
                  gap="16"
                  wrap
                >
                  {social.filter((item) => item.essential).map((item) => item.link && 
                    <Flex key={item.name}>
                      <Row s={{ hide: true }}>
                        <Button
                          key={item.name}
                          href={item.link}
                          prefixIcon={item.icon}
                          label={item.name}
                          size="m"
                          weight="default"
                          variant="tertiary"
                          style={{ gap: "8px", letterSpacing: "0.3px" }}
                        />
                      </Row>
                      <Row hide s={{ hide: false }}>
                        <IconButton
                          size="m"
                          key={`${item.name}-icon`}
                          href={item.link}
                          icon={item.icon}
                          variant="tertiary"
                        />
                      </Row>
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
                        label: (
                          <Column
                            fillWidth
                            key={`${experience.company}-${experience.role}-${index}`}
                            style={ index !== 0 ? { marginTop: "-16px" } : { marginTop: "-8px" }}
                          >
                            <Row fillWidth horizontal="between" vertical="center" marginBottom="4">
                              <Heading id={experience.company} variant="heading-default-xl">
                                {experience.company}
                              </Heading>
                              <Heading variant="heading-default-s" onBackground="neutral-weak">
                                {experience.timeframe}
                              </Heading>
                            </Row>
                            <Row fillWidth horizontal="between" vertical="center" marginBottom="16">
                              <Heading variant="body-default-m" onBackground="brand-weak">
                                {experience.role}
                              </Heading>
                              <Heading variant="body-default-m" onBackground="accent-weak">
                                {experience.location}
                              </Heading>
                            </Row>
                          </Column>
                        ),
                        description: (
                          <Column as="ul" marginBottom="16" gap="16">
                            {experience.achievements.map((achievement, index) => (
                              <Heading
                                as="li"
                                key={`${experience.company}-${index}`}
                                variant="body-default-l"
                                wrap="wrap"
                                style={{ marginLeft: "-24px" }}
                              >
                                {achievement}
                              </Heading>
                            ))}
                          </Column>
                        ),
                        state: "active" as const
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
                        label: (
                          <Column
                            fillWidth
                            key={`${institution.name}-${index}`}
                            style={index !== 0 ? { marginTop: "-16px" } : { marginTop: "-8px" }}
                          >
                            <Row fillWidth horizontal="between" vertical="center" marginBottom="4">
                              <Heading id={institution.name} variant="heading-default-xl">
                                {institution.name}
                              </Heading>
                            </Row>
                            <Heading variant="body-default-m" onBackground="brand-weak" marginBottom="m">
                              {institution.degree}
                            </Heading>
                          </Column>
                        ),
                        description: (
                          <Column as="ul" marginBottom="16" gap="16">
                            {institution.description.map((line, lineIndex) => (
                              <Heading
                                as="li"
                                key={`${institution.name}-line-${lineIndex}`}
                                variant="body-default-l"
                                onBackground="neutral-strong"
                                wrap="wrap"
                                style={{ marginLeft: "-24px" }}
                              >
                                {line}
                              </Heading>
                            ))}
                          </Column>
                        ),
                        state: "active" as const
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
                        <Heading
                          variant="body-default-l"
                          onBackground="neutral-strong"
                          style={{ lineHeight: "1.6" }}
                        >
                          {skill.description}
                        </Heading>
                        <Column>
                          <Fade
                            zIndex={1}
                            to="right"
                            fillHeight
                            width="104"
                            position="absolute"
                            left="0"
                            top="0"
                          />
                          <AutoScroll
                            maxWidth="s"
                            speed="slow"
                            paddingTop="64"
                            paddingBottom="40"
                            reverse={index % 2 === 0}
                          >
                            {skill.tags.map((tag, index) => 
                              <Column key={`${skill.title}-${index}`} paddingX="32">
                                <HoverCard
                                  placement="top"
                                  trigger={
                                    <Row vertical="center" margin="4" gap="16">
                                      <Icon name={tag.icon} onBackground="brand-weak" size="l" />
                                      <Heading variant="label-default-l" wrap="nowrap">
                                        {tag.name}
                                      </Heading>
                                    </Row>
                                  }
                                >
                                  <Column maxWidth={14} background="page" radius="xl" paddingY="4">
                                    <Heading variant="label-default-m" align="center">
                                      {tag.description}
                                    </Heading>
                                  </Column>
                                </HoverCard>
                              </Column>
                            )}
                          </AutoScroll>
                          <Fade
                            zIndex={1}
                            to="left"
                            fillHeight
                            width="64"
                            position="absolute"
                            right="0"
                            top="0"
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
