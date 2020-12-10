import request from '../utils/request'
// 微信个人信息
export function apiWxLogin(form) {
  return request({
    url: '/api/v1/applet/person/authorize',
    method: 'get',
    params: {
      code: form.code,
      openid: form.openid
    }
  })
}
// 轮播图列表
export function apiSwiperList() {
  return request({
    url: '/api/v1/applet/slideshow',
    method: 'get'
  })
}
// 问答列表
export function apiRequestList(form) {
  return request({
    url: '/api/v1/applet/problem',
    method: 'get',
    params: {
      page: form.page,
      size: form.size
    }
  })
}
