import { AutoScroll, Column, Fade, Heading, Icon, Row, Text } from "@once-ui-system/core";
import { Reveal } from "@/components";
import { about } from "@/resources";

/* Technical Skills */
export function Skills() {
  return (
    <Column fill center gap="80" s={{ style: { width: "100vw" }}}>
      {about.technical.category.map((category, index) => 
        <Reveal key={`${category.title}`}>
          <Column fillWidth align="center" gap="48">
            <Heading as="h2" variant="display-default-xs">
              {category.title}
            </Heading>
            <Heading
              as="h3"
              variant="body-default-l"
              wrap="balance"
              style={{
                lineHeight: "1.5",
                WebkitTextSizeAdjust: "100%",
                textSizeAdjust: "100%",
              }}
            >
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
                      <Heading variant="body-default-m" wrap="nowrap">
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
