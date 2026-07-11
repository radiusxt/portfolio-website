import { Column, Heading, Line, ProgressBar, Row } from "@once-ui-system/core";
import { ContributionGraph } from "@/components";
import { getLatestCommit } from "@/lib";
import type { WorkItem } from "@/lib/dashboard";

interface Item {
  title: string;
  progress: number;
  commit?: string;
};

interface DashboardProps {
  items: WorkItem[];
  username: string;
}

async function resolveItem(item: WorkItem): Promise<Item> {
  if (item.type === "manual") {
    return { title: item.title, progress: item.progress };
  }

  const latest = await getLatestCommit(item.owner, item.repo);

  return {
    title: item.title,
    progress: item.progress,
    commit: latest?.message ?? "",
  };
}

export async function Dashboard({ items, username }: DashboardProps) {
  const resolved = await Promise.all(items.map(resolveItem));

  return (
    <Column fillWidth gap="32">
      <Column gap="12">
        {/* Headings */}
        <Row center paddingX="12" gap="16">
          <Row flex="3">
            <Heading variant="label-default-m" onBackground="neutral-weak">Name</Heading>
          </Row>
          <Row center flex="1">
            <Heading variant="label-default-m" onBackground="neutral-weak">Progress</Heading>
          </Row>
          <Row flex="4">
            <Heading variant="label-default-m" onBackground="neutral-weak">Latest Commit</Heading>
          </Row>
        </Row>
        {/* Items */}
        {resolved.map((item) => (
          <Row
            key={item.title}
            center
            background="neutral-medium"
            radius="l"
            border="neutral-alpha-medium"
            padding="12"
            gap="16"
          >
            <Column flex="3">
              <Heading variant="body-default-m" onBackground="neutral-strong">
                {item.title}
              </Heading>
            </Column>
            <Column flex="1" textVariant="body-default-m">
              <ProgressBar value={item.progress} labelPosition="right" barBackground="info-strong" />
            </Column>
            <Column overflow="hidden" flex="4">
              <Heading
                variant="body-default-s"
                onBackground="neutral-medium"
                style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
              >
                {item.commit ?? ""}
              </Heading>
            </Column>
          </Row>
        ))}
      </Column>
      <Line background="neutral-alpha-medium" />
      <Column fillWidth gap="16">
        <ContributionGraph username={username} />
      </Column>
    </Column>
  );
}