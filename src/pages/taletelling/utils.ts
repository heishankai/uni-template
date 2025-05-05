import { ref } from 'vue'
import { uploadFileUrl } from '@/utils/request'
import { saveRecordService } from './service'
import { onHide, onShow } from '@dcloudio/uni-app'
// 格式化数字为 2 位数
export const pad = (num: number): any => {
  return num < 10 ? `0${num}` : num?.toString()
}

// 开始计时功能
export const useTimer = (callback: () => void, interval = 1000): any => {
  const timerId = ref<number | null>(null)

  const startTimer = (): void => {
    if (timerId.value) return
    timerId.value = setInterval(callback, interval) as unknown as number
  }

  const stopTimer = (): void => {
    if (timerId.value) {
      clearInterval(timerId.value)
      timerId.value = null
    }
  }

  onHide(stopTimer)

  return { startTimer, stopTimer }
}

export const useTimeout = (callback: () => void, delay: number): any => {
  const timeoutId = ref<number | null>(null)

  const start = (): void => {
    if (timeoutId.value) return
    timeoutId.value = setTimeout(callback, delay) as unknown as number
  }

  const stop = (): void => {
    if (timeoutId.value) {
      clearTimeout(timeoutId.value)
      timeoutId.value = null
    }
  }

  onHide(stop)

  return { start, stop }
}

// 录音功能
export const useRecorder = (
  recordList: Ref<{ src: string; time: string }[]>,
  recordingTime: Ref<string>,
): any => {
  let recorderManager: UniApp.RecorderManager

  let seconds = 0
  // 计时器（更新录音时间）
  const { startTimer, stopTimer } = useTimer(() => {
    seconds++
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    recordingTime.value = `${pad(minutes)}:${pad(secs)}`
  })

  onShow(() => {
    recorderManager = uni.getRecorderManager()
    recorderManager.onStop((res) => {
      // 先捕获当前的录音时间
      const finalTime = recordingTime.value

      uni.showModal({
        content: '确认上传吗？',
        success: async function (response) {
          const { confirm } = response
          if (!confirm) {
            return
          }
          uni.showLoading({ title: '上传中...', mask: true })
          wx.uploadFile({
            url: uploadFileUrl,
            filePath: res?.tempFilePath,
            timeout: 300000, // 设置为 5 分钟（单位：ms）
            name: 'file',
            async success(res) {
              try {
                const { data } = JSON.parse(res?.data)

                const { message } = await saveRecordService({
                  recordList: [{ src: data, time: finalTime }],
                })

                uni.showToast({ title: message, icon: 'none' })

                recordList.value.push({
                  src: data,
                  time: finalTime,
                })

                // 推入录音信息后再重置录音时间
                recordingTime.value = '00:00'
              } catch {
                uni.hideLoading()
              } finally {
                uni.hideLoading()
              }
            },
            fail(err) {
              console.error('上传失败:', err)
              uni.hideLoading()
            },
          })
        },
      })
    })
  })

  onHide(() => {
    recorderManager.stop() // 停止录音
    recorderManager = null as any // 置空实例
  })

  // 开始录音
  const startRecord = (): void => {
    recorderManager.start({
      format: 'mp3',
      duration: 540000,
      sampleRate: 16000,
      numberOfChannels: 1,
      encodeBitRate: 96000,
    })

    seconds = 0
    startTimer()
  }

  // 停止录音
  const stopRecord = (): void => {
    recorderManager.stop()
    stopTimer()
  }

  return { startRecord, stopRecord }
}
