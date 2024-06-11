/** @type { import("eslint").Linter.Config } */
module.exports = {
	root: true,
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:@typescript-eslint/recommended-requiring-type-checking",
		"plugin:svelte/recommended",
		"prettier"
	],
	parser: "@typescript-eslint/parser",
	plugins: ["@typescript-eslint"],
	parserOptions: {
		sourceType: "module",
		ecmaVersion: 2020,
		extraFileExtensions: [".svelte"],
		project: true
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	},
	overrides: [
		{
			files: ["*.svelte"],
			parser: "svelte-eslint-parser",
			parserOptions: {
				parser: "@typescript-eslint/parser"
			},
			rules: {
				"@typescript-eslint/no-unsafe-member-access": "off",
				"@typescript-eslint/no-unsafe-call": "off",
				"no-undef": "off"
			}
		}
	],
	ignorePatterns: [".eslintrc.cjs", "vite.config.ts", "svelte.config.js"],
	rules: {
		"logical-assignment-operators": "error",
		"@typescript-eslint/explicit-function-return-type": [
			"error",
			{ allowConciseArrowFunctionExpressionsStartingWithVoid: true }
		],
		"@typescript-eslint/prefer-as-const": "error",
		"@typescript-eslint/await-thenable": "error",
		"no-unused-vars": "off",
		"@typescript-eslint/no-unused-vars": [
			// stolen from https://stackoverflow.com/a/64067915
			"error",
			{
				argsIgnorePattern: "^_",
				varsIgnorePattern: "^_",
				caughtErrorsIgnorePattern: "^_"
			}
		]
	}
};
