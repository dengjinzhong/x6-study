<template>
  <div class="tree">
    <div class="tree-search">
      <el-input v-model="filterText" clearable size="mini" placeholder="输入关键字进行过滤" />
    </div>
    <el-tree
      ref="tree"
      :load="loadNode"
      :props="defaultProps"
      lazy
      node-key="id"
      show-checkbox
      check-strictly
      expand-on-click-node
      :filter-node-method="filterNode"
      highlight-current
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      filterText: '',
      defaultProps: {
        label: 'label'
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  methods: {
    loadNode() {

    },
    filterNode(value, data) {
      if (!value) return true
      return data[this.defaultProps.label].includes(value)
    },
  }
}
</script>

<style lang="scss" scoped>
.tree{
  height: 100%;
  background-color: #ffffff;
  .tree-search{
    height: 40px;
    line-height: 40px;
  }
  .tree-node{
    max-height: 300px;
    overflow-y: scroll;
    // 修复无法横向滚动问题
    ::v-deep>.el-tree-node{
      min-width:100%;
      display: inline-block;
    }
  }
}
</style>
