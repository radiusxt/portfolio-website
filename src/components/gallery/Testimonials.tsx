import { AutoScroll, Column, Fade, Heading } from "@once-ui-system/core";
import { Reveal } from "@/components";
import { gallery } from "@/resources";

/* Testimonials section */
export function Testimonials() {
  return (
    <Column fill center>
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
            <Column
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
              gap="12"
              s={{ style: { minWidth: "70vw" }}}
            >
              <Heading
                variant="body-default-m"
                onBackground="neutral-strong"
                wrap="pretty"
              >
                {testimonial.testimonial}
              </Heading>
              <Column center>
                <Heading variant="body-default-l" onBackground="accent-weak">
                  {testimonial.person}
                </Heading>
                <Heading variant="body-default-s" onBackground="neutral-weak">
                  {testimonial.organisation}
                </Heading>
              </Column>
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
    </Column>
  );
}
