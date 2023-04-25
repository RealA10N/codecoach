export interface Problem {
    title: string;
    subtitle: string | null;
    url: string;
}

export interface ProblemGroup {
    title: string;
    subtitle: string | null;
    publicProblems: Problem[];
    extraProblems: Problem[];
}