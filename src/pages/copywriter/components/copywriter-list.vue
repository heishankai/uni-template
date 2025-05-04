<template>
  <view class="copywriter-list">
    <view class="copywriter-list__title">
      <view>每日推荐</view>
    </view>
    <view class="copywriter-list-item" v-for="item in guessList" :key="item._id">
      <view class="header">
        <view class="left" @click="handleCopywriterPage(item)">
          <image :src="item.avatar" mode="aspectFill" />
          <view>
            <view class="name">{{ item?.nickname }}</view>
            <view class="years-work">稿龄：{{ item.straw }}年</view>
          </view>
        </view>
        <view class="right" @click="handleCollect(item._id)">
          <text v-if="item?.isCollect">已收藏</text>
          <view v-else>
            <uni-icons type="plusempty" size="18" color="#00cec9" />
            <text>收藏</text>
          </view>
        </view>
      </view>
      <view class="synopsis" @click="handleCopywriterPage(item)">
        <view>简介： {{ item?.synopsis }}</view>
      </view>
      <view class="footer">
        <view class="left">
          <view @click="handlePraise(item._id)">
            <button class="like">
              <image
                v-if="item.isLike"
                src="@/static/copywriter-sbuPages/praise_on.png"
                mode="aspectFill"
              />
              <image v-else src="@/static/copywriter-sbuPages/praise.png" mode="aspectFill" />
              <view v-show="item?.likeCount">{{ item?.likeCount }}</view>
            </button>
          </view>
        </view>
        <view @click="handleShare(item)">
          <button open-type="share" class="share">
            <uni-icons custom-prefix="iconfont" type="icon-fenxiang" color="#808080" size="18" />
            <text>分享</text>
          </button>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onLoad, onShareAppMessage } from '@dcloudio/uni-app'
// services
import { getAllWriterService, CollectAndUncollectService, LikeOrUnlikeService } from '../service'
// utils
import { useShare } from '@/utils/useShare'

const { setShareData, onShareAppMessage: shareHandler } = useShare()

const guessList = ref<any[]>([])
const finish = ref(false)
const pageParams = ref<{ page: number; limit: number }>({
  page: 1,
  limit: 10,
})

// 列表数据
const getHomeGoodsGuessLikeData = async (): Promise<void> => {
  // 退出分页判断
  if (finish.value === true) {
    return uni.showToast({ icon: 'none', title: '没有更多数据~' })
  }
  const { data }: any = await getAllWriterService({ ...pageParams.value })

  // 数组追加
  guessList.value.push(...(data?.data ?? []))

  // // 分页条件
  if (pageParams.value.page) {
    // 页码累加
    pageParams.value.page++
  }

  if (!data?.data?.length) {
    finish.value = true
  }
}

// 重置数据
const resetData = (): void => {
  pageParams.value.page = 1
  guessList.value = []
  finish.value = false
}

// 组件挂载完毕
onLoad(() => {
  getHomeGoodsGuessLikeData()
})

// 暴露方法
defineExpose({
  resetData,
  getMore: getHomeGoodsGuessLikeData,
})

// 跳转到详情页
const handleCopywriterPage = (item): void => {
  const { openid, nickname } = item ?? {}
  uni.vibrateShort()
  uni.navigateTo({
    url: `/copywriter-subpackage/copywriter-info/index?openid=${openid}&nickname=${nickname}`,
  })
}

// 收藏
const handleCollect = async (writerId): Promise<void> => {
  uni.vibrateShort()
  const { data } = await CollectAndUncollectService({ writerId })

  // 更新当前列表中对应撰稿人的收藏状态
  const index = guessList.value.findIndex((guessItem) => guessItem?._id === writerId)
  if (index !== -1) {
    guessList.value[index].isCollect = data?.data
  }
}

// 点赞
const handlePraise = async (writerId): Promise<void> => {
  uni.vibrateShort()
  const { data } = await LikeOrUnlikeService({ writerId })
  const { likeCount, isLike } = data ?? {}

  // 更新当前列表中对应撰稿人的点赞状态
  const index = guessList.value.findIndex((guessItem) => guessItem?._id === writerId)
  if (index !== -1) {
    guessList.value[index].isLike = isLike
    guessList.value[index].likeCount = likeCount
  }
}

// 分享
const handleShare = (item): any => {
  uni.vibrateShort()

  const { openid, nickname, avatar } = item ?? {}

  setShareData({
    imageUrl: avatar,
    title: nickname,
    path: `/copywriter-subpackage/copywriter-info/index?openid=${openid}&nickname=${nickname}`, // 指向详情页并带参数
  })
}

// 注册分享事件处理函数
onShareAppMessage(shareHandler)
</script>

<style lang="scss" scoped>
.copywriter-list {
  margin: 24rpx;

  .copywriter-list__title {
    margin: 24rpx 0rpx;
    font-family: Montserrat;
    font-size: 18px;
    font-weight: bold;
    line-height: 27px;
    letter-spacing: 0.54px;
    color: $uni-text-color-black;
  }

  .copywriter-list-item {
    padding: 12rpx;
    border-radius: 30rpx;
    margin-bottom: 30rpx;
    background-color: #f7f7fa;

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
        width: 120rpx;
        height: 40rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        border-radius: 30px;
        font-size: 28rpx;
        color: $uni-bg-color;
        border: 1px solid $uni-bg-color;
        /* box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25); */
      }
    }

    .synopsis {
      padding-top: 24rpx;
      height: 200rpx;
      font-size: 28rpx;
      color: $uni-text-color-placeholder;
      margin-top: 12rpx;
    }

    .footer {
      display: flex;
      justify-content: space-between;
      align-items: center;

      button {
        margin: 0rpx;
        line-height: normal;

        &::after {
          border: none;
        }
      }

      .share {
        display: flex;
        align-items: center;
        font-size: 28rpx;
        color: $uni-text-color-placeholder;

        text {
          margin-left: 12rpx;
        }
      }

      .left {
        display: flex;
        align-items: center;

        .like {
          display: flex;
          align-items: center;

          image {
            width: 46rpx;
            height: 46rpx;
          }

          view {
            margin-left: 12rpx;
            color: $uni-text-color-placeholder;
          }
        }
      }
    }
  }
}
</style>
