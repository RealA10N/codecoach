export interface Problem {
	title: string;
	subtitle?: string;
	url: string;
	solved?: boolean;
}

export enum ResourceType {
	code,
	material
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
	problems: ProblemGroup;
	resources?: Resource[];
}
