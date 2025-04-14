import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
let SERVER_DOMAIN = process.env.VITE_SERVER_DOMAIN || 'http://localhost:8081';
let HOST = process.env.VITE_HOST || 'localhost';
let PORT = Number.parseInt(process.env.VITE_PORT || "8080");

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react()],
  preview: {
    port: PORT,
    strictPort: true,
  },
  server: {
    port: PORT,
    strictPort: true,
    host: true,
    origin: 'http://' + HOST + ':' + PORT,
    allowedHosts: [
      SERVER_DOMAIN
    ]
  }
});
