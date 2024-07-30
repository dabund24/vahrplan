import { createClient as createHafasClient } from "hafas-client";
import { createClient as createRedisClient } from "redis";
import { profile as dbProfile } from "hafas-client/p/db/index.js";

const userAgent = "github.com/dabund24/vahrplan";

export const hafasClient = createHafasClient(dbProfile, userAgent);

export const valkeyClient = await createRedisClient()
	.on("error", (err) => console.error(err))
	.connect();
