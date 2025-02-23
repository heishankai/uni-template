import { defineStore } from 'pinia'
import { ref } from 'vue'

// 定义 Store
export const useTabbarStore = defineStore(
  'tabbar',
  () => {
    // 会员信息
    const tableSelected = ref<number>(0)

    // 保存会员信息，登录时使用
    const setSelected = (val: number) => {
      tableSelected.value = val
    }

    // 清理会员信息，退出时使用
    const clearSelected = () => {
      tableSelected.value = 0
    }

    // 记得 return
    return {
      tableSelected,
      setSelected,
      clearSelected,
    }
  },
  // TODO: 持久化
  {
    // 多端使用
    persist: {
      storage: {
        getItem(key: string) {
          return uni.getStorageSync(key)
        },
        setItem(key: string, value: string) {
          uni.setStorageSync(key, value)
        },
      },
    },
  }
)
