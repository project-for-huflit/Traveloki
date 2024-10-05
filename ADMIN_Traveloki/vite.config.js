import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
   // các cấu hình khác
   build: {
    rollupOptions: {
      external: ['@mui/utils/getReactNodeRef']
    }
  }
})
