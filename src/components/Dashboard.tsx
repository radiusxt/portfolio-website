import { Column, Heading, Line, ProgressBar, Row } from "@once-ui-system/core";
import { ContributionGraph } from "@/components";
import { getLastCommit } from "@/lib";

export type Entry = {
  type: ""
  title: string;
  message: string;
  progress: number;
};

export type GitHubEntry = {
  type: "gh";
  title: string;
  name: string;
  progress: number;
};

interface DashboardProps {
  activity: Array<Entry | GitHubEntry>;
  username: string;
}

/* Resolves entries into well-formed objects */
async function resolveItem(item: Entry | GitHubEntry): Promise<Omit<Entry, "type">> {
  if (!item.type) {
    return { title: item.title, message: item.message, progress: item.progress };
  }

  const message = await getLastCommit(item.name);
  return { title: item.title, message: message ?? "", progress: item.progress };
}

/* A dashboard component displaying what I'm working on */
export async function Dashboard({ activity, username }: DashboardProps) {
  const items = await Promise.all(activity.map(resolveItem));

  return (
    <Column fillWidth gap="32">
      <Column gap="12">
        {/* Headings */}
        <Row center gap="16">
          <Row flex="3" paddingLeft="12">
            <Heading variant="label-default-s" onBackground="neutral-weak">
              Title
            </Heading>
          </Row>
          <Row flex="4" paddingRight="12" s={{ hide: true }}>
            <Heading variant="label-default-s" onBackground="neutral-weak">
              Message
            </Heading>
          </Row>
          <Row center flex="1" paddingRight="12">
            <Heading variant="label-default-s" onBackground="neutral-weak">
              Progress
            </Heading>
          </Row>
        </Row>
        {/* Items */}
        {items.map((item) =>
          <Row
            key={item.title}
            center
            background="neutral-medium"
            radius="l"
            border="neutral-alpha-medium"
            padding="12"
          >
            <Column flex="3">
              <Heading
                variant="body-default-s"
                onBackground="neutral-strong"
                style={{ textOverflow: "ellipsis" }}
              >
                {item.title}
              </Heading>
            </Column>
            <Column overflow="hidden" flex="4" s={{ hide: true }}>
              <Heading
                variant="body-default-s"
                onBackground="neutral-medium"
                wrap="nowrap"
                style={{ textOverflow: "ellipsis" }}
              >
                {item.message ?? ""}
              </Heading>
            </Column>
            <Column flex="1" textVariant="body-default-s">
              <ProgressBar
                value={item.progress}
                labelPosition="right"
                barBackground="accent-strong"
                aria-label={`${item.title}`}
                aria-valuenow={item.progress}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </Column>
          </Row>
        )}
      </Column>
      <Line background="brand-strong" height="1" radius="l" />
      <Column fillWidth gap="12">
        <ContributionGraph username={username} />
      </Column>
    </Column>
  );
}
