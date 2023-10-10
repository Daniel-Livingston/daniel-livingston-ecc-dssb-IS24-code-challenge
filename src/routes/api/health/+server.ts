import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = ({ locals }) => {
	const { data: products } = locals;

	if (!products) {
		throw error(503, 'Service not available.');
	}

	return json('OK');
};
