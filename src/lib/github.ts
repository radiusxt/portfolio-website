export interface Day {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export async function getContributions(username: string) {
  const res = await fetch(
    `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
    { next: { revalidate: 60 * 60 * 24 } } // cache 1 day
  );
  
  const data = await res.json();
  return data.contributions as Day[];
}
