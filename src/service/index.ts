import { request } from '@/utils/request'

/**
 * 获取用户地址信息
 */
export const getLocationInfoService = (params: {
  latitude: string
  longitude: string
}): Promise<any> => {
  return request({
    method: 'POST',
    url: '/getLocationInfo',
    data: params,
  })
}
