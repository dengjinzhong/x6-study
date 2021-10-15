<template>
  <el-select
    v-model="vModelValue"
    :size="size"
    v-bind="$attrs"
  >
    <el-option
      v-for="item in selectList"
      :key="item.value"
      v-bind="item"
    />
  </el-select>
</template>

<script>
import { Select as ElSelect, Option as ElOption } from 'element-ui'
import { vModelMixin } from '@/mixins'

export default {
  components: {
    ElSelect, ElOption
  },
  mixins: [vModelMixin],
  inheritAttrs: false,
  props: {
    // 选项列表
    options: {
      type: Array,
      default: () => {
        return []
      }
    },
    size: {
      type: String,
      default: 'mini'
    },
    isAll: {
      type: Boolean,
      default: false
    },
    allValue: {
      type: String,
      default: null
    }
  },
  computed: {
    selectList() {
      const list = [...this.options]
      if (this.isAll) list.unshift({ label: '全部', value: this.allValue })
      return list
    }
  }
}
</script>
