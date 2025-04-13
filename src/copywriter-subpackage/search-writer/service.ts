import { request } from '@/utils/request'

/**
 * 模糊查询撰稿人
 */
export const searchWriterService = (params: {
  page: number
  limit: number
  keyword: string
}): Promise<any> => {
  return request({
    method: 'POST',
    url: '/searchWriter',
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
