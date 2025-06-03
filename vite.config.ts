import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    target: 'esnext',
    minify: false, // Disable minification for debugging
    outDir: 'dist',
    rollupOptions: {
      input: 'index.html',
      output: {
        entryFileNames: 'index.js',
        format: 'es'
      }
    }
  },
  base: './',
  server: {
    port: 3000
  }
}) 