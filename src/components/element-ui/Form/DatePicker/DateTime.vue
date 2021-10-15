<template>
  <el-time-picker
    v-model="vModelValue"
    :placeholder="placeholder"
    v-bind="$attrs"
  />
</template>

<script>
import { TimePicker as ElTimePicker } from 'element-ui'
import { vModelMixin } from '@/mixins'

export default {
  name: 'DatePicker',
  components: {
    ElTimePicker
  },
  mixins: [vModelMixin],
  props: {
    placeholder: {
      type: String,
      default: '选择时间'
    },
  }
}
</script>
