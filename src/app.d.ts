// See https://kit.svelte.dev/docs/types#app

import type { User } from "$lib/models/user";
import type { Container } from "@azure/cosmos";

// for information about these interfaces
declare global {
	namespace App {
		interface Locals {
			user: User | null,
			users: Container,
		}
		// interface Error {}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
