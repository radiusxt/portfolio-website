"use client";

import { Column, Flex, Heading } from "@once-ui-system/core";
import { Scroll } from "@/components";
import styles from "./Contents.module.scss";

interface TableOfContentsProps {
  structure: {
    title: string;
    display: boolean;
    items: string[];
  }[];
  about: {
    tableOfContent: {
      display: boolean;
      subItems: boolean;
    };
  };
}

export function TableOfContents({ structure, about }: TableOfContentsProps) {
  if (!about.tableOfContent.display) {
    return null;
  }

  return (
    <Column gap="32">
      {structure.filter((section) => section.display).map((section) => 
        <Column key={section.title} gap="12">
          <Scroll target={section.title}>
            <Flex className={styles.hover} vertical="center" cursor="interactive" gap="12">
              <Flex background="brand-strong" minWidth="20" height="2" />
              <Heading variant="body-default-xl">
                {section.title}
              </Heading>
            </Flex>
          </Scroll>
        </Column>
      )}
    </Column>
  );
};
