import { AutoScroll, Column, Fade, Heading, Icon, Row } from "@once-ui-system/core";
import { Reveal } from "@/components";
import { about } from "@/resources";

/* Technical Skills */
export function Skills() {
  return (
    <Column fill center bottom="8" gap="80">
      {about.technical.category.map((category, index) => 
        <Reveal key={`${category.title}`}>
          <Column fillWidth align="center" gap="48">
            <Heading id={category.title} variant="heading-default-xl">
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
                paddingTop="32"
              >
                {category.skills.map((skill) => 
                  <Column key={`${skill.name}`} paddingX="48">
                    <Row vertical="center" gap="16">
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
        </Reveal>
      )}
    </Column>
  );
}
