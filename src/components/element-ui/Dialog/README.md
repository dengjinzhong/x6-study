组件使用示例：

### 基础示例：
```vue
<template>
  <div style="padding: 20px">
    <al-button @click="showDialog = true">open</al-button>
    <al-dialog
      v-model="showDialog"
      handle-button
    >
      <template slot="header">
        <al-steps
          v-model="stepActive"
          style="padding: 0 20px"
          :step-list="stepList"
        />
      </template>
      <function-form />
      <template slot="dialog-footer">
        <al-button v-if="stepActive > 0" v-bind="handleButton[0]" @click="buttonClick">{{ handleButton[0].label }}</al-button>
        <al-button v-if="stepActive < 3" v-bind="handleButton[1]" @click="buttonClick">{{ handleButton[1].label }}</al-button>
        <al-button v-bind="handleButton[2]" @click="buttonClick">{{ handleButton[2].label }}</al-button>
        <al-button v-bind="handleButton[3]" @click="buttonClick">{{ handleButton[3].label }}</al-button>
      </template>
    </al-dialog>
  </div>
</template>

<script>
import AlDialog from 'e/Dialog'
import AlButton from 'e/Button'
import AlSteps from 'e/Steps'
import FunctionForm from '@/views/demo/Form/FunctionForm'
import buttonData from '@/config/button'

import _ from 'lodash'
export default {
  name: 'DialogDemo',
  components: {
    AlButton, AlDialog, AlSteps, FunctionForm
  },
  data() {
    return {
      showDialog: false,
      handleButton: [
        buttonData.lastStep,
        buttonData.nextStep,
        buttonData.confirm,
        buttonData.cancel
      ],
      stepActive: 0,
      stepList: [
        { title: '配置数据源基本信息', value: 0 },
        { title: '数据源参数配置', value: 1 },
        { title: '入库策略', value: 2 },
        { title: '配置计划任务', value: 3 },
      ]
    }
  },
  methods: {
    buttonClick(prop) {
      switch (prop) {
        case 'lastStep':
          this.stepActive -= 1
          break
        case 'nextStep':
          this.stepActive += 1
          break
        case 'confirm':
          this.$message({
            type: 'success',
            message: '提交成功'
          })
          this.showDialog = false
          break
        case 'cancel':
          this.showDialog = false
          break
        default:
          console.log(prop)
      }
    }
  }
}
</script>

<style scoped>

</style>

```
