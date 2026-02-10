import React, { Suspense } from "react";
import {
  Avatar,
  Button,
  Column,
  Heading,
  Icon,
  IconButton,
  Meta,
  RevealFx,
  Row,
  Schema,
  Tag,
  Timeline
} from "@once-ui-system/core";
import { baseURL, about, person, social } from "@/resources";
import { TableOfContents } from "@/components/about/Contents";
import styles from "@/components/about/about.module.scss";

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
    <Column maxWidth="m" direction="column">
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
          position="fixed"
          left="8"
          paddingLeft="24"
          gap="48"
          style={{ top: "50%", transform: "translateY(-50%)", zIndex: 50 }}
          s={{ hide: true }}
        >
          <RevealFx delay={1}>
            <TableOfContents structure={structure} about={about} />
          </RevealFx>
        </Column>
      }
      <RevealFx delay={0.2}>
        <Row fillWidth s={{ direction: "column"}} horizontal="center">
          {about.avatar.display && 
            <Column
              className={styles.avatar}
              top="64"
              fitHeight
              position="sticky"
              s={{ position: "relative", style: { top: "auto" } }}
              xs={{ style: { top: "auto" } }}
              minWidth="160"
              paddingX="xl"
              paddingBottom="xl"
              gap="l"
              flex={3}
              horizontal="center"
            >
              <Suspense fallback={<Avatar size={15} loading />}>
                <Avatar src={person.avatar} size={15} />
              </Suspense>
              <Row gap="8" vertical="center">
                <Icon onBackground="brand-weak" size="l" name="globe" />
                <Heading variant="body-default-xl">{person.location}</Heading>
              </Row>
              {person.languages && person.languages.length > 0 && (
                <Row gap="12">
                  {person.languages.map((language, index) => (
                    <Tag variant="brand" key={index} size="l">
                      <Heading variant="label-default-l">{language}</Heading>
                    </Tag>
                  ))}
                </Row>
              )}
            </Column>
          }
          <Column className={styles.blockAlign} flex={9} maxWidth={60}>
            <Column
              fillWidth
              minHeight="160"
              vertical="center"
              marginBottom="32"
            >
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
                <Column fillWidth gap="m" marginBottom="l">
                  <Heading variant="body-default-xl" style={{ lineHeight: "1.7", letterSpacing: "0.4px" }}>
                    {about.intro.description}
                  </Heading>
                </Column>
              }
              {social.length > 0 && 
                <Row
                  className={styles.blockAlign}
                  data-border="rounded"
                  horizontal="center"
                  gap="16"
                  wrap
                  fitWidth
                >
                  {social.filter((item) => item.essential).map((item) => item.link && 
                    <React.Fragment key={item.name}>
                      <Row s={{ hide: true }}>
                        <Button
                          key={item.name}
                          href={item.link}
                          prefixIcon={item.icon}
                          label={item.name}
                          size="m"
                          weight="default"
                          variant="tertiary"
                          style={{ gap: "8px", letterSpacing: "0.2px" }}
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
                    </React.Fragment>
                  )}
                </Row>
              }
            </Column>
            {about.work.display && 
              <>
                <Heading as="h2" id={about.work.title} variant="display-default-s" marginBottom="32">
                  {about.work.title}
                </Heading>
                <Column fillWidth>
                  <Timeline
                    size="xs"
                    style={{
                      marginLeft: "-26px",
                      marginRight: "-18px",
                      WebkitMaskImage: "linear-gradient(to bottom, black 92%, transparent 96%)",
                      maskImage: "linear-gradient(to bottom, black 92%, transparent 96%)"
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
                            <Heading variant="body-default-m" onBackground="brand-weak" marginBottom="m">
                              {experience.role}
                            </Heading>
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
            {about.studies.display && 
              <>
                <Heading as="h2" id={about.studies.title} variant="display-default-s" marginBottom="m">
                  {about.studies.title}
                </Heading>
                <Column fillWidth gap="l" marginBottom="40">
                  {about.studies.institutions.map((institution, index) => (
                    <Column fillWidth key={`${institution.name}-${index}`}>
                      <Row fillWidth horizontal="between" vertical="center" marginBottom="4">
                        <Heading id={institution.name} variant="heading-default-xl">
                          {institution.name}
                        </Heading>
                        <Heading variant="heading-default-s" onBackground="neutral-weak">
                          {institution.timeframe}
                        </Heading>
                      </Row>
                      <Heading variant="body-default-m" onBackground="brand-weak" marginBottom="m">
                        {institution.degree}
                      </Heading>
                      <Column as="ul" gap="16">
                        {institution.description.map((line: React.ReactNode, lineIndex: number) => (
                          <Heading
                            as="li"
                            variant="body-default-l" 
                            onBackground="neutral-strong"
                            key={`${institution.name}-line-${lineIndex}`}
                            style={{ marginLeft: "-20px" }}
                          >
                            {line}
                          </Heading>
                        ))}
                      </Column>
                    </Column>
                  ))}
                </Column>
              </>
            }
            {about.technical.display && 
              <>
                <Heading as="h2" id={about.technical.title} variant="display-default-s" marginBottom="m">
                  {about.technical.title}
                </Heading>
                <Column fillWidth gap="l">
                  {about.technical.skills.map((skill, index) => (
                    <Column key={`${skill.title}-${index}`} fillWidth gap="m">
                      <Heading id={skill.title} variant="heading-default-xl" marginBottom="8">
                        {skill.title}
                      </Heading>
                      <Heading
                        variant="body-default-l"
                        onBackground="neutral-strong"
                        wrap="wrap"
                        style={{ lineHeight: "1.6" }}
                      >
                        {skill.description}
                      </Heading>
                      <Column fillWidth gap="20">
                        {skill.tags?.map((tag, tagIndex) => (
                          <Row key={`${skill.title}-${tagIndex}`} fillWidth vertical="center" gap="12">
                            <Tag
                              key={index}
                              prefixIcon={tag.icon}
                              gap="8" variant="brand"
                              style={{ width: "105px", height: "35px" }}
                            >
                              <Heading variant="label-default-s">{tag.name}</Heading>
                            </Tag>
                            <Heading variant="label-default-l" onBackground="neutral-strong" wrap="wrap">
                              {tag.description}
                            </Heading>
                        </Row>
                        ))}
                      </Column>
                    </Column>
                  ))}
                </Column>
              </>
            }
          </Column>
        </Row>
      </RevealFx>
    </Column>
  );
}
