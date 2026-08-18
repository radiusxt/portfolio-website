import { Column, Heading, Logo, Meta, RevealFx, Row, Schema } from "@once-ui-system/core";
import { Reveal } from "@/components";
import { Highlights } from "@/components/gallery/Highlights";
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
        author={{ name: person.name, url: `${baseURL}${gallery.path}`, image: `${baseURL}${person.avatar}` }}
      />
        <Column maxWidth="xl" fill horizontal="center" paddingBottom="128">
          <RevealFx translateY="16" fillWidth horizontal="center">
            <Heading
              as="h1"
              id={gallery.title}
              variant="display-default-m"
              paddingBottom="104"
              style={{ letterSpacing: "0px", scrollMarginTop: "140px" }}
            >
              {gallery.title}
            </Heading>
          </RevealFx>
          <Highlights />
        </Column>
      <Reveal>
        <Column horizontal="center">
          <Row dark paddingBottom="32">
            <Logo wordmark="/trademarks/logo-light.png" style={{ transform: "scale(3)" }} />
          </Row>
          <Row light paddingBottom="32">
            <Logo wordmark="/trademarks/logo-dark.png" style={{ transform: "scale(3)" }} />
          </Row>
        </Column>
      </Reveal>
    </Column>
  );
}
