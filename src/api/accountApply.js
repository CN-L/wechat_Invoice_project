import request from '../utils/request'
// 查询所有园区
export function apiSearchGarden() {
  return request({
    url: '/api/v1/applet/garden',
    method: 'get'
  })
}
//查询经营范围
export function apiSearchBusinessScope(gardenid) {
  return request({
    url: `/api/v1/applet/businessscope/${gardenid}`,
    method: 'get'
  })
}
// 查询开票类目
export function apiSearchInvoiceCategory() {
  return request({
    url: '/api/v1/applet/taxItems',
    method: 'get'
  })
}
//第一步注册提交
export function apiRegister(form) {
  return request({
    url: '/api/v1/applet/register',
    method: 'put',
    data: form
  })
}
//第二部注册提交
export function apiRegisterContinue(form) {
  return request({
    url: '/api/v1/applet/register',
    method: 'post',
    data: form
  })
}
// 取消申请
export function apiCancelApply(form) {
  return request({
    url: `/api/v1/applet/cancel/${form.id}`,
    method: 'delete',
    data: form
  })
}
