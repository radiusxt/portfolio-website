import { Media, Column, Flex, Heading, SmartLink, Line } from "@once-ui-system/core";
import { Team } from "@/utils/utils";
import { Loading } from "@/components/Loading";
import styles from "./ProjectCard.module.scss";

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
    <Column fillWidth gap="xs" horizontal="center">
      <SmartLink href={href} style={{ display: "contents" }}>
        <Loading fallback={<Media src="" border="transparent" radius="l" aspectRatio="16/9" loading />}>
          <Media src={image} alt={title} border="transparent" radius="l" />
        </Loading>
      </SmartLink>
      <Line
        maxWidth={74}
        height={0.15}
        radius="m"
        marginBottom="2"
        style={{ background: "var(--neutral-on-background-weak)" }}
      />
      <Flex
        className={styles.mobile}
        fillWidth
        paddingX="xs"
        s={{ direction: "column", horizontal: "center", align: "center" }}
      >
        {title && 
          <Flex flex={8}>
            <Heading variant="heading-default-xl" wrap="pretty" style={{ letterSpacing: "0.2px" }}>
              {title}
            </Heading>
          </Flex>
        }
        {description.trim() && team && 
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
            <Heading
              variant="body-default-xs"
              onBackground="neutral-weak"
              align="right"
            >
              {team.map((member) => member.name).join(" | ")}
            </Heading>
          </Column>
        }
      </Flex>
    </Column>
  );
};
