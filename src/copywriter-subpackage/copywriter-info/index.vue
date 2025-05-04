<template>
  <view class="container">
    <scroll-view class="scroll-view" scroll-y :show-scrollbar="false">
      <image
        v-for="(item, index) in copywriterInfo?.resume_images"
        :key="index"
        :src="item"
        mode="aspectFill"
        @click="previewImage(item)"
      />
    </scroll-view>
    <view class="footer">
      <view class="operate">
        <view @click="handleCollect(copywriterInfo?._id)">
          <image
            v-if="copywriterInfo?.isCollect"
            src="@/static/copywriter-sbuPages/collect_on.png"
            mode="aspectFill"
          />
          <image v-else src="@/static/copywriter-sbuPages/collect.png" mode="aspectFill" />
          <text :style="{ color: copywriterInfo.collect ? '#151515' : '#c8bfbf' }">收藏</text>
        </view>
        <view @click="handlePraise(copywriterInfo?._id)">
          <image
            v-if="copywriterInfo?.isLike"
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
    <subscribe-modal ref="subscribeModalRef" :copywriterInfo="copywriterInfo" />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
// components
import subscribeModal from './components/subscribe-modal.vue'
// service
import { getOnewriterService, CollectAndUncollectService, LikeOrUnlikeService } from './service'

const copywriterInfo = ref<any>({})
const subscribeModalRef = ref()

// 收藏
const handleCollect = async (writerId): Promise<void> => {
  uni.vibrateShort()
  const { data } = await CollectAndUncollectService({ writerId })
  uni.showToast({ title: data?.message, icon: 'none' })
  copywriterInfo.value.isCollect = data?.data
}

// 点赞
const handlePraise = async (writerId): Promise<void> => {
  uni.vibrateShort()
  const { data } = await LikeOrUnlikeService({ writerId })

  uni.showToast({ title: data?.message, icon: 'none' })
  copywriterInfo.value.isLike = data?.isLike
}

// 立即预约
const handleSubscribe = (): void => {
  subscribeModalRef.value.subscribeModalOpen.open()
}

// 预览图片
const previewImage = (url: string): void => {
  uni.previewImage({
    current: url,
    urls: [url],
  })
}

onLoad(async (options) => {
  const { openid, nickname } = options || {}
  uni.setNavigationBarTitle({ title: decodeURIComponent(nickname) })

  const { data } = await getOnewriterService({ openid })
  copywriterInfo.value = data || {}
})
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

.scroll-view {
  flex: 1;

  image {
    width: 100%;
    height: 100%;
    object-fit: cover;
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
