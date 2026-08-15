import { AutoScroll, Column, Fade, Flex, Media, TiltFx } from "@once-ui-system/core";
import { gallery } from "@/resources";
import { Loading, Reveal } from "@/components";

export function Highlights() {
  const top = gallery.images.slice(0, 8);
  const middle = gallery.images.slice(8, 16);
  const bottom = gallery.images.slice(16, 24);

  return (
    <Column direction="column" horizontal="center" fill paddingBottom="128">
      {Object.entries({ top, middle, bottom }).map(([id, images], index) => 
        <Reveal key={id}>
          <Fade
            position="absolute"
            zIndex={1}
            fillHeight
            top="0"
            left="0"
            to="right"
            width="80"
          />
          <AutoScroll speed="slow" hover="slow" reverse={index % 2 === 0}>
            {images.map((image) =>
              <Flex key={image.src} center minWidth={28} padding="16">
                <TiltFx>
                  <Loading fallback={<Media src="" aspectRatio="3/2" loading />}>
                    <Media src={image.src} priority radius="xl" />
                  </Loading>
                </TiltFx>
              </Flex>
            )}
          </AutoScroll>
          <Fade
            position="absolute"
            zIndex={1}
            fillHeight
            top="0"
            right="0"
            to="left"
            width="80"
            s={{ style: { marginRight: "-4px" } }}
          />
        </Reveal>
      )}
    </Column>
  );
}
