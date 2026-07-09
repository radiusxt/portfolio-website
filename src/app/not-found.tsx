import { Column, Heading, Particle } from "@once-ui-system/core";

export default function NotFound() {
  return (
    <Column
      fill
      center
      minHeight="100vh"
      minWidth="100vw"
      background="neutral-weak"
      style={{ marginTop: "-8rem", marginBottom: "-8rem" }}
    >
      <Particle
        position="absolute"
        fill
        interactive
        mode="repel"
        density={150}
        speed={1}
        size="2"
        color="brand-on-background-weak"
      />
      <Column center>
        <Heading marginBottom="24" variant="display-strong-xl">
          404
        </Heading>
        <Heading marginBottom="40" variant="display-default-m">
          Page Not Found
        </Heading>
        <Heading variant="body-default-xl" onBackground="neutral-weak">
          The page you're looking for doesn't exist.
        </Heading>
      </Column>
    </Column>
  );
}
