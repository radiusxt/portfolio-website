"use client";

import { Carousel, Media, Flex } from "@once-ui-system/core";
import { gallery } from "@/resources";

export function GalleryView() {
  return (
    <Carousel
      aspectRatio="3 / 2"
      indicator="thumbnail"
      controls={false}
      radius="xl"
      border="transparent"
      play={{ auto: true, interval: 5000, controls: true }}
      items={gallery.images.map((image) => ({
        slide: (
          <Flex fillWidth fillHeight horizontal="center" vertical="center">
            {image.orientation === "horizontal" &&
              <Flex radius="xl" overflow="hidden" style={{ width: '100%', height: 'fit-content' }}>
                <Media src={image.src} alt={image.alt} objectFit="contain" />
              </Flex>
            }
            {image.orientation === "vertical" &&
              <Flex radius="xl" overflow="hidden" style={{ width: 'fit-content', height: '100%' }}>
                <Media src={image.src} alt={image.alt} objectFit="contain" />
              </Flex>
            }
          </Flex>
        )
      }))}
    />
  );
}
