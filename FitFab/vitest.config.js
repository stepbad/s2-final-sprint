// vite.config.js or vitest.config.js
import { defineConfig } from 'vite';
import react from "@vitejs/plugin-react";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
  },
  plugins: [react()],
});
