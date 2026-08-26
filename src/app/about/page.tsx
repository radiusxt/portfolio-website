import { Column, Heading, Meta, Schema } from "@once-ui-system/core";
import { Experience } from "@/components/about/Experience";
import { Introduction } from "@/components/about/Introduction";
import { Skills } from "@/components/about/Skills";
import { about, baseURL, person } from "@/resources";

export async function generateMetadata() {
  return Meta.generate({
    title: about.title,
    description: about.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(about.title)}`,
    path: about.path,
  });
}

/* About Page Layout */
export default function About() {
  return (
    <Column horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={about.title}
        description={about.description}
        path={about.path}
        image={`/api/og/generate?title=${encodeURIComponent(about.title)}`}
        author={{ name: person.name, url: `${baseURL}${about.path}`, image: `${baseURL}${person.image}`}}
      />
      <Column fill maxWidth="l" minHeight="100vh" bottom="104" horizontal="center">
        <Introduction />
      </Column>
      <Column fill maxWidth="l" minHeight="100vh" horizontal="center">
        <Column center align="center" top="48">
          <Heading as="h1" variant="display-default-m">
            {about.work.title}
          </Heading>
        </Column>
        <Experience />
      </Column>
      <Column fill maxWidth="l" minHeight="100vh" horizontal="center">
        <Column center align="center" top="12">
          <Heading as="h1" variant="display-default-m">
            {about.technical.title}
          </Heading>
        </Column>
        <Skills />
      </Column>
    </Column>
  );
}
