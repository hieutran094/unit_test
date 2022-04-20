import tsPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'
export default defineConfig({
  plugins: [tsPaths()],
  test: {
    globals: true,
    setupFiles: ['./setupFile.ts'],
  },
})
