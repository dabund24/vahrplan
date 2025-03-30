import { writable } from "svelte/store";

type Toast = {
	id: number;
	message: string;
	color: "red" | "green" | undefined;
};

export const toasts = writable<Toast[]>([]);

export function toast(message: string, color: Toast["color"]): void {
	const id = Math.random();
	const toast = { id, message, color };
	toasts.update((toasts) => {
		toasts.push(toast);
		return toasts;
	});
	// remove toast after 3s
	setTimeout(() => toasts.update((toasts) => toasts.filter((toast) => toast.id !== id)), 3000);
}
