"use client";

import React from "react";
import { Column, Flex, Text } from "@once-ui-system/core";
import { Scroll } from "@/components/Scroll";
import styles from "./about.module.scss";

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

export const TableOfContents: React.FC<TableOfContentsProps> = ({ structure, about }) => {
  if (!about.tableOfContent.display) { return null; }

  return (
    <Column
      paddingLeft="20"
      gap="32"
      m={{ hide: true }}
      style={{ whiteSpace: "nowrap" }}
    >
      {structure.filter((section) => section.display).map((section, sectionIndex) => (
        <Column key={sectionIndex} gap="12">
          <Scroll target={section.title}>
            <Flex cursor="interactive" className={styles.hover} vertical="center" gap="8">
              <Flex height="2" minWidth="20" background="brand-strong"></Flex>
              <Text variant="body-default-xl">{section.title}</Text>
            </Flex>
          </Scroll>
        </Column>
      ))}
    </Column>
  );
};
