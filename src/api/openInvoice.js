import request from '../utils/request'
// 查询个体户名称
export function apiSearchMerchantAll(form) {
  return request({
    url: `/api/v1/applet/userinfo/${form.userid}`,
    method: 'get'
  })
}
// 所有开票类目
export function apiAllTaxItems() {
  return request({
    url: '/api/v1/applet/taxItems'
  })
}
//自己个体户得开票类目
export function apiMyMerchant(form) {
  return request({
    url: `/api/v1/applet/userinfo/invoice?q=taxItemIds:${form.taxItemIds}`
  })
}
// 开户申请提交
export function apiSubmitFormInvoice(form) {
  return request({
    url: '/api/v1/applet/invoice',
    method: 'put',
    data: form
  })
}
export function apiSeedetail(id) {
  return request({
    url: `/api/v1/applet/invoice/${id}`,
    method: 'get'
  })
}
//修改提交
export function apiSupplementEdit(form) {
  return request({
    url: '/api/v1/applet/invoice',
    method: 'post',
    data: form
  })
}
