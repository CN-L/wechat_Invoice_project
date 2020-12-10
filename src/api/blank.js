import request from '../utils/request'
export function apiLogin() {
  return request({
    url: '/api/v1/applet/person/authorize/code',
    method: 'get'
  })
}
