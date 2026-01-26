import { Column } from "@once-ui-system/core";
import { ProjectCard } from "@/components";
import { getPosts } from "@/utils/utils";

interface ProjectsProps {
  range?: [number, number?];
  exclude?: string[];
}

export function Projects({ range, exclude }: ProjectsProps) {
  let allProjects = getPosts(["src", "app", "work", "projects"]);

  if (exclude && exclude.length > 0) {
    allProjects = allProjects.filter((post) => !exclude.includes(post.slug));
  }

  const sortedProjects = allProjects.sort((a, b) => {
    return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
  });

  const displayedProjects = range ?
    sortedProjects.slice(range[0] - 1, range[1] ?? sortedProjects.length) : sortedProjects;

  return (
    <Column fillWidth gap="xl">
      {displayedProjects.map((post, index) => 
        <ProjectCard
          priority={index < 8}
          key={post.slug}
          href={`/work/${post.slug}`}
          title={post.metadata.title}
          description={post.metadata.summary}
          image={post.metadata.image}
          team={post.metadata.team}
          link={post.metadata.link || ""}
        />
      )}
    </Column>
  );
}
