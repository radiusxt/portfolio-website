import { Flex, Meta, Schema, Heading, Row, Line, Logo, RevealFx, Column } from "@once-ui-system/core";
import { baseURL, gallery, person } from "@/resources";
import { Scroll } from "@/components";
import { GalleryView } from "@/components/gallery/Gallery";
import { PicTimeIntegration } from "@/components/gallery/PicTime";

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
    <Flex id={gallery.title} fillWidth direction="column" maxWidth="l" style={{ scrollMarginTop: "120px"}}>
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={gallery.path}
        title={gallery.title}
        description={gallery.description}
        image={`/api/og/generate?title=${encodeURIComponent(gallery.title)}`}
        author={{ name: person.name, url: `${baseURL}${gallery.path}`, image: `${baseURL}${person.avatar}` }}
      />
      <RevealFx
        translateY="16"
        fillWidth
        horizontal="center"
        paddingTop="64"
        paddingBottom="80"
        delay={0.4}
      >
        <Scroll target="portfolio">
          <Row dark>
            <Logo wordmark="/images/brand/logo-light.png" style={{ transform: "scale(5)" }} />
          </Row>
          <Row light>
            <Logo wordmark="/images/brand/logo-dark.png" style={{ transform: "scale(5)" }} />
          </Row>
        </Scroll>
      </RevealFx>
      <RevealFx translateY="16" fillWidth horizontal="center" paddingBottom="80" delay={0.2}>
        <Heading variant="display-default-m" style={{ letterSpacing: "0px" }}>
          {gallery.title}
        </Heading>
      </RevealFx>
      <RevealFx translateY="16" fillWidth horizontal="center" paddingBottom="128" delay={0.2}>
        <GalleryView />
      </RevealFx>
      <RevealFx translateY="16" fillWidth horizontal="center" paddingBottom="64" delay={0.8}>
        <Heading variant="display-default-m" style={{ letterSpacing: "0px", textAlign: "center" }}>
          Discover the Full Gallery
        </Heading>
      </RevealFx>
      <RevealFx translateY="16" fillWidth horizontal="center" delay={1}>
        <Heading variant="heading-default-xl" style={{ letterSpacing: "0.2px", textAlign: "center" }}>
          My images specialise in sport, wildlife & travel to capture moments in motion.
        </Heading>
      </RevealFx>
      <RevealFx
        id="portfolio"
        translateY="16"
        fillWidth
        horizontal="center"
        delay={1}
        width="xl"
        style={{
          marginBottom: "-25px",
          scrollMarginTop: "-15px",
          position: "relative",
          width: "100vw",
          left: "50%",
          transform: "translateX(-50%)"
        }}
      >
        <PicTimeIntegration />
      </RevealFx>
    </Flex>
  );
}
