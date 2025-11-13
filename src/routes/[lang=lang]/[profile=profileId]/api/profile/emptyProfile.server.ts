import { Profile } from "./profile.server";
import { JourneyDataService } from "$lib/server/journey-data/JourneyDataService";
import { VahrplanError } from "$lib/VahrplanError";

/**
 * used as a fallback if no profile is set yet
 */
export class EmptyProfile extends Profile<"empty"> {
	protected override readonly id = "empty";
	protected override readonly name = Profile.translingual("");
	protected override readonly supportedLanguages = [];
	protected override readonly fallbackLanguage = "de";
	protected override readonly products = {};
	protected override readonly options = {};
	protected override readonly journeyDataService = new (class extends JourneyDataService<
		never,
		never
	> {
		public constructor() {
			super({ productMapping: {}, optionMapping: {} });
		}
		protected override products = {};
		protected override optionIds = {};
		public journeys = (): Promise<VahrplanError> =>
			Promise.resolve(new VahrplanError("NOT_FOUND"));
		public refresh = (): Promise<VahrplanError> =>
			Promise.resolve(new VahrplanError("NOT_FOUND"));
		public locations = (): Promise<VahrplanError> =>
			Promise.resolve(new VahrplanError("NOT_FOUND"));
		public location = (): Promise<VahrplanError> =>
			Promise.resolve(new VahrplanError("NOT_FOUND"));
		public parseError = (): never => {
			throw new VahrplanError("ERROR");
		};
	})();
}
