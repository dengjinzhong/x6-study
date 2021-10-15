组件使用示例：
#### 基础示例：
```vue
<template>
  <div class="page-table-wrapper">
    <table-page
      class="page-table-container"
      style="background: #ffffff; padding: 20px;"
      :search-form="searchForm"
      :search-list="searchList"
      :handle-button="handleButton"
      :table-list="tableList"
      :table-data="tableData"
      :page-data="pageData"
    />
  </div>
</template>

<script>
import TablePage from 'c/Page/TablePage'
import buttonData from '@/config/button'
export default {
  name: 'TablePageDemo',
  components: {
    TablePage
  },
  data() {
    return {
      searchForm: {
        date: '',
        name: '',
        address: '',
      },
      searchList: [
        { prop: 'date', label: '开始日期', component: 'date' },
        { prop: 'name', label: '名称', component: 'input', bindConfig: { placeholder: '请输入名称进行搜索' }},
        { prop: 'address', label: '地址', component: 'input' },
      ],
      handleButton: [buttonData.export, buttonData.Import, buttonData.refresh, buttonData.delete],
      tableList: [
        { prop: 'date', label: '日期' },
        { prop: 'name', label: '名称' },
        { prop: 'address', label: '地址' },
      ],
      tableData: [{
        date: '2016-05-02',
        name: '王大虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王二虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王三虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      pageData: {
        pageSize: 1,
        pageNum: 20,
        total: 4
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.page-table-wrapper{
  height: 100%;
  padding: 10px;
  background-color: #f0f2f5;
  .page-table-container{
    height: 100%;
    padding: 10px;
    background-color: #ffffff;
  }
}
</style>

```
