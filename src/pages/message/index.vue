<template>
  <view class="container">
    <notice />
    <scroll-view
      class="scroll-view"
      scroll-y
      :refresher-enabled="true"
      :refresher-triggered="isRefreshing"
      @refresherrefresh="onRefresh"
    >
      <view class="message-list">
        <view
          class="item"
          v-for="item in chatRoomListData"
          :key="item._id"
          @click="handleDialoguePage(item)"
        >
          <view class="header">
            <view class="left">
              <image :src="item.avatar" mode="aspectFill" />
              <view>
                <view class="name">{{ item.nickname }}</view>
                <view class="years-work">{{ item.lastMessage }}</view>
              </view>
            </view>
            <view class="right">{{ moment(item.lastTime).format('MM-DD HH:mm') }}</view>
          </view>
        </view>
      </view>
    </scroll-view>
    <tabbar selected="3" />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import moment from 'moment'
import { onLoad } from '@dcloudio/uni-app'
// service
import { getChatRoomListService } from './service'
// components
import tabbar from '@/components/custom-tab-bar.vue'
import notice from './components/notice.vue'

// 聊天消息
const chatRoomListData = ref<any[]>([])
const isRefreshing = ref(false)

// 获取用户聊天列表
const getChatRoomList = async (): Promise<void> => {
  const { data } = await getChatRoomListService()
  chatRoomListData.value = data
}

// 下拉刷新
const onRefresh = async (): Promise<void> => {
  uni.showToast({ title: '加载中...', icon: 'loading', duration: 500 })
  isRefreshing.value = true
  await getChatRoomList()
  setTimeout(() => (isRefreshing.value = false), 500) // 稍微延迟更平滑
}

// 跳转到详情页
const handleDialoguePage = (item): void => {
  const { userid, nickname } = item || {}
  uni.vibrateShort()
  uni.navigateTo({
    url: `/copywriter-subpackage/dialogue/index?_id=${userid}&nickname=${nickname}`,
  })
}

onLoad(() => {
  getChatRoomList()
})
</script>

<style lang="scss">
page {
  height: 100%;
  overflow: hidden;
  background-color: #f7f7fa;
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

.message-list {
  margin: 24rpx;
  .item {
    padding: 24rpx;
    border-radius: 30rpx;
    margin-bottom: 24rpx;
    background-color: $uni-text-color-inverse;

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .left {
        display: flex;
        align-items: center;

        .years-work {
          font-size: 26rpx;
          line-height: 30rpx;
          color: $uni-text-color-placeholder;
        }

        image {
          width: 100rpx;
          height: 100rpx;
          border-radius: 50%;
          margin-right: 24rpx;
          flex-shrink: 0;
        }
      }

      .right {
        font-size: 28rpx;
        color: $uni-bg-color;
      }
    }
  }
}
</style>
