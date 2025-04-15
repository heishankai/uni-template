<template>
  <view class="form-list">
    <view v-show="rate === 1">
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
      <view class="form-item">
        <text>昵称</text>
        <input type="text" placeholder="请填写昵称" v-model="profile.nickname" />
      </view>
      <view class="form-item">
        <text>年龄</text>
        <input type="digit" placeholder="请填写年龄" v-model.number="profile.age" />
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
      <view class="form-item">
        <text>手机号</text>
        <input type="digit" placeholder="请填写手机号码" v-model.number="profile.phone" />
      </view>
      <view class="form-item">
        <text>性别</text>
        <radio-group @change="onGenderChange">
          <label class="radio" v-for="item in genderList" :key="item.value">
            <radio :value="item.value" color="#00cec9" :checked="profile?.gender === item.value" />
            <text>{{ item.name }}</text>
          </label>
        </radio-group>
      </view>
    </view>
    <view v-show="rate === 2">
      <view class="form-item">
        <text>稿龄</text>
        <input type="digit" placeholder="请填写稿龄" v-model.number="profile.straw" />
      </view>
      <view class="form-item">
        <text>生日</text>
        <picker :value="profile.birthday" mode="date" @change="handleBirthdayChange">
          <view v-if="profile.birthday">{{ profile.birthday }}</view>
          <view v-else class="placeholder">请选择日期</view>
        </picker>
      </view>
      <view class="form-item">
        <text>专业</text>
        <picker :value="profile.specialty" :range="specialtyList" @change="onPickerChange">
          <view v-if="profile.specialty">{{ specialtyList[profile.specialty] }}</view>
          <view v-else class="placeholder">请选择专业</view>
        </picker>
      </view>
      <view class="form-item">
        <text>职业</text>
        <picker :value="profile.job" :range="jobList" @change="handleJobChange">
          <view v-if="profile.job">{{ jobList[profile.job] }}</view>
          <view v-else class="placeholder">请选择职业</view>
        </picker>
      </view>
      <view class="form-item">
        <text>爱好</text>
        <picker :value="profile.hobby" :range="hobbyList" @change="handleHobbyChange">
          <view v-if="profile.hobby">{{ hobbyList[profile.hobby] }}</view>
          <view v-else class="placeholder">请选择爱好</view>
        </picker>
      </view>
      <view class="form-item">
        <text>简介</text>
        <textarea
          adjust-position
          type="text"
          :maxlength="50"
          placeholder="请填写简介"
          v-model="profile.synopsis"
          :cursor-spacing="120"
        />
      </view>
    </view>
    <view v-show="rate === 3">
      <view class="form-item">
        <text>简历</text>
        <view v-if="profile?.resume_images?.length" class="resume_images-list">
          <view v-for="(item, index) in profile?.resume_images" :key="item" class="image-container">
            <image :src="item" mode="scaleToFill" @click="previewImage(item)" />
            <view class="delete-button" @click="removeImage(index)">
              <uni-icons type="close" size="30" color="#FFFFFF" />
            </view>
          </view>
        </view>
        <view
          v-if="profile?.resume_images?.length < 3"
          class="resume_images"
          @click="handleResumeChange"
        >
          <uni-icons type="cloud-upload" color="#00cec9" size="30" />
          <text>点击上传简历</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
// store
import { useUserInfoStore } from '@/stores'
// utils
import { getLocation } from '@/utils'
import { uploadImages } from '@/utils/upload'
import { specialtyList, jobList, hobbyList, genderList } from '../utils'
// services
import { getWriterInfoService } from '../service'

defineProps({
  rate: { type: Number, default: 1 },
})

const profile = ref<any>({
  // 头像
  avatar: '',
  // 昵称
  nickname: '',
  // 城市
  city: '',
  // 稿龄
  straw: null,
  // 年龄
  age: null,
  // 性别
  gender: null,
  // 手机号
  phone: null,
  // 简介
  synopsis: '',
  // 生日
  birthday: '',
  // 专业选择
  specialty: undefined,
  // 职业选择
  job: undefined,
  // 爱好
  hobby: undefined,
  // 简历图片列表
  resume_images: [],
})

