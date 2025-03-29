<template>
  <view :style="[boxStyle]" class="box">
    <view class="audio-style" :style="[audioStyle]" :class="{ animation: isPlay }">
      <view class="small" :style="{ 'background-color': color }"></view>
      <view class="middle" :style="{ 'border-right-color': color }"></view>
      <view class="large" :style="{ 'border-right-color': color }"></view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

// 定义 props
const props = defineProps({
  isPlay: {
    type: Boolean,
    default: false,
  },
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
/* view {
  box-sizing: border-box;
} */

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
