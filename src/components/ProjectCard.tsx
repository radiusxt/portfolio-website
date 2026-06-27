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
  Tag,
  TiltFx
} from "@once-ui-system/core";
import { Loading, Scroll } from "@/components";
import type { Team } from "@/utils/utils";
import styles from "./ProjectCard.module.scss";

interface ProjectCardProps {
  href: string;
  title: string;
  description: string;
  image: string;
  team: Team[];
  link?: string;
  tags?: string[];
}

export function ProjectCard({ href, title, description, image, team, tags }: ProjectCardProps) {
  return (
      <TiltFx fillWidth intensity={0.35}>
        <Scroll href={href}>
          <Column
            className={styles.hover}
            fillWidth
            horizontal="center"
            border="neutral-medium"
            radius="l"
            paddingBottom="24"
            gap="12"
          >
            <SmartLink style={{ display: "contents" }}>
              <Hover
                fillWidth
                tabIndex={-1}
                hideDelay={120}
                trigger={
                  <Loading fallback={<Media src="" radius="l" aspectRatio="16/9" loading />}>
                    <Media src={image} alt={title} radius="l" priority />
                  </Loading>
                }
                overlay={
                  <Flex
                    fill
                    position="absolute"
                    horizontal="center"
                    vertical="start"
                    background="overlay"
                    radius="l"
                    paddingTop="48"
                  >
                    <Row vertical="center" gap="4">
                      <Heading variant="heading-default-xl">
                        Explore Case Study
                      </Heading>
                      <Icon name="chevronRight" size="m" />
                    </Row>
                  </Flex>
                }
              />
              <Line
                maxWidth={74}
                height={0.13}
                radius="l"
                marginBottom="2"
                style={{ background: "var(--neutral-on-background-weak)" }}
                xs={{ style: { maxWidth: "28rem" }}}
                m={{ style: { maxWidth: "50rem" }}}
              />
              <Flex
                className={styles.mobile}
                fillWidth
                paddingX="xs"
                s={{ direction: "column", horizontal: "center" }}
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
                            <Heading
                              variant="label-default-s"
                              onBackground="neutral-weak"
                              padding="1"
                            >
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
        </Scroll>
      </TiltFx>
  );
}
