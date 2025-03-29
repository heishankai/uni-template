<template>
  <view class="message-list">
    <view
      class="item"
      v-for="item in messageListData"
      :key="item.id"
      @click="handleDialoguePage(item)"
    >
      <view class="header">
        <view class="left">
          <image :src="item.avatar" mode="aspectFill" />
          <view>
            <view class="name">{{ item.name }}</view>
            <view class="years-work">{{ item.message }}</view>
          </view>
        </view>
        <view class="right">{{ item.time }}</view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
defineProps({
  messageListData: [],
})

// 跳转到详情页
const handleDialoguePage = (item): void => {
  const { id, name } = item || {}
  uni.vibrateShort()
  uni.navigateTo({
    url: `/copywriter-subpackage/dialogue/index?id=${id}&name=${name}`,
  })
}
</script>

<style lang="scss" scoped>
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
          list-style: 30rpx;
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
