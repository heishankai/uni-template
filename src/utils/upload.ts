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
              },
            })
          }),
      )

      Promise.all(uploadPromises)
        .then(successCallback)
        .catch((err) => {
          console.error('上传过程中出错:', err)
        })
    },
  })
}
