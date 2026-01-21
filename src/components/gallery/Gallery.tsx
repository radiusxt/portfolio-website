"use client";

import { Carousel, Media, Flex } from "@once-ui-system/core";
import { gallery } from "@/resources";

export function GalleryView() {
  return (
    <Carousel
      aspectRatio="3 / 2"
      indicator="thumbnail"
      controls={false}
      radius="l"
      border="transparent"
      play={{ auto: true, interval: 5000, controls: true }}
      items={gallery.images.map((image) => ({
        slide: (
          <Flex fillWidth fillHeight horizontal="center" vertical="center">
            {image.orientation === "horizontal" &&
              <Flex radius="l" overflow="hidden" style={{ width: "100%", height: "fit-content" }}>
                <Media src={image.src} alt={image.alt} objectFit="contain" radius="l" />
              </Flex>
            }
            {image.orientation === "vertical" &&
              <Flex radius="l" overflow="hidden" style={{ width: "auto", height: "100%" }}>
                <Media src={image.src} alt={image.alt} objectFit="contain" radius="l" />
              </Flex>
            }
          </Flex>
        )
      }))}
    />
  );
}
