<!--input-数字-->
<template>
  <el-input
    v-model="vModelValue"
    v-bind="$attrs"
    :class="size"
    :max="maxVal"
    @blur="keyUpEvent('blur',prop, vModelValue)"
    @keyup.enter.native="keyUpEvent('enter',prop, vModelValue)"
    @keyup.space.native="keyUpEvent('space',prop, vModelValue)"
    @change="handleLimitValue"
  >
    <template slot="append">
      <div v-if="appendLabel" class="input-append">
        <span v-if="appendLabel">{{ appendLabel }}</span>
      </div>
      <slot name="append" />
    </template>
  </el-input>
</template>
<script>
import { Input as ElInput } from 'element-ui'
import { vModelMixin } from '@/mixins'

export default {
  name: 'InputNumber',
  components: { ElInput },
  mixins: [vModelMixin],
  props: {
    /**
     * 最大值
     */
    maxVal: {
      type: Number,
      default: 10000
    },
    minVal: {
      type: Number,
      default: 0
    },
    /**
     * input大小
     * 默认medium中等 - large/medium/small/mini
     */
    size: {
      type: String,
      default: 'medium',
    },
    appendLabel: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
    }
  },
  methods: {
    keyUpEvent(event, prop, value) {
      if (/[^\d\.]/g.test(value)) {
        this.vModelValue = value.replace(/[^\d\.]+/g, '')
      }
    },
    handleLimitValue(value) {
      if (Number(value) > this.maxVal) {
        this.vModelValue = this.maxVal
      }
      if (Number(value) < this.minVal) {
        this.vModelValue = this.minVal
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-input{
  &.large {
    width: 400px !important;
  }
  &.medium {
    //width: 40px !important;
  }
  &.small {
    width: 120px !important;
  }
  &.mini {
    width: 46px !important;
  }
}
</style>
