import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "./src/index.js",
      name: "GalaxiesSdk",
      fileName: (format) => `galaxies-sdk.${format}.js`,
    },
    rollupOptions: {
      external: ["galaxies-access-layer", "node-telegram-bot-api"],
      output: {
        globals: {
          "galaxies-access-layer": "galaxies-access-layer",
          "node-telegram-bot-api": "node-telegram-bot-api",
        },
      },
    },
  },
});
