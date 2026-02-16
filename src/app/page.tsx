import {
  Badge,
  Column,
  Heading,
  Line,
  Meta,
  RevealFx,
  Row,
  Schema
} from "@once-ui-system/core";
import { home, about, person, baseURL } from "@/resources";
import { ContactForm, Scroll } from "@/components";
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
          {home.featured.display && 
            <RevealFx
              id={home.title}
              translateY="16"
              fillWidth
              horizontal="center"
              paddingBottom="80"
              paddingTop="32"
              delay={0.8}
              style={{ marginTop: "0px", scrollMarginTop: "160px" }}
            >
              <Scroll target={"featured"}>
                <Badge
                  textVariant="label-default-s"
                  background="brand-strong"
                  paddingX="20"
                  paddingY="8"
                  style={{ boxShadow: "0 0 32px var(--accent-solid-strong)" }}
                >
                  <Row paddingY="2">{home.featured.title}</Row>
                </Badge>
              </Scroll>
            </RevealFx>
          }
          <RevealFx translateY="16" fillWidth horizontal="center" paddingBottom="128" delay={0.1}>
            <Heading variant="display-default-xl" style={{ lineHeight: "1.2", letterSpacing: "-1.5px" }}>
              {home.headline}
            </Heading>
          </RevealFx>
          <RevealFx translateY="16" fillWidth horizontal="center" paddingBottom="104" delay={0.4}>
            <Heading variant="heading-default-xl" style={{ lineHeight: "1.6", letterSpacing: "0.3px"}}>
              {home.subline}
            </Heading>
          </RevealFx>
        </Column>
      </Column>
      <RevealFx translateY="16" fillWidth horizontal="center" paddingBottom="80" delay={0.4}>
        <Line background="accent-alpha-strong" maxWidth={40} height={0.15} radius="m" />
      </RevealFx>
      <RevealFx translateY="16" fillWidth delay={0.8}>
        <Column fillWidth maxWidth="xl" gap="16" paddingBottom="16" horizontal="center">
          <Heading
            id="featured"
            variant="display-default-m"
            paddingBottom="64"
            style={{ letterSpacing: "0px", scrollMarginTop: "80px" }}
          >
            ISIC Challenge Dataset
          </Heading>
          <Projects range={[3, 3]} />
          <Heading variant="display-default-m" paddingTop="128" paddingBottom="48" style={{ letterSpacing: "0px" }}>
            Gallery Highlights
          </Heading>
          <GalleryView />
          <Line background="accent-alpha-strong" maxWidth={55} height={0.15} radius="m" marginTop="128" />
        </Column>
      </RevealFx>
      <RevealFx translateY="16" fillWidth horizontal="center" delay={1.2}>
        <ContactForm />
      </RevealFx>
    </Column>
  );
}
