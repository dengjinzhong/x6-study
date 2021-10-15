<template>
  <el-checkbox-group
    v-model="vModelValue"
    v-bind="groupConfig"
  >
    <el-checkbox
      v-for="checkbox in options"
      :key="checkbox.value"
      :label="checkbox.value"
      :disabled="checkbox.disabled"
    >{{ checkbox.label }}</el-checkbox>
  </el-checkbox-group>
</template>

<script>
import { CheckboxGroup as ElCheckboxGroup } from 'element-ui'
import ElCheckbox from './index'

import { vModelMixin } from '@/mixins'

export default {
  name: 'CheckboxGroup',
  components: {
    ElCheckboxGroup, ElCheckbox
  },
  mixins: [vModelMixin],
  inheritAttrs: false,
  props: {
    groupConfig: {
      type: Object,
      default: () => ({})
    },
    options: {
      type: Array,
      default: () => []
    },
    defaultValue: {
      type: Array,
      default: () => []
    }
  }
}
</script>
