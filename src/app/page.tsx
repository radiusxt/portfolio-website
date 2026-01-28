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
              paddingTop="40"
              delay={0.8}
              style={{ marginTop: "0px", scrollMarginTop: "160px" }}
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
          }
          <RevealFx translateY="16" fillWidth horizontal="center" paddingBottom="128" delay={0.1}>
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
      <RevealFx translateY="16" fillWidth delay={0.8}>
        <Column fillWidth maxWidth="xl" gap="16" horizontal="center">
          <Heading
            id="featured"
            variant="display-default-m"
            paddingBottom="64"
            style={{ letterSpacing: "0px", scrollMarginTop: "60px" }}
          >
            ISIC Challenge Dataset
          </Heading>
          <Projects range={[1, 1]} />
          <Heading variant="display-default-m" paddingTop="128" paddingBottom="64" style={{ letterSpacing: "0px" }}>
            Gallery Highlights
          </Heading>
          <GalleryView />
          <Line background="accent-alpha-strong" marginTop="80" maxWidth={60} height={0.2} radius="m" />
        </Column>
      </RevealFx>
      <RevealFx translateY="16" fillWidth horizontal="center" delay={1.2}>
        <ContactForm />
      </RevealFx>
    </Column>
  );
}
