/* eslint-disable import/no-extraneous-dependencies */
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import eslint from "vite-plugin-eslint"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
  server: {
    port: 3000,
  },
  base: process.env.IS_DEV !== "true" ? "./" : "/",
  build: {
    outDir: "app/build",
  },
})
