<template>
  <el-date-picker
    v-model="vModelValue"
    :type="type"
    :placeholder="placeholder"
    :value-format="valueFormat || type === 'datetime' ? 'yyyy-MM-dd HH:mm:ss' : 'yyyy-MM-dd'"
    :picker-options="pickerOptions"
    v-bind="$attrs"
  />
</template>

<script>
import { DatePicker as ElDatePicker } from 'element-ui'
import { vModelMixin } from '@/mixins'

export default {
  name: 'DatePicker',
  components: {
    ElDatePicker
  },
  mixins: [vModelMixin],
  props: {
    placeholder: {
      type: String,
      default: '选择日期'
    },
    valueFormat: {
      type: String,
      default: ''
    },
    pickerOptions: {
      type: Object,
      default: () => {
        return {
          disabledDate(time) {
            return time.getTime() > Date.now()
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date())
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          }, {
            text: '三天前',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 3)
              picker.$emit('pick', date)
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }]
        }
      }
    },
    type: {
      type: String,
      default: 'date'
    }
  }
}
</script>
