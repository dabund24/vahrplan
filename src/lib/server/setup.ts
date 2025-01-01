import { createClient as createRedisClient } from "redis";
import { building } from "$app/environment";
import { HafasClientDataService } from "$lib/server/journeyData/hafasClient/HafasClientDataService";
import type { JourneyDataService } from "$lib/server/journeyData/JourneyDataService";

export const journeyDataService: JourneyDataService = new HafasClientDataService();

// Valkey stuff

export let valkeyClient: Awaited<ReturnType<typeof createRedisClient>>;

if (!building) {
	valkeyClient = await createRedisClient({
		url: process.env.DATABASE_URL ?? "redis://localhost:6379"
	}).connect();
}
