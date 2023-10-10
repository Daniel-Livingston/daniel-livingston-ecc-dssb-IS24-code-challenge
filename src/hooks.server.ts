import type { Handle } from '@sveltejs/kit';
import data from '$lib/data.json';

export const handle: Handle = async ({ event, resolve }) => {
	if (!event.locals.data) {
		event.locals.data = data;
	}

	return await resolve(event);
};
