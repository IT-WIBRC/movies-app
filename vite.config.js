/// <reference types="vitest/config" />
import { defineConfig, coverageConfigDefaults } from "vitest/config";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./setupTests.js",
    coverage: {
      provider: "v8",
      reporter: ["text", "json-summary", "json", "lcovonly"],
      thresholds: {
        lines: 85,
        branches: 85,
        functions: 90,
        statements: 85,
      },
      cleanOnRerun: true,
      reportOnFailure: true,
      exclude: [
        ...coverageConfigDefaults.exclude,
      ],
    },
  },
});
