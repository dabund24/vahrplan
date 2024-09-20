import { createClient as createHafasClient, type HafasClient } from "hafas-client";
import { createClient as createRedisClient } from "redis";
import { profile as dbProfile } from "hafas-client/p/db/index.js";
import { RateLimiter } from "$lib/server/RateLimiter";
import { throwHafasQuotaError } from "$lib/server/responses";
import { building } from "$app/environment";

// Hafas-client stuff

const userAgent = "github.com/dabund24/vahrplan";

const hafasClientRaw = createHafasClient(dbProfile, userAgent);

const hafasGlobalRateLimiter = new RateLimiter(60, 200);

// wrap hafas client with rate limiter
const hafasClientHandler: ProxyHandler<HafasClient> = {
	get(target: HafasClient, prop: keyof HafasClient): HafasClient[keyof HafasClient] {
		const result = hafasGlobalRateLimiter.accessResource("global", () => target[prop]);
		if (result.isError) {
			// Pretend as if hafas client threw an error
			return async () => Promise.resolve(throwHafasQuotaError());
		}
		return result.content;
	}
};

export const hafasClient = new Proxy(hafasClientRaw, hafasClientHandler);

// Valkey stuff

export let valkeyClient: Awaited<ReturnType<typeof createRedisClient>>;

if (!building) {
	valkeyClient = await createRedisClient({
		url: process.env.DATABASE_URL ?? "redis://localhost:6379"
	})
		.on("error", (err) => console.error(err))
		.connect();
}
