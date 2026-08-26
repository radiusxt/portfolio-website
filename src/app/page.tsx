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
import { about, baseURL, home, person } from "@/resources";

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
    <Column id={home.title} horizontal="center" fill style={{ scrollMarginTop: "8rem" }}>
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        image={`/api/og/generate?title=${encodeURIComponent(home.title)}`}
        author={{ name: person.name, url: `${baseURL}${about.path}`, image: `${baseURL}${person.image}` }}
      />
      <Column
        maxWidth="xl"
        position="relative"
        minHeight="100vh"
        top="160"
        horizontal="center"
        align="center"
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
              style={{ lineHeight: "1.3", letterSpacing: "-1px" }}
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
      <Reveal>
        <Column horizontal="center" minHeight="80vh">
          <SpotlightBorder
            primary="brand-on-background-weak"
            secondary="accent-on-background-weak"
            spread={80}
            falloff={200}
          >
            <Dashboard username={home.github} activity={home.activity} />
          </SpotlightBorder>
        </Column>
      </Reveal>
      <Reveal>
        <Column horizontal="center" minHeight="80vh" align="center" paddingBottom="128">
          <ContactForm />
        </Column>
      </Reveal>
    </Column>
  );
}
