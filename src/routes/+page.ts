import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	// For the purposes of this, we'll use fetch to hit the API instead of pulling the information directly from the hook.
	const res = await fetch('/api/product');
	const products = (await res.json()) as typeof import('$lib/data.json');

	return {
		products: products.map(({ productId, developers, ...rest }) => ({
			id: productId,
			developers: developers.join(', '),
			...rest
		}))
	};
};
