export type PasswordHash = string;
export type UserUId = string;
export type UserName = string;
export type Email = string;
export type CodeforcesHandle = string;
export type CsesUserNumber = number;
export type SolutionId = string;

export interface UserPassword {
	id: UserUId;
	passwordHash: PasswordHash;
}

export interface UserConfig {
	id: UserUId;
	name: UserName;
	email: Email;
	codeforces: CodeforcesHandle;
	cses: CsesUserNumber;
	isAdmin: boolean;
}

export interface UserSolutions {
	id: UserUId;
	solutions: SolutionId[];
}
