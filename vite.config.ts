import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://codelang.vercel.app",
        changeOrigin: true,
        secure: false,
      },
    },
    open: true,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
      "@styles": "/src/app/style",
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Make SCSS variables/mixins available everywhere without manual @use
        // Adjust the path if you keep your styles in a different folder
        // Inject only variables to avoid circular imports when compiling mixins.scss itself
        additionalData: `@use "@styles/settings.scss" as *; @use "@styles/base/mixins.scss" as *;`,
      },
    },
  },
});
