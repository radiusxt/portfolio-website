"use client";

import { useState } from "react";
import { Carousel, Column, Flex, Media, ProgressBar } from "@once-ui-system/core";
import { gallery } from "@/resources";
import { Loading } from "@/components";

export function GalleryView() {
  const [imageIndex, setImageIndex] = useState(0);

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
        paddingBottom="8"
        items={gallery.images.map((image, index) => ({
          slide: 
            <Flex fillWidth fillHeight horizontal="center" vertical="center">
              {image.orientation === "horizontal" &&
                <Flex radius="l" overflow="hidden" style={{ height: "fit-content", width: "100%" }}>
                  <Loading fallback={<Media src="" aspectRatio="3/2" loading />}>
                    <Media
                      src={image.src}
                      alt={image.alt}
                      objectFit="contain"
                      onClick={() => setImageIndex(index)}
                    />
                  </Loading>
                </Flex>
              }
              {image.orientation === "vertical" && 
                <Flex radius="l" overflow="hidden" style={{ height: "100%", aspectRatio: "2/3" }}>
                  <Loading fallback={<Media src="" aspectRatio="2/3" loading />}>
                    <Media
                      src={image.src}
                      alt={image.alt}
                      objectFit="cover"
                      onClick={() => setImageIndex(index)}
                    />
                  </Loading>
                </Flex>
              }
            </Flex>
          ,
          alt: image.alt
        }))}
      />
      <ProgressBar
        value={imageIndex}
        max={gallery.images.length - 1}
        label={false}
        height={0.25}
      />
    </Column>
  );
}
