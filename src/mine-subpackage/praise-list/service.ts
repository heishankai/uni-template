import { request } from '@/utils/request'

/**
 * 获取我的收藏
 */
export const collectListService = (): Promise<any> => {
  return request({
    method: 'GET',
    url: '/likeList',
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
