import { Column, Flex, Heading, Logo, Meta, RevealFx, Row, Schema } from "@once-ui-system/core";
import { GalleryView } from "@/components/gallery/Gallery";
import { PicTime } from "@/components/gallery/PicTime";
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

export default function Gallery() {
  return (
    <Flex id={gallery.title} fillWidth direction="column" maxWidth="l" style={{ scrollMarginTop: "120px" }}>
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={gallery.path}
        title={gallery.title}
        description={gallery.description}
        image={`/api/og/generate?title=${encodeURIComponent(gallery.title)}`}
        author={{ name: person.name, url: `${baseURL}${gallery.path}`, image: `${baseURL}${person.avatar}` }}
      />
      <RevealFx translateY="16" fillWidth horizontal="center" paddingTop="24" paddingBottom="80" delay={0.1}>
        <Column horizontal="center" gap="80">
          <Heading variant="display-default-m" style={{ letterSpacing: "0px" }}>
            {gallery.title}
          </Heading>
          <GalleryView />
        </Column>
      </RevealFx>
      <RevealFx translateY="16" fillWidth horizontal="center" paddingTop="64" delay={0.6}>
        <Column horizontal="center">
          <Row dark paddingBottom="80">
            <Logo wordmark="/images/brand/logo-light.png" style={{ transform: "scale(3)" }} />
          </Row>
          <Row light paddingBottom="80">
            <Logo wordmark="/images/brand/logo-dark.png" style={{ transform: "scale(3)" }} />
          </Row>
          <Heading variant="heading-default-l" style={{ letterSpacing: "0.2px", textAlign: "center" }}>
            My images specialise in sports & travel to capture special moments in motion.
          </Heading>
        </Column>
      </RevealFx>
      <RevealFx
        fillWidth
        horizontal="center"
        delay={0.8}
        style={{
          position: "relative",
          width: "90vw",
          height: "120vh",
          left: "50%",
          transform: "translateX(-50%)"
        }}
        s={{ style: { height: "370vh" }}}
        m={{ style: { height: "210vh" }}}
      >
        <PicTime />
      </RevealFx>
    </Flex>
  );
}
