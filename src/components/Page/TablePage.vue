<template>
  <div class="table-page">
    <slot name="table-header">
      <div class="table-header" :class="{ 'only-search-form': isOnlySearch }">
        <button-list
          v-if="!isOnlySearch"
          class="table-header-left"
          :button-list="handleButton"
          v-on="$listeners"
        />
        <search-form
          v-if="searchList.length > 0"
          ref="searchForm"
          class="table-header-right"
          :search-form="searchForm"
          :search-list="searchList"
          v-bind="searchFormConfig"
          v-on="$listeners"
        />
      </div>
    </slot>
    <div class="table-content" :style="[tableContentStyle,tableWidth]">
      <a-table
        v-if="isTableShow"
        ref="aTable"
        v-loading="tableLoading"
        :table-data="tableData"
        :table-list="tableList"
        :table-config="tableConfig"
        v-on="$listeners"
      />
    </div>
    <slot name="table-footer">
      <div v-if="isTableFooterLeft || pageData" class="table-footer">
        <div v-if="isTableFooterLeft" class="table-footer-select">
          <slot>已选择 <span>{{ tableSelectCount }}</span></slot>
        </div>
        <al-pagination
          v-if="pageData"
          :page-num="pageData.pageNum"
          :page-size="pageData.pageSize"
          :page-sizes="pageSizes"
          :total="pageData.total"
          class="table-footer-pagination"
          v-on="$listeners"
        />
      </div>
    </slot>
  </div>
</template>

<script>
import Table from 'e/Table'
import ButtonList from 'e/Button/ButtonList'
import SearchForm from 'e/Form/SearchForm'
import AlPagination from 'e/Pagination'
export default {
  name: 'TablePage',
  components: {
    ATable: Table,
    ButtonList,
    SearchForm,
    AlPagination
  },
  inheritAttrs: false,
  props: {
    width: {
      type: String,
      default: '100%'
    },
    /**
     * 搜索表单表单对象
     */
    searchForm: {
      type: Object,
      default: () => ({})
    },
    /**
     * 搜索表单外层搜索配置内容
     */
    searchList: {
      type: Array,
      default: () => []
    },
    /**
     * 搜索表单配置
     */
    searchFormConfig: {
      type: Object,
      default: () => {}
    },
    /**
     * 操作列配置集合
     */
    handleButton: {
      type: Array,
      default: () => []
    },
    /**
     * 表格列表配置项集合
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
     * 表格项配置
     */
    tableConfig: {
      type: Object,
      default: () => ({
        height: '100%'
      })
    },
    /**
     * 表格数据加载时显示。
     */
    tableLoading: {
      type: Boolean,
      default: false
    },
    /**
     * 是否显示分页， 固定在表格右下
     * pageSize, pageNum, total
     */
    pageData: {
      type: Object,
      default: null
    },
    /**
     * 分页页容量
     * pageSizes
     */
    pageSizes: {
      type: Array,
      default: () => {
        return [20, 50, 100, 200]
      }
    },
    /**
     * 是否显示表格左下内容， 默认为选择个数
     */
    isTableFooterLeft: {
      type: Boolean,
      default: false
    },
    /**
     * 是否显示小版的表格底部
     */
    isSmallTableFooter: {
      type: Boolean,
      default: false
    },
    /**
     * 已选择个数
     */
    tableSelectCount: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      isTableShow: true
    }
  },
  computed: {
    tableContentStyle() {
      if (this.isTableFooterLeft || this.pageData) {
        if (this.isSmallTableFooter) return { height: 'calc(100% - 50px)' }
        else return { height: 'calc(100% - 100px)' }
      } else {
        return { height: 'calc(100% - 70px)' }
      }
    },
    tableWidth() {
      return { width: this.width }
    },
    isOnlySearch() {
      return !this.handleButton || this.handleButton.length === 0
    }
  },
  methods: {
    clearSelection() {
      this.$refs.aTable.clearSelection()
    },
    doLayout() {
      this.$refs.aTable.doLayout()
    },
    initTable() {
      this.$refs.aTable.initTable()
    },
    /**
     * 表格选中
     */
    toggleSelection(rows) {
      this.$refs.aTable.toggleSelection(rows)
    },
    /**
     * 表格重新渲染方法
     */
    refreshTable() {
      this.isTableShow = false
      this.$nextTick(() => {
        this.isTableShow = true
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.table-page{
  height: 100%;
  .table-header{
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: 10px;
    padding-bottom: 10px;
    &::after{
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      border-bottom: 1px dashed #ccc;
    }
    .table-header-left{
      height: 40px;
      line-height: 40px;
    }
    .table-header-right{
    }
  }
  .table-footer{
    height: 40px;
    line-height: 40px;
    overflow: hidden;
    clear: both;
    .table-footer-select{
      float: left;
      display: inline-block;
      height: 40px;
      line-height: 40px;
    }
    .table-footer-pagination{
      float: right;
      display: inline-block;
      height: 40px;
      line-height: 40px;
    }
  }
}
</style>
