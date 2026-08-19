import {
  Column,
  Heading,
  Meta,
  RevealFx,
  Row,
  Schema,
  TypeFx
} from "@once-ui-system/core";
import { ContactForm, Dashboard, Reveal, SpotlightBorder } from "@/components";
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
        align="center"
        minHeight="100vh"
        top="16vh"
        wrap
      >
        {String(home.headline).split(". ").map((sentence, index) =>
          <RevealFx
            key={sentence}
            translateY="16"
            fillWidth
            horizontal="center"
            delay={0.6 * index}
            style={{ paddingBottom: index === 1 ? "8vh" : "0" }}
          >
            <Heading
              as="h1"
              variant="display-default-xl"
              style={{ lineHeight: "1.3", letterSpacing: "-1.5px" }}
            >
              {sentence}{index === 0 && "."}
            </Heading>
          </RevealFx>
        )}
        <RevealFx translateY="16" fillWidth horizontal="center" delay={1.2}>
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
