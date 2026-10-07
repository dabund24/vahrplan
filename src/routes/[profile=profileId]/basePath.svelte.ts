import type { ProfileId } from "../../params/profileId";
import type { Page } from "@sveltejs/kit";
import { type Locale } from "$lib/paraglide/runtime";
import { DEFAULT_PROFILE } from "$lib/constants";

export function basePath(page: Page): `/${Locale}/${ProfileId}` {
	const lang = page.data.lang;
	if (page.data.profileConfig.id === "empty") {
		return `/${lang}/${DEFAULT_PROFILE}`;
	}
	return `/${lang}/${page.data.profileConfig.id}`;
}
