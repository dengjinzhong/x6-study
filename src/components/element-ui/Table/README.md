### 配置讲解
#### tableList Attributes
|   参数    | 说明    |  类型   | 可选值 | 默认值 | 备注 |
| :-----  | :------- | :------  | :----- | :---- | :---- |
| type  | 对应列的类型 | `string` | index/select/button | — |  |
| prop  | 对应列内容的字段名 | `string` | — | — | 不能重复, 不能重复, 不能重复 |
| label  | 显示的标题 | `string` | — | — |  |
| component  | 组件类型 | `string` | click/span | span | 可自定义 |
| itemConfig  | 对应列配置 | `Object` | — | — |  |
| bindConfig  | 自定义列配置 | `Object` | — | — |  |
#### itemConfig Attributes
|   参数    | 说明    |  类型   | 可选值 | 默认值 | 备注 |
| :-----  | :------- | :------  | :----- | :---- | :---- |
| align  | 对齐方式 | `string` | left/center/right | center |  |
| width  | 对应列的宽度 | `string` | — | — |  |
| sortable  | 对应列是否可以排序 | `Boolean` | — | false |  |
| fixed  | 列是否固定在左侧或者右侧 | `string` | left/center/right | — |  |
| showOverflowTooltip  | 当内容过长被隐藏时显示 tooltip | `Boolean` | — | true |  |
| ...  | 更多参数配置请参照 element-ui |  | — |  |  |

#### bindConfig Attributes
|   参数    | 说明    |  类型   | 可选值 | 默认值 | 备注 |
| :-----  | :------- | :------  | :----- | :---- | :---- |
| emptyValue  | 数据为空显示内容 | `string` | - | '--' |  |
| formatter  | 用来格式化内容 | `Function` | — | — | Function(row) |
| isHtml  | 是否按html处理内容 | `B00lean` | — | `false` |  |

#### tablePropsMixin Attributes
|   参数    | 说明    |  类型   | 可选值 | 默认值 | 备注 |
| :-----  | :------- | :------  | :----- | :---- | :---- |
| tableRow  | 当前行信息 | `Object` | - | '--' |  |
| tableColumnValue  | 当前项信息 | `Object` | - | '--' |  |
| tableIndex  | 当前序号 | `Number` | - | '--' |  |

#### click-bindConfig Attributes
|   参数    | 说明    |  类型   | 可选值 | 默认值 | 备注 |
| :-----  | :------- | :------  | :----- | :---- | :---- |
| iconProp  | 图标 | `string` | - | '--' |  |
| iconName  | 图标名称 | `string` | - | - |  |
| defaultIcon  | 默认图标 | `string` | - | - |  |
| formatter  | 是否可点击 | `Boolean/Function` | - | - | Formatter(isItem ? this.tableColumnValue : this.tableRow) |
| isItem  | 是否当前行或当前项- (formatter)是否可点击传入的参数 | `Boolean` | - | - |  |

### 基础用法
```vue
<template>
<div class="table-demo">
    <al-table
      :table-list="tableList"
      :table-data="tableData"
      :table-config="tableConfig"
    />
</div>
</template>

<script>
import AlTable from 'e/Table'
export default {
  name: 'TableDemo',
  components: {
    AlTable
  },
  data() {
    return {
      tableList: [
        { type: 'index', label: '序号' },
        { type: 'selection' },
        { prop: 'name', label: '姓名', component: 'click', itemConfig: { align: 'left' }},
        { prop: 'date', label: '生日', bindConfig: { emptyValue: '暂无数据' }},
        { prop: 'height', label: '身高', itemConfig: { sortable: true }},
        { prop: 'sex', label: '性别', bindConfig: { formatter: (row) => row.sex === '0' ? '男' : '女' }},
        { prop: 'money', label: '赏金', itemConfig: { sortable: true }},
        { type: 'button', buttonList: [{ prop: 'edit', label: '编辑' }], itemConfig: { width: 120 }}
      ],
      tableData: [
        { name: '路飞', date: '05-05', sex: '0', height: '172', money: '1500000000' },
        { name: '索隆', date: '11-11', sex: '0', height: '178', money: '320000000' },
        { name: '娜美', date: '07-03', sex: '1', height: '169', money: '66000000' },
        { name: '乌索普', date: '04-01', sex: '0', height: '174', money: '200000000' },
        { name: '山治', date: '03-02', sex: '1', height: '177', money: '330000000' },
        { name: '乔巴', date: '12-24', sex: '1', height: null, money: '100' },
        { name: '罗宾', date: '02-06', sex: '0', height: '188', money: '130000000' },
        { name: '弗兰奇', date: '03-09', sex: '1', height: '225', money: '94000000' },
        { name: '布鲁克', date: '', sex: '1', height: '266', money: '83000000' },
      ],
      tableConfig: {
        height: '100%'
      }
    }
  }
}
</script>

<style scoped>
.table-demo{
  height: 100%;
  padding: 20px;
}
</style>

```

