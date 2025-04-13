<template>
  <view class="story-list">
    <view class="item" v-for="item in storyList" :key="item.id">
      <view class="header">
        <view class="avatar">
          <image :src="item?.avatar" mode="aspectFill" />
        </view>
        <view class="info">
          <view class="text">姓名：{{ item?.nickname }}</view>
          <view class="text">年龄：{{ item?.age }}</view>
          <view class="text" v-if="item?.gender"
            >性别：{{ item?.gender === '1' ? '男' : '女' }}</view
          >
          <view class="text">城市：{{ item?.city }}</view>
          <view class="text">
            <view @click="handlePlay(item)" class="message">
              <trumpet-animation :size="22" :isPlay="item.isPlay" color="#808080" />
              <text class="time">{{ item?.time }}</text>
            </view>
          </view>
        </view>
      </view>
      <view class="footer">
        <view class="right" @click="handleContact(item)">
          <text>建立联系</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
// components
import trumpetAnimation from '@/components/trumpet-animation.vue'
// service
import { getAllUserInfoListService } from '../service'

const props = defineProps({
  selectedTab: {
    type: String,
    default: '0',
  },
})

const storyList = ref<any[]>([])
const finish = ref(false)
const pageParams = ref<{ page: number; limit: number; gender }>({
  page: 1,
  limit: 10,
  gender: props.selectedTab,
})

// 监听 selectedTab 的变化
watch(
  () => props.selectedTab,
  async (newValue) => {
    pageParams.value.gender = newValue
    resetData()
    await getHomeGetRecommendData()
  },
)

// 播放录音
const handlePlay = (item): void => {
  // 切换该 item 的播放状态
  item.isPlay = !item.isPlay
}

// 建立联系
const handleContact = (item): void => {
  const { _id, nickname } = item ?? {}
  uni.vibrateShort()

  uni.navigateTo({
    url: `/copywriter-subpackage/dialogue-detail/index?_id=${_id}&nickname=${nickname}`,
  })
}

// 获取分页用户列表
const getHomeGetRecommendData = async (): Promise<void> => {
  // 退出分页判断
  if (finish.value === true) {
    return uni.showToast({ icon: 'none', title: '没有更多数据~' })
  }

  uni.showLoading({ title: '加载中...', mask: true })

  const { data } = await getAllUserInfoListService({ ...pageParams.value })

  // 数组追加
  storyList.value.push(...(data?.data ?? []))

  // // 分页条件
  if (pageParams.value.page) {
    // 页码累加
    pageParams.value.page++
  }

  if (!data?.data?.length) {
    finish.value = true
  }
  uni.hideLoading()
}

// 重置数据
const resetData = (): void => {
  pageParams.value.page = 1
  storyList.value = []
  finish.value = false
}

// 暴露方法
defineExpose({
  resetData,
  getMore: getHomeGetRecommendData,
})

onLoad(() => {
  getHomeGetRecommendData()
})
</script>

<style lang="scss" scoped>
.story-list {
  padding: 0rpx 30rpx 30rpx 30rpx;

  .item {
    padding: 24rpx;
    background-color: #f7f7fa;
    border-radius: 12rpx;
    margin-bottom: 24rpx;

    .footer {
      padding-top: 24rpx;
      display: flex;
      justify-content: flex-end;

      .right {
        padding: 16rpx 38rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        border-radius: 30px;
        font-size: 32rpx;
        background-color: $uni-bg-color;
        color: $uni-text-color-inverse;
        box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
      }
    }

    .header {
      display: flex;

      .info {
        margin-left: 24rpx;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .text {
          color: $uni-text-color-placeholder;
          font-size: 30rpx;
        }
      }

      .message {
        width: 200rpx;
        padding: 10rpx;
        border-radius: 10rpx;
        display: flex;
        align-items: center;
        position: relative;
        background-color: #ffffff;

        .time {
          margin-left: 12rpx;
        }

        &::before {
          content: '';
          position: absolute;
          left: -20rpx;
          top: 50%;
          transform: translateY(-50%);
          border-width: 10rpx;
          border-style: solid;
          border-color: transparent #ffffff transparent transparent;
        }
      }

      image {
        width: 300rpx;
        height: 300rpx;
        flex-shrink: 0;
        border-radius: 12rpx;
      }
    }
  }
}
</style>
