import { sequence } from "@sveltejs/kit/hooks";
import { type Handle, json } from "@sveltejs/kit";
import { RateLimiter } from "$lib/server/RateLimiter";

const logger: Handle = function ({ event, resolve }) {
	console.log(event.url.href);
	return resolve(event);
};

const userRateLimiter = new RateLimiter(60, 200);

/**
 * limits api access for each user
 */
const userRateLimiting: Handle = function ({ event, resolve }) {
	if (!event.url.pathname.startsWith("/api/")) {
		return resolve(event);
	}
	const result = userRateLimiter.accessResource(event.getClientAddress(), () => resolve(event));
	if (result.isError) {
		return json(result, { status: result.code });
	}
	return resolve(event);
};

export const handle = sequence(logger, userRateLimiting);
