import { ApiClient, type MinimalRequestEvent } from "$lib/api-client/ApiClient";
import type { Ctx, JourneysFilters, RelativeTimeType, TreeNode } from "$lib/types";
import type { RequestEvent } from "./$types";
import { BodySettable } from "$lib/api-client/BodySettableApiClient";
import { PathParamSettable } from "$lib/api-client/PathParamSettableApiClient";
import type { DiagramData } from "$lib/state/diagramData.svelte.js";
import type { LocationEquivalenceSystem } from "../../locationRepresentativesUtils";
import type { RecommendedVia } from "../../viaRecommendations.server";
import {
	type PlausibleProp,
	PlausiblePropSettable,
} from "$lib/api-client/PlausiblePropSettableApiClient";

type ReqType = {
	scrollDirection: RelativeTimeType;
	stops: string[];
	tokens: string[];
	filters: JourneysFilters;
	tree: TreeNode[];
	transferLocations: LocationEquivalenceSystem;
	recommendedVias: RecommendedVia[][];
};

export class PostDiagramScrollApiClient extends BodySettable<ReqType, DiagramData, RequestEvent>()(
	PathParamSettable<ReqType, DiagramData, RequestEvent>()(
		PlausiblePropSettable<ReqType, DiagramData, RequestEvent>()(
			ApiClient<ReqType, DiagramData, "POST", RequestEvent>,
		),
	),
) {
	protected override readonly methodType = "POST";
	protected override readonly route = "diagram/scroll/[scrollDirection]";
	protected override readonly isLoadingAnimated = true;
	protected override readonly cacheMaxAge = 120;

	protected override estimateUpstreamCalls = (content: ReqType): number => content.tokens.length;

	protected override formatUrlPath = (
		content: ReqType,
		{ apiPathBase }: Pick<Ctx, "apiPathBase" | "profileConfig">,
	): `${Ctx["apiPathBase"]}${string}` =>
		`${apiPathBase}diagram/scroll/${content.scrollDirection}`;

	protected override formatBody = (content: ReqType): string => {
		const bodyContent: Omit<ReqType, "scrollDirection"> = {
			tokens: content.tokens,
			stops: content.stops,
			filters: content.filters,
			tree: content.tree,
			transferLocations: content.transferLocations,
			recommendedVias: content.recommendedVias,
		};
		return JSON.stringify(bodyContent);
	};

	protected override parseRequestContent = async (
		reqEvent: MinimalRequestEvent<"POST", RequestEvent>,
	): Promise<ReqType> => ({
		scrollDirection: reqEvent.params.scrollDirection as RelativeTimeType,
		...((await reqEvent.request.json()) as Omit<ReqType, "scrollDirection">),
	});

	protected override formatProps = (
		content: ReqType,
	): Record<PlausibleProp, string | number> => ({
		viaCount: content.stops.length - 2,
	});
}
