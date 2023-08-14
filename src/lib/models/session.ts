import type { SubmissionVerdict } from "$lib/models/submission";

export interface Problem {
  title: string;
  subtitle?: string;
  notTrackable?: boolean;
  url: string;
  verdict?: SubmissionVerdict;
}

export enum ResourceType {
  snippet = 'snippet',
  slides = 'slides',
  link = 'link',
  material = 'material'
}

export interface Resource {
  title: string;
  subtitle?: string;
  type: ResourceType;
  url: string;
}

export interface ProblemGroup {
  public?: Problem[];
  extra?: Problem[];
  availableAt?: string;
}

export interface Session {
  title: string;
  subtitle?: string;
  body?: string;
  hidden?: boolean;
  problems?: ProblemGroup;
  resources?: Resource[];
}
