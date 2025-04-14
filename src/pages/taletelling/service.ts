import { request } from '@/utils/request'

/**
 * 保存录音文件
 */
export const saveRecordService = (params: {
  recordList: { src: string; time: string }[]
}): Promise<any> => {
  return request({
    method: 'POST',
    url: '/saveRecord',
    data: params,
  })
}

/**
 * 获取录音文件列表
 */
export const getRecordListService = (): Promise<any> => {
  return request({
    method: 'GET',
    url: '/get-record-list',
  })
}
