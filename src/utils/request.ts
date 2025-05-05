// store
import { useUserInfoStore } from '@/stores'
import { Base64 } from 'js-base64'

// export const BASEURL = 'http://127.0.0.1:7001'
export const BASEURL = 'https://www.1shaoyan.com' // 线上地址
const WXBASEURL = '/api/wechat'

export const uploadFileUrl = BASEURL + '/api/admin/uploadFile'

type Data<T> = {
  code: string
  message: string
  data: T
  error: any
}

// 添加请求拦截器
const httpInterceptor = {
  invoke(options: UniApp.RequestOptions): UniApp.RequestOptions {
    // 1. 非 http 开头时需要拼接完整路径
    if (!options?.url?.startsWith('http')) {
      options.url = BASEURL + WXBASEURL + options?.url
    }
    // 2. 设置超时时间 (默认是60s)
    options.timeout = 10000

    // 3. 添加小程序请求头标识
    options.header = {
      ...options.header,
    }

    // 4. 添加token (因为后端用 Basic Auth 进行身份验证)
    const { userInfo } = useUserInfoStore()
    const token = 'Basic ' + Base64.encode(userInfo?.user_token + ':')

    if (token) {
      options.header.Authorization = token
    }

    return options
  },
}

uni.addInterceptor('request', httpInterceptor)
uni.addInterceptor('uploadFile', httpInterceptor)

/**
 * 请求函数
 * @param  UniApp.RequestOptions
 * @returns Promise
 */

export const request = <T>(options: UniApp.RequestOptions): Promise<Data<T>> => {
  // 1. 返回 Promise 对象
  return new Promise<Data<T>>((resolve, reject) => {
    uni.request({
      ...options,
      success(res) {
        const { statusCode, data } = res ?? {}

        if (statusCode >= 200 && statusCode < 300) {
          resolve(data as Data<T>)
          return
        }

        if (statusCode === 401) {
          // 401错误  -> 清理用户信息，跳转到登录页
          const userInfoStore = useUserInfoStore()
          userInfoStore.clear()
          uni.navigateTo({ url: '/mine-subpackage/login/index' })
          return
        }

        // 其他错误
        uni.showToast({ icon: 'none', title: (res.data as Data<T>).message || '请求错误' })
        reject(res)
      },
      fail(err) {
        uni.hideLoading()
        uni.showToast({ icon: 'none', title: '网络错误，换个网络试试' })
        reject(err)
      },
    })
  })
}
