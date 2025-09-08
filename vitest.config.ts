import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": "/src",
      "@styles": "/src/app/style",
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@styles/settings.scss" as *; @use "@styles/base/mixins.scss" as *;`,
      },
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/setupTests.ts"],
    css: true,
  },
});
