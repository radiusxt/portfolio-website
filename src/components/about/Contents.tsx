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
    <Column paddingLeft="20" gap="32" m={{ hide: true }}>
      {structure.filter((section) => section.display).map((section) => 
        <Column key={section.title} gap="12">
          <Scroll target={section.title}>
            <Flex cursor="interactive" className={styles.hover} vertical="center" gap="12">
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
