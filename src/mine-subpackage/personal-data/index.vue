<template>
  <view class="container">
    <!-- 滚动容器 -->
    <scroll-view class="scroll-view">
      <template>
        <view
          class="avatar"
          @click="handleAvatarChange"
          :style="{
            background: `url(${profile?.avatar}) no-repeat center center`,
            backgroundSize: 'cover',
            boxShadow: '0px 7px 14px 0px rgba(0, 0, 0, 0.25)',
          }"
        >
          <view class="camera">
            <uni-icons type="camera" size="26" color="#FFFFFF" />
          </view>
        </view>
        <view class="form">
          <view class="form-item">
            <text>昵称</text>
            <input type="text" placeholder="请填写昵称" v-model="profile.nickname" />
          </view>
          <view class="form-item">
            <text>年龄</text>
            <input type="number" placeholder="请填写年龄" v-model.number="profile.age" />
          </view>
          <view class="form-item">
            <text>手机号</text>
            <input type="number" placeholder="请填写手机号码" v-model.number="profile.phone" />
          </view>
          <view class="form-item">
            <text>性别</text>
            <radio-group @change="onGenderChange">
              <label class="radio" v-for="item in genderList" :key="item.value">
                <radio
                  :value="item.value"
                  color="#00cec9"
                  :checked="profile?.gender === item.value"
                />
                <text>{{ item.name }}</text>
              </label>
            </radio-group>
          </view>
          <view class="form-item">
            <text>城市</text>
            <input
              @click="handleGetCity"
              disabled
              type="text"
              placeholder="点击授权获取城市"
              v-model="profile.city"
            />
          </view>
        </view>
      </template>
    </scroll-view>
    <button @click="onSubmit">保存</button>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
// services
import { updateUserInfoService, getLocationInfoService } from './service'
import { uploadFileUrl } from '@/utils/request'
// utils
import { genderList } from './utils'
// store
import { useUserInfoStore } from '@/stores'
const { userInfo, set } = useUserInfoStore()

const profile = ref({
  // 头像
  avatar: '',
  // 昵称
  nickname: '',
  // 性别
  gender: null,
  // 年龄
  age: null,
  // 手机号
  phone: null,
  // 城市
  city: '',
})

// 保存修改
const onSubmit = async (): Promise<void> => {
  uni.showLoading({ title: '加载中', mask: true })

  const { data } = await updateUserInfoService({
    ...profile.value,
    openid: userInfo.openid,
  })

  profile.value = data
  set(data)
  uni.hideLoading()
  uni.showToast({ title: '保存成功', icon: 'none' })
  uni.navigateBack({ delta: 1 })
}

// 性别选择
const onGenderChange = (e: any): void => {
  console.log(e.detail.value)
  profile.value.gender = e.detail.value
}

// 上传头像 - 仅支持微信小程序端
const handleAvatarChange = (): void => {
  uni.chooseMedia({
    // 文件个数
    count: 1,
    // 文件类型
    mediaType: ['image'],
    success: (res) => {
      uni.uploadFile({
        url: uploadFileUrl,
        name: 'file',
        filePath: res.tempFiles?.[0]?.tempFilePath,
        success: (uploadRes) => {
          const { data } = JSON.parse(uploadRes.data)
          profile.value.avatar = data
        },
        fail: () => {
          uni.showToast({ title: '上传失败', icon: 'none' })
        },
      })
    },
    fail: () => {
      uni.showToast({ title: '上传失败', icon: 'none' })
    },
  })
}

// 获取城市
const handleGetCity = (): void => {
  uni.authorize({
    scope: 'scope.userLocation',
    success: () => {
      uni.getLocation({
        type: 'wgs84',
        success: async (res) => {
          console.log('获取经纬度', res)

          const { latitude, longitude } = res ?? {}
          const { data } = await getLocationInfoService({
            latitude: `${latitude}`,
            longitude: `${longitude}`,
          })

          console.log('data', data)

          const { city } = data?.result?.ad_info ?? {}
          profile.value.city = city
        },
        fail: (err) => {
          console.log(err)
        },
      })
    },
  })
}

onLoad(() => {
  const { userInfo } = useUserInfoStore()
  profile.value = { ...userInfo }
  if (!userInfo.city) {
    handleGetCity()
  }
})
</script>

<style lang="scss">
page {
  height: 100%;
  overflow: hidden;
}

.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  button {
    width: 86%;
    line-height: 80rpx;
    font-size: 38rpx;
    border-radius: 30px;
    font-family: Roboto;
    letter-spacing: 0.54rpx;
    color: $uni-text-color-inverse;
    background-color: $uni-bg-color;
    margin-bottom: env(safe-area-inset-bottom);
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

    &::after {
      border: none;
    }
  }
}

.scroll-view {
  flex: 1;
  overflow: hidden;

  .avatar {
    margin: 80rpx auto;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    position: relative;

    .camera {
      position: absolute;
      bottom: 8rpx;
      right: 8rpx;
      background-color: $uni-bg-color;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  // 表单
  .form {
    margin: 0rpx 30rpx;
    padding: 24rpx;
    border-radius: 24rpx;

    &-item {
      font-family: Montserrat;
      font-size: 16px;
      font-weight: 500;
      line-height: 22px;
      letter-spacing: -0.3px;
      display: flex;
      line-height: 46rpx;
      padding: 25rpx 10rpx;
      font-size: 28rpx;
      border-bottom: 2rpx solid $uni-border-color;

      input {
        flex: 1;
        display: block;
        height: 46rpx;
        color: $uni-text-color-placeholder;
      }

      text {
        width: 180rpx;
        color: $uni-text-color-black;
      }

      radio-group {
        font-family: Gilroy;
        font-size: 18px;
        color: $uni-text-color-placeholder;

        .radio {
          margin-right: 24rpx;
        }
      }
    }
  }
}
</style>
