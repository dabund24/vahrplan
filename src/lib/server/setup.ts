import { createClient as createRedisClient } from "redis";
import { building, version } from "$app/environment";
import { JourneyDataService } from "$lib/server/journeyData/JourneyDataService";
// @ts-expect-error no types for db-vendo-client yet
import { createClient as createHafasClient } from "db-vendo-client";
// @ts-expect-error no types for db-vendo-client yet
import { profile as dbProfile } from "db-vendo-client/p/dbnav";
import type { HafasClient } from "hafas-client";
import { HafasClientDataService } from "$lib/server/journeyData/hafasClient/HafasClientDataService";

const userAgent = `https://vahrplan.de ${version}`;

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
const hafasClient = createHafasClient(dbProfile, userAgent) as HafasClient;
export const journeyDataService: JourneyDataService = new HafasClientDataService(hafasClient);

// Valkey stuff

export let valkeyClient: Awaited<ReturnType<typeof createRedisClient>>;

if (!building && process.env.NODE_ENV !== "test") {
	valkeyClient = await createRedisClient({
		url: process.env.DATABASE_URL ?? "redis://localhost:6379"
	}).connect();
}
