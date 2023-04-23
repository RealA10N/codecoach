export interface InternalUser {
    id: string;
    name :string;
    email: string;
    codeforces: string;
    cses: number;
    passwordHash: string;
}

export interface User {
    name: string;
    email: string;
    codeforces: string;
    cses: number;
}