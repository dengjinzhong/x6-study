<template>
  <el-checkbox
    v-model="vModelValue"
    v-bind="$attrs"
    @change="formItemEvent"
  >
    <slot />
  </el-checkbox>
</template>

<script>
import { Checkbox as ElCheckbox } from 'element-ui'
import { vModelMixin } from '@/mixins'

export default {
  name: 'Checkbox',
  components: {
    ElCheckbox
  },
  mixins: [vModelMixin],
  methods: {
    formItemEvent(value, e) {
      this.$emit('formItemEvent', {
        event: 'checkBoxChange', prop: value, e
      })
    }
  }
}
</script>
