import type { ProfileId } from "../../params/profileId";
import type { Page } from "@sveltejs/kit";
import type { Locale } from "$lib/paraglide/runtime";

export function basePath(page: Page): `/${Locale}/${ProfileId}` {
	if (page.data.profileConfig.id === "empty") {
		return `/en/transitous`;
	}
	return `/${page.data.lang}/${page.data.profileConfig.id}`;
}
