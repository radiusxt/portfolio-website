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

interface Item {
  title: string;
  progress: number;
  message: string;
};

interface DashboardProps {
  activity: Entry[] | GitHubEntry[];
  username: string;
}

async function resolveItem(item: Entry | GitHubEntry): Promise<Item> {
  if (!item.type) {
    return { title: item.title, message: item.message, progress: item.progress };
  }

  const message = await getLastCommit(item.name);

  return {
    title: item.title,
    progress: item.progress,
    message: message ?? ""
  };
}

export async function Dashboard({ activity, username }: DashboardProps) {
  const items = await Promise.all(activity.map(resolveItem));

  return (
    <Column fillWidth gap="32">
      <Column gap="12">
        {/* Headings */}
        <Row center paddingX="12" gap="16">
          <Row flex="3">
            <Heading variant="label-default-m" onBackground="neutral-weak">
              Name
            </Heading>
          </Row>
          <Row flex="4" s={{ hide: true }}>
            <Heading variant="label-default-m" onBackground="neutral-weak">
              Message
            </Heading>
          </Row>
          <Row center flex="1">
            <Heading variant="label-default-m" onBackground="neutral-weak">
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
            gap="12"
          >
            <Column flex="3">
              <Heading variant="body-default-m" onBackground="neutral-strong">
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
            <Column flex="1" textVariant="body-default-m">
              <ProgressBar
                value={item.progress}
                labelPosition="right"
                barBackground="accent-strong"
              />
            </Column>
          </Row>
        )}
      </Column>
      <Line background="brand-strong" radius="l" />
      <Column fillWidth gap="12">
        <ContributionGraph username={username} />
      </Column>
    </Column>
  );
}