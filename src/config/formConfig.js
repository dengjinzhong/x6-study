/**
 * 输入控件
 * 文本框（textbox）
 * 多行文本框（textarea）
 * 下拉框（combobox）
 * 日期框（datebox）
 * 日期时间框（datetimebox)
 */
const componentData = {
  textbox: 'input',
  textarea: 'input',
  combobox: 'select',
  datebox: 'date',
  datetimebox: 'date',
}
const textareaConfig = {
  type: 'textarea',
  autosize: { minRows: 4 },
  resize: 'none'
}

class FormItem {
  constructor(prop, label, component, bindConfig = {}, itemConfig = {}, isHide = false) {
    this.prop = prop
    this.label = label
    this.component = component
    this.bindConfig = bindConfig
    this.itemConfig = itemConfig
    this.isHide = isHide
  }
}

export {
  textareaConfig, componentData, FormItem
}
