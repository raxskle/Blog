import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: '/', //这样的话获取静态资源只会从这个目录找，前端路由层级不影响，"./"的话前端路由变了获取静态资源也会变
  publicDir: 'public',
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @import "./src/assets/scss/_themeify.scss";
        @import "./src/assets/scss/mixin.scss";
        @import "./src/assets/scss/variable.scss";
        `,
      },
    },
  },
  server: {
    host: "127.0.0.1",
    // host: "10.21.200.147",
    port: 8082,
    open: true,
  },
});
