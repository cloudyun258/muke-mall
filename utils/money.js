/*
 * 人民币格式化函数
 * 参数1： 原始数据
 * 参数2： 前置符号,可省略 默认$
 * 参数3： 保留几位小数, 可省略, 默认2 
 * 
 * 如 const money = moneyFormat(543214, '$', 3)
 *   ---> monry = $543,214.000
*/

export function moneyFormat (value, currency, decimals) {
  value = parseFloat(value)
  if (!isFinite(value) || (!value && value !== 0)) return ''
  currency = currency != null ? currency : '$'
  decimals = decimals != null ? decimals : 2
  let stringified = Math.abs(value).toFixed(decimals)

  let _int = decimals
    ? stringified.slice(0, -1 - decimals)
    : stringified

  let i = _int.length % 3

  let head = i > 0
    ? (_int.slice(0, i) + (_int.length > 3 ? ',' : ''))
    : ''

  let _float = decimals
    ? stringified.slice(-1 - decimals)
    : ''

  let sign = value < 0 ? '-' : ''

  return sign + currency + head +
    _int.slice(i).replace(/(\d{3})(?=\d)/g, '$1,') + _float
}