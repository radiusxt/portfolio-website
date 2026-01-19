import {
  Avatar,
  Button,
  Column,
  Heading,
  Icon,
  IconButton,
  Tag,
  Text,
  Meta,
  Schema,
  Row,
  TypeFx,
  RevealFx,
} from "@once-ui-system/core";
import { baseURL, about, person, social } from "@/resources";
import { TableOfContents } from "@/components/about/TableOfContents";
import styles from "@/components/about/about.module.scss";
import React from "react";

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
    <Column maxWidth="m">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={about.title}
        description={about.description}
        path={about.path}
        image={`/api/og/generate?title=${encodeURIComponent(about.title)}`}
        author={{ name: person.name, url: `${baseURL}${about.path}`, image: `${baseURL}${person.avatar}` }}
      />
      
      {about.tableOfContent.display && (
        <Column
          left="8"
          style={{ top: "50%", transform: "translateY(-50%)" }}
          position="fixed"
          paddingLeft="24"
          gap="48"
          s={{ hide: true }}
        >
          <TableOfContents structure={structure} about={about} />
        </Column>
      )}
      <RevealFx delay={0.4}>
      <Row fillWidth s={{ direction: "column"}} horizontal="center">
        {about.avatar.display && (
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
            <Avatar src={person.avatar} size={15} />
            <Row gap="8" vertical="center">
              <Icon onBackground="brand-weak" size="l" name="globe" />
              <Text variant="body-default-xl">{person.location}</Text>
            </Row>
            {person.languages && person.languages.length > 0 && (
              <Row wrap gap="12">
                {person.languages.map((language, index) => (
                  <Tag variant="brand" key={index} size="l">
                    <Text variant="label-default-l">{language}</Text>
                  </Tag>
                ))}
              </Row>
            )}
          </Column>
        )}
        <Column className={styles.blockAlign} flex={9} maxWidth={60}>
          <Column
            id={about.intro.title}
            fillWidth
            minHeight="160"
            vertical="center"
            marginBottom="32"
          >
            <Heading className={styles.textAlign} variant="display-default-xl" paddingBottom="16" style={{ letterSpacing: "-1px" }}>
              {person.name}
            </Heading>
            <Text className={styles.textAlign} variant="display-default-s">
              {person.role}
            </Text>
            {social.length > 0 && (
              <Row
                className={styles.blockAlign}
                data-border="rounded"
                horizontal="center"
                paddingTop="20"
                gap="12"
                wrap
                fitWidth
              >
                {social.filter((item) => item.essential).map((item) =>
                    item.link && (
                      <React.Fragment key={item.name}>
                        <Row s={{ hide: true }}>
                          <Button
                            key={item.name}
                            href={item.link}
                            prefixIcon={item.icon}
                            label={item.name}
                            size="m"
                            weight="default"
                            variant="primary"
                            style={{ gap: "8px", letterSpacing: "0.2px" }}
                          />
                        </Row>
                        <Row hide s={{ hide: false }}>
                          <IconButton
                            size="m"
                            key={`${item.name}-icon`}
                            href={item.link}
                            icon={item.icon}
                            variant="primary"
                          />
                        </Row>
                      </React.Fragment>
                    ),
                )}
              </Row>
            )}
          </Column>
          {about.intro.display && (
            <Column textVariant="body-default-xl" fillWidth gap="m" align="justify" marginBottom="l" style={{ lineHeight: "1.5"}}>
              <TypeFx words={about.intro.description} speed={15} delay={0.4} />
            </Column>
          )}
          {about.work.display && (
            <>
              <Heading as="h2" id={about.work.title} variant="display-strong-s" marginBottom="m">
                {about.work.title}
              </Heading>
              <Column fillWidth gap="l" marginBottom="40">
                {about.work.experiences.map((experience, index) => (
                  <Column key={`${experience.company}-${experience.role}-${index}`} fillWidth>
                    <Row fillWidth horizontal="between" vertical="center" marginBottom="4">
                      <Text id={experience.company} variant="heading-default-xl">
                        {experience.company}
                      </Text>
                      <Text variant="heading-default-xs" onBackground="neutral-weak">
                        {experience.timeframe}
                      </Text>
                    </Row>
                    <Text variant="body-default-s" onBackground="brand-weak" marginBottom="m">
                      {experience.role}
                    </Text>
                    <Column as="ul" gap="16">
                      {experience.achievements.map(
                        (achievement: React.ReactNode, index: number) => (
                          <Text
                            as="li"
                            variant="body-default-l"
                            key={`${experience.company}-${index}`}
                          >
                            {achievement}
                          </Text>
                        ),
                      )}
                    </Column>
                  </Column>
                ))}
              </Column>
            </>
          )}
          {about.studies.display && (
            <>
              <Heading as="h2" id={about.studies.title} variant="display-strong-s" marginBottom="m">
                {about.studies.title}
              </Heading>
              <Column fillWidth gap="l" marginBottom="40">
                {about.studies.institutions.map((institution, index) => (
                  <Column key={`${institution.name}-${index}`} fillWidth>
                    <Row fillWidth horizontal="between" vertical="center" marginBottom="4">
                      <Text id={institution.name} variant="heading-default-xl">
                        {institution.name}
                      </Text>
                      <Text variant="heading-default-xs" onBackground="neutral-weak">
                        {institution.timeframe}
                      </Text>
                    </Row>
                    <Text variant="body-default-s" onBackground="brand-weak" marginBottom="m">
                      {institution.degree}
                    </Text>
                    <Column as="ul" gap="16">
                      {institution.description.map((line: React.ReactNode, lineIndex: number) => (
                        <Text
                          as="li"
                          variant="body-default-l" 
                          onBackground="neutral-strong"
                          key={`${institution.name}-line-${lineIndex}`} 
                        >
                          {line}
                        </Text>
                      ))}
                    </Column>
                  </Column>
                ))}
              </Column>
            </>
          )}
          {about.technical.display && (
            <>
              <Heading as="h2" id={about.technical.title} variant="display-strong-s" marginBottom="m">
                {about.technical.title}
              </Heading>
              <Column fillWidth gap="l">
                {about.technical.skills.map((skill, index) => (
                  <Column key={`${skill.title}-${index}`} fillWidth gap="m">
                    <Text id={skill.title} variant="heading-default-xl" marginBottom="8">
                      {skill.title}
                    </Text>
                    <Text variant="body-default-l" onBackground="neutral-strong">
                      {skill.description}
                    </Text>
                    <Column fillWidth gap="20">
                      {skill.tags?.map((tag, tagIndex) => (
                        <Row key={`${skill.title}-${tagIndex}`} fillWidth vertical="center" gap="12">
                          <Tag key={index} prefixIcon={tag.icon} gap="8" variant="brand" style={{ width: "112px", height: "35px" }}>
                            <Text variant="label-default-s">{tag.name}</Text>
                          </Tag>
                          <Column>
                            <Text variant="label-default-l" onBackground="neutral-strong">
                              {tag.description}
                            </Text>
                          </Column>
                        </Row>
                      ))}
                    </Column>
                  </Column>
                ))}
              </Column>
            </>
          )}
        </Column>
      </Row>
      </RevealFx>
    </Column>
  );
}
