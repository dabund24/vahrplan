import { createClient as createHafasClient, type HafasClient } from "hafas-client";
import { createClient as createRedisClient } from "redis";
import { profile as dbProfile } from "hafas-client/p/db/index.js";
import { RateLimiter } from "$lib/server/RateLimiter";
import { throwHafasQuotaError } from "$lib/server/responses";

// Hafas-client stuff

const userAgent = "github.com/dabund24/vahrplan";

const hafasClientRaw = createHafasClient(dbProfile, userAgent);

const hafasGlobalRateLimiter = new RateLimiter(60, 100);

// wrap hafas client with rate limiter
const hafasClientHandler: ProxyHandler<HafasClient> = {
	get(target: HafasClient, prop: keyof HafasClient) {
		const accessedFunction = target[prop] as (...args: unknown[]) => Promise<unknown>;

		if (accessedFunction === undefined) {
			return accessedFunction;
		}

		return async function (...args: unknown[]) {
			// call hafas-api wrapped with global rate limiter
			const result = hafasGlobalRateLimiter.accessResource("global", () =>
				accessedFunction.apply(target, args)
			);

			if (result.isError) {
				// simulate hafas error which will be handled in the app.
				return Promise.resolve(throwHafasQuotaError());
			}
			return result.content;
		};
	}
};

export const hafasClient = new Proxy(hafasClientRaw, hafasClientHandler);

// Valkey stuff

export const valkeyClient = await createRedisClient()
	.on("error", (err) => console.error(err))
	.connect();
