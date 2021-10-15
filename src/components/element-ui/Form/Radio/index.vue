<template>
  <el-radio-group v-model="vModelValue" :size="size">
    <el-radio
      v-for="radio in options"
      :key="radio.value"
      class="al-radio"
      :label="radio.value"
      :disabled="radio.disabled"
    >{{ radio.label }}</el-radio>
  </el-radio-group>
</template>

<script>
import { RadioGroup as ElRadioGroup, Radio as ElRadio } from 'element-ui'
import { vModelMixin } from '@/mixins'

export default {
  name: 'RadioGroup',
  components: {
    ElRadioGroup,
    ElRadio
  },
  mixins: [vModelMixin],
  props: {
    options: {
      type: Array,
      default: () => []
    },
    size: {
      type: String,
      default: 'mini'
    },
  }
}
</script>

<style lang="scss" scoped>
.al-radio{
  margin-right: 10px;
}
</style>
