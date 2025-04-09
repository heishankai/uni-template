import { request } from '@/utils/request'

interface UpdateUserInfoType {
  avatar: string
  nickname: string
  gender: null | string
  age: null | number
  phone: null | number
  city: string
  openid: string
}

/**
 * 更新用户信息
 */
export const updateUserInfoService = (params: UpdateUserInfoType): Promise<any> => {
  return request({
    method: 'POST',
    url: '/updateUserInfo',
    data: params,
  })
}

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
