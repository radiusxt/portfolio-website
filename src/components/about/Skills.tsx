import { AutoScroll, Column, Fade, Heading, Icon, Row, RevealFx } from "@once-ui-system/core";
import { about, person } from "@/resources";
import styles from "@/components/about/Contents.module.scss";

/* Technical Skills */
export function Skills() {
  return (
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
  );
}
