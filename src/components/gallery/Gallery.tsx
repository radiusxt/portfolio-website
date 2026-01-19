"use client";

import { Media, MasonryGrid } from "@once-ui-system/core";
import { gallery } from "@/resources";

export function GalleryView() {
  return (
    <MasonryGrid columns={3} s={{ columns: 1 }}>
      {gallery.images.map((image, index) => (
        <Media
          key={index}
          priority={index < 30}
          sizes="(max-width: 560px) 100vw, 70vw"
          aspectRatio={image.orientation === "horizontal" ? "3 / 2" : "2 / 3"}
          border="neutral-alpha-weak"
          src={image.src}
          alt={image.alt}
          radius="s"
          enlarge
        />
      ))}
    </MasonryGrid>
  );
}
