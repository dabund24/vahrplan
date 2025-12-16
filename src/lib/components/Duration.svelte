<script lang="ts">
	type Props = {
		duration: number | undefined;
		isAlignedRight?: boolean;
	};

	let { duration, isAlignedRight = false }: Props = $props();

	const durationText = $derived(duration === undefined ? "" : durationToString(duration));

	function durationToString(duration: number): string {
		const durationAbs = Math.abs(duration);
		const hours = ~~(durationAbs / 60);
		const minutes = durationAbs % 60;

		let sign = duration < 0 ? "−" : "";
		if (hours === 0) {
			return `${sign}${minutes}min`;
		}
		return `${sign}${hours}h ${minutes}min`;
	}
</script>

<span class="duration-container">
	<i class:align-right={isAlignedRight} class:text--red={(duration ?? 0) < 0}>
		&lrm;{durationText}
	</i>
	<span class="width-setter">00:00</span>
</span>

<style>
	i {
		white-space: nowrap;
	}
	.align-right {
		display: flex;
		white-space: unset;
		hyphens: none;
		margin: auto 0 auto auto;
		direction: rtl;
		width: 0;
		align-items: end;
		text-align: right;
	}
	.width-setter {
		height: 0;
		visibility: hidden;
		width: auto;
		display: none;
		font-weight: bold;
		font-variant-numeric: tabular-nums;
	}
	.align-right + .width-setter {
		display: block;
	}
</style>
