import { Column } from "@once-ui-system/core";
import { ProjectCard } from "@/components";
import { getPosts } from "@/utils/utils";
import { Carousel } from "./Carousel";

interface ProjectsProps {
  range?: [number, number?];
}

export function Projects({ range }: ProjectsProps) {
  const projects = getPosts(["src", "app", "work", "projects"]).sort((a, b) => {
    return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
  });

  const displayedProjects = projects.slice((range?.[0] ?? 1) - 1, range?.[1]);

  return (
    <Column fillWidth>
      <Carousel>
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
      </Carousel>
    </Column>
  );
}
