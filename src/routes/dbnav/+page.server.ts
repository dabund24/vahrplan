import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "../../../.svelte-kit/types/src/routes";

export const load: PageServerLoad = () => {
	redirect(308, "/de/transitous");
};
