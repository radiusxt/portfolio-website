import { notFound } from "next/navigation";
import {
  Column,
  Heading,
  Icon,
  Line,
  Media,
  Meta,
  RevealFx,
  Row,
  Schema,
  SmartLink,
  Tag
} from "@once-ui-system/core";
import { baseURL, about, person, work } from "@/resources";
import { CustomMDX, Loading, Reveal } from "@/components";
import { formatDate } from "@/utils/formatDate";
import { getPosts } from "@/utils/utils";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = getPosts(["src", "app", "work", "projects"]);
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string | string[] }> }) {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug) ? routeParams.slug.join("/") : routeParams.slug || "";

  const posts = getPosts(["src", "app", "work", "projects"]);
  const post = posts.find((post) => post.slug === slugPath);

  if (!post) {
    return {};
  }

  return Meta.generate({
    title: post.metadata.title,
    description: post.metadata.summary,
    baseURL: baseURL,
    image: post.metadata.image || `/api/og/generate?title=${post.metadata.title}`,
    path: `${work.path}/${post.slug}`,
  });
}

/* Case Study Page Layout */
export default async function Project({ params }: { params: Promise<{ slug: string | string[] }> }) {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug) ? routeParams.slug.join("/") : routeParams.slug || "";
  const post = getPosts(["src", "app", "work", "projects"]).find((post) => post.slug === slugPath);

  if (!post) {
    notFound();
  }

  return (
    <Column maxWidth="l" direction="column" horizontal="center">
      <Schema
        as="article"
        baseURL={baseURL}
        path={`${work.path}/${post.slug}`}
        title={post.metadata.title}
        description={post.metadata.summary}
        datePublished={post.metadata.publishedAt}
        dateModified={post.metadata.publishedAt}
        image={post.metadata.image || `/api/og/generate?title=${encodeURIComponent(post.metadata.title)}`}
        author={{ name: person.name, url: `${baseURL}${about.path}`, image: `${baseURL}${person.image}` }}
      />
      <RevealFx translateY="16" fillWidth delay={0.1}>
        <Column fill maxWidth="l" horizontal="center" align="center" gap="56" paddingBottom="64">
          <Heading variant="display-default-l">
            {post.metadata.title}
          </Heading>
          <Row gap={post.metadata.publishedAt && post.metadata.link ? "64" : "0"}>
            <Heading variant="heading-default-m" onBackground="neutral-weak">
              {post.metadata.publishedAt && formatDate(post.metadata.publishedAt)}
            </Heading>
            <Heading variant="heading-default-m" onBackground="neutral-weak">
              {post.metadata.link &&
                <SmartLink href={post.metadata.link} unstyled>
                  {work.link}
                  <Icon name="arrowUpRight" size="s" />
                </SmartLink>
              }
            </Heading>
          </Row>
          <Heading
            variant="heading-default-m"
            onBackground="neutral-weak"
            wrap="balance"
            style={{ lineHeight: 1.5 }}
          >
            {/* Inserts 2 spaces before and after '|' */}
            {post.metadata.team.map((member) => member.name).join("\u00A0 | \u00A0")}
          </Heading>
          {post.metadata.tags && post.metadata.tags.length > 0 && 
            <Row horizontal="center" gap="16" wrap>
              {post.metadata.tags.map((tag) => 
                <Tag key={tag} border="neutral-alpha-weak">
                  <Row vertical="center" gap="8">
                    <Icon
                      name={tag.toLowerCase().replace(/\./g, "")}
                      onBackground="neutral-weak"
                      size="s"
                      padding="2"
                    />
                    <Heading variant="label-default-m" onBackground="neutral-weak" padding="2">
                      {tag}
                    </Heading>
                  </Row>
                </Tag>
              )}
            </Row>
          }
          <Loading
            fallback={
              <Media
                src=""
                maxWidth="m"
                radius="xl-8"
                border="transparent"
                aspectRatio="16/9"
                marginBottom="24"
                loading
              />
            }
          >
            <Media
              src={post.metadata.image}
              alt={post.metadata.title}
              maxWidth="m"
              radius="xl-8"
              border="neutral-medium"
              priority
              marginBottom="24"
            />
          </Loading>
          <Line maxWidth="40%" height="2" radius="m" />
        </Column>
      </RevealFx>
      <Reveal>
        <Column as="article" maxWidth="s" gap="xs" paddingBottom="48">
          <CustomMDX source={post.content} />
        </Column>
      </Reveal>
    </Column>
  );
}
