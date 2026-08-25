import { Column, Heading, Logo, Meta, RevealFx, Row, Schema } from "@once-ui-system/core";
import { Highlights } from "@/components/gallery/Highlights";
import { Testimonials } from "@/components/gallery/Testimonials";
import { Portfolio } from "@/components/gallery/Portfolio";
import { baseURL, gallery, person } from "@/resources";

export async function generateMetadata() {
  return Meta.generate({
    title: gallery.title,
    description: gallery.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(gallery.title)}`,
    path: gallery.path,
  });
}

/* Gallery Page Layout */
export default function Gallery() {
  return (
    <Column horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={gallery.path}
        title={gallery.title}
        description={gallery.description}
        image={`/api/og/generate?title=${encodeURIComponent(gallery.title)}`}
        author={{ name: person.name, url: `${baseURL}${gallery.path}`, image: `${baseURL}${person.image}` }}
      />
      <Column fill maxWidth="80vw" minHeight="100vh" horizontal="center" marginBottom="128">
        <RevealFx translateY="16" fillWidth horizontal="center">
          <Column center align="center" marginBottom="64" gap="56">
            <Heading
              as="h1"
              id={gallery.title}
              variant="display-default-m"
              style={{ letterSpacing: "0px", scrollMarginTop: "140px" }}
            >
              {gallery.title}
            </Heading>
            <Heading as="h2" variant="heading-default-m">
              {gallery.kicker}
            </Heading>
          </Column>
        </RevealFx>
        <Highlights />
      </Column>
      <Column fill maxWidth="60vw" minHeight="100vh" horizontal="center">
        <Column center align="center" gap="56">
          <Heading as="h1" variant="display-default-m">
            {gallery.subtitle}
          </Heading>
          <Heading as="h2" variant="heading-default-m" wrap="nowrap">
            {gallery.subkicker}
          </Heading>
        </Column>
        <Testimonials />
      </Column>
      <Column fill maxWidth="80vw" minHeight="100vh" bottom="12" horizontal="center">
        <Row dark>
          <Logo wordmark="/trademarks/logo-light.png" style={{ transform: "scale(3)" }} />
        </Row>
        <Row light>
          <Logo wordmark="/trademarks/logo-dark.png" style={{ transform: "scale(3)" }} />
        </Row>
        <Portfolio />
      </Column>
    </Column>
  );
}
