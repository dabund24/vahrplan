import js from "@eslint/js";
import ts from "typescript-eslint";
import svelte from "eslint-plugin-svelte";
import globals from "globals";
import svelteConfig from "./svelte.config.js";

export default [
	{
		ignores: [
			"build/",
			".svelte-kit/",
			"src/service-worker.js",
			"svelte.config.js",
			"eslint.config.js"
		]
	},
	// js
	js.configs.recommended,
	// ts
	...ts.configs.recommendedTypeChecked,
	...ts.configs.stylisticTypeChecked,
	// ts config
	{
		rules: {
			"logical-assignment-operators": "error",
			"no-console": "error",
			"@typescript-eslint/consistent-type-definitions": ["error", "type"],
			"@typescript-eslint/explicit-function-return-type": [
				"error",
				{ allowConciseArrowFunctionExpressionsStartingWithVoid: true }
			],
			"@typescript-eslint/prefer-as-const": "error",
			"@typescript-eslint/await-thenable": "error",
			"@typescript-eslint/no-unused-vars": [
				// stolen from https://stackoverflow.com/a/64067915
				"error",
				{
					argsIgnorePattern: "^_",
					varsIgnorePattern: "^_",
					caughtErrorsIgnorePattern: "^_"
				}
			],
			"@typescript-eslint/restrict-template-expressions": "error",
			"@typescript-eslint/naming-convention": [
				"error",
				{
					selector: "default",
					format: ["strictCamelCase"],
					leadingUnderscore: "allow",
					trailingUnderscore: "allow"
				},
				{
					selector: "import",
					format: ["camelCase", "PascalCase"]
				},
				{
					selector: "variable",
					modifiers: ["const", "global"],
					format: ["strictCamelCase", "UPPER_CASE"]
				},
				{
					selector: "property",
					modifiers: ["readonly"],
					format: ["strictCamelCase", "UPPER_CASE"]
				},
				{
					selector: "objectLiteralProperty",
					modifiers: ["requiresQuotes"],
					format: null
				},
				{
					selector: "variable",
					types: ["boolean"],
					format: ["PascalCase"],
					prefix: ["is", "has"]
				},
				{
					selector: "typeLike",
					format: ["PascalCase"]
				}
			]
		}
	},
	{
		languageOptions: {
			parserOptions: {
				extraFileExtensions: [".svelte"],
				projectService: true,
				tsconfigRootDir: import.meta.dirname
			}
		}
	},
	// other plugins
	// ...
	// svelte
	...svelte.configs["flat/recommended"],
	// svelte config
	{
		files: ["**/*.svelte"],
		languageOptions: {
			parserOptions: {
				extraFileExtensions: [".svelte"],
				parser: ts.parser,
				svelteConfig
			}
		},
		rules: {
			"@typescript-eslint/no-unsafe-member-access": "off",
			"@typescript-eslint/no-unsafe-call": "off",
			"@typescript-eslint/no-unsafe-argument": "off",
			"no-undef": "off",
			"@typescript-eslint/no-unsafe-assignment": "off"
		}
	},
	{
		files: ["**/*.svelte.ts"],
		languageOptions: {
			parserOptions: {
				parser: ts.parser,
				svelteConfig
			}
		}
	},
	// prettier
	...svelte.configs["flat/prettier"],
	// other
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			}
		}
	}
];
