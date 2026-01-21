import {
  Heading,
  Column,
  Badge,
  Row,
  Schema,
  Meta,
  Line,
  RevealFx,
} from "@once-ui-system/core";
import { home, about, person, baseURL } from "@/resources";
import { Scroll } from "@/components/Scroll";
import { Projects } from "@/components/work/Projects";
import { GalleryView } from "@/components/gallery/Gallery";
import { ContactForm } from "@/components/ContactForm";

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
    <Column maxWidth="l" gap="xl" paddingY="24" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        image={`/api/og/generate?title=${encodeURIComponent(home.title)}`}
        author={{ name: person.name, url: `${baseURL}${about.path}`, image: `${baseURL}${person.avatar}` }}
      />
      <Column fillWidth horizontal="center" gap="l">
        <Column maxWidth="l" horizontal="center" align="center">
          {home.featured.display && (
            <RevealFx
              translateY="16"
              fillWidth
              horizontal="center"
              paddingBottom="64"
              paddingTop="32"
              delay={0.8}
              style={{ marginTop: "-18px"}}
            >
              <Scroll target={"featured"}>
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
          <RevealFx translateY="16" fillWidth horizontal="center" paddingBottom="80" marginBottom="24">
            <Heading variant="display-default-xl" style={{ lineHeight: "1.2", letterSpacing: "-1.5px" }}>
              {home.headline}
            </Heading>
          </RevealFx>
          <RevealFx translateY="16" fillWidth horizontal="center" paddingBottom="48" delay={0.4}>
            <Heading variant="heading-default-xl" style={{ lineHeight: "1.5", letterSpacing: "0.2px"}}>
              {home.subline}
            </Heading>
          </RevealFx>
        </Column>
      </Column>
      <RevealFx translateY="16" fillWidth horizontal="center" paddingBottom="56" delay={0.4}>
        <Line background="accent-alpha-strong" maxWidth={50} height={0.2} radius="m" />
      </RevealFx>
      <RevealFx translateY="16" fillWidth horizontal="center" delay={0.8}>
        <Heading id="featured" variant="display-default-m" style={{ letterSpacing: "0px", scrollMarginTop: "60px" }}>
          Software Project
        </Heading>
      </RevealFx>
      <RevealFx translateY="16" fillWidth paddingBottom="32" delay={0.8}>
        <Projects range={[1, 1]} />
      </RevealFx>
      <RevealFx translateY="16" fillWidth horizontal="center" delay={0.8} >
        <Heading variant="display-default-m" style={{ letterSpacing: "0px" }}>
          Gallery Highlights
        </Heading>
      </RevealFx>
      <RevealFx translateY="16" fillWidth delay={0.8}>
        <GalleryView />
      </RevealFx>
      <RevealFx translateY="16" fillWidth horizontal="center" paddingBottom="20" delay={0.8}>
        <Line background="accent-alpha-strong" maxWidth={60} height={0.2} radius="m" />
      </RevealFx>
      <RevealFx translateY="16" fillWidth horizontal="center" delay={1.2}>
        <ContactForm />
      </RevealFx>
    </Column>
  );
}
