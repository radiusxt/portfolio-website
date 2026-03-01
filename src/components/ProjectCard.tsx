import {
  Column,
  Flex,
  Heading,
  Icon,
  Line,
  Media,
  Row,
  SmartLink,
  Tag } from "@once-ui-system/core";
import { Loading } from "@/components";
import { Team } from "@/utils/utils";
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
    <Column
      fillWidth
      gap="xs"
      horizontal="center"
      marginBottom="80"
      paddingBottom="32"
      border="neutral-medium"
      radius="l"
    >
      <SmartLink href={href} style={{ display: "contents" }}>
        <Loading fallback={<Media src="" radius="l" aspectRatio="16/9" loading />}>
          <Media src={image} alt={title} radius="l" />
        </Loading>
        <Line
          maxWidth={74}
          height={0.15}
          radius="m"
          marginBottom="2"
          style={{ background: "var(--neutral-on-background-medium)" }}
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
              onBackground="brand-weak"
              wrap="pretty"
              align="right"
              paddingBottom="12"
              style={{ lineHeight: "1.4", letterSpacing: "0.15px" }}
            >
              {description}
            </Heading>
            <Heading variant="body-default-xs" onBackground="neutral-weak" align="right">
              {team.map((member) => member.name).join(" | ")}
            </Heading>
          </Column>
        </Flex>
      </SmartLink>
    </Column>
  );
}
