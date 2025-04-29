<template>
  <uni-popup
    ref="subscribeModalOpen"
    safe-area
    animation
    background-color="#FFFFFF"
    type="center"
    borderRadius="12px"
  >
    <view class="content">
      <view>录制已达上限</view>
      <view class="top-up" @click="hadleTopUp">
        <text>前往充值</text>
        <uni-icons custom-prefix="iconfont" type="icon-jinru" color="#00cec9" size="48" />
      </view>
    </view>
    <view class="close-btn">
      <uni-icons type="close" size="36" color="#FFFFFF" @click="handleClose" />
    </view>
  </uni-popup>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const subscribeModalOpen = ref<any>(false)

// 充值
const hadleTopUp = (): void => {
  uni.navigateTo({ url: `/taletelling-subpackage/top-up/index` })
}

// 关闭弹窗
const handleClose = (): void => {
  subscribeModalOpen.value.close()
}

defineExpose({
  subscribeModalOpen,
})
</script>

<style lang="scss" scoped>
.content {
  width: 50vw;
  height: 30vh;
  padding: 18rpx;
  color: $uni-text-color-placeholder;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .top-up {
    margin-top: 58rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #00cec9;

    text {
      margin-right: 12rpx;
    }
  }
}

.close-btn {
  position: absolute;
  bottom: -46px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
