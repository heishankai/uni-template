<template>
  <view class="container">
    <!-- 搜索 -->
    <view class="navbar" :style="{ paddingTop: safeAreaInsets!.top + 'px' }">
      <view class="tips">我的订单</view>
      <view class="search">
        <view class="search-input">
          <uni-icons type="search" color="#00cec9" size="24" />
          <input placeholder="请输入撰稿人名称查询" @input="handleInputChange" />
        </view>
      </view>
    </view>
    <scroll-view class="scroll-view" scroll-y>
      <!-- 订单列表 -->
      <order-card :orderInfoList="orderInfoList" />
    </scroll-view>
    <tabbar selected="3" />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { debounce } from 'lodash-es'
// components
import orderCard from './components/order-card.vue'
import tabbar from '@/components/custom-tab-bar.vue'
// service
import { getReserveOrderService } from './service'

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()

// 撰稿人列表数据
const allOrderInfoList = ref<any[]>([]) // 所有数据的备份
const orderInfoList = ref<any[]>([]) // 当前展示的数据

// 搜索
const handleInputChange = debounce(async (e: any): Promise<any> => {
  const keyword = e.detail.value?.trim().toLowerCase()

  if (!keyword) {
    orderInfoList.value = allOrderInfoList.value
    return
  }

  orderInfoList.value = allOrderInfoList.value.filter((item) =>
    item.copywriter_name?.toLowerCase().includes(keyword),
  )
}, 300)

// 获取订单列表数据
const getOrderListData = async (): Promise<any> => {
  uni.showLoading({ title: '加载中...', mask: true })

  const { data } = await getReserveOrderService()
  allOrderInfoList.value = data
  orderInfoList.value = data

  uni.hideLoading()
}

onLoad(() => {
  getOrderListData()
})
</script>

<style lang="scss">
page {
  height: 100%;
  overflow: hidden;
  background-color: $uni-text-color-inverse;
}

.container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.scroll-view {
  flex: 1;
  overflow: hidden;
  margin-bottom: env(safe-area-inset-bottom);
}

.navbar {
  background-size: cover;
  position: relative;
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  padding: 20rpx 30rpx 30rpx 30rpx;
  background-color: $uni-bg-color;

  .tips {
    margin-top: 20rpx;
    font-family: Poppins;
    font-size: 30px;
    font-weight: bold;
    line-height: 42px;
    letter-spacing: -0.3px;
    color: $uni-text-color-inverse;
  }

  .search {
    margin-top: 40rpx;
    padding-bottom: 30rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .search-input {
      display: flex;
      align-items: center;
      flex: 1;
      padding: 20rpx;
      letter-spacing: 0.54rpx;
      font-size: 28rpx;
      border-radius: 30px;
      color: $uni-text-color-placeholder;
      background: $uni-text-color-inverse;
      box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

      uni-icons {
        margin-right: 16rpx;
      }

      input {
        flex: 1;
        border: none;
        outline: none;
        background: transparent;
        color: $uni-text-color;
        font-size: 28rpx;
      }
    }
  }
}
</style>
