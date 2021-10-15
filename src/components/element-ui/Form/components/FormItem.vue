<template>
  <el-form-item
    :prop="prop"
    :label="label"
    v-bind="itemConfig"
  >
    <component
      :is="component | filterComponent"
      v-model="formData[prop]"
      :form-data="formData"
      :prop="prop"
      v-bind="bindConfig"
      @value:change="formChange(prop, $event)"
      @buttonClick="buttonClick"
      @formItemEvent="formItemEvent"
    />
  </el-form-item>
</template>

<script>
import { FormItem as ElFormItem } from 'element-ui'
import componentData from '../config'
export default {
  name: 'FormItem',
  components: {
    ElFormItem
  },
  filters: {
    filterComponent(val) {
      return componentData[val] || val
    }
  },
  inheritAttrs: false,
  props: {
    prop: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    component: {
      type: [String, Object],
      required: true
    },
    itemConfig: {
      type: Object,
      default: () => ({})
    },
    bindConfig: {
      type: Object,
      default: () => ({})
    },
    formData: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {}
  },
  methods: {
    formChange(prop, value) {
      this.$emit('formChange', prop, value)
    },
    formItemEvent(event) {
      this.$emit('formItemEvent', event)
    },
    buttonClick(prop, data) {
      this.$emit('buttonClick', prop, data)
    },
    setBindConfig(bindProp, value) {
      this.$set(this.bindConfig, bindProp, value)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
