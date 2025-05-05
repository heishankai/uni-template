import { createSSRApp } from 'vue'
import App from './App.vue'
import pinia from './stores'

export const createApp = (): { app: ReturnType<typeof createSSRApp> } => {
  const app = createSSRApp(App)

  app.mixin({
    onShareAppMessage() {
      return {
        title: '榕树洞',
        path: '/pages/index/index', // 默认路径
        imageUrl: 'https://yisaoyan.oss-cn-hangzhou.aliyuncs.com/yisaoyan/1746247002456272.jpeg', // 分享图片的URL, 如果为空则使用当前页面截图
      }
    },
    onShareTimeline() {
      return {
        title: '榕树洞',
        path: '/pages/index/index', // 默认路径
        imageUrl: 'https://yisaoyan.oss-cn-hangzhou.aliyuncs.com/yisaoyan/1746247002456272.jpeg', // 分享图片的URL, 如果为空则使用当前页面截图
      }
    },
  })

  app.use(pinia)
  return {
    app,
  }
}
