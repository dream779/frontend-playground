import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // @ 就是 src
    },
  },
  server:{
    proxy: {
      '/api': {
        target: 'https://vercel-node-bice.vercel.app',
        changeOrigin: true,
      },
    }
  },
})
