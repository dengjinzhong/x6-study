<template>
  <al-dialog
    v-if="vModelValue"
    v-model="vModelValue"
    :width="width"
    :title="title"
    :handle-button="handleButton"
    @buttonClick="buttonClick"
  >
    <template slot="header">
      <slot name="header" />
    </template>
    <al-form
      ref="alForm"
      class="package-add"
      :form-data="formData"
      :form-list="formList"
      :form-config="formConfig"
      v-on="$listeners"
    />
    <slot name="footer-front" />
    <template slot="dialog-footer">
      <slot name="footer" />
    </template>
  </al-dialog>
</template>

<script>
import AlDialog from 'e/Dialog'
import { vModelMixin } from '@/mixins'
import { formButtonList } from '@/config/button'

export default {
  name: 'DialogForm',
  components: { AlDialog },
  mixins: [vModelMixin],
  inheritAttrs: false,
  props: {
    title: {
      type: String,
      default: '',
    },
    width: {
      type: String,
      default: 'auto',
    },
    formData: {
      type: Object,
      default: () => ({})
    },
    formList: {
      type: Array,
      default: () => []
    },
    formConfig: {
      type: Object,
      default: () => ({})
    },
    handleButton: {
      type: Array,
      default: () => formButtonList
    },
  },
  methods: {
    buttonClick(prop) {
      switch (prop) {
        case 'cancel':
          this.vModelValue = false
          this.$emit('cancelCall')
          break
        case 'confirm':
          this.$refs.alForm.confirmForm(() => {
            this.$emit('confirm')
          })
          break
        case 'runNow':
          this.$refs.alForm.confirmForm(() => {
            this.$emit('runNow')
          })
          break
        default: return
      }
    },
    setBindConfig(prop, bindProp, value) {
      this.$refs.alForm.setBindConfig(prop, bindProp, value)
    },
    setConfig(prop, bindProp, value) {
      this.$refs.alForm.setConfig(prop, bindProp, value)
    },
    /**
     * 重置表单数据， 回到默认值
     *
     * @public
     */
    resetFieldsForm() {
      this.$refs.alForm.resetFieldsForm()
    },
    /**
     * 移除表单项的校验结果。传入待移除的表单项的 prop 属性或者 prop 组成的数组，如不传则移除整个表单的校验结果
     *
     */
    clearValidate(prop) {
      this.$refs.alForm.clearValidate(prop)
    },
  }
}
</script>

<style lang="scss" scoped>
  .package-add{
    padding: 10px 60px;
  }
</style>
