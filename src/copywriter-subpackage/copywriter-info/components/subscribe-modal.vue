<template>
  <uni-popup ref="subscribeModalOpen" background-color="#f7f7fa" type="bottom">
    <view class="title">
      <text>¥ 9.9</text>
      <uni-icons type="close" size="28" color="#67676e" @click="handleClose" />
    </view>
    <scroll-view scroll-y>
      <view class="day" v-for="day in weekDays" :key="day.date">
        <text class="day-label">{{ day.label }}</text>
        <view class="time-grid">
          <view
            v-for="hour in day.hours"
            :key="hour.time"
            class="time-cell available"
            :class="{ selected: isSelectedTime(day.date, hour.time) }"
            @click="selectTime(day.date, hour.time)"
          >
            {{ hour.time }}
          </view>
        </view>
      </view>
    </scroll-view>
    <button @click="handlePay">立即支付</button>
  </uni-popup>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const subscribeModalOpen = ref<any>(false)
const selectedTimes = ref<Set<string>>(new Set()) // 使用 Set 存储已选择的时间

// 支付按钮点击处理
const handlePay = (): void => {
  if (selectedTimes.value.size > 0) {
    console.log('支付时间:', selectedTimes.value)
    // 轻微震动效果
    uni.vibrateShort()
    uni.showToast({ title: '支付成功', icon: 'success' })
    handleClose()
  } else {
    uni.showToast({ title: '请先选择时间', icon: 'none' })
  }
}

// 选择时间处理
const selectTime = (date: string, time: string): void => {
  const slot = `${date}-${time}` // 使用统一格式，日期与时间之间用破折号连接

  if (selectedTimes.value.has(slot)) {
    selectedTimes.value.delete(slot) // 如果时间已选中，则取消选择
  } else {
    selectedTimes.value.add(slot) // 否则添加到已选时间
  }
  console.log('选择时间:', Array.from(selectedTimes.value))
}

// 判断时间是否已被选中
const isSelectedTime = (date: string, time: string): boolean => {
  return selectedTimes.value.has(`${date}-${time}`) // 统一格式，日期与时间之间用破折号连接
}

// 获取本周的日期和时间选项
const weekDays = computed(() => {
  const days: { date: string; label: string; hours: { time: string }[] }[] = []
  const now = new Date()
  const currentHour = now.getHours()
  const currentMinutes = now.getMinutes()

  for (let i = 0; i < 7; i++) {
    const dateObj = new Date(now)
    dateObj.setDate(now.getDate() + i)
    const label = `${dateObj.getMonth() + 1}-${dateObj.getDate()}`
    const hours: { time: string }[] = []

    // 添加小时，今天的时间过滤掉已过的时间
    const addHour = (h: number): void => {
      if (i === 0 && (h < currentHour || (h === currentHour && currentMinutes > 0))) {
        return
      }
      hours.push({ time: `${h}:00` })
    }

    // 上午时间段
    for (let h = 6; h < 12; h++) {
      addHour(h)
    }

    // 下午时间段
    for (let h = 13; h < 24; h++) {
      addHour(h)
    }

    days.push({ date: label, label, hours })
  }

  return days
})

// 关闭弹窗
const handleClose = (): void => {
  subscribeModalOpen.value.close()
}

defineExpose({
  subscribeModalOpen,
})
</script>

<style lang="scss" scoped>
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18rpx;
  border-bottom: 1px solid $uni-border-color;
}

scroll-view {
  max-height: 400px;

  .day {
    padding: 24rpx;
  }

  .day-label {
    font-weight: bold;
    margin-bottom: 8rpx;
    display: block;
  }

  .time-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24rpx;
  }

  .time-cell {
    padding: 24rpx;
    text-align: center;
    border-radius: 6rpx;
    cursor: pointer;
    border: 1px solid $uni-border-color;
    background-color: $uni-text-color-inverse;
    color: $uni-text-color-black;
    transition: all 0.3s ease; // 添加过渡效果
  }

  /* 选中状态 */
  .time-cell.selected {
    border-color: $uni-bg-color;
    color: $uni-text-color-inverse;
    background-color: $uni-bg-color;
  }

  /* 使未选中的时间不可点击 */
  .time-cell:not(.available) {
    cursor: not-allowed;
    opacity: 0.5;
  }
}

button {
  flex: 1;
  margin: 24rpx 24rpx 0rpx 24rpx;
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
</style>
