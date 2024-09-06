import { sequence } from "@sveltejs/kit/hooks";
import { type Handle, json } from "@sveltejs/kit";
import { RateLimiter } from "$lib/server/RateLimiter";
import { valkeyClient } from "$lib/server/setup";
import { cacheRequest, getCacheDatabaseKey } from "$lib/server/cache";
import type { ZugResponse } from "$lib/types";

const logger: Handle = function ({ event, resolve }) {
	console.log(event.url.href);
	return resolve(event);
};

const cache: Handle = async function ({ event, resolve }) {
	if (!event.url.pathname.startsWith("/api/")) {
		return resolve(event);
	}

	// check if resource is in cache
	const cachedResult = await valkeyClient.get(getCacheDatabaseKey(event.url));
	if (cachedResult !== null) {
		const resultJson = JSON.parse(cachedResult) as ZugResponse<unknown>;
		return new Response(cachedResult, {
			status: resultJson.isError ? resultJson.code : 200,
			headers: { "Content-Type": "application/json" }
		});
	}
	const result = await resolve(event);
	const resultText = await result.text();
	cacheRequest(event.url, resultText);
	return new Response(resultText, { status: result.status, headers: result.headers });
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

export const handle = sequence(logger, cache, userRateLimiting);
