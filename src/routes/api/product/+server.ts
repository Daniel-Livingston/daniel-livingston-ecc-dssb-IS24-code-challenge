import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = ({ locals }) => {
	const { data: products } = locals;

	return json(products);
};

export const POST: RequestHandler = async ({ request, locals }) => {
	// Requires certain fields.
	const data = await request.json();
	const productName = data.productName as string;
	const scrumMasterName = data.scrumMasterName as string;
	const productOwnerName = data.productOwnerName as string;
	const developers = data.developers as string[];
	const startDate = data.startDate as string;
	const methodology = data.methodology as string;

	if (
		!productName ||
		!scrumMasterName ||
		!productOwnerName ||
		!developers ||
		!startDate ||
		!methodology
	) {
		return json({ error: 'Missing required fields.' }, { status: 400 });
	}

	if (methodology !== 'Waterfall' && methodology !== 'Agile') {
		return json({ error: 'Invalid methodology.' }, { status: 400 });
	}

	const { data: products } = locals;

	// Generate the next product ID. We can do it this way because I'm guaranteeing that the
	// product IDs are sequential and start at 1 if none exist.
	const productId = products.length > 0 ? products.at(-1)!.productId + 1 : 1;

	// Remove commas from developers.
	developers.forEach((developer, i) => {
		developers[i] = developer.replace(',', '');
	});

	const newProduct = {
		productId,
		productName,
		productOwnerName,
		developers,
		scrumMasterName,
		startDate,
		methodology,
		location: ''
	};

	products.push(newProduct);

	return json(newProduct, {
		status: 201
	});
};
