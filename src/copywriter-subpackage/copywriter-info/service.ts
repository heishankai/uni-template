import { request } from '@/utils/request'

/**
 * 查询撰稿人
 */
export const getOnewriterService = (params: { openid: string }): Promise<any> => {
  return request({
    method: 'GET',
    url: '/getOnewriter',
    data: params,
  })
}

/**
 * 收藏和取消收藏
 */
export const CollectAndUncollectService = (params: { writerId: string }): Promise<any> => {
  return request({
    method: 'POST',
    url: '/collectOrUncollect',
    data: params,
  })
}

/**
 * 点赞和取消点赞
 */
export const LikeOrUnlikeService = (params: { writerId: string }): Promise<any> => {
  return request({
    method: 'POST',
    url: '/likeOrUnlike',
    data: params,
  })
}

/**
 * 创建订单
 */
export const addReserveOrderService = (params: {
  orderAmount: number | string
  orderTimePeriod: any
  copywriter_name: string
  copywriter_avatar: string
  copywriter_id: string
}): Promise<any> => {
  return request({
    method: 'POST',
    url: '/add-reserve-order',
    data: params,
  })
}
