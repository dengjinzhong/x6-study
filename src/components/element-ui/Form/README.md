组件使用示例：
### 配置讲解
#### formList Attributes
|   参数    | 说明    |  类型   | 可选值 | 默认值 | 备注 |
| :-----  | :------- | :------  | :----- | :---- | :---- |
| prop  | 表单的属性 | `string` | — | — | 不能重复, 不能重复, 不能重复 |
| label  | 显示的标题 | `string` | — | — |  |
| component  | 组件名称 | `string` | input/select... | text | 可自定义 |
| itemConfig  | el-form-item属性配置 | `Object` | — | — |  |
| bindConfig  | component属性配置 | `Object` | — | — |  |

#### component 讲解

|  组件名   |  组件说明  |
| :-------: | :--------: |
|   input   |   输入框   |
|  select   |   选择器   |
|   date    | 日期选择器 |
|   time    | 时间选择器 |
|  button   |    按钮    |
|   check   | 多选(单个) |
| checkbox  | 多选(多个) |
|   redio   |    单选    |
|   file    |  上传文件   |
|  cascade  | 级联选择器 |
| modelIcon |  图标选择  |



#### 基础示例：

```vue
<template>
  <div style="margin: 20px">
    <al-form
      ref="alForm"
      class="form"
      :form-data="formData"
      :form-list="formList"
      :form-config="formConfig"
      @formChange="formChange"
      @buttonClick="buttonClick"
      @formItemEvent="formItemEvent"
    />
    <div style="margin: 20px">{{ data }}</div>
  </div>
</template>

<script>
import AlForm from 'e/Form'
import buttonData from '@/config/button'

const regionOptions = [
  { label: '上海', value: 'shanghai' },
  { label: '北京', value: 'beijing' },
]

const descOption = [
  { label: '美食/餐厅线上活动', value: '0' },
  { label: '地推活动', value: '1', disabled: true },
  { label: '线下主题活动', value: '2' },
  { label: '单纯品牌曝光', value: '3' },
]

const resourceOption = [
  { label: '线上品牌商赞助', value: '0' },
  { label: '线下场地免费', value: '1' },
]

export default {
  name: 'FormDemo',
  components: {
    AlForm
  },
  data() {
    return {
      demoForm: {
        name: ''
      },
      formList: [
        { prop: 'name', label: '活动名称', component: 'input' },
        { prop: 'region', label: '活动区域', component: 'select', bindConfig: { options: regionOptions }},
        { prop: 'date', label: '活动时间', component: 'date' },
        { prop: 'delivery', label: '即时配送', component: 'check' },
        { prop: 'type', label: '活动性质', component: 'checkbox', bindConfig: { options: descOption }},
        { prop: 'resource', label: '特殊资源', component: 'radio', bindConfig: { options: resourceOption }},
        { prop: 'desc', label: '活动形式', component: 'input', bindConfig: { type: 'textarea' }},
        { prop: 'button', component: 'button', bindConfig: { buttonList: [buttonData.confirm, buttonData.resetForm] }},
      ],
      formConfig: {
        inline: false
      },
      formData: {
        name: '',
        region: '',
        date: '',
        delivery: '',
        type: [],
        resource: '',
        desc: '',
      },
    }
  },
  computed: {
    data() {
      return JSON.stringify(this.formData)
    }
  },
  methods: {
    formChange(prop, value) {
      console.log(value, prop)
    },
    formItemEvent(event) {
      console.log(event)
    },
    buttonClick(prop) {
      switch (prop) {
        case 'resetForm':
          this.$refs.alForm.resetFieldsForm()
          break
        default:
          return
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.form{
  padding-top: 20px;
}
</style>

```

