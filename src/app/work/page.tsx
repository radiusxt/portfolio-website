import { Column, Heading, Meta, Schema, RevealFx } from "@once-ui-system/core";
import { baseURL, about, person, work } from "@/resources";
import { Projects } from "@/components/work/Projects";

export async function generateMetadata() {
  return Meta.generate({
    title: work.title,
    description: work.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(work.title)}`,
    path: work.path,
  });
}

export default function Work() {
  return (
    <Column maxWidth="l">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={work.path}
        title={work.title}
        description={work.description}
        image={`/api/og/generate?title=${encodeURIComponent(work.title)}`}
        author={{ name: person.name, url: `${baseURL}${about.path}`, image: `${baseURL}${person.avatar}` }}
      />
      <RevealFx
        translateY="16"
        fillWidth
        horizontal="center"
        paddingTop="32"
        delay={0.2}
      >
        <Column fillWidth maxWidth="xl" gap="16" horizontal="center">
          <Heading
            id={work.title}
            variant="display-default-m"
            paddingBottom="80"
            style={{ letterSpacing: "0px", scrollMarginTop: "160px" }}
          >
            {work.title}
          </Heading>
          <Projects />
        </Column>
      </RevealFx>
    </Column>
  );
}
