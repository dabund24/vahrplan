export type ServerNews = {
	id: string;
	priority: "low" | "normal" | "high";
	title: string;
	message?: string;
};

export const news: ServerNews[] = [
	// {
	// 	id: "2025-05-02--0",
	// 	priority: "normal",
	// 	title: "example title",
	// 	message:
	// 		"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
	// }
];
