<template>
  <!-- 录音消息 -->
  <scroll-view scroll-y class="record-message">
    <view class="title">快来录制我的故事吧...</view>
    <trumpet-animation
      v-for="(item, index) in recordList"
      :key="index"
      :size="24"
      color="#808080"
      :src="item?.src"
      :time="item?.time"
    />
    <button @click="handleSaveRecord">保存我的录音</button>
  </scroll-view>
</template>

<script setup lang="ts">
// components
import trumpetAnimation from '@/components/trumpet-animation.vue'
// 上传地址
import { uploadFileUrl } from '@/utils/request'
// service
import { saveRecordService } from '../service'

// props
const props = defineProps<{
  recordList: { time: string; src: string }[]
}>()

// 保存我的录音
const handleSaveRecord = async (): Promise<void> => {
  const recordList = props?.recordList

  if (!recordList?.length) {
    uni.showToast({ title: '没有录音文件需要上传', icon: 'none' })
    return
  }

  uni.showLoading({ title: '上传中...' })

  try {
    // 并发上传所有录音文件
    const uploadPromises = recordList.map((item, index) => {
      return new Promise<{ src: string; time: string }>((resolve, reject) => {
        uni.uploadFile({
          url: uploadFileUrl,
          filePath: item?.src,
          name: 'file',
          formData: {
            index,
            time: item?.time,
          },
          success(res) {
            try {
              const response = JSON.parse(res.data)
              if (response?.data) {
                resolve({ src: response.data, time: item?.time })
              } else {
                reject(new Error('上传失败，返回数据为空'))
              }
            } catch {
              reject(new Error('解析上传响应失败'))
            }
          },
          fail(err) {
            reject(err)
          },
        })
      })
    })

    const uploadedData = await Promise.all(uploadPromises)

    // 所有上传成功后再调用保存服务
    const { message } = await saveRecordService({ recordList: uploadedData })
    uni.showToast({ title: message, icon: 'none' })
  } catch (error) {
    console.error('录音上传失败：', error)
    uni.showToast({ title: '录音文件保存失败，请重试', icon: 'none' })
  } finally {
    uni.hideLoading()
  }
}
</script>

<style lang="scss" scoped>
.record-message {
  height: 46vh;
  padding: 24rpx;
  overflow-y: scroll;
  background-color: #f8f8f8;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;

  .title {
    font-family: Poppins;
    font-size: 30px;
    font-weight: bold;
    line-height: 42px;
    letter-spacing: -0.3px;
    color: $uni-bg-color;
  }

  button {
    position: absolute;
    bottom: 24rpx;
    right: 48rpx;
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
