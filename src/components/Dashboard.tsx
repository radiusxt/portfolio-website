// components/Dashboard.tsx
import { Column, Heading, Line, ProgressBar, Row, Text } from "@once-ui-system/core";
import { ContributionGraph } from "@/components";
import { getLatestCommit } from "@/lib";
import type { WorkItem } from "@/lib/dashboard";

type ResolvedItem = {
  title: string;
  progress: number;
  commit?: string;
};

async function resolveItem(item: WorkItem): Promise<ResolvedItem> {
  if (item.type === "manual") {
    return { title: item.title, progress: item.progress };
  }

  const latest = await getLatestCommit(item.owner, item.repo);

  return {
    title: item.title,
    progress: item.progress,
    commit: latest?.message ?? "No commits found",
  };
}

interface DashboardProps {
  items: WorkItem[];
  username: string;
}

export async function Dashboard({ items, username }: DashboardProps) {
  const resolved = await Promise.all(items.map(resolveItem));

  return (
    <Column fillWidth gap="24">
      <Column fillWidth gap="12">
        <Row fillWidth paddingX="16" gap="16">
          <Row style={{ flex: 2 }}>
            <Heading variant="label-default-s" onBackground="neutral-weak">What I'm building</Heading>
          </Row>
          <Row style={{ flex: 2 }}>
            <Heading variant="label-default-s" onBackground="neutral-weak">Progress</Heading>
          </Row>
          <Row style={{ flex: 3 }}>
            <Heading variant="label-default-s" onBackground="neutral-weak">Latest commit</Heading>
          </Row>
        </Row>

        {resolved.map((item) => (
          <Row
            key={item.title}
            fillWidth
            vertical="center"
            gap="16"
            padding="16"
            radius="l"
            border="neutral-alpha-weak"
            background="neutral-alpha-weak"
          >
            <Column style={{ flex: 2 }}>
              <Text variant="body-default-m" onBackground="neutral-strong">{item.title}</Text>
            </Column>

            <Column style={{ flex: 2 }} gap="4">
              <ProgressBar value={item.progress} />
              <Text variant="label-default-s" onBackground="neutral-weak">{item.progress}%</Text>
            </Column>

            <Column style={{ flex: 3 }}>
              <Text
                variant="body-default-s"
                onBackground="neutral-medium"
                style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
              >
                {item.commit ?? "—"}
              </Text>
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