"use client";

import {
  Media,
  Column,
  Flex,
  Heading,
  SmartLink,
  Text,
  Line,
} from "@once-ui-system/core";

interface ProjectCardProps {
  href: string;
  priority?: boolean;
  image: string;
  title: string;
  content: string;
  description: string;
  link: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  href,
  image,
  title,
  content,
  description,
  link,
}) => {
  return (
    <Column fillWidth gap="s">
      <SmartLink href={href} style={{ display: 'contents' }}>
        <Media src={image} alt={title} border="transparent" radius="l" />
      </SmartLink>
      <Line height={0.2} radius="m" style={{background: "white"}} />
      <Flex
        fillWidth
        paddingX="xs"
        paddingBottom="32"
        s={{ direction: "column" }}
      >
        {title && 
          <Flex flex={5}>
            <Heading as="h2" wrap="stable" variant="heading-default-xl">
              {title}
            </Heading>
          </Flex>
        }
        {description.trim() && 
          <Column flex={7} gap="16">
            {description?.trim() && 
              <Heading
                variant="body-default-l"
                wrap="balance"
                onBackground="neutral-weak"
                align="right"
              >
                {description}
              </Heading>
            }
          </Column>
        }
      </Flex>
    </Column>
  );
};
