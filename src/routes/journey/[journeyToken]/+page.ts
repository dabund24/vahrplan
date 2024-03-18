/*export const load: PageLoad = async ({ params }) => {
	const url = new URL("http://localhost:5173/api/refresh");
	url.searchParams.set("lang", "de");
	url.searchParams.set("token", params.journeyToken);
	const response = await getApiData<JourneyBlock[]>(url);
	if (response.isError) {
		error(response.code, response.type);
	}
	return {
		title: "lol",
		content: response.content
	};
};
*/
