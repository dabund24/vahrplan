<script lang="ts">
	import type { Product } from "$lib/types";
	import { settings } from "$lib/state/settingStore";

	type Props = {
		productId: Product;
		productName: string;
	};

	const { productId, productName }: Props = $props();

	function toggleProduct(id: Product): void {
		$settings.products[id] = !$settings.products[id];
	}
</script>

<button
	type="button"
	class="product--{productId}"
	aria-pressed={$settings.products[productId]}
	onclick={() => void toggleProduct(productId)}
>
	{productName}
</button>

<style>
	button {
		font-weight: bold;
		border: var(--border);
		border-radius: 50vh;
		padding: 0.5rem 1rem;
		color: var(--product-color);
		transition: none;
	}

	button[aria-pressed="true"] {
		background: var(--product-color);
		color: var(--background-color);
	}
</style>
