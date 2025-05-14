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
import { ref, computed, onUnmounted } from 'vue'
import { eventBus } from '@/utils/eventBus'

// props
const props = defineProps({
  direction: { type: String, default: 'right' },
  size: { type: Number, default: 24 },
  color: { type: String, default: '#222' },
  src: { type: String, default: '' },
  time: { type: String, default: '' },
})

const isPlay = ref(false)
let innerAudioContext: UniApp.InnerAudioContext | null = null

const play = (): void => {
  if (isPlay.value) {
    innerAudioContext?.stop()
    isPlay.value = false
    return
  }

  eventBus.emit('stopAll') // 通知其他组件停止播放

  if (!innerAudioContext) {
    innerAudioContext = uni.createInnerAudioContext()
    innerAudioContext.autoplay = true

    uni.setInnerAudioOption({
      obeyMuteSwitch: false,
    })
  }

  innerAudioContext.src = encodeURI(props.src)
  innerAudioContext.play()
  isPlay.value = true

  innerAudioContext.onEnded(() => {
    isPlay.value = false
  })

  innerAudioContext.onError(() => {
    isPlay.value = false
  })
}

eventBus.on('stopAll', () => {
  if (isPlay.value && innerAudioContext) {
    innerAudioContext.stop()
    isPlay.value = false
  }
})

onUnmounted(() => {
  eventBus.off('stopAll')
  if (innerAudioContext) {
    innerAudioContext.stop()
    innerAudioContext.destroy()
    innerAudioContext = null
  }
  isPlay.value = false
})

const audioStyle = computed(() => ({
  transform: `scale(${props.size / 24})`,
}))

const boxStyle = computed(() => {
  const directions = { right: '0deg', bottom: '90deg', left: '180deg', top: '270deg' }
  const dir = directions[props.direction] || '0deg'
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

  > view {
    border: 2px solid transparent;
    border-radius: 50%;
  }
}

.small {
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
