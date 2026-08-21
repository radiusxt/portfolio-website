import { Column, Heading, Meta, RevealFx, Schema } from "@once-ui-system/core";
import { Projects } from "@/components/work/Projects";
import { baseURL, about, person, work } from "@/resources";
import { getPosts } from "@/utils/utils";

export async function generateMetadata() {
  return Meta.generate({
    title: work.title,
    description: work.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(work.title)}`,
    path: work.path,
  });
}

/* Software Page Layout */
export default function Work() {
  const projects = getPosts(["src", "app", "work", "projects"]).sort((a, b) => {
    return new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime();
  });

  return (
    <Column maxWidth="l" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={work.path}
        title={work.title}
        description={work.description}
        image={`/api/og/generate?title=${encodeURIComponent(work.title)}`}
        author={{ name: person.name, url: `${baseURL}${about.path}`, image: `${baseURL}${person.image}` }}
      />
      <Column fill minHeight="100vh" horizontal="center">
        <RevealFx translateY="16" fillWidth horizontal="center">
          <Column center align="center" gap="56">
            <Heading
              as="h1"
              id={work.title}
              variant="display-default-m"
              style={{ letterSpacing: "0px", scrollMarginTop: "140px" }}
            >
              {work.title}
            </Heading>
            <Heading as="h2" variant="heading-default-m" style={{ lineHeight: 1.5 }}>
              {work.kicker}
            </Heading>
          </Column>
        </RevealFx>
        <RevealFx translateY="16" fillWidth horizontal="center" delay={0.6}>
          <Projects projects={projects} />
        </RevealFx>
      </Column>
    </Column>
  );
}
