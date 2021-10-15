组件使用示例
#### 基础示例：
```vue
<template>
  <div class="demo-main">
    <search-form
      :search-form="searchForm"
      :search-list="searchList"
      @searchClick="searchClick"
    />
  </div>
</template>

<script>
import SearchForm from 'e/Form/SearchForm'

const typeOptions = [
  { label: '类型1', value: 1 },
  { label: '类型2', value: 2 },
  { label: '类型3', value: 3 },
  { label: '类型4', value: 4 },
]

const flagOptions = [
  { label: '标志1', value: 1 },
  { label: '标志2', value: 2 },
]

const statusOptions = [
  { label: '状态1', value: 1 },
  { label: '状态1', value: 2 },
]

export default {
  name: 'SearchFormDemo',
  components: {
    SearchForm
  },
  data() {
    return {
      searchList: [
        { prop: 'date', label: '开始时间', component: 'date' },
        { prop: 'name', label: '名称', component: 'input', bindConfig: { placeholder: '请输入名称搜索' }},
        { prop: 'type', label: '类型', component: 'select', bindConfig: { options: typeOptions }},
        { prop: 'flag', label: '标志', component: 'select', bindConfig: { options: flagOptions }},
        { prop: 'status', label: '状态', component: 'select', bindConfig: { options: statusOptions }},
        { prop: 'code', label: '代码', component: 'input' },
      ],
      searchForm: {
        date: '',
        type: '',
        name: '',
        flag: '',
        status: '',
        code: '',
      }
    }
  },
  methods: {
    searchClick() {
      this.$message({
        type: 'success',
        message: '正在搜索...'
      })
      console.log('searchClick', this.searchForm)
    }
  }
}
</script>

<style lang="scss" scoped>
.demo-main{
  margin: 10px;
}
</style>

```
