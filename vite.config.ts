import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { VitePWA } from "vite-plugin-pwa";
import { join } from "path";

export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        icon: true,
      },
    }),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        globPatterns: [
          "**/*.{js,css,html,ico,png,svg,webp,jpg,jpeg,woff2,woff}",
        ],
        maximumFileSizeToCacheInBytes: 5000000, // 5MB
        cleanupOutdatedCaches: true,
        skipWaiting: true,
        clientsClaim: true,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-stylesheets",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-webfonts",
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
            },
          },
          {
            urlPattern: /\/api\/.*/i,
            handler: "NetworkFirst",
            options: {
              cacheName: "api-cache",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24, // 24 hours
              },
              networkTimeoutSeconds: 10,
            },
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/i,
            handler: "CacheFirst",
            options: {
              cacheName: "images-cache",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
            },
          },
          {
            urlPattern: /\.(?:js|css|woff2|woff)$/i,
            handler: "CacheFirst",
            options: {
              cacheName: "static-resources",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
            },
          },
        ],
        navigateFallback: "/offline.html",
        navigateFallbackDenylist: [/^\/_/, /\/api\//],
      },
      includeAssets: [
        "logo.svg",
        "pwa/logo16.png",
        "pwa/logo32.png",
        "pwa/logo48.png",
        "pwa/logo64.png",
        "pwa/logo180.png",
        "pwa/logo192.png",
        "pwa/logo512.png",
        "offline.html",
      ],
      manifest: {
        name: "Pred - Trading Platform",
        short_name: "Pred",
        description:
          "Advanced trading and prediction platform with real-time market data",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        scope: "/",
        start_url: "/",
        orientation: "portrait",
        categories: ["finance", "trading", "business"],
        lang: "en",
        dir: "ltr",
        icons: [
          {
            src: "pwa/logo16.png",
            sizes: "16x16",
            type: "image/png",
          },
          {
            src: "pwa/logo32.png",
            sizes: "32x32",
            type: "image/png",
          },
          {
            src: "pwa/logo48.png",
            sizes: "48x48",
            type: "image/png",
          },
          {
            src: "pwa/logo64.png",
            sizes: "64x64",
            type: "image/png",
          },
          {
            src: "pwa/logo180.png",
            sizes: "180x180",
            type: "image/png",
            purpose: "apple-touch-icon",
          },
          {
            src: "pwa/logo192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "pwa/logo512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "pwa/logo512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
        shortcuts: [
          {
            name: "Portfolio",
            short_name: "Portfolio",
            description: "View your trading portfolio",
            url: "/?shortcut=portfolio",
            icons: [{ src: "pwa/logo192.png", sizes: "192x192" }],
          },
          {
            name: "Trade",
            short_name: "Trade",
            description: "Start trading",
            url: "/?shortcut=trade",
            icons: [{ src: "pwa/logo192.png", sizes: "192x192" }],
          },
        ],
      },
      devOptions: {
        enabled: true,
        type: "module",
      },
    }),
  ],
  build: {
    target: "es2015",
    cssCodeSplit: true,
    sourcemap: false,
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          ui: ["antd"],
          utils: ["axios", "react-router-dom"],
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": join(__dirname, "./src"),
      "@assets": join(__dirname, ".src/assets"),
      "@components": join(__dirname, "src/components"),
      contract: join(__dirname, "src/contract"),
      components: join(__dirname, "src/components"),
      "@modules": join(__dirname, "src/modules"),
      "@layouts": join(__dirname, "src/layouts"),
      layouts: join(__dirname, "src/layouts"),
      "@pages": join(__dirname, "src/pages"),
      pages: join(__dirname, "src/pages"),
      "@utility": join(__dirname, "src/utility"),
      utility: join(__dirname, "src/utility"),
      "@stores": join(__dirname, "src/stores"),
      "@hooks": join(__dirname, "src/hooks"),
      hooks: join(__dirname, "src/hooks"),
      "@enum": join(__dirname, "src/enum"),
      "@hoc": join(__dirname, "src/hoc"),
      "@interface": join(__dirname, "src/interface"),
      "@scss": join(__dirname, "src/scss"),
    },
  },
  server: {
    proxy: {
      "/github-api": {
        target: "https://raw.githubusercontent.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/github-api/, ""),
      },
      "/api": {
        target: "https://api-staging2.chaquen.io",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
    port: 9027,
    host: "0.0.0.0",
  },
});
