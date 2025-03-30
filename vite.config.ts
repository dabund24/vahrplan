/// <reference types="vitest/config" />
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [sveltekit()],
	build: {
		target: "es2022"
	},
	test: {
		mockReset: true,
		testTimeout: undefined
	}
});
