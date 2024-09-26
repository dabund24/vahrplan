<script lang="ts">
	import type { Product } from "$lib/stores/settingStore";

	type Props = {
		product: Product;
	};

	let { product }: Props = $props();
</script>

<svg width="16px" height="16px" xmlns="http://www.w3.org/2000/svg" class="product--{product}">
	<circle cx="8" cy="8" r="5.5" fill="var(--background-color)" stroke="var(--foreground-color)" />
	<circle cx="8" cy="8" r="3" fill="var(--product-color)" />
</svg>