### 自定义组件用法
```vue
<template>
  <div class="table-demo">
    <al-table
      :table-list="tableList"
      :table-data="tableData"
      :table-config="tableConfig"
    />
  </div>
</template>

<script>
import AlTable from 'e/Table'
import TableSelfColumn from '@/views/demo/Table/components/TableSelfColumn'
import TableSelfButton from '@/views/demo/Table/components/TableSelfButton'

const statusFormatter = (row) => {
  const status = row.status
  switch (status) {
    case '0':
      return '已禁用'
    case '1':
      return '任务正在进行'
    default:
      return '--'
  }
}

export default {
  name: 'TableDemo',
  components: {
    AlTable
  },
  data() {
    return {
      tableList: [
        { type: 'index', label: '序号' },
        { type: 'selection' },
        { prop: 'name', label: '名称', component: TableSelfColumn },
        { prop: 'status', label: '状态', bindConfig: { formatter: statusFormatter }},
        { type: 'button', label: '自定义操作', component: TableSelfButton }
      ],
      tableData: [
        { name: '文件夹一', status: null, type: '0' },
        { name: '任务一', status: '0', type: '1' },
        { name: '任务二', status: '1', type: '1' },
        { name: '任务三', status: null, type: '2' },
      ],
      tableConfig: {
        height: '100%'
      }
    }
  }
}
</script>

<style scoped>
  .table-demo{
    height: 100%;
    padding: 20px;
  }
</style>

```

#### TableSelfButton
```vue
<template>
  <div>
    <al-button v-if="tableTypeValue === '0'" type="text">重命名</al-button>
    <al-button v-if="tableIndex !== 0" type="text">置顶</al-button>
    <al-button v-if="tableTypeValue !== '0'" type="text">立即执行</al-button>
    <al-button v-if="tableTypeValue === '1' && tableStatusValue === '0'" type="text">启用</al-button>
    <al-button v-if="tableTypeValue === '1' && tableStatusValue === '1'" type="text">禁用</al-button>
    <al-button v-if="tableTypeValue !== '0'" type="text">编辑</al-button>
    <al-button type="text">删除</al-button>
  </div>
</template>

<script>
import AlButton from 'e/Button'
import { tablePropsMixin } from 'e/Table/tableMixins'

export default {
  name: 'TableSelfButton',
  components: {
    AlButton
  },
  mixins: [tablePropsMixin],
  inheritAttrs: false,
  computed: {
    tableTypeValue() {
      return this.tableRow.type
    },
    tableStatusValue() {
      return this.tableRow.status
    }
  }
}
</script>
```

#### TableSelfColumn
```vue
<template>
  <span class="table-self-column">
    <i :class="iconClass" />
    {{ tableColumnValue }}
  </span>
</template>

<script>
import { tablePropsMixin } from 'e/Table/tableMixins'

export default {
  name: 'TableSelfColumn',
  mixins: [tablePropsMixin],
  computed: {
    iconClass() {
      const type = this.tableRow.type
      const iconList = ['el-icon-folder-opened', 'el-icon-document', 'el-icon-paperclip']
      return iconList[type]
    }
  }
}
</script>

<style lang="scss" scoped>
  .table-self-column{
    color: #1482f0;
  }
</style>

```

#### tablePropsMixin
```javascript
const tablePropsMixin = {
  props: {
    scope: {
      type: Object,
      default: () => ({})
    },
    prop: {
      type: String,
      default: ''
    },
    bindConfig: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    tableRow() {
      return this.scope?.row || {}
    },
    tableColumnValue() {
      return this.tableRow && this.tableRow[this.prop]
    },
    tableColumn() {
      return this.scope?.column
    },
    tableIndex() {
      return this.scope?.$index
    }
  }
}
```
