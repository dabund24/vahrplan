import { writable } from "svelte/store";

export type LoadingStatus =
	| {
			status: "success" | "error";
	  }
	| {
			status: "loading";
			estimatedDuration: number;
			loadingId: number;
	  };

export const loadingStatus = writable<LoadingStatus>({ status: "success" });

export function startLoading(estimatedDuration: number): number {
	const loadingId = Math.random();
	loadingStatus.set({
		status: "loading",
		estimatedDuration,
		loadingId
	});
	return loadingId;
}

export function stopLoading(loadingId: number, isError: boolean): void {
	loadingStatus.update((loadingStatus) => {
		if (loadingStatus.status === "loading" && loadingStatus.loadingId === loadingId) {
			return { status: isError ? "error" : "success" };
		}
		return loadingStatus;
	});
}
