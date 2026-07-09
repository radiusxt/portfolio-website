// components/ContributionsGraph.tsx
import { Flex, Column, Heading, Row, Text } from "@once-ui-system/core";
import { getContributions } from "@/lib";
import type { Day } from "@/lib/github";

const levelColors = [
  "#ebe4da", // 0 — no contributions
  "#f4c095", // 1
  "#e8935a", // 2
  "#c9622e", // 3
  "#7a2e0e", // 4 — most
];

const CELL_SIZE = 12;
const CELL_GAP = 4;
const COLUMN_WIDTH = CELL_SIZE + CELL_GAP;

const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function groupByWeek(days: Day[]) {
  const weeks: Day[][] = [];
  let current: Day[] = [];

  days.forEach((day, i) => {
    const weekday = new Date(day.date).getDay(); // 0 = Sun
    if (weekday === 0 && current.length) {
      weeks.push(current);
      current = [];
    }
    current.push(day);
    if (i === days.length - 1) weeks.push(current);
  });

  return weeks;
}

function getMonthLabels(weeks: Day[][]) {
  const positions: { label: string; col: number }[] = [];
  let lastMonth = -1;

  weeks.forEach((week, colIdx) => {
    for (const day of week) {
      if (day) {
        const month = new Date(day.date).getMonth();
        if (month !== lastMonth) {
          positions.push({ label: MONTH_NAMES[month], col: colIdx });
          lastMonth = month;
        }
        break;
      }
    }
  });

  return positions;
}

export async function ContributionGraph({ username }: { username: string }) {
  const contributions = await getContributions(username);
  const weeks = groupByWeek(contributions);
  const labels = getMonthLabels(weeks);

  return (
    <Column gap="8">
      {/* Month labels */}
      <Row style={{ position: "relative", height: "16px" }}>
        {labels.map(({ label, col }) => (
          <Heading
            key={`${label}-${col}`}
            variant="label-default-s"
            onBackground="neutral-weak"
            style={{
              position: "absolute",
              left: `${col * COLUMN_WIDTH + CELL_SIZE / 2}px`,
              transform: "translateX(-50%)",
            }}
          >
            {label}
          </Heading>
        ))}
      </Row>
      {/* Grid */}
      <Flex gap="4" overflowX="auto">
        {weeks.map((week, wi) => (
          <Column key={week[0]?.date ?? wi} gap="4">
            {week.map((day) => (
              <Flex
                key={day.date}
                width="12"
                height="12"
                radius="s"
                style={{
                  
                  backgroundColor: levelColors[day.level],
                }}
                title={`${day.count} contributions on ${day.date}`}
              />
            ))}
          </Column>
        ))}
      </Flex>
      {/* Legend */}
      <Row gap="8" horizontal="end" vertical="center">
        <Text variant="label-default-s" onBackground="neutral-weak">
          Less
        </Text>
        <Row gap="4">
          {levelColors.map((color) => (
            <Flex
              key={color}
              radius="s"
              style={{
                width: `${CELL_SIZE}px`,
                height: `${CELL_SIZE}px`,
                backgroundColor: color,
              }}
            />
          ))}
        </Row>
        <Text variant="label-default-s" onBackground="neutral-weak">
          More
        </Text>
      </Row>
    </Column>
  );
}
