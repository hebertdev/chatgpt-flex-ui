// vite.config.ts
// Eliminar esta importación
// import { VitePWA } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react-swc";
import * as path from 'path'

// https://vitejs.dev/config/
export default {
  plugins: [
    react(),
    // Eliminar toda la configuración de VitePWA
  ],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },

  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
  }
};
