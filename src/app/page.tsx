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
import { Bounce, ContactForm, Dashboard, Reveal, SpotlightBorder } from "@/components";
import { home, about, person, baseURL } from "@/resources";

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
    <Column id={home.title} horizontal="center" fill style={{ scrollMarginTop: "120px" }}>
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        image={`/api/og/generate?title=${encodeURIComponent(home.title)}`}
        author={{ name: person.name, url: `${baseURL}${about.path}`, image: `${baseURL}${person.avatar}` }}
      />
      <Column
        maxWidth="xl"
        position="relative"
        horizontal="center"
        minHeight="100vh"
        top="20vh"
        align="center"
        wrap
      >
        <RevealFx
          translateY="16"
          fillWidth
          horizontal="center"
          delay={0.1}
          style={{ paddingBottom: "11dvh" }}
        >
          <Heading
            as="h1"
            variant="display-default-xl"
            style={{ lineHeight: "1.25", letterSpacing: "-1.5px" }}
          >
            {home.headline}
          </Heading>
        </RevealFx>
        <RevealFx translateY="16" fillWidth horizontal="center" delay={0.8}>
          <Row center gap="8" s={{ direction: "column" }}>
            <Heading as="h2" variant="heading-default-xl" style={{ letterSpacing: "0.3px" }}>
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
        <RevealFx
          translateY="16"
          fillWidth
          position="absolute"
          horizontal="center"
          bottom="32vh"
          delay={1.8}
          s={{ style: { bottom: "30vh" }}}
        >
          <Bounce distance={12} duration={3}>
            <Column horizontal="center" gap="-1" onBackground="neutral-weak" textVariant="body-default-s">
              {home.instruction}
              <Icon name="chevronDown" size="xl" />
            </Column>
          </Bounce>
        </RevealFx>
      </Column>
      <Column horizontal="center" minHeight="100vh">
        <Reveal>
          <SpotlightBorder
            primary="brand-on-background-weak"
            secondary="accent-on-background-weak"
            spread={90}
            falloff={200}
          >
            <Dashboard username={home.github} activity={home.activity}/>
          </SpotlightBorder>
        </Reveal>
      </Column>
      <Column horizontal="center" minHeight="100vh" align="center" paddingBottom="128">
        <Reveal>
          <ContactForm />
        </Reveal>
      </Column>
    </Column>
  );
}
