const requiredRules = (msg, trigger) => {
  return { required: true, message: msg, trigger: trigger || ['blur', 'change'] }
}

const requiredRegexp = (regexp, msg, trigger) => {
  return { pattern: regexp, message: msg, trigger: trigger || ['blur', 'change'] }
}

const numberRegexp = /^[0-9]*$/
const figureRegexp = /^-?[0-9]*$/
const floatRegexp = /^-?\d+(\.\d+)?$/
const numberPositiveRegexp = /^[1-9][0-9]*$/

const phoneRegexp = /^1[3|4|5|6|7|8|9][0-9]\d{8}$/

const emailRules = (msg, trigger) => {
  return {
    type: 'email',
    message: msg || '请输入正确的邮箱地址',
    trigger: trigger || ['blur', 'change']
  }
}

const phoneRules = (msg, trigger) => {
  return {
    pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
    message: msg || '请输入正确的手机号码',
    trigger: trigger || 'blur'
  }
}

export {
  requiredRules, requiredRegexp,
  emailRules, phoneRules,
  numberRegexp, // 数字正则校验
  figureRegexp, // 数字正则校验
  floatRegexp, // 浮点正则校验
  numberPositiveRegexp, // 正整数正则校验
}
