import { Column, Heading, Line, Row } from "@once-ui-system/core";
import { Reveal } from "@/components";
import { about } from "@/resources";

/* Work Experience */
export function Experience() {
  return (
    <Column fill center gap="64" s={{ style: { width: "100vw" }}}>
      {about.work.experience.map((experience) => 
        <Reveal key={`${experience.timeframe}`}>
          <Column fill gap="48">
            <Row center>
              <Row 
                flex="2" 
                s={{ direction: "column", style: { padding: "0.5rem", gap: "0.5rem" }}}
              >
                <Row flex="1" vertical="center">
                  <Heading as="h2" variant="heading-default-xl">
                    {experience.role}
                  </Heading>
                </Row>
                <Row center flex="1" s={{ horizontal: "start" }}>
                  <Heading variant="heading-default-m" onBackground="brand-medium">
                    {experience.company}
                  </Heading>
                </Row>
              </Row>
              <Row 
                flex="1" 
                s={{ direction: "column", style: { padding: "0.5rem", gap: "0.5rem" }}}
              >
                <Row center flex="1" s={{ horizontal: "end" }}>
                  <Heading variant="heading-default-s" onBackground="accent-weak">
                    {experience.location || ""}
                  </Heading>
                </Row>
                <Row flex="1" horizontal="end" vertical="center">
                  <Heading variant="heading-default-s" onBackground="neutral-weak">
                    {experience.timeframe}
                  </Heading>
                </Row>
              </Row>
            </Row>
          <Line
            height="1"
            radius="l"
            style={{ background: "var(--neutral-on-background-strong)" }}
            s={{ hide: true }}
          />
          </Column>
        </Reveal>
      )}
    </Column>
  );
}
