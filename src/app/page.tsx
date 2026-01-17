import {
  Heading,
  RevealFx,
  Column,
  Badge,
  Row,
  Schema,
  Meta,
  Line,
} from "@once-ui-system/core";
import { home, about, person, baseURL, routes } from "@/resources";
import { Scroll } from "@/components/Scroll";
import { Projects } from "@/components/work/Projects";
import { GalleryView } from "@/components/gallery/GalleryView";
import { ContactForm } from "@/components/ContactForm";

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });
}

export default function Home() {
  return (
    <Column maxWidth="l" gap="xl" paddingY="24" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        image={`/api/og/generate?title=${encodeURIComponent(home.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Column fillWidth horizontal="center" gap="l">
        <Column maxWidth="l" horizontal="center" align="center">
          {home.featured.display && (
            <RevealFx translateY="16" fillWidth horizontal="center" paddingTop="32" paddingBottom="48" delay={1}>
              <Scroll>
                <Badge
                  textVariant="label-default-s"
                  background="brand-strong"
                  paddingX="20"
                  paddingY="8"
                  arrow={false}
                  style={{ boxShadow: "0 0 32px var(--accent-solid-strong)" }}
                >
                  <Row paddingY="2">{home.featured.title}</Row>
                </Badge>
              </Scroll>
            </RevealFx>
          )}
          <RevealFx translateY="16" fillWidth horizontal="center" paddingBottom="128">
            <Heading variant="display-default-xl" style={{ lineHeight: "1.2", letterSpacing: "-2px" }}>
              {home.headline}
            </Heading>
          </RevealFx>
          <RevealFx translateY="16" fillWidth horizontal="center" paddingBottom="48" delay={0.5}>
            <Heading variant="heading-default-xl" style={{ lineHeight: "1.5", letterSpacing: "0.1px"}}>
              {home.subline}
            </Heading>
          </RevealFx>
        </Column>
      </Column>
      <RevealFx translateY="16" fillWidth horizontal="center" paddingBottom="64" delay={0.5}>
        <Line background="accent-alpha-strong" maxWidth={50} height={0.1} />
      </RevealFx>
      <RevealFx translateY="16" fillWidth horizontal="center" delay={1}>
        <Heading id="featured_project" variant="display-default-m" style={{ letterSpacing: "-1px", scrollMarginTop: "70px" }}>
          Software Project
        </Heading>
      </RevealFx>
      <RevealFx translateY="16" fillWidth delay={1}>
        <Projects range={[1, 1]} />
      </RevealFx>
      <RevealFx translateY="16" fillWidth horizontal="center" delay={1.5} >
        <Heading variant="display-default-m" style={{ letterSpacing: "-1px" }}>
          Watch this space... {/*Photo Gallery*/}
        </Heading>
      </RevealFx>
      <RevealFx translateY="16" fillWidth horizontal="center" delay={1.5}>
        <Line background="accent-alpha-strong" maxWidth={60} height={0.1} />
      </RevealFx>
      <RevealFx translateY="16" fillWidth horizontal="center" gap="l" delay={2}>
        <ContactForm />
      </RevealFx>
    </Column>
  );
}
