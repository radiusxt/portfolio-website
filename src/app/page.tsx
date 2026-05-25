import {
  Badge,
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
import { Bounce, ContactForm, Reveal, Scroll } from "@/components";
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
      <Column position="relative" fillWidth horizontal="center" gap="l" style={{ minHeight: "100vh" }}>
        <Column maxWidth="l" horizontal="center" align="center">
          {home.featured.display && 
            <RevealFx
              id={home.title}
              translateY="16"
              fillWidth
              horizontal="center"
              delay={1.2}
              style={{
                marginTop: "0px",
                scrollMarginTop: "160px",
                paddingTop: "5dvh",
                paddingBottom: "9dvh" 
              }}
            >
              <Scroll target={"featured"}>
                <Badge
                  icon="book"
                  textVariant="label-default-s"
                  background="accent-alpha-weak"
                  paddingX="20"
                  paddingY="8"
                  style={{ boxShadow: "0 0 56px var(--accent-alpha-strong)" }}
                >
                  <Row paddingY="2">
                    {home.featured.title}
                  </Row>
                </Badge>
              </Scroll>
            </RevealFx>
          }
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
          <RevealFx translateY="16" fillWidth horizontal="center" delay={0.6}>
            <Row gap="8" horizontal="center" vertical="center" wrap>
              <Heading variant="heading-default-xl" style={{ letterSpacing: "0.3px" }}>
                👋&nbsp;&nbsp;{home.subline}
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
          delay={1.5}
          style={{ position: "absolute", bottom: "15dvh" }}
          s={{ style: { position: "absolute", bottom: "30vh" }}}
        >
          <Bounce distance={12} duration={3}>
            <Column className="bounce-chevron" gap="-1">
              <Icon name="chevronDown" size="xl" />
              <Icon name="chevronDown" size="xl" />
            </Column>
          </Bounce>
        </RevealFx>
      </Column>
      <Reveal translateY="16" fillWidth>
        <Column fillWidth maxWidth="xl" gap="16" marginBottom="104" horizontal="center">
          <Heading
            id="featured"
            variant="display-default-m"
            paddingBottom="64"
            style={{ letterSpacing: "0px", scrollMarginTop: "100px" }}
          >
            ISIC Challenge Dataset
          </Heading>
          <Projects range={[3, 3]} />
        </Column>
      </Reveal>
      <Reveal translateY="16" fillWidth>
        <Column fillWidth maxWidth="xl" gap="16" marginBottom="160" marginTop="16" horizontal="center">
          <Heading
            variant="display-default-m"
            paddingBottom="48"
            style={{ letterSpacing: "0px" }}
          >
            Gallery Highlights
          </Heading>
          <GalleryView />
        </Column>
      </Reveal>
      <Reveal translateY="16" fillWidth>
        <ContactForm />
      </Reveal>
    </Column>
  );
}
