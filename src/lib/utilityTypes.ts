export type CamelToKebab<T extends string, A extends string = ""> = T extends `${infer F}${infer R}`
	? CamelToKebab<R, `${A}${F extends Lowercase<F> ? "" : "-"}${Lowercase<F>}`>
	: A;
