import type { VahrplanError } from "$lib/VahrplanError";

export type UnpackedVahrplanResult<T extends VahrplanResult<unknown>> =
	T extends VahrplanResult<infer ResT> ? ResT : never;

export type VahrplanResult<T> = { throwIfError: () => VahrplanSuccess<T> } & (
	| VahrplanSuccess<T>
	| VahrplanError
);

export class VahrplanSuccess<T> {
	isError = false as const;
	content: T;

	constructor(content: T) {
		this.content = content;
	}

	throwIfError(): VahrplanSuccess<T> {
		return this;
	}
}
