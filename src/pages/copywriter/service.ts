import { request } from '@/utils/request'

/**
 * 获取撰稿人分页列表
 */
export const getAllWriterService = (params: { page: number; limit: number }): Promise<any> => {
  return request({
    method: 'GET',
    url: '/getAllWriter',
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
