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
    <Column maxWidth="l" direction="column" horizontal="center" gap="l">
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
      <RevealFx translateY="16" fillWidth paddingBottom="32" delay={0.1}>
        <Column fillWidth maxWidth="l" gap="16" horizontal="center" align="center">
          <Heading variant="display-default-l" paddingBottom="32" style={{ lineHeight: "1.4" }}>
            {post.metadata.title}
          </Heading>
          {post.metadata.tags && post.metadata.tags.length > 0 && 
            <Row paddingBottom="32" gap="16" horizontal="center" wrap>
              {post.metadata.tags.map((tag) => 
                <Tag key={tag} border="neutral-alpha-weak">
                  <Row vertical="center" gap="8">
                    <Icon
                      name={tag.toLowerCase().replace(/\./g, "")}
                      onBackground="neutral-weak"
                      size="s"
                      padding="2"
                    />
                    <Heading variant="label-default-l" onBackground="neutral-weak" padding="2">
                      {tag}
                    </Heading>
                  </Row>
                </Tag>
              )}
            </Row>
          }
          <Heading variant="heading-default-xl" onBackground="neutral-weak" paddingBottom="24">
            {post.metadata.publishedAt && formatDate(post.metadata.publishedAt)}
          </Heading>
          <Heading
            variant="heading-default-m"
            onBackground="brand-medium"
            paddingBottom="24"
            wrap="balance"
            style={{ lineHeight: "1.5" }}
          >
            {/* Inserts 2 spaces before and after '|' */}
            {post.metadata.team.map((member) => member.name).join("\u00A0 | \u00A0")}
          </Heading>
          {post.metadata.link && 
            <SmartLink href={post.metadata.link} unstyled>
              {work.tag}
              <Icon name="arrowUpRightFromSquare" size="s" />
            </SmartLink>
          }
          <Loading
            fallback={
              <Media
                src=""
                maxWidth="m"
                radius="l"
                border="transparent"
                marginTop="80"
                marginBottom="80"
                aspectRatio="16/9"
                loading
              />
            }
          >
            <Media
              src={post.metadata.image}
              alt={post.metadata.title}
              maxWidth="m"
              radius="l"
              border="neutral-medium"
              marginTop="80"
              marginBottom="80"
              priority
            />
          </Loading>
          <Line maxWidth={24} height={0.15} radius="m" />
        </Column>
      </RevealFx>
      <Reveal translateY="16" fillWidth>
        <Column as="article" maxWidth="s" gap="s" paddingBottom="12">
          <CustomMDX source={post.content} />
        </Column>
      </Reveal>
    </Column>
  );
}
