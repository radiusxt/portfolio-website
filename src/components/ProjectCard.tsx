"use client";

import { Media, Column, Flex, Heading, SmartLink, Line } from "@once-ui-system/core";

interface ProjectCardProps {
  href: string;
  priority?: boolean;
  image: string;
  title: string;
  content: string;
  description: string;
  link: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ href, image, title, description }) => {
  return (
    <Column fillWidth horizontal="center" gap="xs">
      <SmartLink href={href} style={{ display: 'contents' }}>
        <Media src={image} alt={title} border="transparent" radius="l" />
      </SmartLink>
      <Line maxWidth={74} height={0.2} radius="m" marginBottom="2" style={{ background: "var(--neutral-on-background-strong)" }} /> 
      <Flex fillWidth paddingX="xs" paddingBottom="0" s={{ direction: "column" }}>
        {title && 
          <Flex flex={4}>
            <Heading as="h2" wrap="stable" variant="heading-default-xl" style={{ letterSpacing: "0.2px" }}>
              {title}
            </Heading>
          </Flex>
        }
        {description.trim() && 
          <Column flex={7} gap="16">
            <Heading
              variant="body-default-l"
              onBackground="brand-weak"
              wrap="balance"
              align="right"
              style={{ lineHeight: "1.4", letterSpacing: "0.1px" }}
            >
              {description}
            </Heading>
          </Column>
        }
      </Flex>
    </Column>
  );
};
