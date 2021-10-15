<template>
  <el-input
    v-model.trim="vModelValue"
    type="password"
    show-password
    v-bind="config"
    :readonly="readOnlyFlag"
    @focus="readOnlyFlag = false;formItemEvent('focus', prop, vModelValue, $event)"
    @input="formItemEvent('input', prop, vModelValue, $event)"
    @blur="formItemEvent('blur', prop, vModelValue, $event)"
    @change="formItemEvent('change', prop, vModelValue, $event)"
    @clear="formItemEvent('clear', prop, vModelValue, $event)"
    @keyup.enter.native="formItemEvent('keyupEnter', prop, vModelValue, $event)"
  />
</template>

<script>
import { Input as ElInput } from 'element-ui'
import { vModelMixin } from '@/mixins'

export default {
  name: 'InputPassword',
  components: {
    ElInput
  },
  mixins: [vModelMixin],
  inheritAttrs: false,
  data() {
    return {
      readOnlyFlag: true
    }
  },
  computed: {
    config() {
      const config = {
        size: 'mini',
      }
      return { ...config, ...this.$attrs }
    }
  },
  methods: {
    formItemEvent(event, prop, value, e) {
      this.$emit('formItemEvent', {
        event, prop, value, e
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
