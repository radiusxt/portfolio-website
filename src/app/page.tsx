import {
  Column,
  Heading,
  Icon,
  Meta,
  RevealFx,
  Row,
  Schema,
  TypeFx
} from "@once-ui-system/core";
import { home, about, person, baseURL } from "@/resources";
import { Bounce, ContactForm, Reveal } from "@/components";

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
  });
}

/* Home Page Layout */
export default function Home() {
  return (
    <Column id={home.title} maxWidth="l" horizontal="center" style={{ scrollMarginTop: "120px" }}>
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        image={`/api/og/generate?title=${encodeURIComponent(home.title)}`}
        author={{ name: person.name, url: `${baseURL}${about.path}`, image: `${baseURL}${person.avatar}` }}
      />
      <Column position="relative" fillWidth horizontal="center" gap="l" paddingTop="160" style={{ minHeight: "100vh" }}>
        <Column maxWidth="l" horizontal="center" align="center">
          <RevealFx
            translateY="16"
            fillWidth
            horizontal="center"
            style={{ paddingBottom: "11dvh" }}
          >
            <Heading variant="display-default-xl" style={{ lineHeight: "1.2", letterSpacing: "-1.5px" }}>
              {home.headline}
            </Heading>
          </RevealFx>
          <RevealFx translateY="16" fillWidth horizontal="center" delay={0.5}>
            <Row horizontal="center" vertical="center" align="center" gap="8" s={{ direction: "column" }}>
              <Heading variant="heading-default-xl" style={{ letterSpacing: "0.3px" }}>
                {home.subline}
              </Heading>
              <Heading>
                <TypeFx
                  variant="heading-default-xl"
                  speed={50}
                  hold={2500}
                  delay={0.4}
                  words={home.roles}
                  style={{ lineHeight: "1.8", letterSpacing: "0.3px" }}
                />
              </Heading>
            </Row>
          </RevealFx>
        </Column>
        <RevealFx
          translateY="16"
          fillWidth
          horizontal="center"
          delay={1.8}
          style={{ position: "absolute", bottom: "15dvh" }}
          s={{ style: { position: "absolute", bottom: "30vh" }}}
        >
          <Bounce distance={12} duration={3}>
            <Column horizontal="center" gap="-1" onBackground="neutral-weak" textVariant="body-default-s">
              {home.instruction}
              <Icon name="chevronDown" size="xl" />
            </Column>
          </Bounce>
        </RevealFx>
      </Column>
      <Reveal translateY="16" fillWidth>
        <ContactForm />
      </Reveal>
    </Column>
  );
}
