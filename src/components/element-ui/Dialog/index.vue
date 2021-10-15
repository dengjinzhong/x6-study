<template>
  <el-dialog
    ref="dialog"
    top="0"
    custom-class="vertical-center"
    :visible.sync="vModelValue"
    :width="width"
    :close-on-click-modal="closeOnClickModal"
    :append-to-body="appendToBody"
    :before-close="beforeClose"
    v-bind="$attrs"
    @open="open"
  >
    <div class="dialog-header">
      <slot name="header" />
    </div>
    <div class="dialog-body" :style="{ height: height }">
      <slot />
    </div>
    <div v-if="handleButton" class="dialog-footer">
      <slot name="dialog-footer">
        <button-list
          :button-list="handleButton"
          v-on="$listeners"
        />
      </slot>
    </div>
  </el-dialog>
</template>

<script>
import { Dialog as ElDialog } from 'element-ui'
import ButtonList from 'e/Button/ButtonList'
import { vModelMixin } from '@/mixins'

import { formButtonList } from '@/config/button'

export default {
  name: 'Dialog',
  components: {
    ElDialog, ButtonList
  },
  mixins: [vModelMixin],
  inheritAttrs: false,
  props: {
    /**
     * 弹窗宽度
     */
    width: {
      type: String,
      default: '720px'
    },
    /**
     * 弹窗高度
     */
    height: {
      type: String,
      default: 'auto'
    },
    /**
     * 是否可以通过点击 modal 关闭 Dialog
     */
    closeOnClickModal: {
      type: Boolean,
      default: false
    },
    /**
     * Dialog 自身是否插入至 body 元素上
     */
    appendToBody: {
      type: Boolean,
      default: true
    },
    /**
     * 关闭前的回调，会暂停 Dialog 的关闭
     */
    beforeClose: {
      type: Function,
      default: (done) => {
        done()
      }
    },
    /**
     * 底部操作按钮集合
     */
    handleButton: {
      type: [Array, Boolean],
      default: () => formButtonList
    },
  },
  methods: {
    open() {
      /**
       * Dialog 打开的回调
       *
       * @event open
       */
      this.$emit('open')
    }
  }
}
</script>

<style lang="scss" scoped>
  .dialog-body{
    padding: 10px;
    max-height: 70vh;
    overflow: auto;
  }
  .dialog-footer{
    margin-top: 10px;
    padding: 10px;
    border-top: 1px dashed #ccc;
    text-align: right;
  }
  ::v-deep .vertical-center{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  ::v-deep .el-dialog{
    .el-dialog__header {
      padding: 0px 0px 0px 15px;
      height: 33px;
      line-height: 33px;
      text-align: left;
      color: #323232;
      background: #f2f2f2;
      border-bottom: 1px solid #e6e6e6;
      .el-dialog__title{
        font-size: 13px;
      }
      .el-dialog__headerbtn{
        top: 0;
        line-height: 33px;
      }
    }
    .el-dialog__body{
      padding: 0;
    }
    .el-dialog__footer{
      font-size: 13px;
      text-align: center;
      padding: 15px 10px 20px;
    }
  }
</style>
