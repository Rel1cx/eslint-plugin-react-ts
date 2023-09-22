import glob from "fast-glob";
import { defineConfig } from "tsup";

export default defineConfig(() => ({
    clean: true,
    dts: false,
    entry: [
        "src/configs/all.ts",
        "src/configs/debug.ts",
        "src/configs/recommended.ts",
        "src/configs/recommended-type-checked.ts",
        "src/index.ts",
        ...glob.sync("src/rules/**/*.ts", { ignore: ["**/*.spec.ts"] }),
    ],
    format: ["cjs", "esm"],
    minify: false,
    noExternal: ["pathe", "tiny-invariant", "fast-equals", "micro-memoize", "birecord"],
    outDir: "dist",
    platform: "neutral",
    replaceNodeEnv: false,
    shims: false,
    skipNodeModulesBundle: true,
    sourcemap: false,
    // skipNodeModulesBundle: false,
    // splitting: false,
    splitting: false,
    target: "es2022",
    treeshake: true,
}));
