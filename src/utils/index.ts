import { getLocationInfoService } from '@/service'

// 获取用户位置
export const getLocation = async (): Promise<any> => {
  try {
    // 等待用户授权
    await new Promise<void>((resolve, reject) => {
      uni.authorize({
        scope: 'scope.userLocation',
        success: resolve,
        fail: reject,
      })
    })

    // 获取用户位置
    const location = await new Promise<{ latitude: number; longitude: number }>(
      (resolve, reject) => {
        uni.getLocation({
          type: 'wgs84',
          success: resolve,
          fail: reject,
        })
      },
    )

    const { latitude, longitude } = location ?? {}

    // 获取位置信息
    const { data } = await getLocationInfoService({
      latitude: `${latitude}`,
      longitude: `${longitude}`,
    })
    return data?.result // 返回数据
  } catch {
    // throw new Error(error) // 统一抛出错误
  }
}
