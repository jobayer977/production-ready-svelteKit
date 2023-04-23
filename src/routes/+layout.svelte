<script lang="ts">
	import { QueryClientProvider } from '@sveltestack/svelte-query';
	import '../app.css';
	import { onMount } from 'svelte';
	import { svelteQueryClient } from '../config/svelte-query-client';
	import { slide } from 'svelte/transition';
	import { Alert } from 'flowbite-svelte';
	import { alertStore } from '../stores/alert.store';
	let alerts: any[] = [];
	onMount(async () => {
		alertStore.subscribe((value) => {
			alerts = value;
		});
	});
</script>

<QueryClientProvider client={svelteQueryClient}>
	<slot />
</QueryClientProvider>
<div class="fixed top-1 right-5 z-50">
	{#if alerts.length > 0}
		{#each alerts as alert}
			<div
				transition:slide={{
					duration: 200,
					delay: 0,
					easing: (t) => t * (2 - t),
				}}
			>
				<Alert class="mt-2 min-w-[350px]" color={alert.color || undefined}>
					<span slot="icon">
						<svg
							aria-hidden="true"
							class="w-5 h-5"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
							><path
								fill-rule="evenodd"
								d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
								clip-rule="evenodd"
							/></svg
						>
					</span>
					<span class="font-medium">{alert?.title}</span>
					{alert?.message}
				</Alert>
			</div>
		{/each}
	{/if}
</div>
