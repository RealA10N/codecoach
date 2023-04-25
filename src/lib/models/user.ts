export type PasswordHash = string;
export type UserId = string;
export type UserName = string;
export type Email = string;
export type CodeforcesHandle = string;
export type CsesUserNumber = number;
export type SolutionId = string;

export interface UserPassword {
    id: UserId;
    passwordHash: PasswordHash;
}

export interface UserConfig {
    id: UserId;
    name: UserName;
    email: Email;
    codeforces: CodeforcesHandle;
    cses: CsesUserNumber;
}

export interface UserSolutions {
    id: UserId;
    solutions: SolutionId[];
}
