import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import path from 'path'

const mode = process.env.NODE_ENV || 'development'
const env = loadEnv(mode, process.cwd(), '')

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  server: {
    proxy: {
      '/api/v2': {
        target: env.VITE_BACKEND_TARGET,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/v2/, '/api/v2'),
      },
    },
  },
})
