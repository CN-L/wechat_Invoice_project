import request from '../utils/request'
//开户进度列表
export function apiProgressList(form) {
  return request({
    url: `/api/v1/applet/register/all/${form.id}`,
    method: 'get',
    params: {
      size: form.size,
      page: form.page
    }
  })
}
//开户进度表单继续提交
export function apiContinueSubmit(form) {
  return request({
    url: `/api/v1/applet/register/${form.accId}`,
    method: 'get'
  })
}
// 注销申请
export function apiCancelAccountApply(form) {
  return request({
    url: `/api/v1/applet/cancelaccountapply/${form.id}`,
    method: 'post'
  })
}
// 取消申请注销
export function apiNoCancalApply(id) {
  return request({
    url: `/api/v1/applet/cancelLogoutApply/${id}`,
    method: 'post'
  })
}
