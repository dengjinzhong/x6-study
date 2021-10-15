<template>
  <div class="app-container dashboard-container">
    <al-table-page
      v-bind="pageConfig"
      :table-data="tableData"
      :page-data="pageData"
    />
  </div>
</template>

<script>
import { pageConfig } from './config'
import { tablePageMixin } from '@/mixins'

export default {
  name: 'Dashboard',
  mixins: [tablePageMixin],
  data() {
    return {
      pageConfig,
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  methods: {
    getPageTableList() {
      this.$message.success('请求列表数据')
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-container{
  height: 100%;
}
</style>
