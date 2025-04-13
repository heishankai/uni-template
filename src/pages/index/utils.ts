import { ref } from 'vue'
/**
 * 猜你喜欢组合式函数
 */
export const useGuessList = (): { guessRef: any; onScrolltolower: any } => {
  // 获取猜你喜欢组件实例
  const guessRef = ref<any>()

  // 滚动触底事件
  const onScrolltolower = (): void => {
    guessRef.value?.getMore()
  }

  // 返回 ref 和事件处理函数
  return {
    guessRef,
    onScrolltolower,
  }
}

export const tabList = [
  { label: '全部', value: '0' },
  { label: '男性', value: '1' },
  { label: '女性', value: '2' },
]
