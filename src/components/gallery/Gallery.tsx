"use client";

import { Carousel, Column, Flex, Line, Media } from "@once-ui-system/core";
import { gallery } from "@/resources";
import { Loading } from "@/components";

export function GalleryView() {
  return (
    <Column fillWidth direction="column" horizontal="center" maxWidth="l">
      <Carousel
        aspectRatio="3 / 2"
        indicator="thumbnail"
        thumbnail={{ height: 8 }}
        controls={false}
        radius="l"
        translateY={2}
        border="transparent"
        play={{ auto: true, interval: 5000, controls: true }}
        paddingBottom="8"
        items={gallery.images.map((image) => ({
          slide: 
            <Flex fillWidth fillHeight horizontal="center" vertical="center">
              {image.orientation === "horizontal" &&
                <Flex radius="l" overflow="hidden" style={{ height: "fit-content", width: "100%" }}>
                  <Loading fallback={<Media src="" aspectRatio="3/2" loading />}>
                    <Media src={image.src} alt={image.alt} objectFit="contain" />
                  </Loading>
                </Flex>
              }
              {image.orientation === "vertical" && 
                <Flex radius="l" overflow="hidden" style={{ height: "100%", aspectRatio: "2/3" }}>
                  <Loading fallback={<Media src="" aspectRatio="2/3" loading />}>
                    <Media src={image.src} alt={image.alt} objectFit="cover" />
                  </Loading>
                </Flex>
              }
            </Flex>
          ,
          alt: image.alt
        }))}
      />
      <Line
        maxWidth={74}
        height={0.12}
        radius="m"
        style={{ background: "var(--neutral-on-background-weak)" }}
      />
    </Column>
  );
}
