<template>
  <view class="story-list">
    <view class="item" v-for="item in storyList" :key="item.id">
      <view class="header">
        <view class="avatar">
          <image :src="item.picture" mode="aspectFill" />
        </view>
        <view class="info">
          <view class="name">姓名：{{ item.name }}</view>
          <view class="text">年龄：{{ item.age }}</view>
          <view class="text">性别：{{ item.gender }}</view>
          <view class="text">城市：{{ item.city }}</view>
          <view class="text">
            <view @click="handlePlay(item)" class="message">
              <trumpet-animation :size="22" :isPlay="item.isPlay" color="#808080" />
              <text class="time">{{ item?.time }}</text>
            </view>
          </view>
        </view>
      </view>
      <view class="footer">
        <view class="right" @click="handleCollect(item.id)">
          <text>建立联系</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import trumpetAnimation from '@/components/trumpet-animation.vue'

const storyList = ref<any[]>([
  {
    id: 1,
    name: '陈淑雅',
    time: '10:00',
    gender: '女',
    age: '65',
    city: '上海',
    src: '',
    picture: 'https://yanxuan-item.nosdn.127.net/4aec56f5a1af7c3538e47acf301ad15b.png',
    isPlay: false, // 初始化每个 item 的播放状态
  },
  {
    id: 2,
    name: '李凯',
    time: '09:00',
    gender: '男',
    age: '70',
    city: '杭州',
    picture: 'https://yanxuan-item.nosdn.127.net/0e1681ab3a4a5aaf185f0bb123f07f99.jpg',
    isPlay: false,
  },
  {
    id: 3,
    name: '唐玄奘',
    time: '09:00',
    gender: '男',
    age: '72',
    city: '西安',
    picture: 'https://yanxuan-item.nosdn.127.net/0d8fe495fe82abbdf8826c4fd1e1e77b.png',
    isPlay: false,
  },
  // 其他项目
])

// 播放录音
const handlePlay = (item): void => {
  // 切换该 item 的播放状态
  item.isPlay = !item.isPlay
}

// 收藏
const handleCollect = (id): void => {
  uni.vibrateShort()
  console.log(id)

  uni.navigateTo({
    url: `/copywriter-subpackage/dialogue-detail/index?id=${id}&name=${id}`,
  })
}
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
