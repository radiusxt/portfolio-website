export type Entry = {
  type: "manual";
  title: string;
  progress: number;
};

export type GithubEntry = {
  type: "github";
  title: string;
  owner: string;
  repo: string;
  progress: number;
};

export type WorkItem = Entry | GithubEntry;
