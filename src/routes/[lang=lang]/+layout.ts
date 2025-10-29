import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = ({ params: { lang } }) => ({ lang, profile: "dbnav" });
