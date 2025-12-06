import type { Language } from "../../../params/lang";
import type { ProfileId } from "../../../params/profileId";
import type { Page } from "@sveltejs/kit";

export function basePath(page: Page): `/${Language}/${ProfileId}` {
	if (page.data.profileConfig.id === "empty") {
		return `/${page.data.lang}/dbnav`;
	}
	return `/${page.data.lang}/${page.data.profileConfig.id}`;
}
