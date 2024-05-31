import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import js from "@eslint/js";
import ts from "typescript-eslint";
import tailwind from "eslint-plugin-tailwindcss";

const eslintConfig = [
  {languageOptions: { globals: {...globals.browser, ...globals.node} }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  js.configs.recommended,
  ...ts.configs.recommended,
  pluginReactConfig,
  ...tailwind.configs["flat/recommended"],
];

export default eslintConfig;
