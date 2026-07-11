export type ManualEntry = {
  type: "manual";
  title: string;
  progress: number; // 0-100
};

export type GithubEntry = {
  type: "github";
  title: string;
  owner: string;
  repo: string;
  progress: number; // 0-100
};

export type WorkItem = ManualEntry | GithubEntry;
