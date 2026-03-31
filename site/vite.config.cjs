// vite.config.cjs
const { defineConfig } = require("vite");
const react = require("@vitejs/plugin-react");

module.exports = defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://prano.group",
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
