import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import vuejsx from '@vitejs/plugin-vue-jsx';
import {resolve} from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [vue()],
  resolve: {
    // Vite路径别名配置
    alias: {
      '@': resolve(__dirname, './src'),
      'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
    },
    extensions: ['.js', '.json', '.ts', '.vue']
  },
  server: {
    host: '0.0.0.0',
    port: 2022,
    // https: false,
    open: true,
    // proxy: {
    //   "/api": {
    //     target: "http://127.0.0.1:9527",
    //     // ws: false,
    //     changeOrigin: true,
    //     // rewrite: (path) => regExps(path, "/api")
    //   }
    // }
  }
})
