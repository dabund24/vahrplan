import { sequence } from "@sveltejs/kit/hooks";

const logger: import("@sveltejs/kit").Handle = function ({ event, resolve }) {
	console.log(event.url.href);
	return resolve(event);
};

export const handle = sequence(logger);
