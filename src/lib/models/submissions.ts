import type { UserUId } from "$lib/models/user";

export enum SubmissionVerdict {
    accepted = "accepted", rejected = "rejected"
}

export interface Submission {
    problem_url: string;
    verdict: SubmissionVerdict;
    submitted_at: Date | null;
    submission_url: string | null;
    raw_code_url: string | null;
    first_seen_at: Date;
}

export interface UserSubmissions {
    id: UserUId;
    submissions: Submission[];
    last_update: Date;
}