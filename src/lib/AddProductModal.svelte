<script lang="ts">
	import {
		DatePicker,
		DatePickerInput,
		Form,
		FormGroup,
		Modal,
		Select,
		SelectItem,
		TextInput
	} from 'carbon-components-svelte';

	export let open = false,
		productName = '',
		scrumMasterName = '',
		productOwnerName = '',
		startDate = '',
		developers = ['', '', '', '', ''],
		methodology = '';

	const onMethodologyChange = (e: Event) => {
		methodology = (<HTMLSelectElement>e.target).value;
	};

	// Handle form validation.
	let productNameEmpty = false,
		scrumMasterNameEmpty = false,
		productOwnerNameEmpty = false,
		startDateEmpty = false,
		developersEmpty = false,
		methodologyEmpty = false;

	const onFormSubmit = async () => {
		if (validateForm()) {
			const response = await fetch('/api/product', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					productName,
					scrumMasterName,
					productOwnerName,
					startDate,
					developers: developers.filter((developer) => developer),
					methodology
				})
			});

			if (response.ok) {
				open = false;
				location.reload();
			}
		}
	};

	const validateForm = () => {
		let formValid = true;

		if (!productName) {
			productNameEmpty = true;
			formValid = false;
		} else {
			productNameEmpty = false;
		}

		if (!scrumMasterName) {
			scrumMasterNameEmpty = true;
			formValid = false;
		} else {
			scrumMasterNameEmpty = false;
		}

		if (!productOwnerName) {
			productOwnerNameEmpty = true;
			formValid = false;
		} else {
			productOwnerNameEmpty = false;
		}

		if (!startDate) {
			startDateEmpty = true;
			formValid = false;
		} else {
			startDateEmpty = false;
		}

		if (developers.every((developer) => !developer)) {
			developersEmpty = true;
			formValid = false;
		} else {
			developersEmpty = false;
		}

		if (!methodology) {
			methodologyEmpty = true;
			formValid = false;
		} else {
			methodologyEmpty = false;
		}

		return formValid;
	};
</script>

<Modal
	bind:open
	modalHeading="Add a product"
	primaryButtonText="Save"
	secondaryButtonText="Cancel"
	on:click:button--primary={onFormSubmit}
	on:click:button--secondary={() => (open = false)}
>
	<Form>
		<FormGroup>
			<TextInput
				bind:value={productName}
				labelText="Product Name"
				placeholder="Enter the product name..."
				invalidText="A product name must be provided."
				invalid={productNameEmpty}
				required
			/>
		</FormGroup>

		<FormGroup>
			<TextInput
				bind:value={scrumMasterName}
				labelText="Scrum Master"
				placeholder="Enter the name of the scrum master..."
				invalidText="A scrum master name must be provided."
				invalid={scrumMasterNameEmpty}
				required
			/>
		</FormGroup>

		<FormGroup>
			<TextInput
				bind:value={productOwnerName}
				labelText="Product Owner"
				placeholder="Enter the name of the product owner..."
				invalidText="A product owner name must be provided."
				invalid={productOwnerNameEmpty}
				required
			/>
		</FormGroup>

		<FormGroup legendText="Developers">
			<div class="developers-wrapper">
				<TextInput
					labelText="Developer 1"
					placeholder="Enter the name of the developer..."
					bind:value={developers[0]}
					invalidText="A developer name must be provided."
					invalid={developersEmpty}
					inline
					required
				/>

				<TextInput
					labelText="Developer 2"
					placeholder="Enter the name of the developer..."
					bind:value={developers[1]}
					inline
				/>

				<TextInput
					labelText="Developer 3"
					placeholder="Enter the name of the developer..."
					bind:value={developers[2]}
					inline
				/>

				<TextInput
					labelText="Developer 4"
					placeholder="Enter the name of the developer..."
					bind:value={developers[3]}
					inline
				/>

				<TextInput
					labelText="Developer 5"
					placeholder="Enter the name of the developer..."
					bind:value={developers[4]}
					inline
				/>
			</div>
		</FormGroup>

		<FormGroup>
			<DatePicker datePickerType="single" dateFormat="Y/m/d" bind:value={startDate}>
				<DatePickerInput
					labelText="Start date"
					placeholder="yyyy/mm/dd"
					invalidText="A start date must be provided."
					invalid={startDateEmpty}
					required
				/>
			</DatePicker>
		</FormGroup>

		<Select
			labelText="Methodology"
			invalidText="A methodology must be provided."
			invalid={methodologyEmpty}
			on:change={onMethodologyChange}
		>
			<SelectItem value="" text="Choose a methodology..." />
			<SelectItem value="Agile" text="Agile" />
			<SelectItem value="Waterfall" text="Waterfall" />
		</Select>
	</Form>
</Modal>

<style>
	.developers-wrapper {
		padding-left: 2rem;
	}
</style>
