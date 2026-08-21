import { Heading, IconButton, Row, SmartLink } from "@once-ui-system/core";
import { person, social } from "@/resources";
import styles from "./Footer.module.scss";

/* Page Footer for External Navigation */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Row fillWidth horizontal="center" s={{ direction: "column" }}>
      <Row
        className={styles.mobile}
        maxWidth="l"
        horizontal="between"
        vertical="center"
        paddingX="16"
        paddingBottom="4"
        gap="16"
        s={{ direction: "column", horizontal: "center" }}
      >
        <Heading
          variant="body-default-m"
          onBackground="neutral-weak"
          style={{ letterSpacing: "0.1px" }}
        >
          © {currentYear}. {person.name}. Built with {}
          <SmartLink href="https://once-ui.com/" unstyled>
            Once UI
          </SmartLink>
          {" and "}
          <SmartLink href="https://vercel.com/" unstyled>
            Vercel
          </SmartLink>
          .
        </Heading>
        <Row gap="24">
          {social.map((item) =>
            <IconButton
              key={item.name}
              href={item.link}
              icon={item.icon}
              tooltip={item.name}
              variant="ghost"
              size="m"
            />
          )}
        </Row>
      </Row>
    </Row>
  );
};
