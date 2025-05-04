import { ref } from 'vue'

export const useShare = (): any => {
  const shareData = ref({
    title: '1勺盐',
    path: '/pages/index/index', // 默认路径
    imageUrl: 'https://yisaoyan.oss-cn-hangzhou.aliyuncs.com/yisaoyan/1746247002456272.jpeg', // 分享图片的URL, 如果为空则使用当前页面截图
  })

  const setShareData = (data): void => {
    shareData.value = { ...shareData.value, ...data }
  }

  const onShareAppMessage = (): any => {
    return {
      title: shareData.value.title,
      path: shareData.value.path,
      imageUrl: shareData.value.imageUrl,
    }
  }

  return {
    shareData,
    setShareData,
    onShareAppMessage,
  }
}
