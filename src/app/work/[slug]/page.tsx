import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Meta, Schema, Column, Heading, Line, RevealFx, SmartLink } from "@once-ui-system/core";
import { baseURL, about, person, work } from "@/resources";
import { CustomMDX } from "@/components";
import { formatDate } from "@/utils/formatDate";
import { getPosts } from "@/utils/utils";


export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = getPosts(["src", "app", "work", "projects"]);
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string | string[] }> }
): Promise<Metadata> {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/") : routeParams.slug || "";

  const posts = getPosts(["src", "app", "work", "projects"]);
  const post = posts.find((post) => post.slug === slugPath);

  if (!post) return {};

  return Meta.generate({
    title: post.metadata.title,
    description: post.metadata.summary,
    baseURL: baseURL,
    image: post.metadata.image || `/api/og/generate?title=${post.metadata.title}`,
    path: `${work.path}/${post.slug}`,
  });
}

export default async function Project({ params }: { params: Promise<{ slug: string | string[] }> }) {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug) ? routeParams.slug.join("/") : routeParams.slug || "";
  const post = getPosts(["src", "app", "work", "projects"]).find((post) => post.slug === slugPath);

  if (!post) notFound();

  return (
    <Column maxWidth="l" horizontal="center" gap="l">
      <Schema
        as="article"
        baseURL={baseURL}
        path={`${work.path}/${post.slug}`}
        title={post.metadata.title}
        description={post.metadata.summary}
        datePublished={post.metadata.publishedAt}
        dateModified={post.metadata.publishedAt}
        image={post.metadata.image || `/api/og/generate?title=${encodeURIComponent(post.metadata.title)}`}
        author={{ name: person.name, url: `${baseURL}${about.path}`, image: `${baseURL}${person.avatar}` }}
      />
      <RevealFx translateY="16" fillWidth delay={0.2} style={{ flexDirection: "column", alignItems: "center" }}>
        <Column fillWidth maxWidth="xl" gap="16" horizontal="center" align="center">
          <Heading variant="display-default-l" paddingBottom="48" style={{ lineHeight: "1.4" }}>
            {post.metadata.title}
          </Heading>
          <Heading variant="heading-default-l" paddingBottom="24" onBackground="neutral-weak">
            {post.metadata.publishedAt && formatDate(post.metadata.publishedAt)}
          </Heading>
          <Heading variant="heading-default-xs" paddingBottom="16" onBackground="brand-medium">
            {post.metadata.team.map((member) => member.name).join(" | ")}
          </Heading>
          {post.metadata.link && 
            <SmartLink href={post.metadata.link} unstyled>GitHub Repository</SmartLink>
          }
        </Column>
      </RevealFx>
      <RevealFx translateY="16" fillWidth delay={0.6}>
        <Column as="article" maxWidth="s" gap="s" align="justify" style={{ margin: "auto" }}>
          <CustomMDX source={post.content} />
          <Line maxWidth={50} height={0.1} radius="m" marginTop="40" marginBottom="4" />
        </Column>
      </RevealFx>
    </Column>
  );
}
