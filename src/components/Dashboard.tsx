import { Card, Column, Heading, Line, Media, OgCard, ProgressBar, Row, Skeleton, TiltFx } from "@once-ui-system/core";
import { ContributionGraph, Loading } from "@/components";
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
  username: string;
  activity: Array<Entry | GitHubEntry>;
  gallery: string;
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
export async function Dashboard({ username, activity, gallery }: DashboardProps) {
  const items = await Promise.all(activity.map(resolveItem));

  return (
    <Column fillWidth gap="32">
      <Column gap="12">
        {/* Headings */}
        <Row center gap="16">
          <Row flex="2" paddingLeft="12">
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
            <Column flex="2">
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
        <Loading
          fallback={
            <Card
              fill
              direction="column"
              horizontal="center"
              width="xs"
              border="neutral-medium"
              radius="xl"
            >
              <Media
                src=""
                aspectRatio="16/9"
                radius="xl"
                bottomRadius="l"
                loading
              />
              <Skeleton shape="line" height="s" margin="16" />
            </Card>
          }
        >
          <TiltFx intensity={1}>
            <OgCard
              direction="row"
              url={gallery}
              favicon={false}
              description={false}
              width="xs"
              border="neutral-alpha-medium"
              s={{
                direction: "column",
                style: { width: "60vw", textAlign: "center" }
              }}
            />
          </TiltFx>
        </Loading>
    </Column>
  );
}
