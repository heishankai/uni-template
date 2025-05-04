<template>
  <view class="copywriter-list">
    <view class="copywriter-list-item" v-for="item in writerListdata" :key="item._id">
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
        <view class="left"> </view>
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
import { CollectAndUncollectService } from '../service'
import { onShareAppMessage } from '@dcloudio/uni-app'
// utils
import { useShare } from '@/utils/useShare'

const { setShareData, onShareAppMessage: shareHandler } = useShare()

interface Writer {
  id: string
  avatar: string
  nickname: string
  straw: number
  synopsis: string
  praiseNumber: number
  openid: string
  _id: string
  isCollect: boolean
  isLike: boolean
}

defineProps<{
  writerListdata: Writer[]
}>()

// 收藏
const emit = defineEmits(['updateWriterListdata'])

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
  uni.showToast({ title: data?.message, icon: 'none' })

  emit('updateWriterListdata')
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

      .share {
        display: flex;
        align-items: center;
        font-size: 28rpx;
        color: $uni-text-color-placeholder;

        text {
          margin-left: 12rpx;
        }
      }

      button {
        margin: 0rpx;
        line-height: normal;

        &::after {
          border: none;
        }
      }

      .left {
        display: flex;
        align-items: center;

        image {
          width: 46rpx;
          height: 46rpx;
        }
      }
    }
  }
}
</style>
