import { Profile } from "./profile";
import { JourneyDataService } from "$lib/server/journey-data/JourneyDataService";
import { VahrplanError } from "$lib/VahrplanError";
import { JourneyDataRequestFormatter } from "$lib/server/journey-data/JourneyDataRequestFormatter";
import { FptfResponseParser } from "$lib/server/journey-data/fptf-clients/FptfResponseParser";
import { DbnavLineShapeParser } from "$lib/server/journey-data/fptf-clients/DbnavLineShapeParser";

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
			super({ productMapping: {}, optionMapping: {}, hasTickets: false });
		}
		protected override products = {};
		protected override optionIds = {};
		protected override requestFormatter = new (class extends JourneyDataRequestFormatter<
			never,
			never
		> {
			protected override formatOptionValues = {};
			public override formatRequest = {
				journeys: () => void {},
				refresh: () => void {},
				location: () => void {},
				locations: () => void {}
			};
		})({ productMapping: {}, optionMapping: {}, hasTickets: false });
		protected override responseParser = new FptfResponseParser({
			productMapping: {},
			lineShapeParser: new DbnavLineShapeParser()
		});
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
