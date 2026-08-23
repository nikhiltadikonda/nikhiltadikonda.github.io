export type SkillCategory =
  | 'All'
  | 'Languages'
  | 'Frontend'
  | 'Backend & Cloud'
  | 'AI & Data Systems'
  | 'DevOps & Tools';

export interface Skill {
  id: number;
  name: string;
  img: string;
  category: SkillCategory;
}

export interface ContactItem {
  id: number;
  name: string;
  img: string;
  url: string;
  ariaLabel: string;
}

export interface GitHubOwner {
  login: string;
  avatar_url?: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name?: string;
  description: string | null;
  html_url?: string;
  svn_url: string;
  language: string | null;
  stargazers_count?: number;
  forks_count?: number;
  topics?: string[];
  owner: GitHubOwner;
}

export interface Quote {
  text: string;
  author: string;
  category?: string;
}

