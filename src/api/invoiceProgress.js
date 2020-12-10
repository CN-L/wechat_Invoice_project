import request from '../utils/request'
// 进度列表
export function apiSearchInvoiceProgress(form) {
  return request({
    url: `/api/v1/applet/invoice/all/${form.userid}`,
    method: 'get'
  })
}
