export const specialtyList = ['汉语言文学专业', '社会科学', '外语', '理工科']
export const jobList = ['文学编辑', '纪实作家', '记者', '教师/培训', '广告', '媒体', '自媒体']
export const hobbyList = ['音乐', '美术', '旅游', '运动', '摄影']

export const genderList = [
  { value: '1', name: '男' },
  { value: '2', name: '女' },
]

// 必填项定义
export const requiredFields = [
  { key: 'avatar', message: '请上传头像' },
  { key: 'nickname', message: '请填写昵称' },
  { key: 'age', message: '请填写年龄' },
  { key: 'straw', message: '请填写稿龄' },
  { key: 'phone', message: '请填写手机号' },
  { key: 'gender', message: '请选择性别' },
  { key: 'birthday', message: '请选择生日' },
  { key: 'synopsis', message: '请填写简介' },
  { key: 'specialty', message: '请选择专业' },
  { key: 'job', message: '请选择职业' },
  { key: 'hobby', message: '请选择爱好' },
  { key: 'resume_images', message: '请上传简历图片' },
]

/**
 * 校验是否为空
 * @param value - 需要校验的值
 * @returns 是否为空
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const isEmpty = (value: any): boolean => {
  if (typeof value === 'string') {
    return !value.trim()
  }

  if (typeof value === 'number') {
    return isNaN(value)
  }

  if (Array.isArray(value)) {
    return value.length === 0
  }

  return !value
}

// 文件上传-兼容小程序端、H5端、App端
export const uploadFile = (file: string): void => {
  console.log(file, 'file')

  // 文件上传
  uni.uploadFile({
    url: '/member/profile/avatar',
    name: 'file',
    filePath: file,
    success: (res) => {
      if (res.statusCode === 200) {
        // const avatar = JSON.parse(res.data).result.avatar
        // 个人信息页数据更新
        // profile.value.avatar = avatar
        // 本地 Store头像更新
        // memberStore.profile!.avatar = avatar
        uni.showToast({ icon: 'success', title: '更新成功' })
      } else {
        uni.showToast({ icon: 'error', title: '出现错误' })
      }
    },
  })
}
