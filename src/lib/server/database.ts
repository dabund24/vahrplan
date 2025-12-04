import { createClient } from "redis";
import { building } from "$app/environment";

export let valkeyClient: Awaited<ReturnType<typeof createClient>>;

if (!building && process.env.NODE_ENV !== "test") {
	valkeyClient = await createClient({
		url: process.env.DATABASE_URL ?? "redis://localhost:6379"
	}).connect();
}
