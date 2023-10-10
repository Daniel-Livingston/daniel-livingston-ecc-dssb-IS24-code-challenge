<script>
	import SwaggerUI from 'swagger-ui';
	import 'swagger-ui/dist/swagger-ui.css';
	import { onMount } from 'svelte';

	onMount(() => {
		SwaggerUI({ dom_id: '#swagger', url: '/api/swagger.yaml' });
	});
</script>

<div id="swagger" />
