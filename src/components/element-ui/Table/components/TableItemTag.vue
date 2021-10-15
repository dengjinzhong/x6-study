<template>
  <div>
    <template v-for="(item, index) in options">
      <template v-if="values.includes(item.value)">
        <span
          v-if="item.type === 'default' || item.type === ''"
          :key="item.value"
          :index="index"
          :class="item.cssClass"
        >{{ item.label }}</span>
        <el-tag
          v-else
          :key="item.value"
          :index="index"
          :type="item.type === 'primary' ? '' : item.type"
          :class="item.cssClass"
        >
          {{ item.label }}
        </el-tag>
      </template>
    </template>
  </div>
</template>

<script>
import { tablePropsMixin } from '../tableMixins'
export default {
  name: 'DictTag',
  mixins: [tablePropsMixin],
  computed: {
    options() {
      return this.bindConfig.options || []
    },
    values() {
      if (this.tableColumnValue !== null && typeof this.tableColumnValue !== 'undefined') {
        return Array.isArray(this.tableColumnValue) ? this.tableColumnValue : [String(this.tableColumnValue)]
      } else {
        return []
      }
    },
  },
}
</script>
<style scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}
</style>
