import type { EntryGenerator } from "./$types";

export const entries: EntryGenerator = () => {
	return [{ lang: "de", profile: "dbnav" }];
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const prerender = true;
