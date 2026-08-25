import { Column, Heading, Line, Row, Timeline, RevealFx } from "@once-ui-system/core";
import { Reveal } from "@/components";
import { about, person } from "@/resources";
import styles from "@/components/about/Contents.module.scss";

/* Work Experience */
export function Experience() {
  return (
    <>
      <Column fillWidth>
        <Timeline
          size="xs"
          style={{
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
  );
}
