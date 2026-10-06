import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import pluginQuery from "@tanstack/eslint-plugin-query";

/** @type {import('eslint').Linter.Config[]} */
const configs = [
  ...nextCoreWebVitals,
  ...pluginQuery.configs["flat/recommended"],
  {
    ignores: ["node_modules/**", ".next/**", "out/**", "build/**", "next-env.d.ts"],
  },
];

export default configs;
