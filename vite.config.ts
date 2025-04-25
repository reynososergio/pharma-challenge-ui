import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

import EnvironmentPlugin from "vite-plugin-environment";

export default defineConfig({
  plugins: [react(), EnvironmentPlugin(["VITE_API_BASE_URL"])],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  esbuild: {
    target: "esnext",
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: true,
  },
});
