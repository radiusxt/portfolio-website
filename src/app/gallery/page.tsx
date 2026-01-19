import { Flex, Meta, Schema, Heading, Icon, RevealFx } from "@once-ui-system/core";
import { GalleryView } from "@/components/gallery/Gallery";
import { PicTimeIntegration } from "@/components/gallery/PicTime";
import { baseURL, gallery, person } from "@/resources";
import { Logo } from "@/components/gallery/Logo";

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
    <Flex direction="column" maxWidth="l">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={gallery.path}
        title={gallery.title}
        description={gallery.description}
        image={`/api/og/generate?title=${encodeURIComponent(gallery.title)}`}
        author={{ name: person.name, url: `${baseURL}${gallery.path}`, image: `${baseURL}${person.avatar}` }}
      />
      <RevealFx translateY="16" fillWidth horizontal="center" paddingBottom="32" delay={0.2} style={{ marginTop: "-30px" }}>
          <Logo />
      </RevealFx>
      <RevealFx translateY="16" fillWidth horizontal="center" paddingBottom="64" delay={0.2}>
        <Heading variant="display-default-m" style={{ letterSpacing: "0px" }}>
          {gallery.title}
        </Heading>
      </RevealFx>
      <RevealFx translateY="16" fillWidth horizontal="center" paddingBottom="128" delay={0.2}>
        <GalleryView />
      </RevealFx>
      <RevealFx translateY="16" fillWidth horizontal="center" paddingBottom="64" delay={0.4}>
        <Heading variant="display-default-m" style={{ letterSpacing: "0px" }}>
          Discover the Full Gallery
        </Heading>
      </RevealFx>
      <RevealFx translateY="16" fillWidth horizontal="center" paddingBottom="24" delay={0.4}>
        <Heading variant="heading-default-xl" style={{ letterSpacing: "0.2px" }}>
          My images focuses on sport, travel & wildlife to capture moments in motion.
        </Heading>
      </RevealFx>
      <Icon name="chevronDown" size="xl" style={{ margin: "0 auto" }}  />
      <RevealFx translateY="16" fillWidth horizontal="center" delay={1}>
        <PicTimeIntegration />
      </RevealFx>
    </Flex>
  );
}
