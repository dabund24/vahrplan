import { valkeyClient } from "$lib/server/setup";

export function getCacheDatabaseKey(url: URL): string {
	return `cache:${url.pathname}?${url.searchParams.toString()}`;
}

export function cacheRequest(url: URL, result: string) {
	let duration: number;
	switch (url.pathname) {
		case "/api/diagram":
			duration = 120;
			break;
		case "/api/journey":
			duration = 60;
			break;
		case "/api/location":
			duration = 600;
			break;
		case "/api/locations":
			duration = 600;
			break;
		default:
			duration = 0;
	}
	if (duration === 0) {
		return;
	}
	const key = getCacheDatabaseKey(url);
	void valkeyClient.set(key, result, { EX: duration });
}
