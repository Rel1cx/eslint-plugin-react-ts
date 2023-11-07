// @ts-check
const { defineConfig } = require("eslint-define-config");

module.exports = defineConfig({
  root: true,
  env: {
    browser: true,
    es2024: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    project: true,
    sourceType: "module",
    warnOnUnsupportedTypeScriptVersion: false,
  },
  extends: [
    "with-tsconfig",
    "plugin:react-hooks/recommended",
    "plugin:@eslint-react/recommended-legacy",
    "next",
    "next/core-web-vitals",
    "plugin:mdx/recommended",
  ],
  plugins: ["react-hooks", "mdx"],
});