#### 表单功能
```vue
<template>
  <div class="form-main">
    <al-form
      ref="alForm"
      :form-data="formData"
      :form-list="formList"
      :form-config="formConfig"
      @formChange="formChange"
      @buttonClick="buttonClick"
    />
  </div>
</template>

<script>
import AlForm from 'e/Form'
import CronForm from '@/views/demo/Form/components/CronForm'
import IntervalForm from '@/views/demo/Form/components/IntervalForm'

import buttonData from '@/config/button'
import { cloneDeep } from 'lodash'

const cOptions = [
  { label: '自定义周期', value: '1' },
  { label: '每周的星期一8点', value: '2' },
  { label: '每月的第一天的8点', value: '3' },
]

const dOptions = [
  { label: '每年', value: '1' },
  { label: '每月', value: '2' },
  { label: '每周', value: '3' },
  { label: '每天', value: '4' },
  { label: '间隔执行', value: '5' },
  { label: '自定义', value: '6' },
]

const formList = [
  { prop: 'a', label: '启用', component: 'check', itemConfig: { class: 'form-item-block' }},
  { prop: 'b', label: '名称', component: 'input', itemConfig: { class: 'form-item-block', required: true }},
  { prop: 'c', label: '执行周期', component: 'select', itemConfig: { class: 'form-item-block', required: true }, bindConfig: { options: cOptions }},
  { prop: 'd', label: '', component: 'radio', itemConfig: { class: 'form-item-block' }, bindConfig: { options: dOptions }},
  { prop: 'e', label: '每年的第', component: 'input', bindConfig: { disabled: true, appendLabel: '月' }},
  { prop: 'f', label: '每周星期', component: 'input', bindConfig: { disabled: true }},
  { prop: 'g', label: '每月的第', component: 'input', bindConfig: { disabled: true, appendLabel: '天' }},
  { prop: 'h', label: '每天的', component: 'input', bindConfig: {}},
  { prop: 'i', label: '', component: CronForm, itemConfig: { class: 'form-item-block' }},
  { prop: 'x', label: '执行间隔', component: IntervalForm, itemConfig: { class: 'form-item-block' }, isHide: true },
  { prop: 'y', label: '开始时间', component: 'time', isHide: true },
  { prop: 'z', label: '结束时间', component: 'time', isHide: true },
  { prop: 'j', label: '生效日期', component: 'date' },
  { prop: 'k', label: '失效日期', component: 'date' },
  { prop: 'l', label: '重试', component: 'check', itemConfig: { class: 'form-item-block' }, bindConfig: { label: '（任务执行失败后，进行重试的设置）' }},
  { prop: 'm', label: '重试次数', component: 'input' },
  { prop: 'n', label: '间隔时间', component: 'input' },
  { prop: 'button', component: 'button', bindConfig: { buttonList: [buttonData.confirm, buttonData.resetForm] }},
]

export default {
  name: 'DemoForm',
  components: {
    AlForm
  },
  data() {
    return {
      formList: cloneDeep(formList),
      formData: {
        a: '',
        b: '',
        c: '',
        d: '4',
        e: '',
        f: '',
        g: '',
        h: '',
        i: '',
        j: '',
        k: '',
        l: '',
        m: '',
        n: '',
      },
      formConfig: {
        inline: true,
        isColon: true
      }
    }
  },
  methods: {
    formChange(prop, value) {
      switch (prop) {
        case 'c':
          // 执行周期
          this.cFormChange(value)
          break
        case 'd':
          // 执行周期自定义
          this.dFormChange(value)
          break
        default:
          return
      }
    },
    cFormChange(value) {
      const data = { '1': 'a', '2': 'b', '3': 'c' }
      const type = data[value]
      this.setCronPeriod(type)
      this.setCronType(true)
    },
    dFormChange(value) {
      const data = { '1': 'year', '2': 'month', '3': 'week', '4': 'day', '5': '', '6': 'self' }
      const type = data[value]
      if (type) {
        this.setCronPeriod(type)
        this.setCronType(true)
      } else {
        this.setCronType(false)
      }
    },
    setCronPeriod(type) {
      const formRef = this.$refs.alForm
      const formDisabledData = {
        a: { e: false, eValue: '', f: true, fValue: '', g: false, gValue: '', h: true, hValue: '', i: true, iValue: '' }, // 自定义周期
        b: { e: true, eValue: '', f: false, fValue: '1', g: true, gValue: '', h: false, hValue: '8:00:00', i: true, iValue: '' }, // 每周的星期一8点
        c: { e: true, eValue: '', f: true, fValue: '', g: false, gValue: '1', h: false, hValue: '8:00:00', i: true, iValue: '' }, // 每月的第一天8点
        year: { e: false, eValue: '', f: true, fValue: '', g: false, gValue: '', h: false, hValue: '00:00:00', i: true, iValue: '' }, // 每年
        month: { e: true, eValue: '', f: true, fValue: '', g: false, gValue: '', h: false, hValue: '00:00:00', i: true, iValue: '' }, // 每月
        week: { e: true, eValue: '', f: false, fValue: '', g: true, gValue: '', h: false, hValue: '00:00:00', i: true, iValue: '' }, // 每周
        day: { e: true, eValue: '', f: true, fValue: '', g: true, gValue: '', h: false, hValue: '00:00:00', i: true, iValue: '' }, // 每月
        self: { e: true, eValue: '', f: true, fValue: '', g: true, gValue: '', h: true, hValue: '', i: false, iValue: '' }, // 自定义
      }
      const configData = formDisabledData[type]
      formRef.setBindConfig('e', 'disabled', configData.e)
      formRef.setBindConfig('f', 'disabled', configData.f)
      formRef.setBindConfig('g', 'disabled', configData.g)
      formRef.setBindConfig('h', 'disabled', configData.h)
      formRef.setBindConfig('i', 'disabled', configData.i)
      this.formData.e = configData.eValue
      this.formData.f = configData.fValue
      this.formData.g = configData.gValue
      this.formData.h = configData.hValue
      this.formData.i = configData.iValue
    },
    setCronType(isOften) {
      const formRef = this.$refs.alForm
      // 常规Cron表达式
      formRef.setConfig('e', 'isHide', !isOften)
      formRef.setConfig('f', 'isHide', !isOften)
      formRef.setConfig('g', 'isHide', !isOften)
      formRef.setConfig('h', 'isHide', !isOften)
      formRef.setConfig('i', 'isHide', !isOften)
      // 间隔执行
      formRef.setConfig('x', 'isHide', isOften)
      formRef.setConfig('y', 'isHide', isOften)
      formRef.setConfig('z', 'isHide', isOften)
    },
    buttonClick(prop) {
      if (prop === 'resetForm') {
        this.$refs.alForm.resetFieldsForm()
        this.formList = cloneDeep(formList)
      }
    }
  }
}
</script>

<style scoped>
  .form-main{
    width: 666px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ccc;
  }
</style>

```
