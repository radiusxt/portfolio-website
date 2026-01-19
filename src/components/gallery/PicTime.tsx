"use client";

import { Flex } from '@once-ui-system/core';
import Script from 'next/script';

export function PicTimeIntegration() {
  return (
    <Flex style={{ width: "100%", height: "100%" }}>
      <Script
        src="https://embedding.pic-time.com/pictures/scripts/compiled/artgalleryembed.js"
        strategy="afterInteractive"
      />
      <iframe
        id="pictimeIntegration"
        src={"https://hyperdrivemedia.pic-time.com/client?headless=true"}
        style={{ width: "100%", height: "100%", border: "0" }}
      />
    </Flex>
  );
}
