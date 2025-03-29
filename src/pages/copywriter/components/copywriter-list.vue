<template>
  <view class="copywriter-list">
    <view class="copywriter-list__title">
      <view>每日推荐</view>
    </view>
    <view class="copywriter-list-item" v-for="item in guessList" :key="item.id">
      <view class="header">
        <view class="left" @click="handleCopywriterPage(item.id)">
          <image :src="item.picture" mode="aspectFill" />
          <view>
            <view class="name">陈淑雅</view>
            <view class="years-work">稿龄：{{ item.yearsWork }}年</view>
          </view>
        </view>
        <view class="right" @click="handleCollect(item.id)">
          <uni-icons type="plusempty" size="18" color="#00cec9" />
          <text>收藏</text>
        </view>
      </view>
      <image :src="item.picture" mode="aspectFill" @click="handleCopywriterPage(item.id)" />
      <view class="footer">
        <view class="left">
          <view class="praise-number" @click="handlePraise(item.id)">
            <button>
              <uni-icons custom-prefix="iconfont" type="icon-like" color="#808080" size="20" />
              <text>{{ item.praiseNumber }}</text>
            </button>
          </view>
          <view class="collect-number" @click="handleCollect(item.id)">
            <button>
              <uni-icons custom-prefix="iconfont" type="icon-fav" color="#808080" size="20" />
              <text>{{ item.collectNumber }}</text>
            </button>
          </view>
        </view>
        <view @click="handleShare(item.id)">
          <button open-type="share">
            <uni-icons custom-prefix="iconfont" type="icon-fenxiang" color="#808080" size="20" />
          </button>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { HomeGoodsGuessLikeData } from '../types'
// services
import { getHomeGoodsGuessLikeAPI } from '../service'

const pageParams: HomeGoodsGuessLikeData = {
  categoryId: 0,
  page: 1,
  pageSize: 10,
}

// 已结束标记
const finish = ref(false)

// 列表数据
const getHomeGoodsGuessLikeData = async (): Promise<void> => {
  // 退出分页判断
  if (finish.value === true) {
    return uni.showToast({ icon: 'none', title: '没有更多数据~' })
  }
  const { result }: any = await getHomeGoodsGuessLikeAPI(pageParams)
  console.log(result?.items, 'result')

  // 数组追加
  guessList.value.push(...result.items)
  // 分页条件
  if (pageParams?.page < result?.pages) {
    // 页码累加
    pageParams.page++
  } else {
    finish.value = true
  }
}

// 重置数据
const resetData = (): void => {
  pageParams.page = 1
  guessList.value = []
  finish.value = false
}

// 组件挂载完毕
onMounted(() => {
  // getHomeGoodsGuessLikeData()
})

// 暴露方法
defineExpose({
  resetData,
  getMore: getHomeGoodsGuessLikeData,
})

// 跳转到详情页
const handleCopywriterPage = (id): void => {
  uni.vibrateShort()
  uni.navigateTo({
    url: `/copywriter-subpackage/copywriter-info/index?id=${id}`,
  })
}

// 收藏
const handleCollect = (id): void => {
  uni.vibrateShort()
  console.log(id)
  uni.showToast({ title: '收藏成功', icon: 'none' })
}

// 点赞
const handlePraise = (id): void => {
  uni.vibrateShort()
  console.log(id)
  uni.showToast({ title: '点赞成功', icon: 'none' })
}

// 分享
const handleShare = (id): void => {
  uni.vibrateShort()
  console.log(id)
}

// 猜你喜欢的列表
const guessList = ref<any[]>([
  {
    desc: '我的简介来咯我的简介来咯我的简介来咯我的简介来咯我的简介来咯我的简介来咯我的简介来咯我的简介来咯我的简介来咯我的简介来咯',
    id: '1477017',
    name: '陈淑雅',
    record: 115,
    yearsWork: 6,
    picture: 'https://yanxuan-item.nosdn.127.net/4aec56f5a1af7c3538e47acf301ad15b.png',
    top: 'TOP1',
    collectNumber: 100,
    praiseNumber: 200,
  },
  {
    desc: '我的简介来咯我的简介来咯我的简介来咯我的简介来咯我的简介来咯我的简介来咯我的简介来咯我的简介来咯我的简介来咯我的简介来咯',
    id: '1477017',
    name: '李凯',
    record: 95,
    yearsWork: 7,
    picture: 'https://yanxuan-item.nosdn.127.net/0e1681ab3a4a5aaf185f0bb123f07f99.jpg',
    top: 'TOP2',
    collectNumber: 80,
    praiseNumber: 2020,
  },
  {
    desc: '我的简介来咯我的简介来咯我的简介来咯我的简介来咯我的简介来咯我的简介来咯我的简介来咯我的简介来咯我的简介来咯我的简介来咯',
    id: '1477017',
    name: '唐玄奘',
    record: 30,
    yearsWork: 3,
    picture: 'https://yanxuan-item.nosdn.127.net/0d8fe495fe82abbdf8826c4fd1e1e77b.png',
    top: 'TOP3',
    collectNumber: 80,
    praiseNumber: 2020,
  },
])
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

    image {
      width: 100%;
      height: 300rpx;
      margin: 12rpx 0rpx;
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

      .left {
        display: flex;
        align-items: center;

        .praise-number {
          text {
            margin-left: 8rpx;
            font-size: 26rpx;
            color: $uni-text-color-placeholder;
          }
        }

        .collect-number {
          text {
            margin-left: 8rpx;
            font-size: 26rpx;
            color: $uni-text-color-placeholder;
          }
        }
      }
    }
  }
}
</style>
