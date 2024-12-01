// ../../vite.config.mjs
import { defineConfig } from "file:///home/shsk/git/typing-game-core/node_modules/vite/dist/node/index.js";
import { resolve } from "path";
import dtsPlugin from "file:///home/shsk/git/typing-game-core/node_modules/vite-plugin-dts/dist/index.mjs";
var __vite_injected_original_dirname = "/home/shsk/git/typing-game-core";
var vite_config_default = defineConfig(({ mode }) => {
  if (mode === "debug") {
    return {
      base: "./"
    };
  }
  return {
    base: "./",
    build: {
      lib: {
        entry: resolve(__vite_injected_original_dirname, "src/index.ts"),
        name: "NanoTypeJp",
        formats: ["es", "umd", "cjs"],
        fileName: (format) => {
          if (format === "es") return "nano-type-jp.es.js";
          if (format === "umd") return "nano-type-jp.umd.js";
          if (format === "cjs") return "nano-type-jp.cjs.js";
          return "nano-type-jp.js";
        }
      }
    },
    plugins: [dtsPlugin()]
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vdml0ZS5jb25maWcubWpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL2hvbWUvc2hzay9naXQvdHlwaW5nLWdhbWUtY29yZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvc2hzay9naXQvdHlwaW5nLWdhbWUtY29yZS92aXRlLmNvbmZpZy5tanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvc2hzay9naXQvdHlwaW5nLWdhbWUtY29yZS92aXRlLmNvbmZpZy5tanNcIjsvLy8gPHJlZmVyZW5jZSB0eXBlcz1cInZpdGVzdFwiIC8+XG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgZHRzUGx1Z2luIGZyb20gXCJ2aXRlLXBsdWdpbi1kdHNcIjtcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiB7XG4gIGlmIChtb2RlID09PSBcImRlYnVnXCIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgYmFzZTogXCIuL1wiLFxuICAgIH07XG4gIH1cbiAgcmV0dXJuIHtcbiAgICBiYXNlOiBcIi4vXCIsXG5cbiAgICBidWlsZDoge1xuICAgICAgbGliOiB7XG4gICAgICAgIGVudHJ5OiByZXNvbHZlKF9fZGlybmFtZSwgXCJzcmMvaW5kZXgudHNcIiksXG4gICAgICAgIG5hbWU6IFwiTmFub1R5cGVKcFwiLFxuICAgICAgICBmb3JtYXRzOiBbXCJlc1wiLCBcInVtZFwiLCBcImNqc1wiXSxcbiAgICAgICAgZmlsZU5hbWU6IChmb3JtYXQpID0+IHtcbiAgICAgICAgICBpZiAoZm9ybWF0ID09PSBcImVzXCIpIHJldHVybiBcIm5hbm8tdHlwZS1qcC5lcy5qc1wiO1xuICAgICAgICAgIGlmIChmb3JtYXQgPT09IFwidW1kXCIpIHJldHVybiBcIm5hbm8tdHlwZS1qcC51bWQuanNcIjtcbiAgICAgICAgICBpZiAoZm9ybWF0ID09PSBcImNqc1wiKSByZXR1cm4gXCJuYW5vLXR5cGUtanAuY2pzLmpzXCI7XG4gICAgICAgICAgcmV0dXJuIFwibmFuby10eXBlLWpwLmpzXCI7XG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG5cbiAgICBwbHVnaW5zOiBbZHRzUGx1Z2luKCldLFxuICB9O1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQ0EsU0FBUyxvQkFBb0I7QUFDN0IsU0FBUyxlQUFlO0FBQ3hCLE9BQU8sZUFBZTtBQUh0QixJQUFNLG1DQUFtQztBQUt6QyxJQUFPLHNCQUFRLGFBQWEsQ0FBQyxFQUFFLEtBQUssTUFBTTtBQUN4QyxNQUFJLFNBQVMsU0FBUztBQUNwQixXQUFPO0FBQUEsTUFDTCxNQUFNO0FBQUEsSUFDUjtBQUFBLEVBQ0Y7QUFDQSxTQUFPO0FBQUEsSUFDTCxNQUFNO0FBQUEsSUFFTixPQUFPO0FBQUEsTUFDTCxLQUFLO0FBQUEsUUFDSCxPQUFPLFFBQVEsa0NBQVcsY0FBYztBQUFBLFFBQ3hDLE1BQU07QUFBQSxRQUNOLFNBQVMsQ0FBQyxNQUFNLE9BQU8sS0FBSztBQUFBLFFBQzVCLFVBQVUsQ0FBQyxXQUFXO0FBQ3BCLGNBQUksV0FBVyxLQUFNLFFBQU87QUFDNUIsY0FBSSxXQUFXLE1BQU8sUUFBTztBQUM3QixjQUFJLFdBQVcsTUFBTyxRQUFPO0FBQzdCLGlCQUFPO0FBQUEsUUFDVDtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFFQSxTQUFTLENBQUMsVUFBVSxDQUFDO0FBQUEsRUFDdkI7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
