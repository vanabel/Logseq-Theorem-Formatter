import { defineConfig } from 'vite'

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? './' : '/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    target: 'esnext',
    minify: false, // Disable minification for debugging
    rollupOptions: {
      input: {
        main: 'src/index.ts',  // Use TypeScript source as entry
      },
      output: {
        entryFileNames: 'index.js',
        format: 'es'
      }
    }
  },
  server: {
    port: 3000
  }
}) 