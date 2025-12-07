import { sequence } from "@sveltejs/kit/hooks";
import { type Handle, json } from "@sveltejs/kit";
import { RateLimiter } from "$lib/server/RateLimiter";

const userRateLimiter = new RateLimiter({ interval: 60, threshold: 40 });

/**
 * limits api access for each user
 */
const userRateLimiting: Handle = function ({ event, resolve }) {
	if (!event.url.pathname.startsWith("/api/")) {
		// TODO fix!
		return resolve(event);
	}
	const result = userRateLimiter.accessResource(event.getClientAddress(), () => resolve(event));
	if (result.isError) {
		return json(result, { status: result.code });
	}
	return result.content;
};

export const handle = sequence(userRateLimiting);
