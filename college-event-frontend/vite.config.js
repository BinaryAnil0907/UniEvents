import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // 👈 Ye naya plugin hai v4 ke liye

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // 👈 Isko plugins mein add karo
  ],
})