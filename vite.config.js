import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import path from 'path';
export default defineConfig({
  server:{
    proxy:{
      '/api':'http://localhost:5000'
    }
  },
  
  plugins: [
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
