import type { PageLoad } from "./$types";
import { apiClient } from "$lib/api-client/apiClientFactory";
import type { ServerRequestData } from "$lib/api-client/ApiClient";

export const load: PageLoad = async ({ fetch, parent, url, params }) => {
	const { lang, profileConfig } = await parent();
	const tripApiClient = apiClient("GET", "trip/[tripId]");

	console.log(params);

	const { reqContent } = tripApiClient.parseNonApiUrl(url, { profileConfig });

	const serverRequestData: ServerRequestData = {
		fetchFn: fetch,
		lang,
		profileConfig,
	};

	console.log(reqContent);

	const { content: trip } = (
		await tripApiClient.request(reqContent, serverRequestData)
	).throwIfError();

	return { trip };
};
