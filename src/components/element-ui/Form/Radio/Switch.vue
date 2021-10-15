<template>
  <el-switch
    v-model="vModelValue"
    v-bind="$attrs"
  />
</template>

<script>
import { Switch } from 'element-ui'
import { vModelMixin } from '@/mixins'

export default {
  name: 'InputSwitch',
  components: {
    ElSwitch: Switch
  },
  mixins: [vModelMixin]
}
</script>

<style lang="scss" scoped>

</style>
