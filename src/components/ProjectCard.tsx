"use client";

import { Media, Column, Flex, Heading, SmartLink, Line } from "@once-ui-system/core";
import { Team } from "@/utils/utils";

interface ProjectCardProps {
  href: string;
  priority?: boolean;
  title: string;
  description: string;
  image: string;
  team: Team[];
  link: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ href, title, description, image, team }) => {
  return (
    <Column fillWidth horizontal="center" gap="xs">
      <SmartLink href={href} style={{ display: 'contents' }}>
        <Media src={image} alt={title} border="transparent" radius="l" />
      </SmartLink>
      <Line
        maxWidth={74}
        height={0.2}
        radius="m"
        marginBottom="2"
        style={{ background: "var(--neutral-on-background-strong)" }}
      /> 
      <Flex fillWidth paddingX="xs">
        {title && 
          <Flex fillWidth flex={6} s={{ direction: "column", horizontal: "center", align: "center", textAlign: "center" }} m={{direction: "column", horizontal: "center", align: "left", textAlign: "left"}}>
            <Heading
              variant="heading-default-xl"
              wrap="pretty"
              style={{ letterSpacing: "0.2px", textAlign: "inherit" }}
            >
              {title}
            </Heading>
          </Flex>
        }
        {description.trim() && team && 
          <Column flex={7} s={{ hide: true }}>
            <Heading
              variant="body-default-l"
              onBackground="brand-weak"
              wrap="balance"
              align="right"
              paddingBottom="12"
              style={{ lineHeight: "1.4", letterSpacing: "0.15px" }}
            >
              {description}
            </Heading>
            <Heading variant="body-default-xs" onBackground="neutral-weak" align="right" wrap="pretty">
              {team.map((member) => member.name).join(" | ")}
            </Heading>
          </Column>
        }
      </Flex>
    </Column>
  );
};
