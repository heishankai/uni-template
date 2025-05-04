// src/composables/useShare.js
import { ref } from 'vue'

export const useShare = (): any => {
  const shareData = ref({
    title: '默认分享标题',
    path: '/pages/index/index', // 默认路径
    imageUrl: '', // 分享图片的URL, 如果为空则使用当前页面截图
  })

  const setShareData = (data): void => {
    shareData.value = { ...shareData.value, ...data }
  }

  const onShareAppMessage = (): any => ({
    title: shareData.value.title,
    path: shareData.value.path,
    imageUrl: shareData.value.imageUrl,
  })

  return {
    shareData,
    setShareData,
    onShareAppMessage,
  }
}
