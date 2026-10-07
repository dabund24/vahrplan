import type { LocalizedString } from "@inlang/paraglide-js";
import type { Locale } from "$lib/paraglide/runtime";

export type ServerNews = {
	id: string;
	priority: "low" | "normal" | "high";
	title: Record<Locale, LocalizedString>;
	message?: Record<Locale, LocalizedString>;
};

export const news: ServerNews[] = [
	// {
	// 	id: "2025-05-02--0",
	// 	priority: "normal",
	// 	title: { en: "example title" as LocalizedString, de: "Beispieltitel" as LocalizedString },
	// 	message: {
	// 		en: "Lorem ipsum" as LocalizedString,
	// 		de: "dolor sit amet" as LocalizedString,
	// 	},
	// },
];
