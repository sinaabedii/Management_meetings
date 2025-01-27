import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  },
  // اگر نیاز به تنظیمات خاصی برای CSS دارید اینجا اضافه کنید
  css: {
    devSourcemap: true,
  }
})