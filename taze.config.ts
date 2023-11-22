import { defineConfig } from "taze";

export default defineConfig({
  force: false,
  install: false,
  packageMode: {
    "@typescript-eslint/eslint-plugin": "6.10.0",
    "@typescript-eslint/parser": "6.10.0",
    "@typescript-eslint/scope-manager": "6.10.0",
    "@typescript-eslint/type-utils": "6.10.0",
    "@typescript-eslint/types": "6.10.0",
    "@typescript-eslint/utils": "6.10.0",
  },
  write: true,
});
