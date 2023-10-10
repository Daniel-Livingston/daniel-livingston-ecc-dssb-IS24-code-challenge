<script lang="ts">
	import 'carbon-components-svelte/css/white.css';
	import type { PageData } from './$types';
	import {
		Button,
		DataTable,
		OverflowMenu,
		OverflowMenuItem,
		Pagination,
		Select,
		SelectItem,
		Toolbar,
		ToolbarContent,
		ToolbarMenu,
		ToolbarMenuItem,
		ToolbarSearch
	} from 'carbon-components-svelte';
	import AddProductModal from '$lib/AddProductModal.svelte';
	import DeleteProductModal from '$lib/DeleteProductModal.svelte';
	import EditProductModal from '$lib/EditProductModal.svelte';

	export let data: PageData;

	// Data variables.
	const headers = [
		{ key: 'id', value: 'ID' },
		{ key: 'productName', value: 'Name' },
		{ key: 'scrumMasterName', value: 'Scrum Master' },
		{ key: 'productOwnerName', value: 'Product Owner' },
		{ key: 'developers', value: 'Developers' },
		{ key: 'startDate', value: 'Start Date' },
		{ key: 'methodology', value: 'Methodology' },
		{ key: 'location', value: 'Location' },
		{ key: 'overflow', empty: true }
	];

	$: rows = data.products;

	// Data display variables.
	let pageSize = 25;
	let page = 1;
	let filteredRowIds: number[] = [];

	let addProductModalOpen = false;
	let deleteProductModalOpen = false;
	let editProductModalOpen = false;
	let editingMode = false;

	let selectedRowIds: number[] = [];

	// Search filters.
	let searchFilter = '';

	const onChangeSearchFilter = (e: Event) => {
		searchFilter = (<HTMLSelectElement>e.target).value;
	};

	const customShouldFilterRows = (row: any, value: string | number) => {
		if (searchFilter === 'scrum-masters') {
			return row.scrumMasterName.toLowerCase().includes(value.toString().toLowerCase());
		} else {
			return row.developers
				.split(', ')
				.some((developer: string) =>
					developer.toLowerCase().includes(value.toString().toLowerCase())
				);
		}
	};

	let currentlySelectedRow: any;
</script>

<DataTable
	title="Products"
	description="The products that the ECC currently develops or maintains."
	radio={editingMode}
	selectable={editingMode}
	bind:selectedRowIds
	{headers}
	{rows}
	{pageSize}
	{page}
>
	<svelte:fragment slot="cell" let:cell let:row>
		{#if cell.key === 'overflow'}
			<OverflowMenu flipped>
				<OverflowMenuItem
					text="Edit"
					on:click={() => {
						currentlySelectedRow = row;
						editProductModalOpen = true;
					}}
				/>
				<OverflowMenuItem
					text="Delete"
					danger
					on:click={() => {
						currentlySelectedRow = row;
						deleteProductModalOpen = true;
					}}
				/>
			</OverflowMenu>
		{:else}
			{cell.value}
		{/if}
	</svelte:fragment>
	<Toolbar>
		<ToolbarContent>
			<Select id="select-search-filter" size="xl" inline on:change={onChangeSearchFilter}>
				<SelectItem value="" text="All" />
				<SelectItem value="scrum-masters" text="Scrum masters" />
				<SelectItem value="developers" text="Developers" />
			</Select>
			<ToolbarSearch
				persistent
				shouldFilterRows={searchFilter ? customShouldFilterRows : true}
				bind:filteredRowIds
			/>

			<ToolbarMenu>
				<ToolbarMenuItem>Scrum Master</ToolbarMenuItem>
			</ToolbarMenu>
			<Button on:click={() => (addProductModalOpen = true)}>Add a Product</Button>
		</ToolbarContent>
	</Toolbar>
</DataTable>

<Pagination bind:pageSize bind:page totalItems={filteredRowIds.length} pageSizeInputDisabled />

{#if addProductModalOpen}
	<AddProductModal bind:open={addProductModalOpen} />
{/if}

{#if editProductModalOpen}
	{@const developers = currentlySelectedRow?.developers.split(', ')}

	<EditProductModal
		bind:open={editProductModalOpen}
		productData={{
			...currentlySelectedRow,
			developers
		}}
	/>
{/if}

{#if deleteProductModalOpen}
	{@const productId = currentlySelectedRow?.id || 0}
	{@const productName = currentlySelectedRow?.productName || ''}

	<DeleteProductModal bind:open={deleteProductModalOpen} {productId} {productName} />
{/if}
