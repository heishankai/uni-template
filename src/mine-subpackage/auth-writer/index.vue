<template>
  <view class="container">
    <search-navbar :selectedTab="selectedTab" @updateSelectTab="updateSelectTab" />
    <scroll-view
      enable-back-to-top
      refresher-enabled
      @refresherrefresh="onRefresherrefresh"
      :refresher-triggered="isTriggered"
      class="scroll-view"
      scroll-y
    >
      <auth-info :stepsList="stepsList" :active="active" />
    </scroll-view>
    <button class="btn" @click="onApplyFor">申请认证 (99元)</button>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onShow } from '@dcloudio/uni-app'
// components
import authInfo from './components/auth-info.vue'
// service
import { addAuthWriterOrderService, getAuthwriterStatusSrevice } from './service'

const selectedTab = ref<string>('0')
const isTriggered = ref(false)

const active = ref(0)
const stepsList = ref([
  {
    title: '等待提交申请',
    desc: '',
  },
  {
    title: '审核中',
    desc: '请发送简历和作品(链接)到：hr@1shaoyan.com 邮箱',
  },
  {
    title: '认证成功',
    desc: '',
  },
])

// 选择 tab 方法
const updateSelectTab = (val): void => {
  selectedTab.value = val
}

// 自定义下拉刷新被触发
const onRefresherrefresh = async (): Promise<void> => {
  // 开始动画
  isTriggered.value = true

  // 加载数据
  await getAuthwriterStatus()

  // 关闭动画
  isTriggered.value = false
}

// 申请认证
const onApplyFor = async (): Promise<void> => {
  uni.vibrateShort()
  uni.showLoading({ title: '支付中...', mask: true })

  // 调用服务端接口 - 获取支付参数
  const { data } = await addAuthWriterOrderService({
    orderAmount: 0.01,
  })

  // 调用支付接口
  uni.requestPayment({
    provider: 'wxpay',
    orderInfo: '1',
    ...data,
    success: async () => {
      await getAuthwriterStatus()
      uni.hideLoading()
    },
    fail: async () => {
      await getAuthwriterStatus()
      uni.hideLoading()
    },
  })

  uni.hideLoading()
}

// 获取认证状态
const getAuthwriterStatus = async (): Promise<void> => {
  const { data } = await getAuthwriterStatusSrevice()
  if (data) {
    active.value = data
  }
}

onShow(() => {
  getAuthwriterStatus()
})
</script>

<style lang="scss">
page {
  height: 100%;
  overflow: hidden;
  background: linear-gradient(to bottom, #f0faf9, #b3e5dc, #b3e5dc);
}

.container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.scroll-view {
  flex: 1;
  overflow: hidden;
}

button {
  width: 86%;
  line-height: 90rpx;
  font-size: 38rpx;
  border-radius: 30px;
  font-family: Roboto;
  letter-spacing: 0.54rpx;
  color: $uni-text-color-inverse;
  background-color: $uni-bg-color;
  margin-bottom: env(safe-area-inset-bottom);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

  &::after {
    border: none;
  }
}
</style>
