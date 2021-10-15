<template>
  <el-popover
    :placement="placement"
    :trigger="trigger"
  >
    <slot />
    <template slot="reference">
      <slot name="reference" />
    </template>
  </el-popover>
</template>

<script>
import { Popover as ElPopover } from 'element-ui'
export default {
  name: 'Popover',
  components: {
    ElPopover
  },
  props: {
    trigger: {
      type: String,
      default: 'click'
    },
    placement: {
      type: String,
      default: 'bottom-start'
    },
    button: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss" scoped>

</style>
