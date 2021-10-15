<template>
  <el-pagination
    ref="alPagination"
    class="al-pagination"
    :layout="layout"
    :current-page="pageNum"
    :page-size="pageSize"
    :total="total"
    :page-sizes="pageSizes"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<script>
import { Pagination as ElPagination } from 'element-ui'
export default {
  name: 'Pagination',
  components: {
    ElPagination
  },
  props: {
    pageNum: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 20
    },
    total: {
      type: Number,
      default: 0
    },
    pageSizes: {
      type: Array,
      default: () => {
        return [20, 50, 100, 200]
      }
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next'
    }
  },
  data() {
    return {}
  },
  methods: {
    handleSizeChange(val) {
      this.$emit('handleSizeChange', val)
    },
    handleCurrentChange(val) {
      this.$emit('handleCurrentChange', val)
    },
  }
}
</script>

<style lang="scss" scoped>
.al-pagination ::v-deep{
  .el-pagination__total, .el-pagination__sizes, .btn-prev, .btn-next, .el-pager li{
    height: 40px;
    line-height: 40px;
  }
}
</style>
