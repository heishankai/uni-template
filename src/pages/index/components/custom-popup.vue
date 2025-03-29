<template>
  <uni-popup
    ref="subscribeModalOpen"
    safe-area
    animation
    background-color="#FFFFFF"
    type="center"
    borderRadius="12px"
  >
    <view class="title"> 放置的内容 </view>
    <!-- 关闭按钮放在底部 -->
    <view class="close-btn">
      <uni-icons type="close" size="28" color="#67676e" @click="handleClose" />
    </view>
  </uni-popup>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const subscribeModalOpen = ref<any>(false)

// 关闭弹窗
const handleClose = (): void => {
  subscribeModalOpen.value.close()
}

defineExpose({
  subscribeModalOpen,
})
</script>

<style lang="scss" scoped>
.title {
  width: 50vw;
  height: 30vh;
  padding: 18rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 关闭按钮样式 */
.close-btn {
  position: absolute;
  bottom: 16px; /* 距离底部 */
  left: 50%;
  transform: translateX(-50%);
}
</style>
