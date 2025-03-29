<template>
  <view class="container">
    <scroll-view scroll-y>
      <template>
        <image
          src="@/static/copywriter-sbuPages/WechatIMG127.jpg"
          mode="scaleToFill"
          @click="previewImage('./static/copywriter-sbuPages/WechatIMG127.jpg')"
        />
        <image
          src="@/static/copywriter-sbuPages/WechatIMG129.jpg"
          mode="scaleToFill"
          @click="previewImage('./static/copywriter-sbuPages/WechatIMG129.jpg')"
        />
        <image
          src="@/static/copywriter-sbuPages/WechatIMG128.jpg"
          mode="scaleToFill"
          @click="previewImage('./static/copywriter-sbuPages/WechatIMG128.jpg')"
        />
      </template>
    </scroll-view>
    <view class="footer">
      <view class="operate">
        <view @click="handleCollect">
          <image
            v-if="copywriterInfo.collect"
            src="@/static/copywriter-sbuPages/collect_on.png"
            mode="aspectFill"
          />
          <image v-else src="@/static/copywriter-sbuPages/collect.png" mode="aspectFill" />
          <text :style="{ color: copywriterInfo.collect ? '#151515' : '#c8bfbf' }">收藏</text>
        </view>
        <view @click="handlePraise">
          <image
            v-if="copywriterInfo.praise"
            src="@/static/copywriter-sbuPages/praise_on.png"
            mode="aspectFill"
          />
          <image v-else src="@/static/copywriter-sbuPages/praise.png" mode="aspectFill" />
          <text :style="{ color: copywriterInfo.praise ? '#151515' : '#c8bfbf' }">点赞</text>
        </view>
      </view>
      <button @click="handleSubscribe">立即预约</button>
    </view>
    <!-- 预约弹出 -->
    <subscribe-modal ref="subscribeModalRef" />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// components
import subscribeModal from './components/subscribe-modal.vue'

// 撰稿人信息
const copywriterInfo = ref<any>({
  collect: true, // 是否收藏
  praise: false, // 是否点赞
  resume: [], // 简历
})

const subscribeModalRef = ref()

// 收藏
const handleCollect = (): void => {
  uni.vibrateShort()
  copywriterInfo.value.collect = !copywriterInfo.value.collect
  uni.showToast({ title: '收藏成功', icon: 'none' })
}

// 点赞
const handlePraise = (): void => {
  uni.vibrateShort()
  copywriterInfo.value.praise = !copywriterInfo.value.praise
  uni.showToast({ title: '点赞成功', icon: 'none' })
}

// 立即预约
const handleSubscribe = (): void => {
  subscribeModalRef.value.subscribeModalOpen.open()
}

// 预览图片
const previewImage = (url: string): void => {
  uni.previewImage({
    current: url,
    urls: [
      '@/static/copywriter-sbuPages/WechatIMG127.jpg',
      '@/static/copywriter-sbuPages/WechatIMG129.jpg',
      '@/static/copywriter-sbuPages/WechatIMG128.jpg',
    ],
  })
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
}

scroll-view {
  flex: 1;
  overflow-y: auto;

  image {
    width: 100%;
    height: 100%;
  }
}

.footer {
  display: flex;
  align-items: center;
  background-color: #ffffff;
  padding-bottom: env(safe-area-inset-bottom);
  padding-top: 12rpx;
  padding-left: 42rpx;
  padding-right: 42rpx;

  .operate {
    display: flex;
    align-items: center;

    view {
      margin-right: 56rpx;
      display: flex;
      flex-direction: column;
      align-items: center;

      text {
        margin-top: 6rpx;
        font-size: 24rpx;
        font-weight: 500;
        letter-spacing: 0.54rpx;
      }

      image {
        width: 46rpx;
        height: 46rpx;
      }
    }
  }

  button {
    flex: 1;
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
}
</style>
