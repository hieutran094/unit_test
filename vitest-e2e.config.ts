import tsPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'
import { VitePluginNode } from 'vite-plugin-node'
export default defineConfig({
  root: '.',
  plugins: [
    tsPaths(),
    ...VitePluginNode({
      adapter: 'nest',
      appPath: './src/main.ts',
      tsCompiler: 'swc',
    }),
  ],
  test: {
    globals: true,
    environment: 'node',
    include: ['test/**/*.e2e-{spec,test}.ts'],
    deps: { external: ['**/node_modules/**', '**/dist/**'], interopDefault: true },
    setupFiles: ['./setupFile.ts'],
  },
})
