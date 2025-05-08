export const updateApp = (): void => {
  const updateManager = uni.getUpdateManager()

  updateManager.onCheckForUpdate((res) => {
    // 请求完新版本信息的回调
    console.log(res.hasUpdate)
  })

  updateManager.onUpdateReady(() => {
    uni.showModal({
      title: '更新提示',
      content: '新版本已经准备好，是否重启应用？',
      success(res) {
        const { confirm } = res
        if (confirm) {
          // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
          updateManager.applyUpdate()
          return
        }
        console.log('用户点击取消，不更新')
      },
    })
  })

  updateManager.onUpdateFailed(() => {
    // 新的版本下载失败
    uni.showModal({
      title: '已经有新版本了哟~',
      content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
    })
  })
}
