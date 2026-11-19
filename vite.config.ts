// import vue from '@vitejs/plugin-vue'
// import { defineConfig } from 'vite'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [vue()],
// })

/// <reference types="vitest" />

import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue],
  test: {
    globals: true,
    environment: "jsdom",
  },
});

