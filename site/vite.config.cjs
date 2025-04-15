import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import Prerender from "vite-plugin-prerender";
import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({ open: false }),
    Prerender({
      staticDir: "dist",
      routes: ["/"],
    }),
  ],

  server: {
    host: true,
  },
  build: {
    minify: "terser", 
    cssCodeSplit: true, 
    sourcemap: false, 
    chunkSizeWarningLimit: 500, 
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
  },
});
