import { Column, Fade, Row } from "@once-ui-system/core";
import { ProjectCard } from "@/components/ProjectCard";
import { getPosts } from "@/utils/utils";

interface ProjectsProps {
  range?: [number, number?];
}

export function Projects({ range }: ProjectsProps) {
  const projects = getPosts(["src", "app", "work", "projects"]).sort((a, b) => {
    return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
  });

  const displayedProjects = projects.slice((range?.[0] ?? 1) - 1, range?.[1]);

  return (
    <Row fillWidth position="relative"  style={{ isolation: "isolate" }}>
      <Column
        overflow="auto"
        height={64}
        gap="104"
        scrollbar="minimal"
        radius="m"
        paddingX="16"
        paddingY="8"
        style={{ scrollbarWidth: "none" }}
      >
        {displayedProjects.map((project) => 
          <ProjectCard
            key={project.slug}
            href={`/work/${project.slug}`}
            title={project.metadata.title}
            description={project.metadata.summary}
            image={project.metadata.image}
            team={project.metadata.team}
            link={project.metadata.link || ""}
            tags={project.metadata.tags || []}
          />
        )}
      </Column>
      <Fade
        position="absolute"
        zIndex={2}
        bottom="0"
        to="top"
        height="160"
        bottomRadius="l"
        base="brand-alpha-strong"
        blur={2}
        opacity={100}
        style={{ width: "auto", left: "-1rem", right: "-1rem" }}
      />
    </Row>
  );
}
