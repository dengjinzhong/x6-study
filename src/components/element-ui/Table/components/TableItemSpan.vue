<template>
  <span>{{ tableRow | rowFilter(tableColumnValue, bindConfig) }}</span>
</template>

<script>
import { tablePropsMixin } from '../tableMixins'
import _ from 'lodash'
export default {
  name: 'TableItemSpan',
  filters: {
    rowFilter(row, value, { formatter, emptyValue = '--' }) {
      // 如果定义了格式化函数，返回格式化内容
      if (formatter && _.isFunction(formatter)) {
        return formatter(row)
      } else if (_.isNil(value) || value === '') {
        return emptyValue
      }
      return value
    }
  },
  mixins: [tablePropsMixin]
}
</script>

<style scoped>

</style>
