<script lang="ts">
	export let duration: number | undefined;
	export let alignRight = false;

	$: durationText = duration === undefined ? "" : durationToString(duration);

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

<div class="duration-container">
	<i class:align-right={alignRight} class:text--red={(duration ?? 0) < 0}>
		&lrm;{durationText}
	</i>
	<div class="width-setter">00:00</div>
</div>

<style>
	.align-right {
		display: flex;
		margin: auto 0 auto auto;
		direction: rtl;
		width: 0;
		align-items: end;
	}
	.width-setter {
		height: 0;
		visibility: hidden;
		width: auto;
	}
</style>
