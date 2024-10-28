import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import federation from '@originjs/vite-plugin-federation';
// import { nodePolyfills } from 'vite-plugin-node-polyfills'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'
import rollupNodePolyFill from 'rollup-plugin-polyfill-node'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // federation({
    //   name: 'host-app',
    //   remotes: {
    //     remote_app: 'https://wowo.htilssu.id.vn/assets/remoteEntry.js',
    //   },
    // }),
  ],
  base: '',
  optimizeDeps: {
    include: [
      "@mui/material"
      // include other packages that may broke the build
    ],
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: 'globalThis'
      },
      // Enable esbuild polyfill plugins
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
          process: true,
        }),
        NodeModulesPolyfillPlugin()
      ]
    }
  },
  build: {
    rollupOptions: {
      plugins: [
        rollupNodePolyFill()
      ]
    }
  }
});
