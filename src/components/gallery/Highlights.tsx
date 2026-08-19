import {
  AutoScroll,
  Column,
  Fade,
  Flex,
  Media,
  RevealFx,
  TiltFx
} from "@once-ui-system/core";
import { Loading } from "@/components";
import { gallery } from "@/resources";

export function Highlights() {
  const top = gallery.images.slice(0, 8);
  const middle = gallery.images.slice(8, 16);
  const bottom = gallery.images.slice(16, 24);

  return (
    <Column fill center>
      {Object.entries({ top, middle, bottom }).map(([id, images], index) => 
        <RevealFx key={id} delay={0.6 + 0.4 * index}>
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
              <Flex
                key={image.src}
                center
                width="20vw"
                margin="16"
                s={{ style: { minWidth: "60vw" }}}
              >
                <Loading
                  fallback={
                    <Media src="" radius="xl" aspectRatio="3/2" loading />
                  }
                >
                  <TiltFx intensity={2}>
                    <Media src={image.src} priority radius="xl" />
                  </TiltFx>
                </Loading>
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
        </RevealFx>
      )}
    </Column>
  );
}
