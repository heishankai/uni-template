import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
// 自动导入插件
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uni(),
    AutoImport({
      imports: ['vue', 'uni-app', 'pinia'],
      dts: true,
    }),
  ],
})
