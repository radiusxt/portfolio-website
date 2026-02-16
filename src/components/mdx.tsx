import React, { ReactNode } from "react";
import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import { slugify as transliterate } from "transliteration";
import {
  Accordion,
  AccordionGroup,
  Button,
  Card,
  CodeBlock,
  Column,
  Feedback,
  Grid,
  Heading,
  Icon,
  InlineCode,
  Line,
  List,
  ListItem,
  Media,
  MediaProps,
  Row,
  SmartLink,
  Table,
  Text,
  TextProps
} from "@once-ui-system/core";

type CustomLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
};

function CustomLink({ href, children, ...props }: CustomLinkProps) {
  if (href.startsWith("/")) {
    return (
      <SmartLink href={href} {...props}>
        {children}
      </SmartLink>
    );
  }

  if (href.startsWith("#")) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}

function createImage({ alt, src, ...props }: MediaProps & { src: string }) {
  if (!src) {
    console.error("Media requires a valid 'src' property.");
    return null;
  }

  return (
    <Media
      marginTop="8"
      marginBottom="16"
      enlarge
      radius="m"
      border="neutral-alpha-medium"
      sizes="(max-width: 960px) 100vw, 960px"
      alt={alt}
      src={src}
      {...props}
    />
  );
}

function slugify(str: string): string {
  // Replace & with 'and'
  const strWithAnd = str.replace(/&/g, " and ");
  return transliterate(strWithAnd, { lowercase: true, separator: "-" }).replace(/\-\-+/g, "-");
}

function createHeading(as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6") {
  const CustomHeading = ({ children }: Omit<React.ComponentProps<typeof Heading>, "as" | "id">) => {
    const slug = slugify(children as string);
    
    return (
      <Heading
        as={as}
        id={slug}
        variant="display-default-s"
        align="center"
        marginTop="16"
        marginBottom="20"
      >
        {children}
      </Heading>
    );
  };

  CustomHeading.displayName = `${as}`;
  return CustomHeading;
}

function createParagraph({ children }: TextProps) {
  return (
    <Heading
      variant="body-default-l"
      wrap="wrap"
      marginTop="8"
      marginBottom="12"
      style={{ lineHeight: "2" }}
    >
      {children}
    </Heading>
  );
}

function createInlineCode({ children }: { children: ReactNode }) {
  return <InlineCode>{children}</InlineCode>;
}

function createCodeBlock(props: any) {
  // For pre tags that contain code blocks
  if (props.children && props.children.props && props.children.props.className) {
    const { className, children } = props.children.props;
    // Extract language from className (format: language-xxx)
    const language = className.replace("language-", "");
    const label = language.charAt(0).toUpperCase() + language.slice(1);

    return (
      <CodeBlock
        marginTop="8"
        marginBottom="16"
        codes={[{
          code: children,
          language,
          label,
        }]}
        copyButton={true}
      />
    );
  }

  // Fallback for other pre tags or empty code blocks
  return <pre {...props} />;
}

function createList({ children }: { children: ReactNode }) {
  return <List>{children}</List>;
}

function createListItem({ children }: { children: ReactNode }) {
  return (
    <Heading
      variant="body-default-l"
      marginTop="4"
      marginBottom="4"
      style={{ lineHeight: "2" }}
      wrap="wrap"
    >
      <ListItem>
        {children}
      </ListItem>
    </Heading>
  );
}

function createHR() {
  return (
    <Row fillWidth horizontal="center">
      <Line maxWidth="40" />
    </Row>
  );
}

const components = {
  p: createParagraph as any,
  h1: createHeading("h1") as any,
  h2: createHeading("h2") as any,
  h3: createHeading("h3") as any,
  h4: createHeading("h4") as any,
  h5: createHeading("h5") as any,
  h6: createHeading("h6") as any,
  img: createImage as any,
  a: CustomLink as any,
  code: createInlineCode as any,
  pre: createCodeBlock as any,
  ol: createList as any,
  ul: createList as any,
  li: createListItem as any,
  hr: createHR as any,
  Heading,
  Text,
  CodeBlock,
  InlineCode,
  Accordion,
  AccordionGroup,
  Table,
  Feedback,
  Button,
  Card,
  Grid,
  Row,
  Column,
  Icon,
  Media,
  SmartLink,
};

type CustomMDXProps = MDXRemoteProps & { components?: typeof components; };

export function CustomMDX(props: CustomMDXProps) {
  return <MDXRemote {...props} components={{ ...components, ...(props.components || {}) }} />;
}
