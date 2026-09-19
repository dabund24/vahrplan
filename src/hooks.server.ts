import { getTextDirection } from "$lib/paraglide/runtime";
import { paraglideMiddleware } from "$lib/paraglide/server";
import { sequence } from "@sveltejs/kit/hooks";
import { type Handle, json } from "@sveltejs/kit";
import { RateLimiter } from "$lib/server/RateLimiter";
import { building } from "$app/environment";

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

const handleParaglide: Handle = ({ event, resolve }) =>
	paraglideMiddleware(event.request, ({ request, locale }) => {
		event.request = request;

		return resolve(event, {
			transformPageChunk: ({ html }) =>
				html
					.replace("%paraglide.lang%", locale)
					.replace("%paraglide.dir%", getTextDirection(locale)),
		});
	});

const hi: Handle = ({ event, resolve }) => {
	if (building) {
		console.log("[Prerender]:", event.url.pathname);
	}
	return resolve(event);
}

export const handle = sequence(userRateLimiting, handleParaglide, hi);
