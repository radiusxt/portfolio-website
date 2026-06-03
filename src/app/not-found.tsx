import { Column, Heading } from "@once-ui-system/core";

export default function NotFound() {
  return (
    <Column
      fill
      center
      background="neutral-weak"
      style={{ 
        marginTop: "-8rem",
        marginBottom: "-8rem",
        minHeight: "100vh",
        minWidth: "100vw"
      }}
    >
      <Heading marginBottom="m" variant="display-strong-xl">
        404
      </Heading>
      <Heading marginBottom="l" variant="display-default-m">
        Page Not Found
      </Heading>
      <Heading variant="body-default-xl" onBackground="neutral-weak">
        The page you're looking for doesn't exist.
      </Heading>
    </Column>
  );
}
