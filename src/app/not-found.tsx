import { Column, Heading, Text } from "@once-ui-system/core";

export default function NotFound() {
  return (
    <Column as="section" fill center paddingBottom="160">
      <Heading marginBottom="m" variant="display-strong-xl">404</Heading>
      <Heading marginBottom="l" variant="display-default-s">
        Page Not Found
      </Heading>
      <Text variant="body-default-xl" onBackground="neutral-weak">
        The page you're looking for doesn't exist.
      </Text>
    </Column>
  );
}
