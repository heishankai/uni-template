<template>
  <transition name="fade">
    <view class="animation" :style="{ height: height + 'rpx' }">
      <view
        v-for="(scale, index) in scales"
        :key="index"
        v-show="isRecording"
        class="animate"
        :style="{ '--scale': scale, animationDelay: `${index % 2 === 0 ? 500 : 300}ms` }"
      />
    </view>
  </transition>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const { isRecording, count } = defineProps({
  isRecording: { type: Boolean, default: false },
  count: { type: Number, default: 40 },
  height: { type: Number, default: 180 },
})

const mid = count / 2

const scales = computed(() =>
  Array.from({ length: count }, (_, i) => {
    const scaleBase = Math.random() * 0.8 + 0.2
    const distanceFromMiddle = Math.abs(i - mid)
    return Math.max(scaleBase, 0.2) * (1 - distanceFromMiddle / mid) * 20
  }),
)
</script>

<style lang="scss" scoped>
/* 过渡动画优化 */
.fade {
  &-enter-active,
  &-leave-active {
    transition: opacity 0.5s ease;
    will-change: opacity;
  }

  &-enter,
  &-leave-to {
    opacity: 0;
  }
}

/* 录音动画 */
.animation {
  display: flex;
  justify-content: center;
  align-items: center;
}

.animate {
  background: #c8bfbf;
  width: 4rpx;
  height: 4rpx;
  margin: 0 3rpx;
  animation: note 400ms ease-in-out infinite alternate;
}

/* 关键帧优化 */
@keyframes note {
  0% {
    transform: scaleY(0.5);
  }
  100% {
    transform: scaleY(var(--scale));
  }
}
</style>
