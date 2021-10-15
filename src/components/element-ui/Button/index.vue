<template>
  <el-button
    class="al-button"
    :type="type | typeFilter(tableColumnValue, bindConfig) "
    :size="size"
    :icon="iconPosition === 'left' ? icon : null"
    v-bind="$attrs"
    @click="$emit('click', prop)"
  >
    <slot />
    <i v-if="iconPosition === 'right'" class="button-icon" :class="icon" />
  </el-button>
</template>

<script>
import { Button as ElButton } from 'element-ui'
import { tablePropsMixin } from '../Table/tableMixins'

export default {
  name: 'Button',
  filters: {
    typeFilter(type, value, { formatter }) {
      // 如果定义了格式化函数，返回格式化内容顏色
      if (formatter && _.isFunction(formatter)) {
        return formatter(value)
      } else {
        return type
      }
    }
  },
  components: { ElButton },
  mixins: [tablePropsMixin],
  inheritAttrs: false,
  props: {
    prop: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'mini'
    },
    type: {
      type: String,
      default: 'primary'
    },
    icon: {
      type: String,
      default: null
    },
    iconPosition: {
      type: String,
      default: 'left'
    }
  },
}
</script>

<style lang="scss" scoped>
  .al-button{
    height: 28px;
    padding: 0 15px;
  }
  .button-icon{
    margin-left: 5px;
  }
</style>
