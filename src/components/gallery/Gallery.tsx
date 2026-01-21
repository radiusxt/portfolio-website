"use client";

import { Flex, Carousel, Media } from "@once-ui-system/core";
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
      items={gallery.images.map((image, index) => ({
        slide: (
          <Flex fillWidth fillHeight horizontal="center" vertical="center">
            {image.orientation === "horizontal" &&
              <Flex radius="l" overflow="hidden" style={{ height: "fit-content", width: "100%" }}>
                <Media src={image.src} alt={image.alt} objectFit="contain" />
              </Flex>
            }
            {image.orientation === "vertical" && 
              <Flex radius="l" overflow="hidden" style={{ height: "100%", aspectRatio: "2 / 3" }}>
                <Media src={image.src} alt={image.alt} objectFit="cover" />
              </Flex>
            }
          </Flex>
        )
      }))}
    />
  );
}
