import { Profile } from "./profile.server";

/**
 * used as a fallback if no profile is set yet
 */
export class EmptyProfile extends Profile<"empty"> {
	protected override readonly id = "empty";
	protected override readonly name = Profile.translingual("");
	protected override readonly products = {};
	protected override readonly options = {};
}
