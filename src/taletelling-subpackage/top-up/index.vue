<template>
  <view class="container">
    <scroll-view class="scroll-view">
      <view class="header">
        <image class="avatar" :src="userInfo.avatar" mode="scaleToFill" />
        <view>{{ userInfo.nickname }}</view>
      </view>
      <view class="main">
        <view class="card-container">
          <view
            class="card"
            :class="{ selected: selectedCardIndex === index }"
            v-for="(item, index) in priceList"
            :key="index"
            @click="selectCard(index)"
          >
            <uni-icons
              v-if="selectedCardIndex === index"
              class="icon-selected"
              type="checkmarkempty"
              size="21"
              color="#00cec9"
            />
            <view>{{ item.orderAmount }}元/月（{{ item.count }}条）</view>
            <view class="original-price">原价{{ item.originalPrice }}元</view>
          </view>
        </view>
      </view>
    </scroll-view>
    <button class="btn" @click="onTopUp">立即充值</button>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// store
import { useUserInfoStore } from '@/stores'
// service
import { topUpRecordLengthService, topUpRecordLengthSeccessService } from './service'

const { userInfo } = useUserInfoStore()
const selectedCardIndex = ref<number | null>(null)

// 价格列表
const priceList = ref([
  {
    orderAmount: 9.9,
    count: 10,
    originalPrice: 19.9,
  },
  {
    orderAmount: 19.9,
    count: 30,
    originalPrice: 59.7,
  },
  {
    orderAmount: 69.9,
    count: 120,
    originalPrice: 238.8,
  },
])

// 选中卡片
const selectCard = (index: number): void => {
  selectedCardIndex.value = index
}

// 立即充值
const onTopUp = async (): Promise<void> => {
  if (selectedCardIndex.value === null) {
    uni.showToast({
      title: '请先选择充值卡片',
      icon: 'none',
    })
    return
  }
  const { orderAmount, count } = priceList.value[selectedCardIndex.value]
  console.log('Selected item:', { orderAmount, count })

  uni.showLoading({ title: '支付中...', mask: true })

  // 调用服务端接口 - 获取支付参数
  const { data, message } = await topUpRecordLengthService({
    orderAmount,
    count,
  })

  if (message !== 'SUCCESS') {
    uni.showToast({ title: message, icon: 'none' })
    return
  }

  // 调用支付接口
  uni.requestPayment({
    provider: 'wxpay',
    orderInfo: '1',
    ...data,
    success: async () => {
      const { data: successData, message } = await topUpRecordLengthSeccessService({
        outTradeNo: data.out_trade_no,
        count,
      })

      uni.showToast({ title: '支付成功', icon: 'none' })
      uni.hideLoading()

      if (message === '支付成功') {
        userInfo.record_length = successData
      }
    },
    fail: async () => {
      const { data: successData, message } = await topUpRecordLengthSeccessService({
        outTradeNo: data.out_trade_no,
        count,
      })
      if (message === '支付成功') {
        userInfo.record_length = successData
      }
      uni.hideLoading()
    },
  })
  uni.hideLoading()
}
</script>

<style lang="scss">
page {
  height: 100vh;
  overflow: hidden;
}

.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: $uni-text-color-inverse;
}

.scroll-view {
  flex: 1;
  overflow: hidden;
}

.header {
  margin: 24rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  view {
    font-weight: 500;
    margin-top: 24rpx;
  }
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  flex-shrink: 0;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}

.main {
  margin: 48rpx 24rpx 24rpx 24rpx;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 24rpx; // 卡片之间的间距
}

.card {
  position: relative; // 确保子元素可以使用绝对定位
  flex: 1 1 calc(50% - 24rpx); // 每行最多两个卡片，减去间距
  padding: 24rpx;
  background-color: $uni-card-bg-color;
  border-radius: 8rpx;
  line-height: 2.5;
  font-size: 34rpx;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border: 2rpx solid transparent; // 默认无边框
  transition: all 0.3s; // 添加过渡效果
}

.card.selected {
  border-color: $uni-bg-color; // 选中时边框变为红色
  color: $uni-bg-color; // 选中时文字变为红色
}

.icon-selected {
  position: absolute;
  top: -36rpx; // 距离卡片顶部的距离
  left: -6rpx; // 距离卡片左侧的距离
  z-index: 1; // 确保图标在最上层
}

.card:nth-child(odd):last-child {
  flex: 1 1 100%; // 如果是单个卡片，占据整行
}

.original-price {
  text-decoration: line-through;
  color: #999; // 可选：设置灰色以突出划线效果
  font-size: 28rpx; // 可选：调整字体大小
}

button {
  margin: 24rpx 24rpx env(safe-area-inset-bottom) 24rpx;
  font-weight: 500;
  letter-spacing: 3px;
  border-radius: 30px;
  color: $uni-text-color-inverse;
  background-color: $uni-bg-color;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

  &::after {
    border: none;
  }
}
</style>
