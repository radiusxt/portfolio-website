import {
  Column,
  Flex,
  Heading,
  Hover,
  Icon,
  Line,
  Media,
  Row,
  SmartLink,
  Tag
} from "@once-ui-system/core";
import { Loading, Reveal } from "@/components";
import type { Team } from "@/utils/utils";
import styles from "./ProjectCard.module.scss";

interface ProjectCardProps {
  href: string;
  priority?: boolean;
  title: string;
  description: string;
  image: string;
  team: Team[];
  link?: string;
  tags?: string[];
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  href, title, description, image, team, tags
}) => {
  return (
    <Reveal translateY="16" fillWidth>
      <Column
        fillWidth
        horizontal="center"
        border="neutral-medium"
        marginBottom="80"
        paddingBottom="32"
        gap="12"
        radius="l"
      >
        <SmartLink href={href} style={{ display: "contents" }}>
          <Hover
            tabIndex={-1}
            fillWidth
            hideDelay={120}
            trigger={
              <Loading fallback={<Media src="" radius="l" aspectRatio="16/9" loading />}>
                <Media src={image} alt={title} radius="l" />
              </Loading>
            }
            overlay={
              <Flex
                position="absolute"
                fill
                horizontal="center"
                vertical="center"
                radius="l"
                style={{
                  background: "var(--static-transparent)",
                  alignItems: "flex-end",
                  paddingBottom: "16px"
                }}
              >
                <Row
                  vertical="center"
                  paddingX="20"
                  paddingY="8"
                  gap="8"
                  radius="full"
                  background="neutral-medium"
                  border="transparent"
                  style={{ boxShadow: "0 0 24px var(--neutral-solid-strong)" }}
                >
                  <Heading variant="heading-default-m" onBackground="neutral-strong">
                    Explore Case Study
                  </Heading>
                  <Icon name="arrowUpRight" size="s" onBackground="neutral-strong" />
                </Row>
              </Flex>
            }
          />
          <Line
            maxWidth={74}
            height={0.13}
            radius="m"
            marginBottom="2"
            style={{ background: "var(--neutral-on-background-weak)" }}
            xs={{ style: { maxWidth: "28rem" }}}
            m={{ style: { maxWidth: "50rem" }}}
          />
          <Flex
            className={styles.mobile}
            fillWidth
            paddingX="xs"
            s={{ direction: "column", horizontal: "center", align: "center" }}
          >
            <Column flex={8}>
              <Heading
                variant="heading-default-xl"
                wrap="pretty"
                paddingBottom="16"
                style={{ letterSpacing: "0.2px" }}
              >
                {title}
              </Heading>
              {tags && tags.length > 0 && 
                <Row gap="8" wrap s={{ horizontal: "center" }}>
                  {tags.map((tag) => 
                    <Tag key={tag} border="neutral-alpha-weak">
                      <Row vertical="center" gap="8">
                        <Icon
                          name={tag.toLowerCase().replace(/\./g, "")}
                          onBackground="neutral-weak"
                          size="xs"
                          padding="1"
                        />
                        <Heading variant="label-default-s" onBackground="neutral-weak" padding="1">
                          {tag}
                        </Heading>
                      </Row>
                    </Tag>
                  )}
                </Row>
              }
            </Column>
            <Column flex={9} s={{ hide: true }}>
              <Heading
                variant="body-default-l"
                onBackground="neutral-medium"
                wrap="pretty"
                align="right"
                paddingBottom="12"
                style={{ lineHeight: "1.4", letterSpacing: "0.15px" }}
              >
                {description}
              </Heading>
              <Heading variant="body-default-xs" onBackground="neutral-weak" align="right">
                {/* Inserts 2 spaces before and after '|' */}
                {team.map((member) => member.name).join("\u00A0 | \u00A0")}
              </Heading>
            </Column>
          </Flex>
        </SmartLink>
      </Column>
    </Reveal>
  );
}
