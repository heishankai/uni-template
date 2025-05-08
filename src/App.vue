<script setup lang="ts">
import { initSocket } from '@/utils/socket'
import { updateApp } from '@/utils/updateApp'
import { onLaunch, onShow, onHide, onLoad, onUnload, onReady } from '@dcloudio/uni-app'

onLaunch(() => {
  console.log('监听小程序初始化，全局只触发一次')
  /** socket 连接 */
  initSocket()
  /** 小程序版本更新 */
  updateApp()
})

onShow(() => {
  console.log('监听页面展示')
})

onLoad(() => {
  console.log('监听页面加载，可以发送请求')
})

onReady(() => {
  console.log('监听页面DOM渲染完成')
})

onHide(() => {
  console.log('监听页面隐藏')
})

onUnload(() => {
  console.log('监听页面卸载')
})
</script>
<style>
@import '@/static/iconfont.css';
/* 全局背景色 */
page {
  box-sizing: border-box;
  background-color: #ffffff;
  margin: 0;
  padding: 0;
}
</style>
