import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    federation({
      name: 'host-app',
      remotes: {
        remote_app: 'https://wowo.htilssu.id.vn/assets/remoteEntry.js',
      },
    }),
  ],
  optimizeDeps: {
    include: [
      "@mui/material"
      // include other packages that may broke the build
    ],
  },
  server: {
    proxy: {
      '/payment': {
        target: 'https://traveloki.vercel.app',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
