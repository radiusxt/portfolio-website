"use client";

import { Carousel, Flex, Media } from "@once-ui-system/core";
import { gallery } from "@/resources";

export function GalleryView() {
  return (
    <Carousel
      aspectRatio="3 / 2"
      indicator="thumbnail"
      thumbnail={{ height: 8 }}
      controls={false}
      radius="l"
      translateY={2}
      border="transparent"
      play={{ auto: true, interval: 5000, controls: true }}
      items={gallery.images.map((image) => ({
        slide: 
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
        ,
        alt: image.alt
      }))}
    />
  );
}
