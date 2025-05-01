import { request } from '@/utils/request'

/**
 * 认证支付
 */
export const addAuthWriterOrderService = (params: { orderAmount: number }): Promise<any> => {
  return request({
    method: 'POST',
    url: '/become-auth-writer',
    data: params,
  })
}

/**
 * 获取认证状态
 */
export const getAuthwriterStatusSrevice = (): Promise<any> => {
  return request({
    method: 'GET',
    url: '/get-auth-writer-status',
  })
}
