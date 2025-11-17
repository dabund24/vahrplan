import { type VahrplanResult, VahrplanSuccess } from "$lib/VahrplanResult";
import { VahrplanError } from "$lib/VahrplanError";

/**
 * A utility class allowing to rate-limit access to a limited resource
 */
export class RateLimiter {
	/** tracks for each accessor how many requests were sent in the current interval */
	private readonly recentRequestsCounts: Map<string, number>;
	/** the maximum number of allowed accesses per interval */
	private readonly rateLimitThreshold: number;

	/**
	 * @param interval the interval in seconds at which to reset the quota for all accessors
	 * @param threshold the amount of times an accessor can access a resource
	 */
	constructor({ interval, threshold }: { interval: number; threshold: number }) {
		this.recentRequestsCounts = new Map();
		this.rateLimitThreshold = threshold;
		setInterval(() => this.recentRequestsCounts.clear(), interval * 1000);
	}

	accessResource<T>(accessor: string, resourceFn: () => T): VahrplanResult<T> {
		const accessorAccesses = this.recentRequestsCounts.get(accessor) ?? 0;
		if (accessorAccesses < this.rateLimitThreshold) {
			// allow access
			this.recentRequestsCounts.set(accessor, accessorAccesses + 1);
			return new VahrplanSuccess(resourceFn());
		}
		return new VahrplanError("QUOTA_EXCEEDED");
	}
}
