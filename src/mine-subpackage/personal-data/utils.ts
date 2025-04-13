// 必填项定义
export const requiredFields = [
  { key: 'avatar', message: '请上传头像' },
  { key: 'nickname', message: '请填写昵称' },
  { key: 'age', message: '请填写年龄' },
  { key: 'gender', message: '请选择性别' },
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

export const genderList = [
  { value: '1', name: '男' },
  { value: '2', name: '女' },
]
