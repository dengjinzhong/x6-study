<template>
  <el-progress :percentage="percentNum" />
</template>

<script>
import { Progress as ElProgress } from 'element-ui'
import { tablePropsMixin } from '../tableMixins'
export default {
  name: 'Progress',
  components: {
    ElProgress
  },
  mixins: [tablePropsMixin],
  data() {
    return {
    }
  },
  computed: {
    percentNum() {
      const num = this.tableColumnValue || 0
      return typeof (num) === 'string' ? Number(num) : num
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>

</style>
