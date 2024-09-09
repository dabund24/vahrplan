import { sequence } from "@sveltejs/kit/hooks";
import { type Handle, json } from "@sveltejs/kit";
import { RateLimiter } from "$lib/server/RateLimiter";

const logger: Handle = function ({ event, resolve }) {
	console.log(event.url.href);
	return resolve(event);
};

const cache: Handle = async function ({ event, resolve }) {
	const response = await resolve(event);
	if (response.status === 429) {
		// don't cache rate limit responses
		return response;
	}
	const cacheDuration = getCacheDuration(event.url);
	response.headers.set("Cache-Control", `max-age=${cacheDuration}`);
	return response;
};

function getCacheDuration(url: URL): number {
	switch (url.pathname) {
		case "/api/diagram":
		case "/diagram":
			return 120;
		case "/api/journey":
		case "/journey":
			return 30;
		case "/api/location":
			return 31536000;
		case "/api/locations":
			return 31536000;
		default:
			return 0;
	}
}

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
	return result.content;
};

export const handle = sequence(logger, cache, userRateLimiting);
