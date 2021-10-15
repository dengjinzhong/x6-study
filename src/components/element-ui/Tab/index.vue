<template>
  <el-tabs v-model="vModelValue" class="al-tabs" @tab-click="handleClick">
    <el-tab-pane
      v-for="tab in tabList"
      :key="tab.name"
      :name="tab.name"
      :label="tab.label"
    />
  </el-tabs>
</template>

<script>
import { vModelMixin } from '@/mixins'
export default {
  name: 'Tab',
  mixins: [vModelMixin],
  props: {
    tabList: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    handleClick(tab, event) {
      this.$emit('handleClick', tab, event)
    }
  }
}
</script>

<style lang="scss" scoped>
.al-tabs ::v-deep{
  .el-tabs__header{
    margin: 0 0 10px;
  }
}
</style>
