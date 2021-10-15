<template>
  <el-table
    ref="aTable"
    class="al-table"
    :data="tableData"
    v-bind="config"
    :row-class-name="rowClassName"
    @cell-dblclick="cellDblclick"
    @cell-click="cellClick"
    @selection-change="handleSelectionChange"
    @select="selectItem"
    @select-all="selectAllItem"
  >
    <template v-if="config.isEmpty" slot="empty">
      <span :class="[config.class ? config.class : tableText]">{{ config.emptyContent }}</span>
    </template>
    <slot name="tableHeader" />
    <el-table-column v-if="expandColumn" type="expand">
      <template slot-scope="props">
        <component
          :is="expandColumn.component"
          :scope="props"
          :prop="expandColumn.prop"
          :bind-config="expandColumn"
        />
      </template>
    </el-table-column>
    <!--  选择/序号  -->
    <el-table-column
      v-for="column in typeList"
      :key="column.type"
      :type="column.type"
      :label="column.label"
      v-bind="{ align: 'center', width: 50, ...column.itemConfig }"
    />
    <!-- @slot 表格起始插槽 -->
    <slot name="prepend" />
    <!--  表格主体内容  -->
    <el-table-column
      v-for="column in columnList"
      :key="column.prop"
      :prop="column.prop"
      :label="column.label"
      v-bind="{ align: 'center', showOverflowTooltip: true, ...column.itemConfig }"
    >

      <template slot-scope="scope">
        <component
          :is="column.component | componentFilter"
          v-model="scope.row[column.prop]"
          :scope="scope"
          :prop="column.prop"
          :bind-config="column.bindConfig"
          @tableEvent="tableEvent"
        />
      </template>
    </el-table-column>
    <!--  操作列  -->
    <el-table-column
      v-if="buttonColumn"
      label="操作"
      fixed="right"
      align="center"
      v-bind="buttonColumn.itemConfig"
    >
      <template v-if="buttonColumn.isHeader" slot="header">
        <component
          :is="buttonColumn.componentHeader | componentFilter"
          :prop="buttonColumn.prop"
          @tableEvent="tableEvent"
          @buttonClick="tableEvent('HeaderClick', $event)"
        />
      </template>
      <template slot-scope="scope">
        <component
          :is="buttonColumn.component | componentFilter"
          v-if="buttonColumn.component"
          :scope="scope"
          :prop="buttonColumn.prop"
          :bind-config="buttonColumn.bindConfig"
          class="al-table-button"
          @tableEvent="tableEvent"
          @buttonClick="tableEvent('buttonClick', $event, scope)"
        />
        <button-list
          v-else
          :scope="scope"
          :button-list="buttonColumn.buttonList"
          class="al-table-button"
          v-bind="{ type: 'text', ...buttonColumn.bindConfig }"
          @buttonClick="tableEvent('buttonClick', $event, scope)"
        />
      </template>
    </el-table-column>
    <!-- @slot 表格末尾插槽 -->
    <slot name="append" />
  </el-table>
</template>

