import { Toast } from 'vant'
export function startLoading() {
  const loading = Toast.loading({
    message: '加载中...',
    forbidClick: true,
    loadingType: 'spinner'
  })
  return loading
}
export function closeLoading(startLoaing) {
  setTimeout(() => {
    startLoaing.clear()
  }, 200)
}
