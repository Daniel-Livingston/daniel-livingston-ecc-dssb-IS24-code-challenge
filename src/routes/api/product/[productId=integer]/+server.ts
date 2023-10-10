import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params, locals }) => {
	const productId = Number.parseInt(params.productId, 10);

	if (Number.isNaN(productId) || productId < 1) {
		throw error(400, 'Invalid product ID. Must be a positive integer.');
	}

	const { data: products } = locals;

	const product = products.find((product) => product.productId === productId);

	if (!product) {
		throw error(404, `Product with ID ${productId} not found.`);
	}

	return json(product);
};

export const PUT: RequestHandler = async ({ locals, params, request }) => {
	const productId = Number.parseInt(params.productId, 10);

	if (Number.isNaN(productId) || productId < 1) {
		throw error(400, 'Invalid product ID. Must be a positive integer.');
	}

	const { data: products } = locals;

	const product = products.find((product) => product.productId === productId);

	if (!product) {
		throw error(404, `Product with ID ${productId} not found.`);
	}

	const data = await request.json();
	const productName = data.productName as string;
	const scrumMasterName = data.scrumMasterName as string;
	const productOwnerName = data.productOwnerName as string;
	const developers = data.developers as string[];
	const startDate = data.startDate as string;
	const methodology = data.methodology as string;
	const changes: string[] = [];

	if (productName && product.productName !== productName) {
		product.productName = productName;
		changes.push('productName');
	}

	if (scrumMasterName && product.scrumMasterName !== scrumMasterName) {
		product.scrumMasterName = scrumMasterName;
		changes.push('scrumMasterName');
	}

	if (productOwnerName && product.productOwnerName !== productOwnerName) {
		product.productOwnerName = productOwnerName;
		changes.push('productOwnerName');
	}

	if (developers && product.developers !== developers) {
		developers.forEach((developer, index) => {
			developers[index] = developer.replaceAll(',', '');
		});
		product.developers = developers;
		changes.push('developers');
	}

	if (startDate && product.startDate !== startDate) {
		product.startDate = startDate;
		changes.push('startDate');
	}

	if (methodology && product.methodology !== methodology) {
		product.methodology = methodology;
		changes.push('methodology');
	}

	if (changes.length === 0) {
		return new Response(JSON.stringify({ error: 'No changes made.' }), {
			status: 200,
			headers: { 'content-type': 'application/json' }
		});
	}

	return json(product);
};

export const DELETE: RequestHandler = async ({ locals, params }) => {
	const productId = Number.parseInt(params.productId, 10);

	if (Number.isNaN(productId) || productId < 1) {
		throw error(400, 'Invalid product ID. Must be a positive integer.');
	}

	const { data: products } = locals;

	const product = products.find((product) => product.productId === productId);

	if (!product) {
		throw error(404, `Product with ID ${productId} not found.`);
	}

	const index = products.indexOf(product);
	const deletedProduct = products.splice(index, 1)[0];

	return json(deletedProduct);
};
