import { AutoScroll, Column, Fade, Flex, Media, Row, TiltFx } from "@once-ui-system/core";
import { gallery } from "@/resources";
import { Loading, Reveal } from "@/components";

export function Highlights() {
  const top = gallery.images.slice(0, 8);
  const middle = gallery.images.slice(8, 16);
  const bottom = gallery.images.slice(16, 24);

  return (
    <Column fill direction="column" horizontal="center" paddingBottom="80" gap="24">
      <Reveal>
        <Fade
          position="absolute"
          zIndex={1}
          fillHeight
          top="0"
          left="0"
          to="right"
          width="128"
        />
        <AutoScroll speed="slow" hover="slow">
          {top.map((image) => (
            <Flex key={image.src} center minWidth={32} paddingX="16">
              <TiltFx intensity={0.5}>
                <Loading fallback={<Media src="" aspectRatio="3/2" loading />}>
                  <Media src={image.src} priority radius="xl" border="neutral-medium" />
                </Loading>
              </TiltFx>
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
          width="128"
          s={{ style: { marginRight: "-4px" }}}
        />
      </Reveal>
      <Reveal>
        <Fade
          position="absolute"
          zIndex={1}
          fillHeight
          top="0"
          left="0"
          to="right"
          width="128"
        />
        <AutoScroll speed="slow" hover="none" reverse>
          {middle.map((image) => (
            <Flex key={image.src} fill center>
              <Reveal>
                <TiltFx intensity={0.5}>
                  <Loading fallback={<Media src="" aspectRatio="3/2" loading />}>
                    <Media src={image.src} priority radius="xl" border="neutral-medium" />
                  </Loading>
                </TiltFx>
              </Reveal>
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
          width="128"
          s={{ style: { marginRight: "-4px" }}}
        />
      </Reveal>
      <Reveal>
        <Fade
          position="absolute"
          zIndex={1}
          fillHeight
          top="0"
          left="0"
          to="right"
          width="128"
        />
        <AutoScroll speed="slow" hover="none">
          {bottom.map((image) => (
            <Flex key={image.src} center>
              <Reveal>
                <TiltFx intensity={0.5}>
                  <Loading fallback={<Media src="" aspectRatio="3/2" loading />}>
                    <Media src={image.src} priority radius="xl" border="neutral-medium" />
                  </Loading>
                </TiltFx>
              </Reveal>
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
          width="128"
          s={{ style: { marginRight: "-4px" }}}
        />
      </Reveal>
    </Column>
  );
}
