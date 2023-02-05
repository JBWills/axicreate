/* eslint-disable import/no-extraneous-dependencies */

// yarn add --dev @esbuild-plugins/node-modules-polyfill
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
  server: {
    port: 3000,
  },
  // resolve: {
  //   alias: {
  //     isect: require.resolve("rollup-plugin-node-builtins"),
  //   },
  // },
});
