<!--checkbox搜索组件-->
<template>
  <el-popover
    ref="popover"
    class="checkbox-search-form"
    popper-class="tree-popover"
    placement="bottom"
    width="240"
    trigger="click"
    @hide="hidePopover"
  >
    <div class="checkbox-popover">
      <div class="checkbox-header">
        <el-checkbox v-model="checkAll" :disabled="!isCheckAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">全选</el-checkbox>
        <el-input
          v-model="filterText"
          placeholder="输入关键字进行过滤"
          @change="selectFilter"
        />
      </div>
      <div class="checkbox-main">
        <p v-if="!getOptions.length" class="check-item-null">暂无数据</p>
        <el-checkbox-group v-else v-model="checkedItems" v-bind="$attrs" @change="handleCheckedItemsChange">
          <el-checkbox v-for="(item,i) in getOptions" :key="i" :label="item.value">
            <span class="code-text">{{ item.value }}</span>
            <span class="name-text">{{ item.caption }}</span>
          </el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
    <div slot="reference" class="click-input">
      <div class="top-box" :class="isFocus?'rotateArrow':''" @click="clickInput">
        <i class="el-icon-arrow-down icon" />
      </div>
      <el-input
        v-model="vModelValue"
        class="checkbox-input"
        placeholder="请选择"
      />
    </div>
  </el-popover>
</template>
<script>
import { Popover as ElPopover } from 'element-ui'
import { Input as ElInput } from 'element-ui'
import { vModelMixin } from '@/mixins'

export default {
  name: 'CheckboxSearch',
  components: { ElPopover, ElInput, },
  mixins: [vModelMixin],
  props: {
    options: {
      type: Array,
      default: () => []
    },
    /**
     * 是否可以全选
     * 默认 true 可以全选
     */
    isCheckAll: {
      type: Boolean,
      default: true,
    }
  },
  data() {
    return {
      isFocus: false,
      filter: false, // 是否搜索
      filterText: '', // 搜索关键字
      checkAll: false,
      isIndeterminate: true,
      checkedItems: [], // 已选择的checkbox
      SelectNavTemporary: [],
    }
  },
  computed: {
    getOptions: {
      get() {
        if (!this.filter) {
          return this.options
        } else {
          return this.SelectNavTemporary
        }
      },
    },
  },
  watch: {
    options(newVal, oldVal) {
      // 数据改变,清空已选择的数组
      this.checkedItems = []
    }
  },
  methods: {
    // 全选
    handleCheckAllChange(val) {
      const allTypeKey = this.getOptions.map(item => { return item.value })
      this.checkedItems = val ? allTypeKey : []
      this.isIndeterminate = false
      this.vModelValue = this.checkedItems.length > 0 ? this.checkedItems.join(',') : ''
    },
    // 选择
    handleCheckedItemsChange(value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.getOptions.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.getOptions.length
      this.vModelValue = this.checkedItems.length > 0 ? this.checkedItems.join(',') : ''
      this.$emit('formItemEvent', { event: 'checkboxChange', prop: { chooseList: value, totalData: this.getOptions }})
    },
    // 同时搜索label与value
    selectFilter(val) {
      // 判断是否为空
      if (val) {
        this.filter = true
        this.SelectNavTemporary = this.options.filter((item) => {
          if (!!~item.caption.indexOf(val) || !!~item.caption.toUpperCase().indexOf(val.toUpperCase()) || !!~item.value.indexOf(val) || !!~item.value.toUpperCase().indexOf(val.toUpperCase())) {
            return true
          }
        })
      } else {
        // 赋值还原
        this.filter = false
        this.SelectNavTemporary = []
      }
    },
    // 点击input输入框
    clickInput() {
      this.isFocus = true
      return false
    },
    // 隐藏弹出框
    hidePopover() {
      this.isFocus = false
      return false
    }
  }
}
</script>

<style lang="scss" scoped>
.checkbox-search-form {
  // input框
  ::v-deep .click-input {
    position: relative;
    max-width: 200px;
    .top-box {
      width: 100%;
      height: 100%;
      z-index: 3;
      border-radius: 4px;
      border: 1px solid #DCDFE6;
      position: absolute;
      overflow: hidden;
      .icon {
        width: 26px;
        height: 100%;
        position: absolute;
        right: 4px;
        font-size: 14px;
        color: #C0C4CC;
        background-color: #fff;
        border-radius: 50%;
        transition: transform .3s,-webkit-transform .3s;
        &:before {
          line-height: 26px;
          padding: 5px;
        }
      }
      &.rotateArrow {
        border-color: #409EFF;
        .icon.el-icon-arrow-down {
          transform: rotate(-180deg) !important;
        }
      }
    }
    .checkbox-input {
      .el-input__inner {
        border: none;
      }
    }
  }
}
// checkbox弹窗
.checkbox-popover {
  .checkbox-header {
    line-height: 28px;
    display: flex;
    padding-bottom: 6px;
    border-bottom: 1px solid #d7dce3;
    ::v-deep .el-checkbox{
      .el-checkbox__label {
        padding: 0 15px 0 5px;
      }
    }
  }
  .checkbox-main {
    max-height: 300px;
    overflow-y: scroll;
    padding-top: 8px;
    .check-item-null {
      margin: 0;
      text-align: center;
      color: #999;
      font-size: 14px;
    }
    .el-checkbox-group {
      ::v-deep .el-checkbox {
        padding: 5px 10px;
        display: block;
        margin: 0px;
        .el-checkbox__label {
          font-size: 12px;
          .code-text {
            vertical-align: middle;
            display: inline-block;
            width: 100px;
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
          }
          .name-text {
            vertical-align: middle;
            display: inline-block;
          }
        }
      }
    }
  }
}
</style>
