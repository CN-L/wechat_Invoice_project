import request from '../utils/request'
import qs from 'qs'
/* 登录 */
export function apiLogin(data) {
  return request({
    url: '/login',
    method: 'post',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data)
  })
}
//刷新token
export function apiRefreshToken() {
  return request({
    url: '/refresh_token',
    method: 'post'
  })
}
