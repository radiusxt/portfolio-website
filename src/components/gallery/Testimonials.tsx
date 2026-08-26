import { AutoScroll, Card, Column, Fade, Heading } from "@once-ui-system/core";
import { Reveal } from "@/components";
import { gallery } from "@/resources";

/* Testimonials section */
export function Testimonials() {
  return (
    <Column fill center s={{ style: { minWidth: "100vw" }}}>
      <Reveal>
        <Fade
          position="absolute"
          zIndex={1}
          fillHeight
          top="0"
          left="0"
          to="right"
          width="80"
        />
        <AutoScroll speed="slow" hover="slow">
          {gallery.testimonials.map((testimonial) =>
            <Card
              key={`${testimonial.person}`}
              fill
              direction="column"
              width="25vw"
              background="neutral-medium"
              border="neutral-medium"
              radius="xl"
              paddingX="16"
              paddingY="12"
              marginX="16"
              s={{ style: { minWidth: "70vw" }}}
            >
              <Heading
                variant="body-default-m"
                onBackground="neutral-strong"
                wrap="pretty"
                paddingBottom="12"
              >
                {testimonial.testimonial}
              </Heading>
              <Heading variant="body-default-l" onBackground="accent-weak">
                {testimonial.person}
              </Heading>
              <Heading variant="body-default-s" onBackground="neutral-weak">
                {testimonial.organisation}
              </Heading>
            </Card>
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
    </Column>
  );
}
