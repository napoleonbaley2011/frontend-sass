import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    open: true  // Esto abre automáticamente el navegador cuando el servidor arranca
  }
})
