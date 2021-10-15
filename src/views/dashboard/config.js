import { FormItem } from '@/config/formConfig'

const sexList = [
  { value: '0', label: '男' },
  { value: '1', label: '女' },
]

const pageConfig = {
  searchList: [
    new FormItem('date', '日期', 'date'),
    new FormItem('name', '姓名', 'input', { placeholder: '请输入姓名' }),
    new FormItem('sex', '性别', 'select', { options: sexList, isAll: true }),
    new FormItem('address', '地址', 'input', { placeholder: '请输入地址' }),
  ],
  searchFormConfig: {
    mainConfig: {
      labelWidth: 'auto'
    }
  },
  tableList: [
    { type: 'selection' },
    { type: 'index', label: '序号' },
    { prop: 'date', label: '日期' },
    { prop: 'name', label: '姓名' },
    { prop: 'sex', label: '性别' },
    { prop: 'address', label: '地址' },
  ]
}

export {
  pageConfig
}
