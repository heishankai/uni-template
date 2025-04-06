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
        <input type="text" placeholder="请填写昵称" v-model="profile.username" />
      </view>
      <view class="form-item">
        <text>年龄</text>
        <input type="digit" placeholder="请填写稿龄" v-model="profile.age" />
      </view>
      <view class="form-item">
        <text>稿龄</text>
        <input type="digit" placeholder="请填写稿龄" v-model="profile.straw" />
      </view>
      <view class="form-item">
        <text>性别</text>
        <radio-group @change="onGenderChange">
          <label class="radio">
            <radio value="男" color="#00cec9" :checked="profile?.gender === '男'" />
            男
          </label>
          <label class="radio">
            <radio value="女" color="#00cec9" :checked="profile?.gender === '女'" />
            女
          </label>
        </radio-group>
      </view>
    </view>
    <view v-show="rate === 2">
      <view class="form-item">
        <text>生日</text>
        <picker :value="profile.birthday" mode="date" @change="handleBirthdayChange">
          <view v-if="profile.birthday">{{ profile.birthday }}</view>
          <view v-else-if="!profile.birthday" class="placeholder">请选择日期</view>
        </picker>
      </view>
      <view class="form-item">
        <text>专业</text>
        <picker :value="profile.specialtyIndex" :range="specialty" @change="onPickerChange">
          <view v-if="profile.specialtyIndex">{{ specialty[profile.specialtyIndex] }}</view>
          <view v-else-if="profile.specialtyIndex === null" class="placeholder"
            >请选择专业</view
          >
        </picker>
      </view>
      <view class="form-item">
        <text>职业</text>
        <picker :value="profile.jobIndex" :range="jobList" @change="handleJobChange">
          <view v-if="profile.jobIndex">{{ jobList[profile.jobIndex] }}</view>
          <view v-else-if="profile.jobIndex === null" class="placeholder">请选择职业</view>
        </picker>
      </view>
      <view class="form-item">
        <text>爱好</text>
        <picker :value="profile.hobbyIndex" :range="hobbyList" @change="handleHobbyChange">
          <view v-if="profile.hobbyIndex">{{ hobbyList[profile.hobbyIndex] }}</view>
          <view v-else-if="profile.hobbyIndex === null" class="placeholder">请选择爱好</view>
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
        />
      </view>
    </view>
    <view v-show="rate === 3">
      <view class="form-item">
        <text>简历</text>
        <view v-if="profile.resume_images.length" class="resume_images-list">
          <image
            v-for="item in profile.resume_images"
            :key="item"
            :src="item"
            mode="scaleToFill"
            @click="previewImage(item)"
          />
        </view>
        <view v-else class="resume_images" @click="handleAvatarChange">
          <uni-icons type="cloud-upload" color="#00cec9" size="30" />
          <text>点击上传简历</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// utils
import { uploadFile, specialty, jobList, hobbyList } from '../utils'

defineProps({
  rate: { type: Number, default: 1 },
})

const profile = ref({
  // 头像
  avatar: 'https://img.yzcdn.cn/vant/cat.jpeg',
  // 昵称
  username: '张三',
  // 稿龄
  straw: 3,
  // 年龄
  age: 18,
  // 性别
  gender: '男', // 0 男 1 女
  // 专业选择
  specialtyIndex: null,
  // 职业选择
  jobIndex: null,
  // 爱好
  hobbyIndex: null,
  // 简介
  synopsis: '',
  // 生日
  birthday: '',
  // 简历图片列表
  resume_images: [
    // 'https://yanxuan-item.nosdn.127.net/4aec56f5a1af7c3538e47acf301ad15b.png',
    // 'https://yanxuan-item.nosdn.127.net/4aec56f5a1af7c3538e47acf301ad15b.png',
    // 'https://yanxuan-item.nosdn.127.net/4aec56f5a1af7c3538e47acf301ad15b.png',
  ],
})

// 上传头像 -  uni.chooseMedia 仅支持微信小程序端
const handleAvatarChange = (): void => {
  uni.chooseMedia({
    // 文件个数
    count: 1,
    // 文件类型
    mediaType: ['image'],
    success: (res) => {
      // 本地路径
      const { tempFilePath } = res.tempFiles[0]
      // 上传
      uploadFile(tempFilePath)
    },
  })
}

// 生日选择
const handleBirthdayChange = (e: any): void => {
  profile.value.birthday = e.detail.value
}

// 专业选择
const onPickerChange = (e: any): void => {
  profile.value.specialtyIndex = e.detail.value
}

// 职业选择
const handleJobChange = (e: any): void => {
  profile.value.jobIndex = e.detail.value
}

// 爱好选择
const handleHobbyChange = (e: any): void => {
  profile.value.hobbyIndex = e.detail.value
}

// 男女选择
const onGenderChange = (e: any): void => {
  profile.value.gender = e.detail.value
}

// 预览图片
const previewImage = (url: string): void => {
  uni.previewImage({
    current: url,
    urls: [url],
  })
}

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
        margin-right: 12rpx;
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
      flex: 1;
      gap: 10rpx;
      padding: 10px 0px;

      image {
        width: 180rpx;
        height: 180rpx;
      }
    }

    .resume_images {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

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
