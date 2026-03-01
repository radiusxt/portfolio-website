import {
  Badge,
  Column,
  Heading,
  Icon,
  Line,
  Meta,
  RevealFx,
  Row,
  Schema,
  TypeFx
} from "@once-ui-system/core";
import { home, about, person, baseURL } from "@/resources";
import { ContactForm, Reveal, Scroll } from "@/components";
import { Projects } from "@/components/work/Projects";
import { GalleryView } from "@/components/gallery/Gallery";

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
  });
}

export default function Home() {
  return (
    <Column maxWidth="l" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        image={`/api/og/generate?title=${encodeURIComponent(home.title)}`}
        author={{ name: person.name, url: `${baseURL}${about.path}`, image: `${baseURL}${person.avatar}` }}
      />
      <Column position="relative" fillWidth horizontal="center" gap="l" style={{ minHeight: "100dvh" }}>
        <Column maxWidth="l" horizontal="center" align="center">
          {home.featured.display && 
            <RevealFx
              id={home.title}
              translateY="16"
              fillWidth
              horizontal="center"
              delay={0.8}
              style={{ marginTop: "0px", scrollMarginTop: "160px", paddingTop: "5dvh", paddingBottom: "9dvh" }}
            >
              <Scroll target={"featured"}>
                <Badge
                  textVariant="label-default-s"
                  background="brand-strong"
                  paddingX="20"
                  paddingY="8"
                  style={{ boxShadow: "0 0 32px var(--accent-solid-strong)" }}
                >
                  <Row paddingY="2">
                    {home.featured.title}
                  </Row>
                </Badge>
              </Scroll>
            </RevealFx>
          }
          <RevealFx translateY="16" fillWidth horizontal="center" delay={0.1} style={{ paddingBottom: "11dvh" }}>
            <Heading variant="display-default-xl" style={{ lineHeight: "1.2", letterSpacing: "-1.5px" }}>
              {home.headline}
            </Heading>
          </RevealFx>
          <RevealFx translateY="16" fillWidth horizontal="center" delay={0.4}>
            <Row gap="8" horizontal="center" vertical="center" wrap>
              <Heading variant="heading-default-xl" style={{ lineHeight: "1.6", letterSpacing: "0.3px" }}>
                {/* Hand Waving Emoji + 2x Whitespace */}
                {`\u{1F44B}\u00A0\u00A0`}{home.subline}
              </Heading>
              <Heading>
                <TypeFx
                  words={[
                    "Software Engineer.",
                    "Sports Photographer.",
                    "Machine Learning Engineer.",
                    "Travel Photographer.",
                    "Hardware Enthusiast."
                  ]}
                  variant="heading-default-xl"
                  speed={50}
                  hold={2500}
                  delay={0.4}
                  style={{ lineHeight: "1.6", letterSpacing: "0.3px" }}
                />
              </Heading>
            </Row>
          </RevealFx>
        </Column>
        <RevealFx
          translateY="16"
          fillWidth
          horizontal="center"
          delay={0.4}
          style={{ position: "absolute", bottom: "12dvh" }}
        >
          <Icon name="chevronDown" size="xl" />
        </RevealFx>
      </Column>
      <Reveal translateY="16" fillWidth>
        <Column fillWidth maxWidth="xl" gap="16" marginBottom="160" horizontal="center">
          <Heading
            id="featured"
            variant="display-default-m"
            paddingBottom="64"
            style={{ letterSpacing: "0px", scrollMarginTop: "80px" }}
          >
            ISIC Challenge Dataset
          </Heading>
          <Projects range={[3, 3]} />
        </Column>
      </Reveal>
      <Reveal translateY="16" fillWidth>
        <Column fillWidth maxWidth="xl" gap="16" marginBottom="104" marginTop="64" horizontal="center">
          <Heading
            variant="display-default-m"
            //paddingTop="160"
            paddingBottom="48"
            style={{ letterSpacing: "0px" }}
          >
            Gallery Highlights
          </Heading>
          <GalleryView />
          <Line
            maxWidth={55}
            height={0.15}
            background="accent-alpha-strong"
            radius="m"
            marginTop="128"
            //marginBottom="104"
            xs={{ style: { maxWidth: "20rem" }}}
            m={{ style: { maxWidth: "32rem" }}}
          />
        </Column>
      </Reveal>
      <Reveal translateY="16" fillWidth>
        <ContactForm />
      </Reveal>
    </Column>
  );
}
