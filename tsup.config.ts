import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    "encoding/index": "src/encoding/index.ts",
    "text/index": "src/text/index.ts",
    "data/index": "src/data/index.ts",
  },
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  sourcemap: true,
  splitting: false,
  // "type": "module" olduğu için ESM varsayılan .js olur; exports haritasıyla
  // hizalamak üzere ESM'i .mjs, CJS'i .cjs olarak sabitliyoruz.
  outExtension({ format }) {
    return { js: format === "cjs" ? ".cjs" : ".mjs" };
  },
});
