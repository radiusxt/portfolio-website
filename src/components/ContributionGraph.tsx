import {
  type Colors,
  Column,
  Flex,
  Heading,
  HoverCard,
  Row
} from "@once-ui-system/core";
import { getContributions } from "@/lib";
import type { Day } from "@/lib/github";
import { format } from "date-fns";
import styles from "./ContributionGraph.module.scss";

// From low to high # of contributions
const levelColors: Colors[] = [
  "neutral-medium", "accent-alpha-medium", "accent-alpha-strong",
  "brand-alpha-strong", "brand-strong"
];

const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/* Groups days: Day[] into their respective weeks: Day[][] */
function groupByWeek(days: Day[]) {
  const weeks = days.reduce<Day[][]>((weeks, day) => {
    const isSunday = new Date(day.date).getDay() === 0;

    if (isSunday || weeks.length === 0) {
      weeks.push([day]);

    } else {
      weeks[weeks.length - 1].push(day);
    }

    return weeks;
  }, []);

  return weeks;
}

/* Outputs a list of { label, column } pairs to find month change */
function getMonthLabels(weeks: Day[][]) {
  const positions: { label: string, col: number }[] = [];
  let lastMonth = -1;

  weeks.forEach((week, col) => {
    const firstDay = week.find((day) => day);

    if (!firstDay) {
      return;
    }

    const month = new Date(firstDay.date).getMonth();

    if (month !== lastMonth) {
      positions.push({ label: MONTH_NAMES[month], col: col });
      lastMonth = month;
    }
  });

  // Handle edge case for label overlap on new months
  if (positions.length > 1 && positions[1].col - positions[0].col < 3) {
    positions.shift();
  }

  return positions;
}

/* Returns a GitHub Contribution Graph over 12 months */
export async function ContributionGraph({ username }: { username: string }) {
  const contributions = await getContributions(username);
  const weeks = groupByWeek(contributions);
  const labels = getMonthLabels(weeks);
  const labelByCol = new Map(labels.map(({ label, col }) => [col, label]));

  return (
    <Column fillWidth gap="8">
      <Flex horizontal="center" overflow="auto" paddingX="8" gap="4">
        {weeks.map((week, col) =>
          <Column key={week[0]?.date} className={styles.mobile} gap="4">
            {/* Labels */}
            <Row horizontal="center" width="12" height="16">
              {labelByCol.has(col) &&
                <Heading variant="label-default-s" onBackground="neutral-medium">
                  {labelByCol.get(col)}
                </Heading>
              }
            </Row>
            {/* Grid Cells */}
            <Column gap="4">
              {week.map((day) =>
                <HoverCard
                  key={day.date}
                  placement="top"
                  trigger={
                    <Flex
                      width="12"
                      height="12"
                      radius="xs"
                      background={levelColors[day.level]}
                    />
                  }
                >
                  <Row
                    center
                    background="neutral-strong"
                    textVariant="label-default-s"
                    onBackground="neutral-medium"
                    radius="l"
                    padding="8"
                  >
                    {day.count} contribution{day.count !== 1 ? "s" : ""} on {}
                    {format(new Date(day.date), "MMMM do")}.
                  </Row>
                </HoverCard>
              )}
            </Column>
          </Column>
        )}
      </Flex>
      {/* Legend */}
      <Row horizontal="end" vertical="center" paddingRight="4" gap="8">
        <Heading variant="label-default-s" onBackground="neutral-weak">
          Less
        </Heading>
        <Row gap="4">
          {levelColors.map((color) =>
            <Flex key={color} width="12" height="12" radius="xs" background={color} />
          )}
        </Row>
        <Heading variant="label-default-s" onBackground="neutral-weak">
          More
        </Heading>
      </Row>
    </Column>
  );
}
