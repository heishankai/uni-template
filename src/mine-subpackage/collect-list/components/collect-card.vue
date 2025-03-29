<template>
  <view
    class="order-item"
    v-for="collec in collectList"
    :key="collec.id"
    @click="handleGoDetail(collec.id)"
  >
    <view class="item-body">
      <image src="https://img.yzcdn.cn/vant/cat.jpeg" mode="scaleToFill" />
      <view class="body-info">
        <view>{{ collec.copywriterName }}</view>
        <view>
          <text>性别：</text>
          <text class="order-time">{{ collec.gender }}</text>
        </view>
        <view>
          <text>稿龄：</text>
          <text class="order-time">{{ collec.yearsWork }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
defineProps({
  collectList: Array,
  default: [],
})

const handleGoDetail = (id: number): void => {
  uni.navigateTo({
    url: `/copywriter-subpackage/copywriter-info/index?id=${id}`,
  })
}
</script>

<style lang="scss" scoped>
.order-item {
  padding: 24rpx;
  border-radius: 12rpx;
  background-color: $uni-text-color-inverse;
  margin-bottom: 30rpx;
}

.item-body {
  padding-top: 24rpx;
  display: flex;

  image {
    width: 180rpx;
    height: 180rpx;
    border-radius: 12rpx;
  }

  .body-info {
    margin-left: 30rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    font-size: 32rpx;
    color: $uni-text-color-placeholder;

    .order-time {
      font-size: 28rpx;
    }
  }
}
</style>
