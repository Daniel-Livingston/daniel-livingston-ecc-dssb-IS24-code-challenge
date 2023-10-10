<script lang="ts">
	import { Modal } from 'carbon-components-svelte';

	export let open = false,
		productName: string,
		productId: number;

	const onDelete = async () => {
		const response = await fetch(`/api/product/${productId}`, {
			method: 'DELETE'
		});

		if (response.ok) {
			open = false;
			location.reload();
		}
	};
</script>

<Modal
	modalHeading={`Delete "${productName}"`}
	primaryButtonText="Delete"
	secondaryButtonText="Cancel"
	on:click:button--primary={onDelete}
	on:click:button--secondary={() => (open = false)}
	bind:open
	danger
>
	<p>This is permanent and cannot be undone. Are you sure you want to delete?</p>
</Modal>
