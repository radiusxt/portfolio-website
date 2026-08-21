import { AutoScroll, Column, Fade, OgCard, TiltFx } from "@once-ui-system/core";
import { Reveal } from "@/components";
import { gallery } from "@/resources";

export function Portfolio() {
  const sport = gallery.galleries.filter((gallery) => gallery.type === "sport");
  const travel = gallery.galleries.filter((gallery) => gallery.type === "travel");

  return (
    <Column fill center s={{ style: { minWidth: "100vw" }}}>
      {Object.entries({ sport, travel }).map(([type, galleries], index) =>
        <Reveal key={type}>
          <Fade
            position="absolute"
            zIndex={1}
            fillHeight
            top="0"
            left="0"
            to="right"
            width="80"
          />
          <AutoScroll speed="medium" hover="slow" reverse={index % 2 === 0}>
            {galleries.map(({ link }) =>
              <Column key={link} center margin="24">
                <TiltFx intensity={2} >
                  <OgCard
                    url={link}
                    description={false}
                    favicon={false}
                    align="center"
                    width="20vw"
                    s={{ style: { width: "60vw" }}}
                  />
                </TiltFx>
              </Column>
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
            s={{ style: { marginRight: "-4px" }}}
          />
        </Reveal>
      )}
    </Column>
  );
}
