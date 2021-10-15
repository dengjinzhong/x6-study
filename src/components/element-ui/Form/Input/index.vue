<template>
  <el-input
    v-model="vModelValue"
    v-bind="config"
    @input="formItemEvent('input', prop, vModelValue, $event)"
    @blur="formItemEvent('blur', prop, vModelValue, $event)"
    @focus="formItemEvent('focus', prop, vModelValue, $event)"
    @change="formItemEvent('change', prop, vModelValue, $event)"
    @clear="formItemEvent('clear', prop, vModelValue, $event)"
    @keyup.enter.native="formItemEvent('keyupEnter', prop, vModelValue, $event)"
  >
    <template slot="prepend">
      <slot name="prepend" />
    </template>
    <template slot="append">
      <div v-if="appendLabel || appendIcon" class="input-append" @click="formItemEvent('inputAppendClick', prop)">
        <span v-if="appendLabel">{{ appendLabel }}</span>
        <i v-if="appendIcon" :class="appendIcon" />
      </div>
      <slot name="append" />
    </template>
  </el-input>
</template>

<script>
import { Input as ElInput } from 'element-ui'
import { vModelMixin } from '@/mixins'

export default {
  name: 'Input',
  components: {
    ElInput
  },
  mixins: [vModelMixin],
  inheritAttrs: false,
  props: {
    type: {
      type: String,
      default: 'text'
    },
    appendIcon: {
      type: String,
      default: ''
    },
    appendLabel: {
      type: String,
      default: ''
    }
  },
  computed: {
    config() {
      const config = {
        type: this.type,
        size: 'mini',
      }
      if (this.type === 'textarea') {
        config.autosize = { minRows: 4 }
        config.resize = 'none'
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
