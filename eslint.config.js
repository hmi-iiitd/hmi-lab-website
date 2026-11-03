import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import eslintPluginAstro from "eslint-plugin-astro";

export default [
  {
    ignores: ["dist/**", ".astro/**", "node_modules/**", "playwright-report/**", "test-results/**"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },
];
