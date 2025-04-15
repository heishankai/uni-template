import { uploadFileUrl } from '@/utils/request'

// 公共上传方法
export const uploadImages = ({
  count = 1,
  successCallback,
}: {
  count: number
  successCallback: (urls: string[]) => void
}): void => {
  uni.chooseMedia({
    count,
    mediaType: ['image'],
    success: (res) => {
      uni.showToast({ title: '正在上传...', icon: 'loading' })
      const uploadPromises = res.tempFiles.map(
        (file) =>
          new Promise<string>((resolve, reject) => {
            uni.uploadFile({
              url: uploadFileUrl,
              name: 'file',
              filePath: file.tempFilePath,
              success: (uploadRes) => {
                const { data } = JSON.parse(uploadRes.data)
                resolve(data)
              },
              fail: () => {
                uni.showToast({ title: '上传失败', icon: 'none' })
                reject(new Error('上传失败'))
                uni.hideLoading()
              },
            })
          }),
      )

      Promise.all(uploadPromises)
        .then(successCallback)
        .catch((err) => {
          uni.hideLoading()
          console.error('上传过程中出错:', err)
        })
    },
  })
}
