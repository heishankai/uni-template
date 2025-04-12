import { request } from '@/utils/request'

/**
 * 获取我的收藏
 */
export const collectListService = (): Promise<any> => {
  return request({
    method: 'GET',
    url: '/collectList',
  })
}

/**
 * 收藏和取消收藏
 */
export const CollectAndUncollectService = (params: { writerId: string }): Promise<any> => {
  return request({
    method: 'POST',
    url: '/collect',
    data: params,
  })
}
