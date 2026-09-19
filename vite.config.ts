/// <reference types="vitest/config" />
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { paraglideVitePlugin } from "@inlang/paraglide-js";

export default defineConfig({
	plugins: [
		sveltekit(),
		paraglideVitePlugin({
			project: "./project.inlang",
			outdir: "./src/lib/paraglide",
			emitTsDeclarations: true,
			urlPatterns: [
				{
					pattern: "/",
					localized: [
						["en", "/en"],
						["de", "/de"],
					],
				},
				{
					pattern: "/:path(.*)?",
					localized: [
						["en", "/en/:path(.*)?"],
						["de", "/de/:path(.*)?"],
					],
				},
			],
		}),
	],
	build: { target: "es2022" },
	test: {
		mockReset: true,
		testTimeout: undefined,
		env: {
			["TZ"]: "UTC",
		},
	},
});
