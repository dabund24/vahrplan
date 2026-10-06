import { extractLocaleFromUrl, getTextDirection } from "$lib/paraglide/runtime";
import { paraglideMiddleware } from "$lib/paraglide/server";
import { sequence } from "@sveltejs/kit/hooks";
import { type Handle, json } from "@sveltejs/kit";
import { RateLimiter } from "$lib/server/RateLimiter";
import { building } from "$app/environment";
import { DEFAULT_LOCALE } from "$lib/constants";

const userRateLimiter = new RateLimiter({ interval: 60, threshold: 40 });

/**
 * limits api access for each user
 */
const userRateLimiting: Handle = function ({ event, resolve }) {
	if (!event.url.pathname.includes("/api/") || building) {
		return resolve(event);
	}
	const lang = extractLocaleFromUrl(event.url) ?? DEFAULT_LOCALE;
	const result = userRateLimiter.accessResource(
		event.getClientAddress(),
		() => resolve(event),
		lang,
	);
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

export const handle = sequence(userRateLimiting, handleParaglide);
