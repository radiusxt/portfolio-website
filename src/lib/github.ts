export interface Day {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface LatestCommit {
  message: string;
  url: string;
};

export async function getContributions(username: string) {
  const response = await fetch(
    `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
    { next: { revalidate: 60 * 60 * 24 } }
  );
  
  const data = await response.json();
  return data.contributions as Day[];
}

export async function getLatestCommit(owner: string, repo: string): Promise<LatestCommit | null> {
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/commits?per_page=1`,
    { headers: {
        Accept: "application/vnd.github+json",
        ...(process.env.GITHUB_API_KEY && { 
          Authorization: `Bearer ${process.env.GITHUB_API_KEY}`
        })
      }, next: { revalidate: 3600 }
    }
  );

  if (!response.ok) {
    return null;
  }

  const [latest] = await response.json();

  if (!latest) {
    return null;
  }

  const [firstLine] = latest.commit.message.split("\n");
  return { message: firstLine, url: latest.html_url };
}
