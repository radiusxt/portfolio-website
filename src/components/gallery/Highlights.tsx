import { Column, Flex, MasonryGrid, Media, TiltFx } from "@once-ui-system/core";
import { gallery } from "@/resources";
import { Loading, Reveal } from "@/components";

export function Highlights() {
  return (
    <Column fill direction="column" horizontal="center" paddingX="64" paddingBottom="80">
      <MasonryGrid columns={3} gap="24" m={{ columns: 2 }} s={{ columns: 1 }}>
        {gallery.images.map((image) => 
          <Flex key={image.src} fill center>
            <Reveal>
              <TiltFx intensity={0.5}>
                <Loading fallback={<Media src="" aspectRatio="3/2" loading />}>
                  <Media src={image.src} priority radius="xl-8" border="neutral-medium" />
                </Loading>
              </TiltFx>
            </Reveal>
          </Flex>
        )}
      </MasonryGrid>
    </Column>
  );
}
