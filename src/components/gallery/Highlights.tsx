import { AutoScroll, Column, Fade, Flex, Media } from "@once-ui-system/core";
import { gallery } from "@/resources";
import { Loading, Reveal } from "@/components";

export function Highlights() {
  const top = gallery.images.slice(0, 8);
  const middle = gallery.images.slice(8, 16);
  const bottom = gallery.images.slice(16, 24);

  return (
    <Column fill direction="column" horizontal="center" paddingBottom="128" gap="24">
      {[
        { id: "top", images: top, reverse: false },
        { id: "middle", images: middle, reverse: true },
        { id: "bottom", images: bottom, reverse: false },
      ].map(({ id, images, reverse }) => 
        <Reveal key={id}>
          <Fade
            position="absolute"
            zIndex={1}
            fillHeight
            top="0"
            left="0"
            to="right"
            width="160"
          />
          <AutoScroll speed="slow" hover="slow" reverse={reverse}>
            {images.map((image) => (
              <Flex key={image.src} center minWidth={28} paddingX="16">
                <Loading fallback={<Media src="" aspectRatio="3/2" loading />}>
                  <Media src={image.src} priority radius="xl" border="neutral-medium" />
                </Loading>
              </Flex>
            ))}
          </AutoScroll>
          <Fade
            position="absolute"
            zIndex={1}
            fillHeight
            top="0"
            right="0"
            to="left"
            width="160"
            s={{ style: { marginRight: "-4px" } }}
          />
        </Reveal>
      )}
    </Column>
  );
}
