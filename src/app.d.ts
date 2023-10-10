// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			data: typeof import('$lib/data.json');
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
