import { request } from '@/utils/request'

/**
 * 获取首页人员数据
 */
export const getAllUserInfoListService = (params: {
  page: number
  limit: number
  gender: number
}): Promise<any> => {
  return request({
    method: 'GET',
    url: '/home/getAllUserInfoList',
    data: params,
  })
}
