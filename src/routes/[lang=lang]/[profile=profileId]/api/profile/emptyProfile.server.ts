import { Profile } from "./profile.server";

export class EmptyProfile extends Profile<"empty", never, never> {
	protected override readonly id = "empty";
	protected override readonly name = Profile.translingual("");
	protected override readonly products = {};
	protected override readonly options = {};
}
