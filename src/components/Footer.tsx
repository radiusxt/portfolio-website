import { Row, IconButton, SmartLink, Text } from "@once-ui-system/core";
import { person, social } from "@/resources";
import styles from "./Footer.module.scss";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Row as="footer" fillWidth padding="8" horizontal="center" s={{ direction: "column" }}>
      <Row
        className={styles.mobile}
        maxWidth="l"
        paddingY="8"
        paddingX="16"
        gap="16"
        horizontal="between"
        vertical="center"
        s={{ direction: "column", horizontal: "center", align: "center" }}
      >
        <Text variant="body-default-s" onBackground="neutral-weak" style={{ letterSpacing: "0.2px"}}>
          © {currentYear}. {person.name}. Built with
          <SmartLink href="https://once-ui.com/products/magic-portfolio">Once UI</SmartLink>
          . Powered by
          <SmartLink href="https://vercel.com/">Vercel</SmartLink>
          .
        </Text>
        <Row gap="16">
          {social.map((item) =>
            item.link && (
              <IconButton
                key={item.name}
                href={item.link}
                icon={item.icon}
                tooltip={item.name}
                size="m"
                variant="ghost"
              />
            ),
          )}
        </Row>
      </Row>
      <Row height="80" hide s={{ hide: true }} />
    </Row>
  );
};
