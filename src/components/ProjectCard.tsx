import {
  Card,
  Column,
  Flex,
  Heading,
  Hover,
  Icon,
  Media,
  Row,
  SmartLink,
  Tag,
  TiltFx
} from "@once-ui-system/core";
import { Loading, Reveal, Scroll } from "@/components";
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

/* Card Prop for Case Study */
export function ProjectCard({ href, title, description, image, team, tags }: ProjectCardProps) {
  return (
    <Reveal translateY="16" fillWidth>
      <TiltFx fillWidth intensity={0.5}>
        <Scroll href={href}>
            <SmartLink style={{ display: "contents" }}>
              <Hover
                fillWidth
                tabIndex={-1}
                hideDelay={120}
                trigger={
                  <Card
                    className={styles.hover}
                    direction="column"
                    horizontal="center"
                    fillWidth
                    radius="l"
                    border="neutral-medium"
                    paddingBottom="24"
                    gap="12"
                  >
                    <Loading
                      fallback={
                        <Media src="" radius="l" aspectRatio="16/9" loading border="neutral-weak" />
                      }
                    >
                      <Media src={image} alt={title} radius="l" priority border="neutral-weak" />
                    </Loading>
                    <Flex fillWidth paddingX="12" s={{ direction: "column", horizontal: "center" }}>
                      <Column flex={8}>
                        <Heading variant="heading-default-xl" wrap="pretty" paddingBottom="16">
                          {title}
                        </Heading>
                        {tags && tags.length > 0 && 
                          <Row gap="8" wrap s={{ hide: true }}>
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
                      <Column flex={8} align="right">
                        <Heading
                          className={styles.mobile}
                          variant="body-default-l"
                          onBackground="neutral-medium"
                          wrap="pretty"
                          paddingBottom="12"
                          style={{ lineHeight: "1.4", letterSpacing: "0.15px" }}
                        >
                          {description}
                        </Heading>
                        <Column s={{ hide: true }}>
                          <Heading variant="body-default-xs" onBackground="neutral-weak">
                            {/* Inserts 2 spaces before and after '|' */}
                            {team.map((member) => member.name).join("\u00A0 | \u00A0")}
                          </Heading>
                        </Column>
                      </Column>
                    </Flex>
                  </Card>
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
            </SmartLink>
        </Scroll>
      </TiltFx>
    </Reveal>
  );
}
