import { createSSRApp } from 'vue'
import App from './App.vue'
import pinia from './stores'
export const createApp = (): { app: ReturnType<typeof createSSRApp> } => {
  const app = createSSRApp(App)

  app.use(pinia)
  return {
    app,
  }
}
