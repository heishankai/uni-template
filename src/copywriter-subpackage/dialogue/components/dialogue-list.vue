<template>
  <view class="dialogue-list">
    <view class="opposite" v-for="item in messageListData" :key="item.userid">
      <!-- 别人发的 -->
      <view class="header" v-if="item.userid !== getUserInfo().id">
        <view class="left" @click="handleDialogueDetails(item)">
          <image :src="item?.avatar" mode="aspectFill" />
          <view class="message">{{ item?.message }}</view>
        </view>
      </view>
      <!-- 自己发的 -->
      <view class="header" v-else>
        <view class="right" @click="handleDialogueDetails(item)">
          <view class="message">{{ item.message }}</view>
          <image :src="item.avatar" mode="aspectFill" />
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { getUserInfo } from '../utils'

interface MessageItem {
  userid: string
  avatar: string
  message: string
  nickname?: string
}

defineProps({
  messageListData: {
    type: Array as () => MessageItem[],
    default: () => [],
  },
})

// 跳转到详情页
const handleDialogueDetails = (item): void => {
  const { userid, nickname } = item || {}
  uni.vibrateShort()
  uni.navigateTo({
    url: `/copywriter-subpackage/dialogue-detail/index?_id=${userid}&nickname=${nickname}`,
  })
}
</script>

<style lang="scss" scoped>
.dialogue-list {
  margin: 24rpx;

  .opposite {
    padding: 24rpx;
    border-radius: 30rpx;
    margin-bottom: 24rpx;

    .header {
      display: flex;
      align-items: center;
      justify-content: flex-start;

      .left {
        width: 100%;
        display: flex;
        align-items: center;

        .message {
          padding: 24rpx;
          border-radius: 20px 20px 20px 4px;
          background: #f0f4fe;
          font-size: 36 rpx;
          list-style: 40rpx;
          color: $uni-text-color-placeholder;
        }

        image {
          margin-right: 12rpx;
          width: 100rpx;
          height: 100rpx;
          border-radius: 50%;
          flex-shrink: 0;
        }
      }
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: flex-end;

      .right {
        display: flex;
        align-items: center;

        .message {
          padding: 24rpx;
          border-radius: 20px 20px 4px 20px;
          background: $uni-bg-color;
          font-size: 36 rpx;
          list-style: 40rpx;
          color: $uni-text-color-inverse;
        }

        image {
          margin-left: 12rpx;
          width: 100rpx;
          height: 100rpx;
          border-radius: 50%;
          flex-shrink: 0;
        }
      }
    }
  }
}
</style>
