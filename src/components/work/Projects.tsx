import { Column, TiltFx } from "@once-ui-system/core";
import { ProjectCard, Reveal, Scroll } from "@/components";
import { getPosts } from "@/utils/utils";

interface ProjectsProps {
  range?: [number, number?];
}

export function Projects({ range }: ProjectsProps) {
  const projects = getPosts(["src", "app", "work", "projects"]).sort((a, b) => {
    return new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime();
  });

  const displayedProjects = projects.slice((range?.[0] ?? 1) - 1, range?.[1]);

  return (
    <Column fillWidth gap="160" paddingBottom="24">
      {displayedProjects.map((project) => 
        <Reveal key={project.slug}>
          <TiltFx fillWidth intensity={0.5}>
            <Scroll href={`/work/${project.slug}`}>
              <ProjectCard
                key={project.slug}
                title={project.metadata.title}
                description={project.metadata.summary}
                image={project.metadata.image}
                team={project.metadata.team}
                link={project.metadata.link || ""}
                tags={project.metadata.tags || []}
              />
            </Scroll>
          </TiltFx>
        </Reveal>
      )}
    </Column>
  );
}
