/// <reference types="vitest" />
import { defineConfig } from "vite";
import { resolve } from "path";
import dtsPlugin from "vite-plugin-dts";
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  if (mode === "debug") {
    return {
      base: "./",
    };
  }
  return {
    base: "./",

    build: {
      lib: {
        entry: resolve(__dirname, "src/index.ts"),
        name: "NanoTypeJp",
        formats: ["es", "umd", "cjs"],
        fileName: (format) => {
          if (format === "es") return "nano-type-jp.es.js";
          if (format === "umd") return "nano-type-jp.umd.js";
          if (format === "cjs") return "nano-type-jp.cjs.js";
          return "nano-type-jp.js";
        },
      },
    },

    plugins: [dtsPlugin()],
  };
});
