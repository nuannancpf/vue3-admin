import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    // Vite路径别名配置
    alias: {
      '@': path.resolve('./src')
    },
    extensions: ['.js', '.json', '.ts', '.vue']
  },
  server: {
    // host: '0.0.0.0',
    // port: 2022,
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
