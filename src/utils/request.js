import axios from 'axios'
import store from '../store'
import { Dialog } from 'vant'

// import { startLoading, closeLoading } from './loading'

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_ROOT,
  timeout: 4000 * 10,
  headers: {
    ContentType: 'application/json;charset=utf-8'
  }
})
// Add a request interceptor
// let loading = ''
instance.interceptors.request.use(
  (config) => {
    // 检查token是否过期
    const { authorization } = store.state.home.token
    if (authorization) { // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = authorization
    }
    return config
  }, (error) => {
    return Promise.reject(error)
  })
instance.interceptors.response.use(function(response) {
  // closeLoading(loading) //关闭loading
  const data = response.data
  const codeArr = [1020000, 1040400, 1040002, 1030400] //成功代码
  if (codeArr.includes(data.code)) {
    return response
  } else {
    Dialog.alert({
      title: '提示',
      message: `${data.message}`
    }).then(() => {
      console.log('哈')
    })
    // Toast.fail(data.message)
    return response
  }
}, function(error) {
  const str = error.toString()
  if (str.search('timeout') !== -1) {
    Dialog.alert({
      title: '提示',
      message: '请求超时',
      messageAlign: 'left'
    }).then(() => {
      console.log('哈')
    })
    // Toast.fail({ message: '请求超时', duration: 3000 })
  } else if (error.response && error.response.status) {
    Dialog.alert({
      title: '提示',
      message: `服务器${error.response.status}，请稍后再试！`,
      messageAlign: 'left'
    }).then(() => {
      console.log('哈')
    })
    // Toast.fail({ message: `服务器${error.response.status}，请稍后再试！`, duration: 3000 })
  }
  return Promise.reject(error) //返回错误信息
})
export default instance
