import { Column, Flex, MasonryGrid, Media, TiltFx } from "@once-ui-system/core";
import { gallery } from "@/resources";
import { Loading, Reveal } from "@/components";

export function GalleryView() {
  return (
    <Column fill direction="column" horizontal="center" paddingX="104">
      <MasonryGrid columns={3} gap="16" m={{ columns: 2 }} s={{ columns: 1 }}>
        {gallery.images.map((image) => 
          <Flex key={image.src} fill center>
            <Reveal translateY="16" fillWidth>
              <TiltFx intensity={0.5}>
                <Loading fallback={<Media src="" aspectRatio="3/2" loading />}>
                  <Media src={image.src} priority radius="l" border="neutral-medium" />
                </Loading>
              </TiltFx>
            </Reveal>
          </Flex>
        )}
      </MasonryGrid>
    </Column>
  );
}
