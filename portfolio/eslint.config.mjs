import js from "@eslint/js";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import globals from "globals";
import pluginPrettier from "eslint-plugin-prettier";

export default [
  js.configs.recommended,
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: typescriptParser,
      globals: { ...globals.browser },
    },
    plugins: {
      "@typescript-eslint": typescriptPlugin,
      prettier: pluginPrettier,
    },
    rules: {
      ...typescriptPlugin.configs.recommended.rules,
      "prettier/prettier": "error",
      "no-unused-vars": "warn",
    },
  },
  { ignores: ["dist/", "node_modules/", "*.config.js"] },
];
