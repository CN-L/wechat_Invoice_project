import Vue from 'vue'
import moment from 'moment'
import * as math from 'mathjs'
//单一时间格式处理
Vue.filter('data-string', function(value, format) {
  if (!value) return ''
  return moment(value).format(format || 'YYYY-MM-DD')
})
// 开票金额大写
Vue.filter('money_Capitalized', function(value) {
  if (!value) return ''
  const fraction = ['角', '分']
  const digit = [
    '零', '壹', '贰', '叁', '肆',
    '伍', '陆', '柒', '捌', '玖'
  ]
  const unit = [
    ['元', '万', '亿'],
    ['', '拾', '佰', '仟']
  ]
  const head = value < 0 ? '欠' : ''
  value = Math.abs(value)
  let s = ''
  for (var i = 0; i < fraction.length; i++) {
    s += (digit[Math.floor(value * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '')
  }
  s = s || '整'
  value = Math.floor(value)
  for (let i = 0; i < unit[0].length && value > 0; i++) {
    let p = ''
    for (let j = 0; j < unit[1].length && value > 0; j++) {
      p = digit[value % 10] + unit[1][j] + p
      value = Math.floor(value / 10)
    }
    s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s
  }
  return head + s.replace(/(零.)*零元/, '元')
    .replace(/(零.)+/g, '零')
    .replace(/^整$/, '零元整')
})
//做除法计算
export function divisionCom(value, floadNumber) {
  if (!value) return ''
  console.log(value, floadNumber)
  return math.format(math.divide(math.bignumber(value), math.bignumber(floadNumber || 10000)), math.string)
  // math.format(math.chain(math.bignumber(0.1)).multiply(math.bignumber(0.2)).done());
}
//加法计算
export function addComputed(num1, num2) {
  return math.format(math.chain(math.bignumber(num1)).add(math.bignumber(num2)).done())
}
//减法计算
export function subtractionCom(num1, num2) {
  return math.format(math.chain(math.bignumber(num1)).subtract(math.bignumber(num2)).done());
  // math.format(math.chain(math.bignumber(0.1)).divide(math.bignumber(0.2)).done());
}
//做乘法计算
export function multiplicationCom(value, multiplyNumber) {
  if (!value || !multiplyNumber) {
    return ''
  }
  // 格式化类型
  return math.multiply(math.bignumber(value), math.bignumber(multiplyNumber))
  // math.format(math.chain(math.bignumber(0.1)).multiply(math.bignumber(0.2)).done());
}
// 手续费计算
export function compTo(num, fix) {
  // num为原数字，fix是保留的小数位数
  let result = 0
  if (Number(num) && fix > 0) { // 简单的做个判断
    fix = +fix || 2 //类型转换
    num = num + '' //转字符串
    if (/e/.test(num)) { // 如果是包含e字符的数字直接返回
      result = num
    } else if (!/\./.test(num)) { // 如果没有小数点
      result = num + `.${Array(fix + 1).join('0')}`
    } else { // 如果有小数点
      num = num + `${Array(fix + 1).join('0')}`
      const reg = new RegExp(`-?\\d*\\.\\d{0,${fix}}`)
      const floorStr = reg.exec(num)[0]
      if (+floorStr >= +num) {
        result = floorStr
      } else {
        const floorNumber = (+floorStr * Math.pow(10, 10) + +`0.${Array(fix).join('0')}1` * Math.pow(10, 10)) / Math.pow(10, 10)
        const point = /\./.test(floorNumber + '') ? '' : '.'
        const floorStr2 = floorNumber + point + `${Array(fix + 1).join('0')}`
        result = reg.exec(floorStr2)[0]
      }
    }
  }
  return result
}
// 计算小于10自动补0
export function comAddZero(value) {
  let result = value
  result = /^\d$/.test(result) ? '0' + result : result
  return result
}
// 银行卡号
export const invoiceBankAccount = [
  { required: true, message: '请输入开户行账号', trigger: 'blur' },
  { min: 9, max: 32, message: '请输入正确的银行账号', trigger: 'blur' },
  { pattern: /^[0-9]{1}\d{8,31}$/, message: '请输入正确的银行账号' }
]
//收件人电话
export const receiverTelCo = [
  { required: false, message: '请填写联系电话', trigger: 'blur' },
  { pattern: /^\d{10,12}$/, message: '请输入正确的电话' }
]
//开票金额
export const invoicedAmount = [
  { required: true, message: '请填写开票金额' },
  { pattern: /^(([1-9]\d+)|[1-9])(\.\d{1,2})?$/, message: '请输入正确的金额(金额大于1且小数点后只能保留两位)', trigger: 'change' }
]
export const idNoRules = [
  { required: true, message: '请填写法人身份证号' },
  { pattern: /^[1-9]{1}[0-9]{5}(17|18|19|20)[0-9]{2}((0[1-9]{1})|(1[0-2]{1}))((0[1-9]{1})|([1-2]{1}[0-9]{1}|(3[0-1]{1})))[0-9]{3}[0-9xX]{1}$/, message: '请输入正确身份证号', trigger: 'onChange' }
]
