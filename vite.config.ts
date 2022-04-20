import { ConfigEnv, defineConfig } from 'vite'
import { VitePluginNode } from 'vite-plugin-node'
import { resolve } from 'path'
import tsPaths from 'vite-tsconfig-paths'
export default defineConfig(({ command, mode }: ConfigEnv) => {
  return {
    define: {
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, '.'),
      },
    },
    ssr: {
      external: ['typeorm'],
    },
    plugins: [
      tsPaths(),
      ...VitePluginNode({
        adapter: 'nest',
        appPath: './src/main.ts',
        tsCompiler: 'esbuild',
        appName: 'viteNodeApp',
        swcOptions: {
          //   module: {
          //     type: 'commonjs',
          //   },
          jsc: {
            target: 'es2017',
            parser: {
              syntax: 'typescript',
              decorators: true,
            },
            transform: {
              legacyDecorator: true,
              decoratorMetadata: true,
            },
          },
        },
      }),
    ],
    optimizeDeps: {
      exclude: [
        '@nestjs/microservices',
        '@nestjs/websockets',
        'cache-manager',
        'class-transformer',
        'class-validator',
        'fastify-swagger',
        'swagger-ui-express',
      ],
    },
  }
})
