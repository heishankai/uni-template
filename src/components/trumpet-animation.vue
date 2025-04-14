<template>
  <view class="message" @click="play">
    <view :style="[boxStyle]" class="box">
      <view class="audio-style" :style="[audioStyle]" :class="{ animation: isPlay }">
        <view class="small" :style="{ 'background-color': color }"></view>
        <view class="middle" :style="{ 'border-right-color': color }"></view>
        <view class="large" :style="{ 'border-right-color': color }"></view>
      </view>
    </view>
    <text class="time">{{ time }}</text>
  </view>
</template>

<script lang="ts" setup>
import { onHide } from '@dcloudio/uni-app'
import { computed, ref } from 'vue'

// 定义 props
const props = defineProps({
  direction: {
    type: String,
    default: 'right',
  },
  size: {
    type: Number,
    default: 24,
  },
  color: {
    type: String,
    default: '#222',
  },
  src: {
    type: String,
    default: '',
  },
  time: {
    type: String,
    default: '',
  },
})
const isPlay = ref<boolean>(false)
let innerAudioContext: UniApp.InnerAudioContext | null = null

// 播放音频
const play = (): void => {
  if (!innerAudioContext) {
    innerAudioContext = uni.createInnerAudioContext()

    uni.setInnerAudioOption({
      obeyMuteSwitch: false,
    })

    innerAudioContext.autoplay = true
  }

  if (isPlay.value) {
    // 如果正在播放，则暂停
    innerAudioContext.stop()
    isPlay.value = false
    console.log('点击暂停播放')
    return
  }

  innerAudioContext.onPlay(() => {
    console.log('开始播放')
    isPlay.value = true
  })

  innerAudioContext.onEnded(() => {
    console.log('播放完成')
    isPlay.value = false
  })

  innerAudioContext.onError((res) => {
    console.log(res.errMsg, '播放失败')
    isPlay.value = true
  })

  innerAudioContext.src = encodeURI(props?.src)
  innerAudioContext.play()
}

onHide(() => {
  if (innerAudioContext) {
    innerAudioContext.pause() // 暂停当前播放
    innerAudioContext.stop() // 停止播放
    innerAudioContext.destroy() // 销毁音频实例
    innerAudioContext = null // 重置引用
    isPlay.value = false
  }
})

// 计算属性: audioStyle
const audioStyle = computed(() => ({
  transform: `scale(${props.size / 24})`,
}))

// 计算属性: boxStyle
const boxStyle = computed(() => {
  const directDic: any = { right: '0deg', bottom: '90deg', left: '180deg', top: '280deg' }
  const dir = directDic[props.direction || 'left']
  return {
    transform: `rotate(${dir})`,
    width: `${props.size}px`,
    height: `${props.size}px`,
  }
})
</script>

<style lang="scss" scoped>
.message {
  width: 200rpx;
  padding: 10rpx;
  margin: 24rpx 0rpx;
  border-radius: 10rpx;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  position: relative;

  .time {
    margin-left: 12rpx;
    color: $uni-text-color-placeholder;
  }

  &::before {
    content: '';
    position: absolute;
    left: -20rpx;
    top: 50%;
    transform: translateY(-50%);
    border-width: 10rpx;
    border-style: solid;
    border-color: transparent #ffffff transparent transparent;
  }
}

.box {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.audio-style {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  & > view {
    border: 2px solid transparent;
    border-radius: 50%;
  }
}

.small {
  border: 0px solid;
  width: 3px;
  height: 3px;
}

.middle {
  width: 16px;
  height: 16px;
  margin-left: -11px;
  opacity: 1;
}

.large {
  width: 26px;
  height: 26px;
  margin-left: -19px;
  opacity: 1;
}

.animation {
  .middle {
    animation: middle 1.2s ease-in-out infinite;
  }

  .large {
    animation: large 1.2s ease-in-out infinite;
  }
}

// 语音播放动画
@keyframes middle {
  0% {
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@keyframes large {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  60% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}
</style>
