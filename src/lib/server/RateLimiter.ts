import { type VahrplanResult, VahrplanSuccess } from "$lib/VahrplanResult";
import { VahrplanError } from "$lib/VahrplanError";

/**
 * A utility class allowing to rate-limit access to a limited resource
 */
export class RateLimiter {
	private readonly RECENT_REQUESTS_COUNTS: Map<string, number>; // Tracks for each accessor how many requests were sent in the last `RATE_LIMIT_INTERVAL` seconds
	private readonly RATE_LIMIT_THRESHOLD: number;

	/**
	 * @param interval the interval in seconds at which to reset the quota for all accessors
	 * @param threshold the amount of times an accessor can access a resource
	 */
	constructor(interval: number, threshold: number) {
		this.RECENT_REQUESTS_COUNTS = new Map();
		this.RATE_LIMIT_THRESHOLD = threshold;
		setInterval(() => this.RECENT_REQUESTS_COUNTS.clear(), interval * 1000);
	}

	accessResource<T>(accessor: string, resourceFn: () => T): VahrplanResult<T> {
		const accessorAccesses = this.RECENT_REQUESTS_COUNTS.get(accessor) ?? 0;
		if (accessorAccesses < this.RATE_LIMIT_THRESHOLD) {
			// allow access
			this.RECENT_REQUESTS_COUNTS.set(accessor, accessorAccesses + 1);
			return new VahrplanSuccess(resourceFn());
		}
		return new VahrplanError("QUOTA_EXCEEDED");
	}
}
