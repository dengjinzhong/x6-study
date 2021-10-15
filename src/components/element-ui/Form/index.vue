<template>
  <el-form
    ref="form"
    class="a-form"
    :class="{ 'inline-form': config.inline }"
    onsubmit="return false"
    :model="formData"
    v-bind="config"
  >
    <!-- @slot 表单起始插槽 -->
    <slot name="prepend" />
    <template
      v-for="item in formList"
    >
      <el-form-item
        v-if="!item.isHide"
        :key="item.prop"
        :ref="item.prop"
        :prop="item.prop"
        :label="item.label && config.isColon ? item.label + '：' : item.label"
        :style="item | styleFilter(config)"
        v-bind="item.itemConfig"
      >
        <span slot="label">
          <el-tooltip v-if="item.itemConfig && item.itemConfig.tooltipContent" :content="item.itemConfig.tooltipContent" placement="top">
            <i class="el-icon-question" />
          </el-tooltip>
          <span>{{ item.label && config.isColon ? item.label + '：' : item.label }}</span>
        </span>
        <component
          :is="item.component | filterComponent"
          :ref="item.prop + 'itemForm'"
          v-model="formData[item.prop]"
          :prop="item.prop"
          :form-data="formData"
          v-bind="item.bindConfig"
          @formChange="formChange(item.prop, $event)"
          @buttonClick="buttonClick"
          @formItemEvent="formItemEvent"
        />
      </el-form-item>
    </template>
    <!-- @slot 表单末尾插槽 -->
    <slot name="append" />
  </el-form>
</template>

<script>
import { Form as ElForm, FormItem as ElFormItem } from 'element-ui'

import _ from 'lodash'
import componentData from 'e/Form/config'
export default {
  name: 'AlForm',
  components: { ElForm, ElFormItem },
  filters: {
    filterComponent(val = 'text') {
      return componentData[val] || val
    },
    styleFilter(item, config) {
      const labelWidth = item.itemConfig?.labelWidth || config.labelWidth
      return { 'padding-left': (item.label ? '' : labelWidth) }
    }
  },
  inheritAttrs: false,
  props: {
    /**
     * 表单配置
     */
    formConfig: {
      type: Object,
      default: () => ({
        size: 'mini',
        inline: true,
        labelWidth: '100px',
        validateOnRuleChange: false,
      })
    },
    /**
     * 表单数据对象
     * 表单所有配置的属性需全部在该对象中赋值，
     * 否则重置时会出现表单选项无法输入问题
     */
    formData: {
      type: Object,
      default: () => ({})
    },
    /**
     * 表单配置列表
     */
    formList: {
      type: Array,
      default: () => []
    },
  },
  data() {
    return {}
  },
  computed: {
    config() {
      return {
        size: 'mini',
        inline: true,
        labelWidth: '100px',
        validateOnRuleChange: false,
        ...this.formConfig
      }
    }
  },
  methods: {
    buttonClick(prop, data) {
      if (prop === 'confirm') {
        this.confirmForm(() => {
          this.btnEvent(prop, data)
        })
      } else {
        this.btnEvent(prop, data)
      }
    },
    btnEvent(prop, data) {
      /**
       * 按钮事件
       * 将 confirm 事件进行拦截， 只要表单校验通过才会在父组件进行触发
       *
       * @event buttonClick
       * @prop {string} 表单中点击按钮 prop 值
       * @data {any} 点击后传入的数据， 可为空
       */
      this.$emit('buttonClick', prop, data)
    },
    formChange(prop, value) {
      /**
       * 表单项值改变
       *
       * @event formChange
       * @param {string} prop 表单项改变的 属性名
       * @param {string} value 表单项改变的 属性值
       */
      this.$emit('formChange', prop, value)
    },
    formItemEvent(event) {
      /**
       * 子表单触发的事件
       *
       * @event formItemEvent
       * @param {object} event 事件类型 prop 事件属性名 value 事件触发附带值
       */
      this.$emit('formItemEvent', event)
    },
    /**
     * 设置表单某个配置项 属性值， 常用动态更改是否显示
     *
     * @param {string} prop 配置项 prop 值
     * @param {string} configProp 要修改配置项中的属性名
     * @param {any} value 要修改配置项中的属性值
     * @public
     */
    setConfig(prop, configProp, value) {
      const propFormItem = this.formList.find(item => item.prop === prop)
      if (propFormItem) this.$set(propFormItem, configProp, value)
    },
    /**
     * 设置表单某个配置项的 bindConfig 属性值， 常用动态更改下拉框选项
     *
     * @param {string} prop 配置项 prop 值
     * @param {string} bindProp 要修改配置项中 bindConfig 的属性名
     * @param {any} value 要修改配置项中 bindConfig 的属性值
     * @public
     */
    setBindConfig(prop, bindProp, value) {
      const propFormItem = this.formList.find(item => item.prop === prop)
      const bindConfig = propFormItem && propFormItem.bindConfig
      if (bindConfig) this.$set(bindConfig, bindProp, value)
    },
    /**
     * 重置表单数据， 回到默认值
     *
     * @public
     */
    resetFieldsForm() {
      this.$refs.form.resetFields()
    },
    /**
     * 表单校验
     *
     * @param {function} callback 校验通过后回调函数
     * @public
     */
    confirmForm(callback) {
      this.$refs.form.validate((valid) => {
        if (valid) {
          callback()
        } else {
          return false
        }
      })
    },
    /**
     * 移除表单项的校验结果。传入待移除的表单项的 prop 属性或者 prop 组成的数组，如不传则移除整个表单的校验结果
     *
     */
    clearValidate(prop) {
      this.$refs.form.clearValidate(prop)
    },
    getFormItemRefs(prop) {
      const itemForm = this.$refs[`${prop}itemForm`]
      if (_.isArray(itemForm)) return itemForm[0]
      else return itemForm
    }
  }
}
</script>

<style lang="scss" scoped>
  .a-form ::v-deep{
    .el-form-item{
      .el-form-item__label{
        font-weight: normal;
      }
    }
    .el-input{
      width: 200px;
    }
    .el-textarea__inner{
      width: 320px;
    }
    .item-right-button{
      margin-top: 10px;
      text-align: right;
    }
  }
  .inline-form{
    ::v-deep{
      .el-form-item__content{
        width: 200px;
      }
    }
  }
  .inline-auto-form{
    ::v-deep{
      .el-form-item__content{
        width: auto;
      }
    }
  }
  .form-item-inline{
    display: inline-block !important;
    ::v-deep .el-form-item__content{
      width: auto;
    }
  }
  .form-item-block{
    display: block !important;
    ::v-deep .el-form-item__content{
      width: calc(100% - 100px);
    }
  }
  .form-item-inline-block{
    display: inline-block !important;
    ::v-deep .el-form-item__content{
      width: auto;
    }
  }
  .form-item-label-none {
    padding-left: 0px !important;
  }
</style>
