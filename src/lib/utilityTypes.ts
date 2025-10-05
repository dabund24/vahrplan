export type CamelToKebab<T extends string, A extends string = ""> = T extends `${infer F}${infer R}`
	? CamelToKebab<R, `${A}${F extends Lowercase<F> ? "" : "-"}${Lowercase<F>}`>
	: A;

type Includes<T extends readonly unknown[], U> = T extends [infer Head, ...infer Tail]
	? [U] extends [Head]
		? true
		: Includes<Tail, U>
	: false;

type IsTupleUnique<T extends readonly unknown[]> = T extends [infer Head, ...infer Tail]
	? Includes<Tail, Head> extends true
		? false
		: IsTupleUnique<Tail>
	: true;

export type AssertUniqueTuple<T extends readonly unknown[]> =
	IsTupleUnique<T> extends true ? T : never;
