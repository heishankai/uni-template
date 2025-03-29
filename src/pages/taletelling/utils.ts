import { ref } from 'vue'
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
  recordList: Ref<{ src: string; time: string; isPlay: boolean }[]>,
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
      console.log('录音结束，文件路径:', res.tempFilePath)
      // 先捕获当前的录音时间
      const finalTime = recordingTime.value

      recordList.value.push({
        src: res.tempFilePath,
        time: finalTime,
        isPlay: false,
      })

      // 推入录音信息后再重置录音时间
      recordingTime.value = '00:00'
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
      duration: 5000,
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

// 播放录音功能
export const useMultiAudioPlayer = (): any => {
  let innerAudioContext: UniApp.InnerAudioContext | null = null

  // 播放音频
  const play = (item): void => {
    if (!innerAudioContext) {
      return
    }

    // 动画
    item.isPlay = !item.isPlay

    innerAudioContext.onPlay(() => {
      console.log('开始播放')
      item.isPlay = true
    })

    innerAudioContext.onEnded(() => {
      console.log('播放完成')
      item.isPlay = false
    })

    innerAudioContext.onError((res) => {
      console.log(res.errMsg, '播放失败')
      item.isPlay = true
    })

    innerAudioContext.src = encodeURI(item?.src)
    innerAudioContext.play()
  }

  onShow(() => {
    innerAudioContext = uni.createInnerAudioContext()

    uni.setInnerAudioOption({
      obeyMuteSwitch: false, // 解决IOS静音无法播放音频
    })

    innerAudioContext.autoplay = true
  })

  // 页面隐藏时自动暂停录音
  // 页面隐藏时自动暂停录音
  onHide(() => {
    if (innerAudioContext) {
      innerAudioContext.pause() // 暂停当前播放
      innerAudioContext.stop() // 停止播放
      innerAudioContext.destroy() // 销毁音频实例
      innerAudioContext = null // 重置引用
      console.log('页面 onHide，暂停录音')
    }
  })

  return { play }
}
