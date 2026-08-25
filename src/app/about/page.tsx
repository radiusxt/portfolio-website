import { Column, Heading, Meta, Row, Schema } from "@once-ui-system/core";
import { Experience } from "@/components/about/Experience";
import { Introduction } from "@/components/about/Introduction";
import { Skills } from "@/components/about/Skills";
import { about, baseURL, person } from "@/resources";
import styles from "@/components/about/Contents.module.scss";

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
      <Column fill maxWidth="l" minHeight="100vh" horizontal="center" s={{ direction: "column" }}>
        <Introduction />
      </Column>
      <Column fill maxWidth="l" minHeight="100vh" horizontal="center" s={{ direction: "column" }}>
        <Heading
          as="h2"
          className={styles.mobile}
          variant="display-default-s"
          marginBottom="32"
        >
          {about.work.title}
        </Heading>
        <Experience />
      </Column>
      <Column fill maxWidth="l" minHeight="100vh" horizontal="center" s={{ direction: "column" }}>
        <Skills />
      </Column>
    </Column>
  );
}
