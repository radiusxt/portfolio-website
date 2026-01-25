import { Flex, Meta, Schema, Heading, Icon, RevealFx } from "@once-ui-system/core";
import { GalleryView } from "@/components/gallery/Gallery";
import { PicTimeIntegration } from "@/components/gallery/PicTime";
import { baseURL, gallery, person } from "@/resources";
import { Logo } from "@/components/gallery/Logo";
import { Scroll } from "@/components/Scroll";

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
    <Flex fillWidth direction="column" maxWidth="l">
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
        paddingBottom="32"
        delay={0.4}
        style={{ marginTop: "-24px" }}
      >
        <Scroll target="portfolio">
          <Logo />
        </Scroll>
      </RevealFx>
      <RevealFx translateY="16" fillWidth horizontal="center" paddingBottom="48" delay={0.8}>
        <Heading variant="display-default-m" style={{ letterSpacing: "0px" }}>
          {gallery.title}
        </Heading>
      </RevealFx>
      <RevealFx translateY="16" fillWidth horizontal="center" paddingBottom="128" delay={0.8}>
        <GalleryView />
      </RevealFx>
      <RevealFx translateY="16" fillWidth horizontal="center" paddingBottom="64" delay={1.2}>
        <Heading variant="display-default-m" style={{ letterSpacing: "0px", textAlign: "center" }}>
          Discover the Full Gallery
        </Heading>
      </RevealFx>
      <RevealFx translateY="16" fillWidth horizontal="center" delay={1.2}>
        <Heading variant="heading-default-xl" style={{ letterSpacing: "0.2px", textAlign: "center" }}>
          My images specialise in sport, wildlife & travel to capture moments in motion.
        </Heading>
      </RevealFx>
      <RevealFx
        id="portfolio"
        translateY="16"
        fillWidth
        horizontal="center"
        delay={1.2}
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
