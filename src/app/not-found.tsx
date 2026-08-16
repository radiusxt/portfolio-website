import { Column, Heading } from "@once-ui-system/core";
import { Starfield } from "@/components";

export default function NotFound() {
  return (
    <Column
      fill
      center
      minHeight="100vh"
      minWidth="100vw"
      background="page"
      style={{ marginTop: "-8rem", marginBottom: "-8rem" }}
    >
      <Column
        position="absolute"
        zIndex={0}
        pointerEvents="none"
        style={{ inset: 0 }}
      >
        <Starfield multi />
      </Column>
      <Column center gap="32">
        <Heading variant="display-strong-xl">
          404
        </Heading>
        <Heading variant="display-default-m">
          Page Not Found
        </Heading>
        <Heading variant="body-default-xl" onBackground="neutral-weak">
          The page you're looking for doesn't exist.
        </Heading>
      </Column>
    </Column>
  );
}
