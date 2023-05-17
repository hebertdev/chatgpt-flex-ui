// vite.config.ts
import { VitePWA } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react-swc";
import * as path from 'path'

// https://vitejs.dev/config/
export default {
  plugins: [
    react(),
    VitePWA({
      // add this to cache all the imports
      workbox: {
        globPatterns: ["**/*"],
      },
      // add this to cache all the
      // static assets in the public folder
      includeAssets: ["**/*"],
      manifest:{
        theme_color: '#75ab9d',
        background_color: '#75ab9d',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        name: 'GPT Flex',
        short_name: 'GPT Flex',
        description: 'About ChatGPT-Flex-UI es una interfaz moderna y adaptable para la API de Chat GPT',
        icons: [
          {
            src: '/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icon-256x256.png',
            sizes: '256x256',
            type: 'image/png',
          },
          {
            src: '/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png',
          },
          {
            src: '/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      }
    }),
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
