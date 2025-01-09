import type { VahrplanError } from "$lib/VahrplanError";

export type VahrplanResult<T> = VahrplanSuccess<T> | VahrplanError;

export class VahrplanSuccess<T> {
	isError = false as const;
	content: T;

	constructor(content: T) {
		this.content = content;
	}
}
