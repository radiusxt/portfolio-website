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
    <Column maxWidth="l" paddingY="20">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={work.path}
        title={work.title}
        description={work.description}
        image={`/api/og/generate?title=${encodeURIComponent(work.title)}`}
        author={{ name: person.name, url: `${baseURL}${about.path}`, image: `${baseURL}${person.avatar}` }}
      />
      <RevealFx translateY="16" fillWidth horizontal="center" paddingBottom="48" delay={0.4}>
        <Heading
          id={work.title}
          variant="display-default-m"
          style={{ letterSpacing: "0px", scrollMarginTop: "130px" }}
        >
          {work.title}
        </Heading>
      </RevealFx>
      <RevealFx translateY="16" fillWidth horizontal="center" delay={0.4}>
        <Projects />
      </RevealFx>
    </Column>
  );
}
