import { sequence } from "@sveltejs/kit/hooks";
import { type Handle, json } from "@sveltejs/kit";
import { RateLimiter } from "$lib/server/RateLimiter";

const CACHE_DURATION_SECONDS = new Map<string, number>();
const YEAR_IN_SECONDS = 31536000
CACHE_DURATION_SECONDS.set("/api/diagram", 120);
CACHE_DURATION_SECONDS.set("/diagram", 120);
CACHE_DURATION_SECONDS.set("/api/journey", 30);
CACHE_DURATION_SECONDS.set("/journey", 30);
CACHE_DURATION_SECONDS.set("/api/location", YEAR_IN_SECONDS);
CACHE_DURATION_SECONDS.set("/api/locations", YEAR_IN_SECONDS);

/**
 * sets the cache-control header of the response based on the url
 */
// eslint-disable-next-line @typescript-eslint/unbound-method
const cache: Handle = async function ({ event, resolve }) {
	const response = await resolve(event);
	if (!response.ok) {
		// don't cache error responses
		return response;
	}
	const cacheDuration = CACHE_DURATION_SECONDS.get(event.url.pathname);
	response.headers.set("Cache-Control", `max-age=${cacheDuration}`);
	return response;
};

const rateLimiterIntervalSeconds = 60;
const rateLimiterAccessThreshold = 40;
const userRateLimiter = new RateLimiter(rateLimiterIntervalSeconds, rateLimiterAccessThreshold);

/**
 * limits api access for each user
 */
// eslint-disable-next-line @typescript-eslint/unbound-method
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

export const handle = sequence(cache, userRateLimiting);