// 生日选择
const handleBirthdayChange = (e: any): void => (profile.value.birthday = e.detail.value)

// 男女选择
const onGenderChange = (e: any): void => (profile.value.gender = e.detail.value)

// 专业选择
const onPickerChange = (e: any): void => (profile.value.specialty = e.detail.value)

// 职业选择
const handleJobChange = (e: any): void => (profile.value.job = e.detail.value)

// 爱好选择
const handleHobbyChange = (e: any): void => (profile.value.hobby = e.detail.value)

// 预览图片
const previewImage = (url: string): void => {
  uni.previewImage({
    current: url,
    urls: [url],
  })
}

// 上传简历
const handleResumeChange = (): void => {
  uploadImages({
    count: 1,
    successCallback: (urls) => {
      profile.value.resume_images = [...(profile.value.resume_images || []), ...urls]
    },
  })
}

// 上传头像 - 仅支持微信小程序端
const handleAvatarChange = (): void => {
  uploadImages({
    count: 1,
    successCallback: ([url]) => {
      profile.value.avatar = url
    },
  })
}

// 获取城市
const handleGetCity = async (): Promise<void> => {
  const { ad_info } = (await getLocation()) ?? {}
  profile.value.city = ad_info?.city
}

// 删除简历图片
const removeImage = (index: number): void => {
  profile.value.resume_images.splice(index, 1)
}

// 获取用户信息
const getWriterInfoData = async (): Promise<void> => {
  const { userInfo } = useUserInfoStore()
  const { data } = await getWriterInfoService({ openid: userInfo.openid })

  profile.value = {
    ...profile.value,
    ...userInfo,
    ...data,
  }

  if (!data?.city) {
    handleGetCity()
  }
}

onLoad(() => {
  getWriterInfoData()
})

defineExpose({
  profile,
})
</script>

<style lang="scss" scoped>
.form-list {
  .form-item {
    margin: 30rpx 30rpx 0rpx 30rpx;
    border-bottom: 2rpx solid $uni-border-color;

    text {
      font-family: Gilroy;
      font-size: 16px;
      line-height: 29px;
      font-weight: 500;
      color: $uni-text-color-black;
    }

    input {
      padding: 10px 0px;
      font-family: Gilroy;
      font-size: 18px;
      line-height: 29px;
      color: $uni-text-color-placeholder;
    }

    radio-group {
      padding: 10px 0px;
      font-family: Gilroy;
      font-size: 18px;
      line-height: 29px;
      color: $uni-text-color-placeholder;

      .radio {
        margin-right: 24rpx;
      }
    }

    picker {
      padding: 10px 0px;
      font-family: Gilroy;
      font-size: 18px;
      line-height: 29px;
      color: $uni-text-color-placeholder;
    }

    .resume_images-list {
      display: flex;
      flex-wrap: wrap;
      gap: 20rpx;
      padding: 10px 0px;

      .image-container {
        position: relative;
        width: 180rpx;
        height: 180rpx;

        image {
          width: 100%;
          height: 100%;
          border-radius: 8rpx;
        }

        .delete-button {
          position: absolute;
          top: -10rpx;
          right: -10rpx;
          width: 50rpx;
          height: 50rpx;
          background-color: $uni-bg-color;
          border-radius: 50%;
          display: flex;
          align-items: center; /* 垂直居中 */
          justify-content: center; /* 水平居中 */
          z-index: 1;
        }
      }
    }

    .resume_images {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-bottom: 24rpx;

      text {
        font-family: Gilroy;
        font-size: 18px;
        line-height: 29px;
        color: $uni-text-color-placeholder;
      }
    }
  }

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
}
</style>
