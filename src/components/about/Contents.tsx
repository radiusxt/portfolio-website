"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Column, Flex, Heading, RevealFx } from "@once-ui-system/core";
import { Scroll, useNavigation } from "@/components";
import styles from "./Contents.module.scss";

interface ContentsProps {
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

export function TableOfContents({ structure, about }: ContentsProps) {
  const [mounted, setMounted] = useState(false);
  const { exiting } = useNavigation();
  useEffect(() => setMounted(true), []);

  if (!about.tableOfContent.display) {
    return null;
  }

  return (
    <>
      {mounted && createPortal(
        <Column
          position="fixed"
          zIndex={2}
          top="42%"
          left="8"
          paddingLeft="48"
          s={{ hide: true }}
          l={{ hide: true }}
          style={{ opacity: exiting ? 0 : 1, transition: "opacity 200ms ease" }}
        >
          <RevealFx delay={0.6}>
            <Column gap="40">
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
          </RevealFx>
        </Column>, document.body
      )}
    </>
  );
};