<script>
import { Table as ElTable, TableColumn as ElTableColumn } from 'element-ui'
import ButtonList from 'e/Button/ButtonList'
import componentData from './config'
export default {
  name: 'Table',
  components: {
    ElTable, ElTableColumn, ButtonList
  },
  filters: {
    componentFilter(val = 'span') {
      return componentData[val] || val
    }
  },
  props: {
    /**
     * 表格列配置
     */
    tableList: {
      type: Array,
      default: () => []
    },
    /**
     * 表格数据
     */
    tableData: {
      type: Array,
      default: () => []
    },
    /**
     * 表格配置
     */
    tableConfig: {
      type: Object,
      default: () => ({
        border: true,
        stripe: true,
        highlightCurrentRow: true,
        size: 'medium',
      })
    },
    /**
     * 获取当前行索引
     */
    rowClassName: {
      type: Function,
      default: ({ row, rowIndex }) => {
        row.index = rowIndex
      }
    }
  },
  data() {
    return {
      columnList: [],
      typeList: [],
      expandColumn: null,
      buttonColumn: null,
      timer: null,
      tableText: 'table-text'
    }
  },
  computed: {
    config() {
      return {
        border: true,
        stripe: true,
        highlightCurrentRow: true,
        size: 'medium',
        ...this.tableConfig
      }
    }
  },
  updated() {
    if (this.timer) {
      clearInterval(this.timer)
    }
    this.timer = setTimeout(() => {
      this.doLayout()
    }, 100)
  },
  created() {
    this.initTable()
  },
  methods: {
    /**
     * 初始化表格
     * tableList 中配置 type = button 项会渲染成操作列并排序在后面末尾
     * tableList 中配置 type = expand 项会渲染成下拉展开详情
     * tableList 中配置除 type = button 之外 type 项会渲染成 element-ui type 项
     * tableList 中配置 prop 项会渲染成 表格自定义项
     */
    initTable() {
      const typeList = []
      const columnList = []
      let isType = false
      this.tableList.forEach(item => {
        switch (item.type) {
          case 'button':
            this.buttonColumn = item
            break
          case 'expand':
            this.expandColumn = item
            break
          default:
            if (item.type) {
              isType = true
              typeList.push(item)
            } else {
              columnList.push(item)
            }
        }
      })
      if (isType) this.typeList = typeList
      this.columnList = columnList
    },
    tableEvent(event, prop, data) {
      /**
       * 表格自定义子组件触发事件
       * 将 confirm 事件进行拦截， 只要表单校验通过才会在父组件进行触发
       *
       * @event tableEvent
       * @param {string} event 具体事件名
       * @param {string} prop 触发事件列
       * @param {any} data 携带参数
       */
      this.$emit('tableEvent', event, prop, data)
    },
    cellDblclick(row, column, cell, event) {
      /**
       * 当某一行被双击时会触发该事件
       *
       * @event cellDblclick
       * @param {Object} row 当前双击行
       * @param {Object} column
       * @param {Object} cell
       * @param {Object} event
       */
      this.$emit('cellDblclick', row, column, cell, event)
    },
    cellClick(row, column, cell, event) {
      /**
       * 当某一行被单击时会触发该事件
       *
       * @event cellClick
       * @param {Object} row 当前单击行
       * @param {Object} column
       * @param {Object} cell
       * @param {Object} event
       */
      this.$emit('cellClick', row, column, cell, event)
    },
    handleSelectionChange(val) {
      /**
           * 当选择项发生变化时会触发该事件
           *
           * @event handleSelectionChange
           * @param {Array} val 当前选择项
           */
      this.$emit('handleSelectionChange', val)
    },

    selectItem(selection, row) {
      /**
           * 当用户手动勾选数据行的 Checkbox 时触发的事件
           *
           * @event selectItem
           */
      this.$emit('selectItem', selection, row)
    },
    selectAllItem(selection) {
      /**
           * 当用户手动勾选全选 Checkbox 时触发的事件
           *
           * @event selectAllItem
           */
      this.$emit('selectAllItem', selection)
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$nextTick(() => {
            console.log(row)
            console.log(123)
            this.$refs.aTable.toggleRowSelection(row)
          })
        })
      } else {
        this.$refs.aTable.clearSelection()
      }
    },
    doLayout() {
      this.$nextTick(() => {
        this.$refs.aTable.doLayout()
      })
    },
    clearSelection() {
      this.$nextTick(() => {
        this.$refs.aTable.clearSelection()
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.al-table{
  .table-text{
      color: #ff8400;
    }
  ::v-deep {
    th {
      background-color: #e9f3ff;
      color: #000;
    }
    td, th.is-leaf {
      border-bottom: 1px solid #dfe6ec;
    }
    td,th,tr{
      padding: 10px 0;
    }
    .el-table__fixed {
      height: auto !important; // 此处的important表示优先于element.style
      bottom: 9px; // 改为自动高度后，设置与父容器的底部距离，则高度会动态改变
    }
    .cell {
      font-size: 14px;
      line-height: 21px;
    }
    .el-table__fixed-right-patch{
      z-index: 2020;
      background: #e9f3ff;
    }
    .el-table__row{
      .el-table-column--selection{
        padding: 0;
        .cell {
          padding: 0;
          .el-checkbox{
            width: 100%;
          }
        }
      }
    }
  }
}
.el-table--border ::v-deep {
  td,th{
    border-right: 1px solid #dfe6ec;
  }
}
.al-table-button ::v-deep {
  .al-button{
    padding: 0;
  }
}
</style>
