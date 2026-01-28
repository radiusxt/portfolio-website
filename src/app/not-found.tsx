import { Column, Heading } from "@once-ui-system/core";

export default function NotFound() {
  return (
    <Column as="section" fill center paddingBottom="160">
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
