import type { DatabaseEntry, DatabaseEntryType, KeylessDatabaseEntry } from "$lib/types";
import { valkeyClient } from "$lib/server/database";
import { hash } from "node:crypto";

/**
 * writes a key-value pair to valkey/redis
 * @param entry data about the database entry
 */
export async function setDatabaseEntry<T>(entry: DatabaseEntry<T>): Promise<void> {
	const key = `${entry.type}:${entry.key}`;
	const value = JSON.stringify(entry.value);
	// eslint-disable-next-line @typescript-eslint/naming-convention
	await valkeyClient.set(key, value, { PXAT: entry.expirationDate });
}

/**
 * gets the value for a given key from valkey/redis
 * @param type the type of data stored
 * @param key the key of the data of interest
 * @returns the value of the key if existing, else `undefined`
 */
export async function getDatabaseEntry<T>(
	type: DatabaseEntryType,
	key: string
): Promise<T | undefined> {
	const dbKey = `${type}:${key}`;
	const stringifiedData = await valkeyClient.get(dbKey);
	if (stringifiedData === null) {
		return undefined;
	}
	return JSON.parse(stringifiedData) as T;
}

/**
 * completes database entry data with a key generated from its hashed value
 * @param keylessEntry entry data without lacking a key
 */
export function generateHashedDatabaseEntry<T>(
	keylessEntry: KeylessDatabaseEntry<T>
): DatabaseEntry<T> {
	const key = hash("md5", JSON.stringify(keylessEntry.value), "base64url");
	return { ...keylessEntry, key };
}
