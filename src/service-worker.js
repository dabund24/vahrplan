/// <reference types="@sveltejs/kit" />
import { build, files, version } from "$service-worker";

// Create a unique cache name for this deployment
const CACHE = `cache-${version}`;

const ASSETS = [
	...build, // the app itself
	...files // everything in `static`
];

self.addEventListener("install", (event) => {
	// Create a new cache and add all files to it
	async function addFilesToCache() {
		const cache = await caches.open(CACHE);
		await cache.addAll(ASSETS);
	}

	event.waitUntil(addFilesToCache());
});

self.addEventListener("activate", (event) => {
	// Remove previous cached data from disk
	async function deleteOldCaches() {
		for (const key of await caches.keys()) {
			if (key !== CACHE) await caches.delete(key);
		}
	}

	event.waitUntil(deleteOldCaches());
});

self.addEventListener("fetch", (event) => {
	// ignore api calls and POST requests etc
	if (!urlIsCachedByServiceWorker(event.request.url)) return;

	async function respond() {
		const url = new URL(event.request.url);
		const cache = await caches.open(CACHE);

		// `build`/`files` can always be served from the cache
		if (ASSETS.includes(url.pathname)) {
			const response = await cache.match(url.pathname);

			if (response) {
				return response;
			}
		}

		// for everything else, try the network first, but
		// fall back to the cache if we're offline
		try {
			const response = await fetch(event.request);

			// if we're offline, fetch can return a value that is not a Response
			// instead of throwing - and we can't pass this non-Response to respondWith
			if (!(response instanceof Response)) {
				throw new Error("invalid response from fetch");
			}

			if (response.status === 200) {
				void cache.put(event.request, response.clone());
			}

			return response;
		} catch (err) {
			const response = await cache.match(event.request);

			if (response) {
				return response;
			}

			// if there's no cache, then just error out
			// as there is nothing we can do to respond to this request
			throw err;
		}
	}

	event.respondWith(respond());
});

/**
 * Decides whether the content of a url should be cached by the service worker or the browser.
 * Here, the service worker stores just stuff related to the app shell.
 * Caching of dynamic content is handled separately in `hooks.server.ts`
 * @param {string} url
 * @returns {boolean} `true` if caching is preferred to be handled by the service worker, `false` if the node server decides on caching
 */
function urlIsCachedByServiceWorker(url) {
	if (url.includes("/api/")) {
		// api requests are always handled by the server
		return false;
	}

	if (url.includes("/diagram?")) {
		// loading diagrams with data includes api requests, so they are handled by the server
		return false;
	}
	if (url.includes("/journey?")) {
		// loading a specific journey includes an api request, so it's handled by the server
		return false;
	}

	// all static pages remain
	return true;
}
