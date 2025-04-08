import { request } from '@/utils/request'

/**
 * 获取首页轮播数据
 */
export const getHomeGetRecommendService = (): Promise<any> => {
  return request({
    method: 'GET',
    url: '/home/getRecommend',
  })
}
