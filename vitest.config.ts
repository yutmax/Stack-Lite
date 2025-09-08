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
    coverage: {
      provider: "v8",
      reportsDirectory: "coverage",
      reporter: ["text", "html", "lcov"],
      exclude: ["src/main.tsx", "src/vite-env.d.ts"],
    },
  },
});
