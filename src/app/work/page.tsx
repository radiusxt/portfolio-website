import { Column, Heading, Meta, RevealFx, Schema } from "@once-ui-system/core";
import { Projects } from "@/components/work/Projects";
import { baseURL, about, person, work } from "@/resources";

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
  return (
    <Column direction="column" maxWidth="l">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={work.path}
        title={work.title}
        description={work.description}
        image={`/api/og/generate?title=${encodeURIComponent(work.title)}`}
        author={{ name: person.name, url: `${baseURL}${about.path}`, image: `${baseURL}${person.avatar}` }}
      />
      <RevealFx translateY="16" delay={0.1}>
        <Column fillWidth paddingTop="24" horizontal="center">
          <Heading
            id={work.title}
            variant="display-default-m"
            paddingBottom="104"
            style={{ letterSpacing: "0px", scrollMarginTop: "140px" }}
          >
            {work.title}
          </Heading>
          <Projects />
        </Column>
      </RevealFx>
    </Column>
  );
}
