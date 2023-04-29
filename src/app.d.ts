// See https://kit.svelte.dev/docs/types#app

import type { UserConfig } from "$lib/models/user";
import type { DatabaseContainers } from "./lib/services/db.server";

// for information about these interfaces
declare global {
	namespace App {
		interface Locals {
			loggedInUser: UserConfig | null,
			db: DatabaseContainers,
		}
		// interface Error {}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
